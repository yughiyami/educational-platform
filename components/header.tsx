"use client"

import { Button } from "@/components/ui/button"
import { Menu, Bell, Search } from "lucide-react"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Button size="sm" variant="ghost" onClick={onMenuClick} className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
        <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg px-3 py-2 flex-1 max-w-xs">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-transparent outline-none text-sm text-foreground placeholder-muted-foreground w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button size="sm" variant="ghost" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
        </Button>
        <Button size="sm" variant="ghost" className="rounded-full">
          👤
        </Button>
      </div>
    </header>
  )
}
