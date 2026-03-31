"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#0a0a12] group-[.toaster]:text-zinc-300 group-[.toaster]:border-zinc-800/50 group-[.toaster]:shadow-[0_0_15px_rgba(0,0,0,0.5)] font-mono",
          description: "group-[.toast]:text-zinc-400 font-sans text-xs",
          actionButton:
            "group-[.toast]:bg-[#00f0ff]/10 group-[.toast]:text-[#00f0ff] group-[.toast]:border group-[.toast]:border-[#00f0ff]/30",
          cancelButton:
            "group-[.toast]:bg-zinc-800 group-[.toast]:text-zinc-400 group-[.toast]:border-zinc-700",
          error:
            "group-[.toaster]:bg-[#1a0505] group-[.toaster]:text-[#ff00aa] group-[.toaster]:border-[#ff00aa]/30",
          success:
            "group-[.toaster]:bg-[#0a0a12] group-[.toaster]:text-[#00f0ff] group-[.toaster]:border-[#00f0ff]/30",
          warning:
            "group-[.toaster]:bg-[#1a1505] group-[.toaster]:text-[#b8ff00] group-[.toaster]:border-[#b8ff00]/30",
          info:
            "group-[.toaster]:bg-[#0a0a12] group-[.toaster]:text-[#00f0ff] group-[.toaster]:border-[#00f0ff]/30",
        },
      }}
      icons={{
        success: <CircleCheckIcon className="size-4 text-[#00f0ff]" />,
        info: <InfoIcon className="size-4 text-[#00f0ff]" />,
        warning: <TriangleAlertIcon className="size-4 text-[#b8ff00]" />,
        error: <OctagonXIcon className="size-4 text-[#ff00aa]" />,
        loading: <Loader2Icon className="size-4 animate-spin text-[#00f0ff]" />,
      }}
      {...props}
    />
  )
}

export { Toaster }
