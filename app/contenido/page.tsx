"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Upload, Search, Download, Share2, Edit, Eye } from "lucide-react"

const mockContent = [
  {
    id: 1,
    title: "Fracciones y Números Decimales",
    desc: "Aprende sobre fracciones, decimales y operaciones básicas",
    grade: "5° Primaria",
    subject: "Matemática",
    type: "Video",
    lang: "Español",
    students: 89,
    offline: true,
  },
  {
    id: 2,
    title: "Fotosíntesis en Plantas",
    desc: "Proceso de fotosíntesis y su importancia en la naturaleza",
    grade: "6° Primaria",
    subject: "Biología",
    type: "PDF",
    lang: "Español",
    students: 76,
    offline: true,
  },
  {
    id: 3,
    title: "Historia del Perú Colonial",
    desc: "Período colonial del Perú y sus características principales",
    grade: "4° Secundaria",
    subject: "Historia",
    type: "Interactivo",
    lang: "Español",
    students: 64,
    offline: false,
  },
  {
    id: 4,
    title: "Introducción a Python",
    desc: "Conceptos básicos de programación en Python",
    grade: "5° Secundaria",
    subject: "Programación",
    type: "Video",
    lang: "Español",
    students: 52,
    offline: true,
  },
  {
    id: 5,
    title: "Geografía de América Latina",
    desc: "Geografía física y política de América Latina",
    grade: "3° Secundaria",
    subject: "Geografía",
    type: "PDF",
    lang: "Español",
    students: 48,
    offline: false,
  },
  {
    id: 6,
    title: "Ecuaciones Lineales",
    desc: "Resolución de ecuaciones lineales paso a paso",
    grade: "3° Secundaria",
    subject: "Matemática",
    type: "Interactivo",
    lang: "Español",
    students: 71,
    offline: true,
  },
  {
    id: 7,
    title: "Literatura Quechua",
    desc: "Obras literarias en lengua quechua",
    grade: "4° Secundaria",
    subject: "Literatura",
    type: "PDF",
    lang: "Quechua",
    students: 34,
    offline: true,
  },
  {
    id: 8,
    title: "Biología Celular",
    desc: "Estructura y función de las células",
    grade: "5° Primaria",
    subject: "Biología",
    type: "Video",
    lang: "Español",
    students: 82,
    offline: true,
  },
  {
    id: 9,
    title: "Trigonometría Básica",
    desc: "Funciones trigonométricas y aplicaciones",
    grade: "5° Secundaria",
    subject: "Matemática",
    type: "Interactivo",
    lang: "Español",
    students: 45,
    offline: false,
  },
  {
    id: 10,
    title: "Economía Andina",
    desc: "Sistemas económicos de los Andes",
    grade: "4° Secundaria",
    subject: "Economía",
    type: "PDF",
    lang: "Español",
    students: 38,
    offline: true,
  },
  {
    id: 11,
    title: "Física Cuántica",
    desc: "Introducción a la mecánica cuántica",
    grade: "5° Secundaria",
    subject: "Física",
    type: "Video",
    lang: "Español",
    students: 29,
    offline: false,
  },
  {
    id: 12,
    title: "Arte Precolombino",
    desc: "Manifestaciones artísticas precolombinas",
    grade: "3° Secundaria",
    subject: "Arte",
    type: "Interactivo",
    lang: "Español",
    students: 56,
    offline: true,
  },
]

export default function ContenidoPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [filters, setFilters] = useState({ grade: "Todos", subject: "Todos", type: "Todos", lang: "Todos" })

  const filteredContent = mockContent.filter((item) => {
    return (
      (filters.grade === "Todos" || item.grade === filters.grade) &&
      (filters.subject === "Todos" || item.subject === filters.subject) &&
      (filters.type === "Todos" || item.type === filters.type) &&
      (filters.lang === "Todos" || item.lang === filters.lang)
    )
  })

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
                <h1 className="text-3xl font-bold text-foreground">Biblioteca Educativa</h1>
                <p className="text-muted-foreground mt-1">Gestiona y organiza tu contenido educativo</p>
              </div>
              <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Upload className="w-4 h-4 mr-2" />
                    Subir Contenido
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="text-foreground">Subir Nuevo Contenido</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      Carga un nuevo recurso educativo a la biblioteca
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Arrastra archivos aquí o haz clic para seleccionar
                      </p>
                    </div>
                    <Input placeholder="Título del contenido" className="bg-muted border-border text-foreground" />
                    <Input placeholder="Descripción" className="bg-muted border-border text-foreground" />
                    <Select>
                      <SelectTrigger className="bg-muted border-border text-foreground">
                        <SelectValue placeholder="Selecciona grado" />
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
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setUploadOpen(false)}
                        className="border-border text-foreground hover:bg-muted"
                      >
                        Cancelar
                      </Button>
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Subir</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Filtros */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Buscar contenido..." className="pl-10 bg-muted border-border text-foreground" />
              </div>
              <Select value={filters.grade} onValueChange={(v) => setFilters({ ...filters, grade: v })}>
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
              <Select value={filters.subject} onValueChange={(v) => setFilters({ ...filters, subject: v })}>
                <SelectTrigger className="w-full md:w-40 bg-muted border-border text-foreground">
                  <SelectValue placeholder="Materia" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="Todos">Todos</SelectItem>
                  <SelectItem value="Matemática">Matemática</SelectItem>
                  <SelectItem value="Biología">Biología</SelectItem>
                  <SelectItem value="Historia">Historia</SelectItem>
                  <SelectItem value="Programación">Programación</SelectItem>
                  <SelectItem value="Geografía">Geografía</SelectItem>
                  <SelectItem value="Literatura">Literatura</SelectItem>
                  <SelectItem value="Economía">Economía</SelectItem>
                  <SelectItem value="Física">Física</SelectItem>
                  <SelectItem value="Arte">Arte</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filters.type} onValueChange={(v) => setFilters({ ...filters, type: v })}>
                <SelectTrigger className="w-full md:w-40 bg-muted border-border text-foreground">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="Todos">Todos</SelectItem>
                  <SelectItem value="Video">Video</SelectItem>
                  <SelectItem value="PDF">PDF</SelectItem>
                  <SelectItem value="Interactivo">Interactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Grid de Contenido */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredContent.map((content) => (
                <Card
                  key={content.id}
                  className="bg-card border-border hover:border-primary/50 transition overflow-hidden"
                >
                  <div className="h-32 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="text-4xl">📚</div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground line-clamp-2">{content.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{content.desc}</p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline" className="text-xs">
                        {content.grade}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {content.subject}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {content.type}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                      <span>{content.students} estudiantes</span>
                      {content.offline && <span>✓ Offline</span>}
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="ghost" className="flex-1 h-8">
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </Button>
                      <Button size="sm" variant="ghost" className="flex-1 h-8">
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
