import apiClient from "./axios";

export interface Activity {
  type: "LEND" | "RETURN" | "READER" | "BOOK";
  message: string;
  timestamp: string; 
}

export const getRecentActivity = async (): Promise<Activity[]> => {
  const { data } = await apiClient.get<Activity[]>("/activity");
  return data;
};
