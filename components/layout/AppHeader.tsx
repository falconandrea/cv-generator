"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  disabled?: boolean;
  badge?: string;
}

interface AppHeaderProps {
  showStartBuilding?: boolean;
  navLinks?: NavLink[];
}

export function AppHeader({ showStartBuilding = false, navLinks }: AppHeaderProps) {
  const pathname = usePathname();

  return (
    <header className="relative z-10 border-b border-[#00f0ff]/20 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Terminal className="w-6 h-6 text-[#00f0ff]" />
          <span className="text-xl font-bold tracking-tight">
            CRAFT<span className="text-[#00f0ff]">_CV</span>
          </span>
        </Link>

        {/* Navigation Links */}
        {navLinks && navLinks.length > 0 && (
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              if (link.disabled) {
                return (
                  <span
                    key={link.label}
                    className="text-sm text-zinc-400 opacity-50 cursor-not-allowed pointer-events-none flex items-center gap-1.5"
                  >
                    {link.label}
                    {link.badge && (
                      <span className="text-[10px] bg-[#00f0ff]/20 text-[#00f0ff] px-1.5 py-0.5 font-mono uppercase rounded">
                        {link.badge}
                      </span>
                    )}
                  </span>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm transition-colors ${
                    isActive
                      ? "text-[#00f0ff]"
                      : "text-zinc-400 hover:text-[#00f0ff]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}

        {/* CTA Button */}
        {showStartBuilding ? (
          <Link href="/dashboard">
            <Button className="bg-[#00f0ff] text-black hover:bg-[#00f0ff]/80 font-semibold">
              Start Building
            </Button>
          </Link>
        ) : (
          // Empty div to maintain flex spacing when no CTA
          <div />
        )}
      </div>
    </header>
  );
}
