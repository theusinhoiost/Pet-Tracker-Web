"use client";

import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import {
  AuthUser,
  getCurrentUserAction,
  logoutAction,
} from "@/actions/user/get-user-action";

export type User = AuthUser;

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

function getInitialUser(): User | null {
  if (typeof document === "undefined") return null;
  try {
    const match = document.cookie.match(/(?:^|;\s*)user=([^;]+)/);
    if (match) {
      const decoded = decodeURIComponent(match[1]);
      return JSON.parse(decoded) as User;
    }
  } catch { }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getInitialUser);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const currentUser = await getCurrentUserAction();
      setUser(currentUser);
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = async () => {
    setUser(null);
    await logoutAction();
  };

  useEffect(() => {
    let ignore = false;

    async function loadUser() {
      if (!ignore) {
        await checkAuth();
      }
    }

    void loadUser();

    return () => {
      ignore = true;
    };
  }, [checkAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        checkAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
