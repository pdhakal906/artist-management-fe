import api from "./api";
import { getUsers } from "./user";

export const fetcher = (url: string) => api.get(url).then((res) => res.data);

export const fetchUsers = async (page: number) => {
  const response = await getUsers(page);
  console.log("fetcher ", response);
  return response; // return only the data part
};
