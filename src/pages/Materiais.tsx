import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Warehouse, TrendingDown, AlertTriangle, Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { StatsCard } from "@/components/dashboard/StatsCard";

const stats = [
  {
    title: "Itens em Estoque",
    value: "1.247",
    icon: Package,
    variant: "default" as const
  },
  {
    title: "Almoxarifados",
    value: "8",
    icon: Warehouse,
    variant: "info" as const
  },
  {
    title: "Itens em Baixa",
    value: "23",
    icon: TrendingDown,
    variant: "warning" as const
  },
  {
    title: "Estoque Crítico",
    value: "12",
    icon: AlertTriangle,
    variant: "destructive" as const
  }
];

const materiais = [
  {
    id: "M-001",
    codigo: "CIM-001",
    descricao: "Cimento Portland CP-II-E-32",
    categoria: "Cimento",
    unidade: "SC 50kg",
    obra: "Centro Comercial Plaza Norte",
    almoxarifado: "Almox Central - Obra 1",
    saldo: 450,
    reservado: 120,
    disponivel: 330,
    custoMedio: 28.50,
    status: "Normal"
  },
  {
    id: "M-002",
    codigo: "ARG-002", 
    descricao: "Areia Média Lavada",
    categoria: "Agregados",
    unidade: "M³",
    obra: "Residencial Jardim das Flores",
    almoxarifado: "Almox Campo - Obra 2",
    saldo: 15.5,
    reservado: 8.0,
    disponivel: 7.5,
    custoMedio: 65.00,
    status: "Baixo"
  },
  {
    id: "M-003",
    codigo: "FER-003",
    descricao: "Vergalhão CA-50 Ø 12mm",
    categoria: "Ferragem",
    unidade: "KG",
    obra: "Centro Comercial Plaza Norte",
    almoxarifado: "Almox Central - Obra 1",
    saldo: 2850.5,
    reservado: 1200.0,
    disponivel: 1650.5,
    custoMedio: 7.85,
    status: "Normal"
  },
  {
    id: "M-004",
    codigo: "TIN-004",
    descricao: "Tinta Acrílica Branca 18L",
    categoria: "Tintas",
    unidade: "UN",
    obra: "Galpão Industrial Norte",
    almoxarifado: "Almox Acabamento",
    saldo: 2,
    reservado: 0,
    disponivel: 2,
    custoMedio: 145.90,
    status: "Crítico"
  }
];

export default function Materiais() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Normal": return "default";
      case "Baixo": return "secondary";
      case "Crítico": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Normal": return "text-success";
      case "Baixo": return "text-warning";
      case "Crítico": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Materiais & Estoque</h1>
                <p className="text-muted-foreground">Gestão de materiais, almoxarifados e controle de estoque</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Package className="h-4 w-4" />
                  Nova Requisição
                </Button>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Novo Material
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <StatsCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  variant={stat.variant}
                />
              ))}
            </div>

            <div className="flex gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar materiais..." className="pl-10" />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Estoque de Materiais</CardTitle>
                <CardDescription>Saldo atual de materiais por obra e almoxarifado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {materiais.map((material) => (
                    <div key={material.id} className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="lg:col-span-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Package className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{material.descricao}</h4>
                            <p className="text-sm text-muted-foreground">
                              {material.codigo} • {material.categoria}
                            </p>
                            <Badge variant="outline" className="mt-1">
                              {material.unidade}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="lg:col-span-3">
                        <p className="text-sm font-medium">{material.obra}</p>
                        <p className="text-xs text-muted-foreground">{material.almoxarifado}</p>
                      </div>
                      
                      <div className="lg:col-span-2">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Saldo:</span>
                            <span className="font-medium">{material.saldo}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Reservado:</span>
                            <span className="text-warning">{material.reservado}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Disponível:</span>
                            <span className={`font-medium ${getStatusColor(material.status)}`}>
                              {material.disponivel}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="lg:col-span-2">
                        <p className="text-sm text-muted-foreground">Custo Médio</p>
                        <p className="font-medium">{formatCurrency(material.custoMedio)}</p>
                        <Badge variant={getStatusVariant(material.status)} className="mt-1">
                          {material.status}
                        </Badge>
                      </div>
                      
                      <div className="lg:col-span-1 flex items-center justify-end">
                        <Button variant="outline" size="sm">
                          Ver Detalhes
                        </Button>
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
  );
}