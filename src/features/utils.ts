import { JwtPayload } from "jwt-decode";

export const isTokenExpired = (decoded: JwtPayload) => {
  try {
    if (!decoded.exp) return true;
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
};
