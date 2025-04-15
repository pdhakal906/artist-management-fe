import api from "./api";
interface UpdateUserPropsType {
  id: number;
  first_name: string;
  last_name: string;
  dob: string;
  phone: string;
  gender: string;
  address: string;
}

export const getUsers = async (page: number) => {
  const response = await api.get(`/users?page=${page}&page_size=10`);
  return response.data;
};

export const getUserById = async (id: number) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const updateUser = async (user: UpdateUserPropsType) => {
  const { id, first_name, last_name, dob, phone, gender, address } = user;

  try {
    const response = await api.put(`/users/${id}`, {
      first_name,
      last_name,
      dob,
      phone,
      gender,
      address,
    });

    return response;
  } catch (error) {
    if (error.response) {
      return error;
    } else if (error.request) {
      return error;
    } else {
      return error;
    }
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response;
  } catch (error) {
    if (error.response) {
      return error;
    } else if (error.request) {
      return error;
    } else {
      return error;
    }
  }
};
