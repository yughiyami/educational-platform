"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Calendar } from "lucide-react"

const activityData = [
  { date: "Lun", usuarios: 120, sesiones: 145 },
  { date: "Mar", usuarios: 135, sesiones: 162 },
  { date: "Mié", usuarios: 128, sesiones: 155 },
  { date: "Jue", usuarios: 150, sesiones: 180 },
  { date: "Vie", usuarios: 165, sesiones: 198 },
  { date: "Sáb", usuarios: 95, sesiones: 110 },
  { date: "Dom", usuarios: 80, sesiones: 92 },
]

const contentStats = [
  { name: "Matemática", value: 35, color: "#1E40AF" },
  { name: "Biología", value: 25, color: "#059669" },
  { name: "Historia", value: 20, color: "#DC2626" },
  { name: "Otros", value: 20, color: "#F59E0B" },
]

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
                <p className="text-muted-foreground mt-1">Análisis detallado de uso y desempeño</p>
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                <Calendar className="w-4 h-4" />
                Últimos 7 días
              </Button>
            </div>

            {/* Métricas Principales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Usuarios Únicos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">1,245</div>
                  <p className="text-xs text-accent mt-1">↑12% vs semana anterior</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Sesiones Totales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">1,439</div>
                  <p className="text-xs text-accent mt-1">↑8% vs semana anterior</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Tiempo Promedio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">24 min</div>
                  <p className="text-xs text-accent mt-1">↑5% vs semana anterior</p>
                </CardContent>
              </Card>
            </div>

            {/* Gráficas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Actividad de Usuarios</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0 0)" />
                      <XAxis dataKey="date" stroke="oklch(0.65 0 0)" />
                      <YAxis stroke="oklch(0.65 0 0)" />
                      <Tooltip
                        contentStyle={{ backgroundColor: "oklch(0.12 0 0)", border: "1px solid oklch(0.2 0 0)" }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="usuarios"
                        stroke="oklch(0.45 0.22 254)"
                        strokeWidth={2}
                        dot={{ fill: "oklch(0.45 0.22 254)" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="sesiones"
                        stroke="oklch(0.55 0.25 142)"
                        strokeWidth={2}
                        dot={{ fill: "oklch(0.55 0.25 142)" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Contenido Más Accedido</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={contentStats} dataKey="value" cx="50%" cy="50%" outerRadius={100}>
                        {contentStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Tabla de Contenidos */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Contenidos Más Populares</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: "Fracciones y Números Decimales", accesos: 456, tiempo: "18 min" },
                    { title: "Fotosíntesis en Plantas", accesos: 389, tiempo: "22 min" },
                    { title: "Historia del Perú Colonial", accesos: 342, tiempo: "25 min" },
                    { title: "Introducción a Python", accesos: 298, tiempo: "31 min" },
                    { title: "Geografía de América Latina", accesos: 267, tiempo: "19 min" },
                  ].map((content, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{content.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">Tiempo promedio: {content.tiempo}</p>
                      </div>
                      <Badge variant="outline">{content.accesos} accesos</Badge>
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
