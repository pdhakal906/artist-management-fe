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
    throw new Error("unable to login");
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
      return error;
    } else if (error.request) {
      return error;
    } else {
      return error;
    }
  }
};

export const getUserRole = () => {
  const token = session.get("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role || decoded.role || null;
  } catch (error) {
    return null;
  }
};
