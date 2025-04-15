import api from "./api";
import { jwtDecode } from "jwt-decode";
import { session } from "./sessionStorage";
interface SignUpPropsType {
  email: string;
  first_name: string;
  last_name: string;
  dob: string;
  role: string;
  phone: string;
  gender: string;
  address: string;
  password: string;
}

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error(
      "unable to login"
      // error.response?.data || { detail: "Something went wrong during login." }
    );
  }
};

export const signUp = async (props: SignUpPropsType) => {
  const {
    email,
    first_name,
    last_name,
    dob,
    role,
    phone,
    gender,
    address,
    password,
  } = props;

  try {
    const response = await api.post("/signup", {
      email,
      first_name,
      last_name,
      dob,
      role,
      phone,
      gender,
      address,
      password,
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

export const getUserRole = () => {
  const token = session.get("token"); // token
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role || decoded.role || null;
  } catch (error) {
    return null;
  }
};
