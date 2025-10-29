"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, TrendingUp, Award, Clock, Search, Eye, Edit } from "lucide-react"

const students = [
  { id: 1, name: "Pedro Quispe", grade: "5° Primaria", progress: 85, status: "Activo", lastAccess: "Hoy" },
  { id: 2, name: "Rosa Mamani", grade: "5° Primaria", progress: 92, status: "Activo", lastAccess: "Hoy" },
  { id: 3, name: "Juan Condori", grade: "4° Secundaria", progress: 78, status: "Activo", lastAccess: "Ayer" },
  { id: 4, name: "María Flores", grade: "3° Secundaria", progress: 88, status: "Activo", lastAccess: "Hace 2 días" },
  {
    id: 5,
    name: "Carlos Huanca",
    grade: "5° Secundaria",
    progress: 65,
    status: "Inactivo",
    lastAccess: "Hace 1 semana",
  },
  { id: 6, name: "Ana Soto", grade: "6° Primaria", progress: 95, status: "Activo", lastAccess: "Hoy" },
]

export default function EstudiantesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [filterGrade, setFilterGrade] = useState("Todos")

  const filteredStudents = filterGrade === "Todos" ? students : students.filter((s) => s.grade === filterGrade)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">Gestión de Estudiantes</h1>
              <p className="text-muted-foreground mt-1">Monitorea el progreso y desempeño de tus estudiantes</p>
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Total de Estudiantes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">156</div>
                  <p className="text-xs text-accent mt-1">↑8% este mes</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Progreso Promedio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">84%</div>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: "84%" }}></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Estudiantes Destacados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">23</div>
                  <p className="text-xs text-muted-foreground mt-1">Con 90% o más</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Activos Hoy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">142</div>
                  <Badge className="mt-2 bg-green-900 text-green-100">91% conectados</Badge>
                </CardContent>
              </Card>
            </div>

            {/* Filtros y Búsqueda */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Buscar estudiante..." className="pl-10 bg-muted border-border text-foreground" />
              </div>
              <Select value={filterGrade} onValueChange={setFilterGrade}>
                <SelectTrigger className="w-full md:w-40 bg-muted border-border text-foreground">
                  <SelectValue placeholder="Grado" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="Todos">Todos</SelectItem>
                  <SelectItem value="5° Primaria">5° Primaria</SelectItem>
                  <SelectItem value="6° Primaria">6° Primaria</SelectItem>
                  <SelectItem value="3° Secundaria">3° Secundaria</SelectItem>
                  <SelectItem value="4° Secundaria">4° Secundaria</SelectItem>
                  <SelectItem value="5° Secundaria">5° Secundaria</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tabla de Estudiantes */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Estudiantes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border hover:border-primary/50 transition"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{student.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {student.grade}
                          </Badge>
                          <Badge
                            className={`text-xs ${
                              student.status === "Activo" ? "bg-green-900 text-green-100" : "bg-gray-900 text-gray-100"
                            }`}
                          >
                            {student.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{student.lastAccess}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold text-foreground">{student.progress}%</p>
                          <div className="w-24 bg-muted rounded-full h-2 mt-1">
                            <div className="bg-accent h-2 rounded-full" style={{ width: `${student.progress}%` }}></div>
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
