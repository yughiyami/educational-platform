"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Users, Wifi, BookOpen, Activity, Eye, Edit } from "lucide-react"

const activityData = [
  { day: "Lun", estudiantes: 65 },
  { day: "Mar", estudiantes: 72 },
  { day: "Mié", estudiantes: 68 },
  { day: "Jue", estudiantes: 85 },
  { day: "Vie", estudiantes: 87 },
  { day: "Sáb", estudiantes: 45 },
  { day: "Dom", estudiantes: 32 },
]

const topContent = [
  { id: 1, name: "Fracciones y Números Decimales", category: "Matemática", accesos: 156, updated: "Hace 2 días" },
  { id: 2, name: "Fotosíntesis en Plantas", category: "Biología", accesos: 142, updated: "Hace 1 día" },
  { id: 3, name: "Historia del Perú Colonial", category: "Historia", accesos: 128, updated: "Hace 3 días" },
  { id: 4, name: "Introducción a Python", category: "Programación", accesos: 115, updated: "Hace 5 días" },
  { id: 5, name: "Geografía de América Latina", category: "Geografía", accesos: 98, updated: "Hace 1 semana" },
]

const recentActivity = [
  { id: 1, user: "Juan Pérez", action: "completó Matemática Básica", time: "Hace 5 min", avatar: "👨" },
  { id: 2, user: "María García", action: "accedió a Biología Avanzada", time: "Hace 12 min", avatar: "👩" },
  { id: 3, user: "Carlos López", action: "descargó Historia del Perú", time: "Hace 25 min", avatar: "👨" },
  { id: 4, user: "Ana Martínez", action: "compartió Programación Básica", time: "Hace 1 hora", avatar: "👩" },
  { id: 5, user: "Luis Rodríguez", action: "completó Geografía", time: "Hace 2 horas", avatar: "👨" },
]

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Título */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard Principal</h1>
              <p className="text-muted-foreground mt-1">Bienvenido a Auroboros Learn</p>
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Estudiantes Activos Hoy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">87</div>
                  <p className="text-xs text-accent mt-1">↑12% vs ayer</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Wifi className="w-4 h-4" />
                    Dispositivos Conectados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">42/45</div>
                  <Badge className="mt-2 bg-green-900 text-green-100">Conectado</Badge>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Contenidos Accedidos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">156</div>
                  <p className="text-xs text-muted-foreground mt-1">Últimas 24h</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Salud de Red
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">94%</div>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: "94%" }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gráfica de Actividad */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Actividad de Estudiantes - Últimos 7 Días</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0 0)" />
                    <XAxis dataKey="day" stroke="oklch(0.65 0 0)" />
                    <YAxis stroke="oklch(0.65 0 0)" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "oklch(0.12 0 0)", border: "1px solid oklch(0.2 0 0)" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="estudiantes"
                      stroke="oklch(0.45 0.22 254)"
                      strokeWidth={2}
                      dot={{ fill: "oklch(0.45 0.22 254)" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Contenidos Más Accedidos */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Contenidos Más Accedidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topContent.map((content) => (
                    <div
                      key={content.id}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{content.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {content.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{content.accesos} accesos</span>
                          <span className="text-xs text-muted-foreground">{content.updated}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actividad Reciente */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Actividad Reciente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-3 pb-3 border-b border-border last:border-0"
                    >
                      <div className="text-2xl">{activity.avatar}</div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
