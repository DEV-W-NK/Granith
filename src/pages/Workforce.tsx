import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Clock, UserCheck, Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { NovoFuncionarioModal } from "@/components/modals/NovoFuncionarioModal";
import { useState } from "react";

const stats = [
  {
    title: "Funcionários Ativos",
    value: "127",
    icon: Users,
    variant: "default" as const
  },
  {
    title: "Em Campo Agora",
    value: "89",
    icon: MapPin,
    variant: "success" as const,
    trend: { value: "12%", isPositive: true }
  },
  {
    title: "Horas Trabalhadas (Mês)",
    value: "18.450",
    icon: Clock,
    variant: "info" as const
  },
  {
    title: "Pontos Pendentes",
    value: "23",
    icon: UserCheck,
    variant: "warning" as const
  }
];

const funcionarios = [
  {
    id: "F-001",
    nome: "João da Silva",
    funcao: "Pedreiro",
    tipo: "CLT",
    obra: "Centro Comercial Plaza Norte",
    status: "Em Campo",
    horasHoje: 6.5,
    localizacao: "Setor A - Estrutura",
    ultimoPonto: "08:00"
  },
  {
    id: "F-002",
    nome: "Maria Santos",
    funcao: "Engenheira Civil",
    tipo: "CLT",
    obra: "Residencial Jardim das Flores",
    status: "Em Campo",
    horasHoje: 4.2,
    localizacao: "Escritório de Obra",
    ultimoPonto: "13:30"
  },
  {
    id: "F-003",
    nome: "Carlos Oliveira",
    funcao: "Eletricista",
    tipo: "PJ",
    obra: "Centro Comercial Plaza Norte",
    status: "Folga",
    horasHoje: 0,
    localizacao: "-",
    ultimoPonto: "-"
  },
  {
    id: "F-004",
    nome: "Ana Costa",
    funcao: "Mestre de Obras",
    tipo: "CLT",
    obra: "Galpão Industrial Norte",
    status: "Em Campo",
    horasHoje: 8.0,
    localizacao: "Supervisão Geral",
    ultimoPonto: "07:00"
  }
];

export default function Workforce() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Em Campo": return "default";
      case "Folga": return "secondary";
      case "Ausente": return "destructive";
      default: return "secondary";
    }
  };

  const getTipoVariant = (tipo: string) => {
    return tipo === "CLT" ? "outline" : "secondary";
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
                <h1 className="text-3xl font-bold text-foreground">Workforce & Geofencing</h1>
                <p className="text-muted-foreground">Gestão de equipe e controle de ponto com geolocalização</p>
              </div>
              <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
                <Plus className="h-4 w-4" />
                Novo Funcionário
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <StatsCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  variant={stat.variant}
                  trend={stat.trend}
                />
              ))}
            </div>

            <div className="flex gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar funcionários..." className="pl-10" />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Funcionários</CardTitle>
                <CardDescription>Lista de funcionários e status atual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {funcionarios.map((funcionario) => (
                    <div key={funcionario.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{funcionario.nome}</h4>
                          <p className="text-sm text-muted-foreground">{funcionario.funcao}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm font-medium">{funcionario.obra}</p>
                          <p className="text-xs text-muted-foreground">{funcionario.localizacao}</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm font-medium">{funcionario.horasHoje}h</p>
                          <p className="text-xs text-muted-foreground">Último: {funcionario.ultimoPonto}</p>
                        </div>
                        
                        <div className="flex gap-2">
                          <Badge variant={getTipoVariant(funcionario.tipo)}>
                            {funcionario.tipo}
                          </Badge>
                          <Badge variant={getStatusVariant(funcionario.status)}>
                            {funcionario.status}
                          </Badge>
                        </div>
                        
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
      
      <NovoFuncionarioModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen}
        onSuccess={() => {/* Refresh funcionários */}}
      />
    </div>
  );
}