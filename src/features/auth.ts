import api from "./api";
import { jwtDecode } from "jwt-decode";
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

    // Optionally store the token
    console.log("response");
    console.log(response);
    const token = response.data.access_token; // or whatever your API returns
    if (token) {
      localStorage.setItem("token", token);
    }

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

    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    // throw (
    //   error.response?.data || { detail: "Something went wrong during login." }
    // );
  }
};

export const getUserRole = () => {
  const token = localStorage.getItem("token"); // or sessionStorage
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role || decoded.role || null;
  } catch (error) {
    return null;
  }
};
