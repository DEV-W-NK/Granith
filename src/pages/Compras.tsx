import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, FileText, Clock, CheckCircle, Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { StatsCard } from "@/components/dashboard/StatsCard";

const stats = [
  {
    title: "Requisições Abertas",
    value: "34",
    icon: FileText,
    variant: "warning" as const
  },
  {
    title: "Pedidos em Andamento",
    value: "18",
    icon: Clock,
    variant: "info" as const
  },
  {
    title: "Pedidos Concluídos (Mês)",
    value: "127",
    icon: CheckCircle,
    variant: "success" as const,
    trend: { value: "23%", isPositive: true }
  },
  {
    title: "Volume Compras (Mês)",
    value: "R$ 2.8M",
    icon: ShoppingCart,
    variant: "default" as const
  }
];

const compras = [
  {
    id: "PO-001",
    numero: "PO-2024-001",
    tipo: "Pedido de Compra",
    fornecedor: "Cimentos São Paulo S.A.",
    obra: "Centro Comercial Plaza Norte",
    valor: 145000,
    data: "2024-08-15",
    prazoEntrega: "2024-08-25",
    status: "Aprovado",
    itens: 3,
    solicitante: "João Silva"
  },
  {
    id: "MR-001",
    numero: "MR-2024-045",
    tipo: "Requisição",
    fornecedor: "-",
    obra: "Residencial Jardim das Flores",
    valor: 0,
    data: "2024-08-19",
    prazoEntrega: "-",
    status: "Pendente",
    itens: 8,
    solicitante: "Maria Santos"
  },
  {
    id: "PO-002",
    numero: "PO-2024-002",
    tipo: "Pedido de Compra",
    fornecedor: "Ferragens Centro Ltda",
    obra: "Centro Comercial Plaza Norte",
    valor: 89500,
    data: "2024-08-18",
    prazoEntrega: "2024-08-28",
    status: "Em Entrega",
    itens: 5,
    solicitante: "Carlos Oliveira"
  },
  {
    id: "CT-001",
    numero: "CT-2024-003",
    tipo: "Contrato",
    fornecedor: "Construtora Beta Empreiteira",
    obra: "Galpão Industrial Norte", 
    valor: 450000,
    data: "2024-08-10",
    prazoEntrega: "2024-10-30",
    status: "Ativo",
    itens: 1,
    solicitante: "Ana Costa"
  }
];

export default function Compras() {
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
      case "Aprovado": return "default";
      case "Pendente": return "secondary";
      case "Em Entrega": return "default";
      case "Ativo": return "default";
      case "Cancelado": return "destructive";
      default: return "secondary";
    }
  };

  const getTipoVariant = (tipo: string) => {
    switch (tipo) {
      case "Pedido de Compra": return "default";
      case "Requisição": return "secondary";
      case "Contrato": return "outline";
      default: return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprovado": return "text-success";
      case "Pendente": return "text-warning";
      case "Em Entrega": return "text-info";
      case "Ativo": return "text-success";
      case "Cancelado": return "text-destructive";
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
                <h1 className="text-3xl font-bold text-foreground">Compras & Contratos</h1>
                <p className="text-muted-foreground">Gestão de requisições, pedidos de compra e contratos</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Nova Requisição
                </Button>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Novo Pedido
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
                  trend={stat.trend}
                />
              ))}
            </div>

            <div className="flex gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar requisições e pedidos..." className="pl-10" />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Requisições e Pedidos</CardTitle>
                <CardDescription>Lista de requisições, pedidos de compra e contratos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {compras.map((compra) => (
                    <div key={compra.id} className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="lg:col-span-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <ShoppingCart className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{compra.numero}</h4>
                            <Badge variant={getTipoVariant(compra.tipo)} className="mt-1">
                              {compra.tipo}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="lg:col-span-3">
                        <p className="text-sm font-medium">{compra.obra}</p>
                        <p className="text-xs text-muted-foreground">
                          {compra.fornecedor || "Aguardando cotação"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Solicitante: {compra.solicitante}
                        </p>
                      </div>
                      
                      <div className="lg:col-span-2">
                        <p className="text-sm text-muted-foreground">Valor</p>
                        <p className="font-medium">{formatCurrency(compra.valor)}</p>
                        <p className="text-xs text-muted-foreground">
                          {compra.itens} {compra.itens === 1 ? 'item' : 'itens'}
                        </p>
                      </div>
                      
                      <div className="lg:col-span-2">
                        <p className="text-sm text-muted-foreground">Data</p>
                        <p className="text-sm">{new Date(compra.data).toLocaleDateString('pt-BR')}</p>
                        {compra.prazoEntrega !== "-" && (
                          <p className="text-xs text-muted-foreground">
                            Entrega: {new Date(compra.prazoEntrega).toLocaleDateString('pt-BR')}
                          </p>
                        )}
                      </div>
                      
                      <div className="lg:col-span-1">
                        <Badge variant={getStatusVariant(compra.status)}>
                          {compra.status}
                        </Badge>
                      </div>
                      
                      <div className="lg:col-span-1 flex items-center justify-end">
                        <Button variant="outline" size="sm">
                          Ver
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