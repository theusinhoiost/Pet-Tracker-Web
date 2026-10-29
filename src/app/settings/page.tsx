"use client";

import { useState } from "react";
import {
  Bell,
  Lock,
  User,
  ShieldCheck,
  Palette,
  Globe,
  Smartphone,
  Mail,
  Eye,
  EyeOff,
  ChevronRight,
  LucideIcon,
} from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/ui/header";
import { LanguageSwitcher } from "@/components/ui/language-selector";
import ThemeSettingsChanger from "@/components/ui/settings/theme-settings-changer";
import BackButton from "@/components/ui/back-button";
import { useAuth } from "@/hooks/use-auth";
import { useTranslations, useLocale } from "next-intl";

export default function SettingsPage() {
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const t = useTranslations("settings");
  const tCommon = useTranslations("common");
  const locale = useLocale();

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
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-3">
          {/* VOLTAR + BADGE */}
          <div className="flex items-center gap-3">
            <BackButton />
            <span className="w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {t("badge")}
            </span>
          </div>

          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              {t("title")}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* SIDEBAR */}
          <Card className="h-fit rounded-3xl border-border/50 shadow-sm">
            <CardContent className="p-4">
              <div className="mb-6 flex items-center gap-3 rounded-2xl border bg-muted/40 p-3">
                <Avatar className="h-12 w-12">
                  {user?.avatar && (
                    <AvatarImage
                      src={user.avatar}
                      alt={user.name || "Avatar"}
                      className="object-cover"
                    />
                  )}
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="font-medium truncate">{user?.name || t("personalInfo.userDefault")}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {user?.email || ""}
                  </p>
                </div>
              </div>

              <nav className="space-y-1">
                <SidebarItem icon={User} label={t("sidebar.profile")} active />
                <SidebarItem icon={Bell} label={t("sidebar.notifications")} />
                <SidebarItem icon={ShieldCheck} label={t("sidebar.privacy")} />
                <SidebarItem icon={Lock} label={t("sidebar.security")} />
                <SidebarItem icon={Palette} label={t("sidebar.appearance")} />
                <SidebarItem icon={Smartphone} label={t("sidebar.devices")} />
              </nav>
            </CardContent>
          </Card>

          {/* CONTENT */}
          <div className="space-y-6">
            {/* PROFILE */}
            <Card className="rounded-3xl border-border/50 shadow-sm">
              <CardContent className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {t("personalInfo.title")}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {t("personalInfo.description")}
                    </p>
                  </div>

                  <User className="h-5 w-5 text-muted-foreground" />
                </div>

                <Separator />

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{t("personalInfo.name")}</Label>
                    <Input
                      key={`name-${user?.name}`}
                      defaultValue={user?.name || ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t("personalInfo.email")}</Label>
                    <Input
                      key={`email-${user?.email}`}
                      defaultValue={user?.email || ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t("personalInfo.language")}</Label>
                    <Input
                      readOnly
                      value={locale.startsWith("pt") ? "Português (Brasil)" : "English (US)"}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t("personalInfo.location")}</Label>
                    <Input defaultValue={locale.startsWith("pt") ? "Brasil" : "United States"} />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="rounded-xl">{tCommon("saveChanges")}</Button>
                </div>
              </CardContent>
            </Card>

            {/* LANGUAGE */}
            <Card className="rounded-3xl border-border/50 shadow-sm">
              <CardContent className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{t("language.title")}</h2>
                    <p className="text-sm text-muted-foreground">
                      {t("language.description")}
                    </p>
                  </div>
                  <Globe className="h-5 w-5 text-muted-foreground" />
                </div>

                <Separator />
                <LanguageSwitcher />
              </CardContent>
            </Card>

            {/* SECURITY */}
            <Card className="rounded-3xl border-border/50 shadow-sm">
              <CardContent className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{t("security.title")}</h2>
                    <p className="text-sm text-muted-foreground">
                      {t("security.description")}
                    </p>
                  </div>

                  <Lock className="h-5 w-5 text-muted-foreground" />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>{t("security.password")}</Label>

                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      defaultValue="123456789"
                      className="pr-12"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <SettingSwitch
                    icon={ShieldCheck}
                    title={t("security.twoFactor")}
                    description={t("security.twoFactorDesc")}
                  />

                  <SettingSwitch
                    icon={Smartphone}
                    title={t("security.biometrics")}
                    description={t("security.biometricsDesc")}
                  />
                </div>
              </CardContent>
            </Card>

            {/* APPEARANCE */}
            <ThemeSettingsChanger />

            {/* NOTIFICATIONS */}
            <Card className="rounded-3xl border-border/50 shadow-sm">
              <CardContent className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{t("notifications.title")}</h2>
                    <p className="text-sm text-muted-foreground">
                      {t("notifications.description")}
                    </p>
                  </div>

                  <Bell className="h-5 w-5 text-muted-foreground" />
                </div>

                <Separator />

                <div className="space-y-4">
                  <SettingSwitch
                    icon={Mail}
                    title={t("notifications.email")}
                    description={t("notifications.emailDesc")}
                  />

                  <SettingSwitch
                    icon={Bell}
                    title={t("notifications.push")}
                    description={t("notifications.pushDesc")}
                  />

                  <SettingSwitch
                    icon={Globe}
                    title={t("notifications.platform")}
                    description={t("notifications.platformDesc")}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ================= COMPONENTS ================= */

function SidebarItem({
  icon: Icon,
  label,
  active = false,
}: {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`group flex w-full items-center justify-between rounded-2xl px-3 py-3 text-sm transition-all
      ${active ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>

      <ChevronRight className="h-4 w-4 opacity-60" />
    </button>
  );
}

function SettingSwitch({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border bg-muted/30 p-4">
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-primary/10 p-2 text-primary">
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <Switch defaultChecked />
    </div>
  );
}
