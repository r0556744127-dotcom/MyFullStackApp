// api/classesApi.ts
import apiClient from "@/api/apiClient";

export const fetchClasses = async () => {
  const res = await apiClient.get("/ClassRoom");
  return res.data;
};

export const fetchClassDetails = async (id: number) => {
  const res = await apiClient.get(`/ClassRoom/${id}`);
  return res.data;
};

export const createClass = async (data: any) => {
  const res = await apiClient.post("/ClassRoom", data);
  return res.data;
};

export const createStudent = async (data: any) => {
  const res = await apiClient.post("/Student", data);
  return res.data;
};

export const deleteClass = async (id: number) => {
  await apiClient.delete(`/ClassRoom/${id}`);
};