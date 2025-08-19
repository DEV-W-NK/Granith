import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCheck, Star, TrendingUp, AlertTriangle, Plus, Search, Filter, Building } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { StatsCard } from "@/components/dashboard/StatsCard";

const stats = [
  {
    title: "Fornecedores Ativos",
    value: "156",
    icon: UserCheck,
    variant: "default" as const
  },
  {
    title: "Avaliação Média",
    value: "4.2",
    icon: Star,
    variant: "success" as const,
    description: "De 5.0 estrelas"
  },
  {
    title: "Performance Entrega",
    value: "87%",
    icon: TrendingUp,
    variant: "info" as const,
    trend: { value: "5%", isPositive: true }
  },
  {
    title: "Pendências",
    value: "8",
    icon: AlertTriangle,
    variant: "warning" as const
  }
];

const fornecedores = [
  {
    id: "F-001",
    razaoSocial: "Cimentos São Paulo S.A.",
    nomeFantasia: "Cimentos SP",
    cnpj: "12.345.678/0001-90",
    categoria: "Cimento e Argamassa",
    cidade: "São Paulo, SP",
    status: "Ativo",
    avaliacao: 4.5,
    pedidosUltimos30: 12,
    valorUltimos30: 450000,
    ultimaCompra: "2024-08-15",
    observacoes: "Prazo de entrega confiável"
  },
  {
    id: "F-002",
    razaoSocial: "Ferragens Centro Ltda.",
    nomeFantasia: "Ferragens Centro",
    cnpj: "98.765.432/0001-10", 
    categoria: "Ferragem e Metais",
    cidade: "Campinas, SP",
    status: "Ativo",
    avaliacao: 3.8,
    pedidosUltimos30: 8,
    valorUltimos30: 189500,
    ultimaCompra: "2024-08-18",
    observacoes: "Preços competitivos"
  },
  {
    id: "F-003",
    razaoSocial: "Construtora Beta Empreiteira Ltda.",
    nomeFantasia: "Beta Empreiteira",
    cnpj: "55.666.777/0001-33",
    categoria: "Serviços de Construção",
    cidade: "Rio de Janeiro, RJ",
    status: "Ativo",
    avaliacao: 4.2,
    pedidosUltimos30: 3,
    valorUltimos30: 780000,
    ultimaCompra: "2024-08-10",
    observacoes: "Qualidade excelente"
  },
  {
    id: "F-004",
    razaoSocial: "Agregados Mineração S.A.",
    nomeFantasia: "Agregados do Vale",
    cnpj: "77.888.999/0001-44",
    categoria: "Agregados e Areia",
    cidade: "Belo Horizonte, MG",
    status: "Inativo",
    avaliacao: 3.5,
    pedidosUltimos30: 0,
    valorUltimos30: 0,
    ultimaCompra: "2024-06-22",
    observacoes: "Problemas de qualidade recentes"
  }
];

export default function Fornecedores() {
  const formatCurrency = (value: number) => {
    if (value === 0) return "-";
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Ativo": return "default";
      case "Inativo": return "secondary";
      case "Bloqueado": return "destructive";
      default: return "secondary";
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= rating ? 'fill-warning text-warning' : 'text-muted-foreground'
          }`}
        />
      );
    }
    return stars;
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
                <h1 className="text-3xl font-bold text-foreground">Fornecedores</h1>
                <p className="text-muted-foreground">Cadastro e gestão de fornecedores e prestadores de serviços</p>
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Novo Fornecedor
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <StatsCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  description={stat.description}
                  icon={stat.icon}
                  variant={stat.variant}
                  trend={stat.trend}
                />
              ))}
            </div>

            <div className="flex gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar fornecedores..." className="pl-10" />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Lista de Fornecedores</CardTitle>
                <CardDescription>Cadastro de fornecedores com avaliações e histórico</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fornecedores.map((fornecedor) => (
                    <div key={fornecedor.id} className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="lg:col-span-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Building className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{fornecedor.nomeFantasia}</h4>
                            <p className="text-sm text-muted-foreground">{fornecedor.razaoSocial}</p>
                            <p className="text-xs text-muted-foreground">CNPJ: {fornecedor.cnpj}</p>
                            <Badge variant="outline" className="mt-1">
                              {fornecedor.categoria}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="lg:col-span-2">
                        <p className="text-sm font-medium">{fornecedor.cidade}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {renderStars(fornecedor.avaliacao)}
                          <span className="text-sm text-muted-foreground ml-1">
                            {fornecedor.avaliacao.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="lg:col-span-2">
                        <p className="text-sm text-muted-foreground">Últimos 30 dias</p>
                        <p className="font-medium">{fornecedor.pedidosUltimos30} pedidos</p>
                        <p className="text-sm">{formatCurrency(fornecedor.valorUltimos30)}</p>
                      </div>
                      
                      <div className="lg:col-span-2">
                        <p className="text-sm text-muted-foreground">Última Compra</p>
                        <p className="text-sm">
                          {fornecedor.ultimaCompra !== "-" 
                            ? new Date(fornecedor.ultimaCompra).toLocaleDateString('pt-BR')
                            : "-"
                          }
                        </p>
                        <Badge variant={getStatusVariant(fornecedor.status)} className="mt-1">
                          {fornecedor.status}
                        </Badge>
                      </div>
                      
                      <div className="lg:col-span-2 flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Avaliar
                        </Button>
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