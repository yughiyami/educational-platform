"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Bell, Lock, Users, Database, LogOut } from "lucide-react"

export default function ConfiguracionPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6 max-w-2xl">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">Configuración</h1>
              <p className="text-muted-foreground mt-1">Personaliza tu experiencia en Auroboros Learn</p>
            </div>

            {/* Perfil */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Información de Perfil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Nombre Completo</label>
                  <Input defaultValue="Dr. Juan Pérez" className="mt-2 bg-muted border-border text-foreground" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Correo Electrónico</label>
                  <Input
                    defaultValue="juan.perez@auroboros.edu"
                    className="mt-2 bg-muted border-border text-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Institución</label>
                  <Input defaultValue="Colegio Auroboros" className="mt-2 bg-muted border-border text-foreground" />
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Guardar Cambios</Button>
              </CardContent>
            </Card>

            {/* Notificaciones */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notificaciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Notificaciones por Email</p>
                    <p className="text-sm text-muted-foreground">Recibe actualizaciones importantes</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Notificaciones de Actividad</p>
                    <p className="text-sm text-muted-foreground">Alertas de estudiantes y comunidad</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Resumen Semanal</p>
                    <p className="text-sm text-muted-foreground">Recibe un resumen cada lunes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Seguridad */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Seguridad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Contraseña Actual</label>
                  <Input type="password" className="mt-2 bg-muted border-border text-foreground" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Nueva Contraseña</label>
                  <Input type="password" className="mt-2 bg-muted border-border text-foreground" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Confirmar Contraseña</label>
                  <Input type="password" className="mt-2 bg-muted border-border text-foreground" />
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Actualizar Contraseña
                </Button>
              </CardContent>
            </Card>

            {/* Datos */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Datos y Privacidad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-border text-foreground hover:bg-muted bg-transparent"
                >
                  Descargar mis Datos
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-border text-foreground hover:bg-muted bg-transparent"
                >
                  Exportar Contenido
                </Button>
              </CardContent>
            </Card>

            {/* Sesión */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <LogOut className="w-5 h-5" />
                  Sesión
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Última sesión: Hoy a las 14:32</p>
                <Button variant="destructive" className="w-full">
                  Cerrar Sesión
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
