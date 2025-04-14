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
// export const getUsers = (page: number) =>
//   api.get(`/users?page=${page}&page_size=10`);
export const getUsers = async (page: number) => {
  const response = await api.get(`/users?page=${page}&page_size=10`);
  return response.data;
};

// export const getUserById = (id: number) => api.get(`/users/${id}`);

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
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log("Response Data:", error.response.data); // 👈 this is what you usually want
      // console.log("Status Code:", error.response.status);
      // console.log("Headers:", error.response.headers);
      return error;
    } else if (error.request) {
      // The request was made but no response was received
      console.log("No response received:", error.request);
      return error;
    } else {
      // Something happened in setting up the request
      console.log("Error setting up the request:", error.message);
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
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log("Response Data:", error.response.data); // 👈 this is what you usually want
      // console.log("Status Code:", error.response.status);
      // console.log("Headers:", error.response.headers);
      return error;
    } else if (error.request) {
      // The request was made but no response was received
      console.log("No response received:", error.request);
      return error;
    } else {
      // Something happened in setting up the request
      console.log("Error setting up the request:", error.message);
      return error;
    }
  }
};
