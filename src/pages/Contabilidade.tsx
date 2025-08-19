import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, AlertCircle, FileText } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { CostChart } from "@/components/dashboard/CostChart";

const stats = [
  {
    title: "Custo Total (Mês)",
    value: "R$ 1.23M",
    icon: Calculator,
    variant: "default" as const,
    trend: { value: "8.5%", isPositive: false }
  },
  {
    title: "Margem Bruta",
    value: "18.4%",
    icon: TrendingUp,
    variant: "success" as const,
    trend: { value: "2.1%", isPositive: true }
  },
  {
    title: "CPI Médio",
    value: "0.94",
    icon: AlertCircle,
    variant: "warning" as const,
    description: "Cost Performance Index"
  },
  {
    title: "Relatórios Pendentes",
    value: "7",
    icon: FileText,
    variant: "info" as const
  }
];

const centrosCusto = [
  {
    obra: "Centro Comercial Plaza Norte",
    wbs: "1.2 - Estrutura",
    orcado: 850000,
    compromissado: 780000,
    realizado: 650000,
    percentualFisico: 75,
    cpi: 0.96,
    spi: 1.02
  },
  {
    obra: "Residencial Jardim das Flores", 
    wbs: "2.1 - Fundação",
    orcado: 420000,
    compromissado: 380000,
    realizado: 290000,
    percentualFisico: 68,
    cpi: 0.98,
    spi: 0.91
  },
  {
    obra: "Centro Comercial Plaza Norte",
    wbs: "1.3 - Alvenaria",
    orcado: 320000,
    compromissado: 298000,
    realizado: 185000,
    percentualFisico: 55,
    cpi: 0.95,
    spi: 0.89
  }
];

export default function Contabilidade() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getCPIColor = (cpi: number) => {
    if (cpi >= 1.0) return "text-success";
    if (cpi >= 0.95) return "text-warning";
    return "text-destructive";
  };

  const getSPIColor = (spi: number) => {
    if (spi >= 1.0) return "text-success";
    if (spi >= 0.95) return "text-warning";
    return "text-destructive";
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
                <h1 className="text-3xl font-bold text-foreground">Contabilidade Gerencial</h1>
                <p className="text-muted-foreground">Análise de custos, rateios e indicadores de performance</p>
              </div>
              <Button className="gap-2">
                <FileText className="h-4 w-4" />
                Gerar Relatório
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CostChart />
              
              <Card>
                <CardHeader>
                  <CardTitle>Performance por Centro de Custo</CardTitle>
                  <CardDescription>
                    Indicadores CPI e SPI por obra e WBS
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {centrosCusto.map((centro, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium">{centro.obra}</h4>
                            <p className="text-sm text-muted-foreground">{centro.wbs}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{formatPercentage(centro.percentualFisico)}</p>
                            <p className="text-xs text-muted-foreground">Físico</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Orçado</p>
                            <p className="font-medium">{formatCurrency(centro.orcado)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Compromissado</p>
                            <p className="font-medium">{formatCurrency(centro.compromissado)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Realizado</p>
                            <p className="font-medium">{formatCurrency(centro.realizado)}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-border">
                          <div className="flex gap-4">
                            <div className="text-center">
                              <p className="text-xs text-muted-foreground">CPI</p>
                              <p className={`font-medium ${getCPIColor(centro.cpi)}`}>
                                {centro.cpi.toFixed(2)}
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-muted-foreground">SPI</p>
                              <p className={`font-medium ${getSPIColor(centro.spi)}`}>
                                {centro.spi.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Detalhes
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}