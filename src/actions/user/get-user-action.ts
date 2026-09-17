"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { serverFetch } from "@/services/auth/server";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  phone?: string | null;
};

export async function getCurrentUserAction(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return null;
  }

  try {
    const response = await serverFetch("/auth/me");

    if (response.ok) {
      const data = await response.json();
      const user: AuthUser = data.user || data;

      // Mantém o cookie `user` atualizado com o banco de dados
      cookieStore.set("user", JSON.stringify(user), {
        httpOnly: false,
        secure: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });

      return user;
    }
  } catch (error) {
    console.error("Erro ao buscar usuário atual:", error);
  }

  // Fallback para o cookie caso a API falhe temporariamente
  try {
    const userCookie = cookieStore.get("user")?.value;
    if (userCookie) {
      return JSON.parse(userCookie) as AuthUser;
    }
  } catch (e) {
    console.error("Erro ao ler cookie do usuário:", e);
  }

  return null;
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("user");
  redirect("/login");
}

