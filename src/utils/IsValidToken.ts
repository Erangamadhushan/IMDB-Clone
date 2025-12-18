import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
}

export function isTokenValid(token: string) {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}
