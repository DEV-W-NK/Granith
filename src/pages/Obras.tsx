import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Calendar, DollarSign, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { NovaObraModal } from "@/components/modals/NovaObraModal";
import { useState, useEffect } from "react";
import { useObras } from "@/hooks/useObras";
import { Obra } from "@/types/obra";


export default function Obras() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { obras, loading, refresh } = useObras({ autoLoad: true });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "ativa": return "default";
      case "planejamento": return "secondary";
      case "concluida": return "outline";
      case "pausada": return "secondary";
      case "cancelada": return "destructive";
      default: return "secondary";
    }
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case "ativa": return "Em Andamento";
      case "planejamento": return "Planejamento";
      case "concluida": return "Concluída";
      case "pausada": return "Pausada";
      case "cancelada": return "Cancelada";
      default: return status;
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
                <h1 className="text-3xl font-bold text-foreground">Obras & WBS</h1>
                <p className="text-muted-foreground">Gestão completa de obras e estrutura analítica de projetos</p>
              </div>
              <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
                <Plus className="h-4 w-4" />
                Nova Obra
              </Button>
            </div>

            <div className="flex gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar obras..." className="pl-10" />
              </div>
            </div>

            <div className="grid gap-6">
              {loading && <div className="text-center text-muted-foreground">Carregando obras...</div>}
              {obras.map((obra) => (
                <Card key={obra.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-3">
                          <Building className="h-5 w-5 text-primary" />
                          {obra.nome}
                          <Badge variant={getStatusVariant(obra.status)}>
                            {formatStatus(obra.status)}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-2">
                          <span>{obra.cliente}</span>
                          <span>•</span>
                          <MapPin className="h-4 w-4" />
                          <span>{obra.localizacao}</span>
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          Início
                        </div>
                        <p className="font-medium">{new Date(obra.dataInicio).toLocaleDateString('pt-BR')}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          Previsão
                        </div>
                        <p className="font-medium">{new Date(obra.previsaoTermino).toLocaleDateString('pt-BR')}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <DollarSign className="h-4 w-4" />
                          Orçamento
                        </div>
                        <p className="font-medium">{formatCurrency(obra.orcamentoTotal)}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <DollarSign className="h-4 w-4" />
                          Realizado
                        </div>
                        <p className="font-medium">{formatCurrency(obra.gastoAtual || 0)}</p>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all" 
                            style={{ width: `${obra.progressoFisico || 0}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">{obra.progressoFisico || 0}% concluído</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
      
      <NovaObraModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen}
        onSuccess={refresh}
      />
    </div>
  );
}