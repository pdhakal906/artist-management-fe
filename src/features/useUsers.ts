import useSWR from "swr";
import { getUsers, getUserById } from "./user";

// Hook to get paginated users
export const useUsers = (page: number) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/users?page=${page}&page_size=10`,
    () => getUsers(page)
  );

  return {
    users: data,
    isLoading,
    isError: error,
    mutate,
  };
};

// Hook to get a single user by ID
export const useUser = (id: number) => {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/users/${id}` : null,
    () => getUserById(id)
  );

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  };
};
