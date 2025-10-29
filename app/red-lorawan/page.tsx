"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { AlertCircle, Zap, Wifi, WifiOff, AlertTriangle, CheckCircle } from "lucide-react"

const deviceData = [
  {
    id: 1,
    name: "Gateway Principal",
    type: "gateway",
    status: "Conectado",
    battery: 95,
    rssi: -65,
    lastSeen: "Hace 2 min",
  },
  {
    id: 2,
    name: "ESP32-Aula-201",
    type: "endpoint",
    status: "Conectado",
    battery: 78,
    rssi: -72,
    lastSeen: "Hace 1 min",
  },
  { id: 3, name: "Sensor-Temp-101", type: "endpoint", status: "Débil", battery: 45, rssi: -85, lastSeen: "Hace 5 min" },
  {
    id: 4,
    name: "Gateway Secundario",
    type: "gateway",
    status: "Conectado",
    battery: 88,
    rssi: -68,
    lastSeen: "Hace 3 min",
  },
  {
    id: 5,
    name: "Sensor-Humedad-102",
    type: "endpoint",
    status: "Desconectado",
    battery: 12,
    rssi: -120,
    lastSeen: "Hace 2 horas",
  },
]

const packetsData = [
  { time: "00:00", enviados: 120, recibidos: 118 },
  { time: "04:00", enviados: 145, recibidos: 142 },
  { time: "08:00", enviados: 200, recibidos: 198 },
  { time: "12:00", enviados: 280, recibidos: 275 },
  { time: "16:00", enviados: 250, recibidos: 248 },
  { time: "20:00", enviados: 180, recibidos: 178 },
  { time: "24:00", enviados: 95, recibidos: 93 },
]

const deviceStats = [
  { name: "Bueno", value: 35, color: "#10B981" },
  { name: "Débil", value: 5, color: "#F59E0B" },
  { name: "Crítico", value: 5, color: "#DC2626" },
]

export default function RedLoRaWANPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedDevice, setSelectedDevice] = useState<number | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Conectado":
        return "bg-green-900 text-green-100"
      case "Débil":
        return "bg-yellow-900 text-yellow-100"
      case "Desconectado":
        return "bg-red-900 text-red-100"
      default:
        return "bg-gray-900 text-gray-100"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Conectado":
        return <CheckCircle className="w-4 h-4" />
      case "Débil":
        return <AlertTriangle className="w-4 h-4" />
      case "Desconectado":
        return <WifiOff className="w-4 h-4" />
      default:
        return <Wifi className="w-4 h-4" />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">Monitoreo de Red LoRaWAN</h1>
              <p className="text-muted-foreground mt-1">Estado y estadísticas de dispositivos conectados</p>
            </div>

            {/* Grid Principal */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Panel Izquierdo - Dispositivos */}
              <Card className="lg:col-span-1 bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-foreground">Dispositivos (42/45 activos)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 max-h-96 overflow-y-auto">
                  {deviceData.map((device) => (
                    <div
                      key={device.id}
                      onClick={() => setSelectedDevice(device.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition ${
                        selectedDevice === device.id
                          ? "bg-primary/10 border-primary"
                          : "bg-muted/30 border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{device.name}</p>
                          <Badge className={`mt-1 text-xs ${getStatusColor(device.status)}`}>
                            {getStatusIcon(device.status)}
                            <span className="ml-1">{device.status}</span>
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center justify-between">
                          <span>Batería:</span>
                          <span>{device.battery}%</span>
                        </div>
                        <Progress value={device.battery} className="h-1" />
                        <div className="flex items-center justify-between">
                          <span>RSSI:</span>
                          <span>{device.rssi} dBm</span>
                        </div>
                        <p className="text-xs">{device.lastSeen}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Área Central - Mapa Visual */}
              <Card className="lg:col-span-2 bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-foreground">Topología de Red</CardTitle>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Gateways */}
                    <div className="absolute top-8 left-8 w-12 h-12 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center">
                      <Wifi className="w-6 h-6 text-primary" />
                    </div>
                    <div className="absolute top-8 right-8 w-12 h-12 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center">
                      <Wifi className="w-6 h-6 text-primary" />
                    </div>

                    {/* Endpoints */}
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          i < 6
                            ? "bg-green-900/30 border border-green-500 text-green-400"
                            : "bg-yellow-900/30 border border-yellow-500 text-yellow-400"
                        }`}
                        style={{
                          left: `${20 + (i % 4) * 20}%`,
                          top: `${40 + Math.floor(i / 4) * 30}%`,
                        }}
                      >
                        {i + 1}
                      </div>
                    ))}

                    {/* Leyenda */}
                    <div className="absolute bottom-4 left-4 space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-muted-foreground">Bueno (&gt;-70dBm)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-muted-foreground">Medio (-70 a -90)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-muted-foreground">Crítico (&lt;-90dBm)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Panel Derecho - Estadísticas */}
              <Card className="lg:col-span-1 bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-foreground">Estadísticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Tasa de Éxito</p>
                    <p className="text-2xl font-bold text-foreground">94.5%</p>
                    <Badge className="mt-2 bg-green-900 text-green-100">Excelente</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Dispositivos Activos</p>
                    <ResponsiveContainer width="100%" height={100}>
                      <PieChart>
                        <Pie data={deviceStats} dataKey="value" cx="50%" cy="50%" innerRadius={30} outerRadius={50}>
                          {deviceStats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-1 text-xs mt-2">
                      {deviceStats.map((stat) => (
                        <div key={stat.name} className="flex justify-between">
                          <span className="text-muted-foreground">{stat.name}</span>
                          <span className="text-foreground font-medium">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gráficas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-foreground">
                    Paquetes Enviados/Recibidos (24h)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={packetsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0 0)" />
                      <XAxis dataKey="time" stroke="oklch(0.65 0 0)" />
                      <YAxis stroke="oklch(0.65 0 0)" />
                      <Tooltip
                        contentStyle={{ backgroundColor: "oklch(0.12 0 0)", border: "1px solid oklch(0.2 0 0)" }}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="enviados"
                        stackId="1"
                        stroke="oklch(0.45 0.22 254)"
                        fill="oklch(0.45 0.22 254)"
                        fillOpacity={0.3}
                      />
                      <Area
                        type="monotone"
                        dataKey="recibidos"
                        stackId="1"
                        stroke="oklch(0.55 0.25 142)"
                        fill="oklch(0.55 0.25 142)"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-foreground">Alertas del Sistema</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-yellow-900/20 border border-yellow-900/50 rounded-lg flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">3 dispositivos con batería baja</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Sensor-Temp-101, Sensor-Humedad-102, ESP32-Lab-301
                      </p>
                      <Button size="sm" variant="ghost" className="mt-2 h-7 text-xs">
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 bg-red-900/20 border border-red-900/50 rounded-lg flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">1 dispositivo desconectado hace 2h</p>
                      <p className="text-xs text-muted-foreground mt-1">Sensor-Humedad-102</p>
                      <Button size="sm" variant="ghost" className="mt-2 h-7 text-xs">
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Botón Flotante */}
            <div className="fixed bottom-6 right-6">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full w-14 h-14 shadow-lg">
                <Zap className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
