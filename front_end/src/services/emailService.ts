import apiClient from "./axios";
import type { OverdueEmailPayload } from "../types/Email";

export const sendOverdueEmail = async (payload: OverdueEmailPayload) => {
  const response = await apiClient.post("/email/notifyOverdue", payload);
  return response.data;
};
