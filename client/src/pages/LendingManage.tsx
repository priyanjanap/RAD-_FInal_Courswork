import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

// Services
import { getLendings, lendBook, returnBook } from "../services/lendingService";
import { getBooks } from "../services/bookService";
import { getReaders } from "../services/readerService";

// Types
import type { Lending, LendingStatus } from "../types/Lending";
import type { Book } from "../types/Book";
import type { Reader } from "../types/Reader";
import Loading from "../components/PageLoading";

function toDateInputValue(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

function fromDateInputValue(str: string): Date | null {
  if (!str) return null;
  const d = new Date(str);
  return Number.isNaN(d.getTime()) ? null : d;
}

function formatDisplay(date: string | Date | null | undefined): string {
  if (!date) return "-";
  const d = typeof date === "string" ? new Date(date) : date;
  return Number.isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
}

function addDays(base: Date, days: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

function deriveStatus(l: Lending): LendingStatus {
  if (l.status) return l.status; // trust server if provided
  if (l.returnedAt) return "RETURNED";
  const due = new Date(l.dueDate).getTime();
  return Date.now() > due ? "OVERDUE" : "BORROWED";
}

function isReturned(l: Lending): boolean {
  return l.returnedAt != null || deriveStatus(l) === "RETURNED";
}

function isOverdue(l: Lending): boolean {
  return !isReturned(l) && new Date(l.dueDate).getTime() < Date.now();
}

interface FormState {
  readerId: string;
  bookId: string;
  borrowDate: string; // yyyy-mm-dd
  loanDays: number;
  dueDate: string; // derived but editable
}

function getInitialForm(): FormState {
  const today = new Date();
  const borrowDate = toDateInputValue(today);
  const loanDays = 14;
  const dueDate = toDateInputValue(addDays(today, loanDays));
  return { readerId: "", bookId: "", borrowDate, loanDays, dueDate };
}

const LendingPage: React.FC = () => {
  // Data from server
  const [lendings, setLendings] = useState<Lending[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [readers, setReaders] = useState<Reader[]>([]);

  // UI state
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<FormState>(getInitialForm());

  // Filters
  const [search, setSearch] = useState("");
  const [filterReader, setFilterReader] = useState<string>("All");
  const [filterBook, setFilterBook] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<LendingStatus | "All">("All");

  /* --------------------------------------------------------------
     Load Data (unchanged)
  --------------------------------------------------------------- */
  const loadAll = async () => {
    try {
      setLoading(true);
      const [lendingsData, booksData, readersData] = await Promise.all([
        getLendings(),
        getBooks(),
        getReaders(),
      ]);
      setLendings(lendingsData);
      setBooks(booksData);
      setReaders(readersData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load lending data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next: FormState = {
        ...prev,
        [name]: name === "loanDays" ? Number(value) : value,
      };
      if (name === "loanDays") {
        const start = fromDateInputValue(prev.borrowDate) ?? new Date();
        next.dueDate = toDateInputValue(addDays(start, Number(value)));
      }
      if (name === "borrowDate") {
        const start = fromDateInputValue(value) ?? new Date();
        next.dueDate = toDateInputValue(addDays(start, prev.loanDays));
      }
      return next;
    });
  };

  const resetForm = () => setForm(getInitialForm());

  const handleSubmitLend = async () => {
    if (!form.readerId || !form.bookId) {
      toast.error("Select reader and book");
      return;
    }
    try {
      setActionLoading(true);
      await lendBook({
        bookId: form.bookId,
        readerId: form.readerId,
        loanDays: form.loanDays,
      });
      toast.success("Lending created");
      resetForm();
      setFormOpen(false);
      await loadAll();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create lending");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReturn = async (lendingId: string) => {
    if (!window.confirm("Mark as returned?")) return;
    try {
      setActionLoading(true);
      await returnBook(lendingId);
      toast.success("Book returned");
      await loadAll();
    } catch (err) {
      console.error(err);
      toast.error("Failed to mark returned");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredLendings = useMemo(() => {
    const term = search.trim().toLowerCase();
    return lendings.filter((l) => {
      const rName = l.reader?.name?.toLowerCase?.() ?? "";
      const bTitle = l.book?.title?.toLowerCase?.() ?? "";
      const borrowStr = l.borrowedAt ? toDateInputValue(l.borrowedAt) : "";
      const dueStr = l.dueDate ? toDateInputValue(l.dueDate) : "";
      const status = deriveStatus(l);

      const matchesTerm =
        !term ||
        rName.includes(term) ||
        bTitle.includes(term) ||
        borrowStr.includes(term) ||
        dueStr.includes(term) ||
        status.toLowerCase().includes(term);

      const matchesReader = filterReader === "All" || l.reader?._id === filterReader;
      const matchesBook = filterBook === "All" || l.book?._id === filterBook;
      const matchesStatus = filterStatus === "All" || status === filterStatus;

      return matchesTerm && matchesReader && matchesBook && matchesStatus;
    });
  }, [lendings, search, filterReader, filterBook, filterStatus]);

  const StatusBadge = ({ l }: { l: Lending }) => {
    const s = deriveStatus(l);
    const base = "px-2 py-1 rounded-full text-xs font-semibold";
    if (s === "RETURNED") {
      return <span className={`${base} bg-emerald-500/80 text-white`}>Returned</span>;
    }
    if (s === "OVERDUE") {
      return <span className={`${base} bg-rose-600/80 text-white`}>Overdue</span>;
    }
    return <span className={`${base} bg-amber-400/80 text-slate-900`}>Borrowed</span>;
  };

  if (loading) {
    return <Loading />;
  }

  const inputBase =
    "w-full rounded-md px-3 py-2 text-sm bg-indigo-900/30 text-white placeholder-indigo-300 border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";

  const selectBase =
    "w-full rounded-md px-3 py-2 text-sm bg-indigo-900/30 text-white border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";

  const btnBase =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-900";

  const btnIndigo = `${btnBase} bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-400`;
  const btnGreen = `${btnBase} bg-green-600 hover:bg-green-700 text-white focus:ring-green-400`;
  const btnGray = `${btnBase} bg-indigo-700 hover:bg-indigo-800 text-white focus:ring-indigo-600`;

  return (
    <main className="relative max-w-6xl mx-auto p-6 sm:p-8 md:p-10 rounded-2xl overflow-hidden text-white bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 shadow-2xl shadow-indigo-900/60 mt-8">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-indigo-600/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-purple-600/20 blur-3xl animate-pulse [animation-delay:1.5s]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="mb-8 pb-4 border-b border-indigo-700 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3 group">
            <div className="relative p-3 rounded-xl bg-gradient-to-br from-blue-600 to-purple-700 shadow-lg group-hover:shadow-xl transition-transform group-hover:scale-105">
              {/* Decorative glyph */}
              <span className="block w-4 h-4 bg-white rounded-sm rotate-12" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                Lending Management
              </h1>
              <p className="text-sm text-indigo-300">Manage active and past lendings</p>
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search (reader, book, date, status)"
            className={`${inputBase} col-span-1 md:col-span-2`}
            aria-label="Search lendings"
          />
          <select
            value={filterReader}
            onChange={(e) => setFilterReader(e.target.value)}
            className={selectBase}
            aria-label="Filter by reader"
          >
            <option value="All" className="text-indigo-900">
              All Readers
            </option>
            {readers.map((r) => (
              <option key={r._id} value={r._id} className="text-indigo-900">
                {r.name}
              </option>
            ))}
          </select>
                <select
            value={filterBook}
            onChange={(e) => setFilterBook(e.target.value)}
            className={selectBase}
            aria-label="Filter by book"
          >
            <option value="All" className="text-indigo-900">
              All Books
            </option>
            {books.map((b) => (
              <option key={b._id} value={b._id} className="text-indigo-900">
                {b.title}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as LendingStatus | "All")}
            className={selectBase}
            aria-label="Filter by status"
          >
            <option value="All" className="text-indigo-900">
              All Statuses
            </option>
            <option value="BORROWED" className="text-indigo-900">
              Borrowed
            </option>
            <option value="OVERDUE" className="text-indigo-900">
              Overdue
            </option>
            <option value="RETURNED" className="text-indigo-900">
              Returned
            </option>
          </select>
        </div>

        {/* Actions */}
        <div className="mb-6">
          <button
            className={btnIndigo}
            onClick={() => {
              resetForm();
              setFormOpen(true);
            }}
          >
            + New Lending
          </button>
        </div>

        {/* Lending Table */}
        <div className="overflow-x-auto rounded-lg border border-indigo-700">
          <table className="w-full text-left text-sm">
            <thead className="bg-indigo-800/50 text-indigo-200">
              <tr>
                <th className="p-3">Reader</th>
                <th className="p-3">Book</th>
                <th className="p-3">Borrowed</th>
                <th className="p-3">Due Date</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-700/40">
              {filteredLendings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-indigo-400">
                    No lendings found.
                  </td>
                </tr>
              ) : (
                filteredLendings.map((l) => (
                  <tr key={l._id} className="hover:bg-indigo-900/20">
                    <td className="p-3">{l.reader?.name ?? "-"}</td>
                    <td className="p-3">{l.book?.title ?? "-"}</td>
                    <td className="p-3">{formatDisplay(l.borrowedAt)}</td>
                    <td className="p-3">{formatDisplay(l.dueDate)}</td>
                    <td className="p-3">
                      <StatusBadge l={l} />
                    </td>
                    <td className="p-3 text-center">
                      {!isReturned(l) && (
                        <button
                          className={btnGreen}
                          onClick={() => handleReturn(l._id)}
                          disabled={actionLoading}
                          aria-label={`Mark lending for ${l.book?.title} as returned`}
                        >
                          Return
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Lending Form Modal */}
        {formOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
            <div className="bg-indigo-900 rounded-lg max-w-md w-full p-6 relative">
              <h2 className="text-xl font-semibold mb-4 text-white">New Lending</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="readerId" className="block text-sm font-medium text-indigo-200 mb-1">
                    Reader
                  </label>
                  <select
                    id="readerId"
                    name="readerId"
                    value={form.readerId}
                    onChange={handleFormChange}
                    className={selectBase}
                  >
                    <option value="">Select Reader</option>
                    {readers.map((r) => (
                      <option key={r._id} value={r._id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="bookId" className="block text-sm font-medium text-indigo-200 mb-1">
                    Book
                  </label>
                  <select
                    id="bookId"
                    name="bookId"
                    value={form.bookId}
                    onChange={handleFormChange}
                    className={selectBase}
                  >
                    <option value="">Select Book</option>
                    {books.map((b) => (
                      <option key={b._id} value={b._id}>
                        {b.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="borrowDate" className="block text-sm font-medium text-indigo-200 mb-1">
                    Borrow Date
                  </label>
                  <input
                    type="date"
                    id="borrowDate"
                    name="borrowDate"
                    value={form.borrowDate}
                    onChange={handleFormChange}
                    className={inputBase}
                    max={toDateInputValue(new Date())}
                  />
                </div>

                <div>
                  <label htmlFor="loanDays" className="block text-sm font-medium text-indigo-200 mb-1">
                    Loan Days
                  </label>
                  <input
                    type="number"
                    id="loanDays"
                    name="loanDays"
                    min={1}
                    max={60}
                    value={form.loanDays}
                    onChange={handleFormChange}
                    className={inputBase}
                  />
                </div>

                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-indigo-200 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleFormChange}
                    className={inputBase}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  className={btnGray}
                  onClick={() => setFormOpen(false)}
                  disabled={actionLoading}
                >
                  Cancel
                </button>
                <button
                  className={btnIndigo}
                  onClick={handleSubmitLend}
                  disabled={actionLoading}
                >
                  {actionLoading ? "Saving..." : "Lend Book"}
                </button>
              </div>

              <button
                onClick={() => setFormOpen(false)}
                className="absolute top-3 right-3 text-indigo-400 hover:text-indigo-200"
                aria-label="Close lending form"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default LendingPage;
