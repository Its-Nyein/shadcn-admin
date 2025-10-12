import Cookies from "js-cookie";
import { User } from "@/lib/type";

const AUTH_TOKEN_KEY = "auth_token";
const USER_DATA_KEY = "user_data";

const VALID_CREDENTIALS = {
  email: "admin@example.com",
  password: "admin123!@#",
};

const MOCK_USER: User = {
  id: "1",
  name: "Admin User",
  email: "admin@example.com",
  avatar: "",
  role: "admin",
};

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (email !== VALID_CREDENTIALS.email || password !== VALID_CREDENTIALS.password) {
      throw new Error("Invalid email or password");
    }

    const token = btoa(`${email}:${Date.now()}`);

    // Check if we're on HTTPS (production) or HTTP (local dev)
    const isSecure =
      typeof window !== "undefined"
        ? window.location.protocol === "https:"
        : process.env.NODE_ENV === "production";

    const cookieOptions = {
      expires: 7,
      path: "/",
      sameSite: "lax" as const,
      secure: isSecure,
    };

    Cookies.set(AUTH_TOKEN_KEY, token, cookieOptions);
    Cookies.set(USER_DATA_KEY, JSON.stringify(MOCK_USER), cookieOptions);

    return MOCK_USER;
  },

  logout: () => {
    Cookies.remove(AUTH_TOKEN_KEY, { path: "/" });
    Cookies.remove(USER_DATA_KEY, { path: "/" });
  },

  getCurrentUser: async (): Promise<User | null> => {
    const token = Cookies.get(AUTH_TOKEN_KEY);
    const userData = Cookies.get(USER_DATA_KEY);

    if (!token || !userData) {
      return null;
    }

    try {
      const user = JSON.parse(userData) as User;
      return user;
    } catch {
      authService.logout();
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    return !!Cookies.get(AUTH_TOKEN_KEY);
  },

  getToken: (): string | undefined => {
    return Cookies.get(AUTH_TOKEN_KEY);
  },
};
