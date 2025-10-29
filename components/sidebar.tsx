"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, BookOpen, Wifi, BarChart3, Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  open: boolean
  onToggle: () => void
}

export function Sidebar({ open, onToggle }: SidebarProps) {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Inicio", icon: LayoutDashboard },
    { href: "/comunidad", label: "Mi Comunidad", icon: Users },
    { href: "/contenido", label: "Contenido", icon: BookOpen },
    { href: "/red-lorawan", label: "Red LoRaWAN", icon: Wifi },
    { href: "/estudiantes", label: "Estudiantes", icon: Users },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/configuracion", label: "Configuración", icon: Settings },
  ]

  return (
    <>
      {/* Sidebar Desktop */}
      <aside
        className={`hidden md:flex flex-col w-64 bg-sidebar border-r border-sidebar-border transition-all duration-300 ${!open ? "w-20" : ""}`}
      >
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AL</span>
            </div>
            {open && <span className="font-bold text-sidebar-foreground">Auroboros</span>}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 ${isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/20"}`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {open && <span>{item.label}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/20"
          >
            👤 Perfil
          </Button>
        </div>
      </aside>

      {/* Sidebar Mobile */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onToggle}></div>
          <aside className="absolute left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border flex flex-col z-50">
            <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AL</span>
                </div>
                <span className="font-bold text-sidebar-foreground">Auroboros</span>
              </div>
              <Button size="sm" variant="ghost" onClick={onToggle}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={onToggle}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start gap-3 ${isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/20"}`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </aside>
        </div>
      )}
    </>
  )
}
