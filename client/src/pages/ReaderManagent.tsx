import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import type { Reader, ReaderFormData } from "../types/Reader"
import {
  createReader,
  deleteReader,
  getReaders,
  updateReader,
} from "../services/readerService"
import Loading from "../components/PageLoading"

const ReaderManagement: React.FC = () => {
  const [readers, setReaders] = useState<Reader[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<ReaderFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
  })
  const [isAdding, setIsAdding] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDomain, setFilterDomain] = useState("All")
  const [loading, setLoading] = useState<boolean>(true)

  const loadReaders = async () => {
    try {
      setLoading(true)
      const data = await getReaders()
      setReaders(data)
    } catch (err) {
      console.error(err)
      toast.error("Failed to load readers")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadReaders()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const emailDomains = Array.from(
    new Set(
      readers
        .map(r => {
          const parts = (r.email || "").split("@")
          return parts.length === 2 ? parts[1] : null
        })
        .filter((d): d is string => Boolean(d))
    )
  )

  const filteredReaders = readers.filter(reader => {
    const name = reader.name?.toLowerCase() ?? ""
    const email = reader.email?.toLowerCase() ?? ""
    const phone = reader.phone?.toString() ?? ""
    const term = searchTerm.toLowerCase()
    const matchesSearch =
      name.includes(term) || email.includes(term) || phone.includes(searchTerm)
    const matchesDomain =
      filterDomain === "All" ||
      (reader.email && reader.email.endsWith("@" + filterDomain))
    return matchesSearch && matchesDomain
  })

  const handleAddReader = async () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error("Name, Email, and Phone are required")
      return
    }
    try {
      const newReader = await createReader({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address?.trim() || undefined,
      })
      setReaders(prev => [...prev, newReader])
      toast.success("Reader added")
      resetForm()
      setIsAdding(false)
    } catch (err) {
      console.error(err)
      toast.error("Failed to add reader")
    }
  }

  const startEditing = (reader: Reader) => {
    setEditingId(reader._id)
    setFormData({
      name: reader.name ?? "",
      email: reader.email ?? "",
      phone: reader.phone ?? "",
      address: reader.address ?? "",
    })
  }

  const cancelEditing = () => {
    setEditingId(null)
    resetForm()
  }

  const saveEditing = async (id: string) => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error("Name, Email, and Phone are required")
      return
    }
    try {
      const updated = await updateReader(id, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address?.trim() || undefined,
      })
      setReaders(prev => prev.map(r => (r._id === id ? updated : r)))
      toast.success("Reader updated")
      setEditingId(null)
      resetForm()
    } catch (err) {
      console.error(err)
      toast.error("Failed to update reader")
    }
  }

  const handleDeleteReader = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this reader?")) return
    try {
      await deleteReader(id)
      setReaders(prev => prev.filter(r => r._id !== id))
      toast.success("Reader deleted")
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete reader")
    }
  }

  const resetForm = () =>
    setFormData({ name: "", email: "", phone: "", address: "" })

  const inputBase =
    "w-full rounded-md px-3 py-2 text-sm bg-gray-800 text-gray-100 placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"

  const btnBase =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900"

  const btnTeal = `${btnBase} bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-500 hover:to-emerald-500 focus:ring-teal-400`
  const btnGray = `${btnBase} bg-gray-600 text-white hover:bg-gray-500 focus:ring-gray-400`
  const btnRed = `${btnBase} bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-500 hover:to-rose-500 focus:ring-red-400`

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 text-white bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-xl">
      <header className="mb-6 border-b border-gray-700 pb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-teal-300">Reader Management</h1>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className={btnTeal}>
            + Add New Reader
          </button>
        )}
      </header>

      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className={inputBase}
        />
        <select
          value={filterDomain}
          onChange={e => setFilterDomain(e.target.value)}
          className={inputBase}
        >
          <option value="All">All Domains</option>
          {emailDomains.map(domain => (
            <option key={domain} value={domain}>{domain}</option>
          ))}
        </select>
      </div>

      {isAdding && (
        <div className="mb-6 p-4 rounded-lg bg-gray-700">
          <h2 className="mb-4 text-lg font-semibold">Add New Reader</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className={inputBase} />
            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" className={inputBase} />
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className={inputBase} />
            <input name="address" value={formData.address || ""} onChange={handleChange} placeholder="Address" className={inputBase} />
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={handleAddReader} className={btnTeal}>Save</button>
            <button onClick={() => { setIsAdding(false); resetForm(); }} className={btnGray}>Cancel</button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto bg-gray-800 rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-700 text-gray-300">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReaders.length === 0 ? (
              <tr><td colSpan={5} className="text-center text-gray-400 py-6">No readers found</td></tr>
            ) : (
              filteredReaders.map(reader => (
                editingId === reader._id ? (
                  <tr key={reader._id} className="bg-gray-600">
                    <td className="px-4 py-2"><input name="name" value={formData.name} onChange={handleChange} className={inputBase} /></td>
                    <td className="px-4 py-2"><input name="email" value={formData.email} onChange={handleChange} className={inputBase} /></td>
                    <td className="px-4 py-2"><input name="phone" value={formData.phone} onChange={handleChange} className={inputBase} /></td>
                    <td className="px-4 py-2"><input name="address" value={formData.address || ""} onChange={handleChange} className={inputBase} /></td>
                    <td className="px-4 py-2 flex gap-2">
                      <button onClick={() => saveEditing(reader._id)} className={btnTeal}>Save</button>
                      <button onClick={cancelEditing} className={btnGray}>Cancel</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={reader._id} className="odd:bg-gray-700 even:bg-gray-800">
                    <td className="px-4 py-2 text-white">{reader.name}</td>
                    <td className="px-4 py-2 text-white break-all">{reader.email}</td>
                    <td className="px-4 py-2 text-white">{reader.phone}</td>
                    <td className="px-4 py-2 text-white">{reader.address || "—"}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <button onClick={() => startEditing(reader)} className={btnTeal}>Edit</button>
                      <button onClick={() => handleDeleteReader(reader._id)} className={btnRed}>Delete</button>
                    </td>
                  </tr>
                )
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReaderManagement
