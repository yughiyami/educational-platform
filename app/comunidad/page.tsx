"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, MessageSquare, Heart, Share2, Search } from "lucide-react"

const communityMembers = [
  { id: 1, name: "Juan Pérez", role: "Docente", avatar: "👨", posts: 24, followers: 156 },
  { id: 2, name: "María García", role: "Docente", avatar: "👩", posts: 18, followers: 142 },
  { id: 3, name: "Carlos López", role: "Estudiante", avatar: "👨", posts: 12, followers: 89 },
  { id: 4, name: "Ana Martínez", role: "Docente", avatar: "👩", posts: 31, followers: 203 },
  { id: 5, name: "Luis Rodríguez", role: "Administrador", avatar: "👨", posts: 45, followers: 312 },
  { id: 6, name: "Sofia Quispe", role: "Docente", avatar: "👩", posts: 22, followers: 178 },
]

const communityPosts = [
  {
    id: 1,
    author: "Juan Pérez",
    avatar: "👨",
    content: "Compartiendo nuevas estrategias de enseñanza en matemática",
    likes: 45,
    comments: 12,
    shares: 8,
    time: "Hace 2 horas",
  },
  {
    id: 2,
    author: "María García",
    avatar: "👩",
    content: "¿Alguien tiene recursos sobre educación bilingüe?",
    likes: 28,
    comments: 15,
    shares: 5,
    time: "Hace 4 horas",
  },
  {
    id: 3,
    author: "Ana Martínez",
    avatar: "👩",
    content: "Excelentes resultados con la nueva plataforma LoRaWAN",
    likes: 67,
    comments: 23,
    shares: 14,
    time: "Hace 6 horas",
  },
]

export default function ComunidadPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">Mi Comunidad</h1>
              <p className="text-muted-foreground mt-1">Conecta con otros docentes y comparte experiencias</p>
            </div>

            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar miembros o publicaciones..."
                className="pl-10 bg-muted border-border text-foreground"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Miembros */}
              <Card className="lg:col-span-1 bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Miembros Activos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {communityMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="text-2xl">{member.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{member.name}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {member.role}
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8">
                        Seguir
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Feed */}
              <div className="lg:col-span-2 space-y-4">
                {communityPosts.map((post) => (
                  <Card key={post.id} className="bg-card border-border">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="text-2xl">{post.avatar}</div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{post.author}</p>
                          <p className="text-xs text-muted-foreground">{post.time}</p>
                        </div>
                      </div>
                      <p className="text-sm text-foreground mb-4">{post.content}</p>
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <Button size="sm" variant="ghost" className="h-8 gap-2">
                          <Heart className="w-4 h-4" />
                          <span className="text-xs">{post.likes}</span>
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 gap-2">
                          <MessageSquare className="w-4 h-4" />
                          <span className="text-xs">{post.comments}</span>
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 gap-2">
                          <Share2 className="w-4 h-4" />
                          <span className="text-xs">{post.shares}</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
