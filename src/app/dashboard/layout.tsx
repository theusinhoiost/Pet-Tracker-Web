"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { LogOut } from "lucide-react";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import NotificationsSheet from "@/components/notifications/notifications-sheet";
import { useAuth } from "@/hooks/use-auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();

  const userInitials = user?.name
    ? user.name
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
    : "U";

  return (
    <div className="min-h-screen bg-background/80 text-foreground flex flex-col transition-colors duration-300">
      <Header>
        <div className="flex items-center gap-2 sm:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  {user?.avatar && (
                    <AvatarImage
                      src={user.avatar}
                      alt={user.name || "Avatar do usuário"}
                      className="object-cover"
                    />
                  )}
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32">
              <DropdownMenuGroup>
                <DropdownMenuItem aria-description="Entrar área de pagamentos">
                  Pagamentos
                </DropdownMenuItem>
                <DropdownMenuItem aria-description="Entrar área das configurações">
                  <Link href={"/settings"}>Configurações</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem variant="destructive" onClick={logout}>
                  Sair da conta <LogOut />
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <NotificationsSheet />
        </div>
      </Header>

      <main className="grow py-6 px-3">{children}</main>

      <Footer />
    </div>
  );
}
