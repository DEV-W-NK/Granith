import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ProjectsList } from "@/components/dashboard/ProjectsList";
import { CostChart } from "@/components/dashboard/CostChart";
import { 
  Building, 
  Users, 
  DollarSign, 
  Package, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            {/* Page Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard Executivo</h1>
              <p className="text-muted-foreground mt-1">
                Visão geral das operações e indicadores de performance
              </p>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Obras Ativas"
                value="12"
                description="3 obras em finalização"
                icon={Building}
                trend={{ value: "2", isPositive: true }}
                variant="info"
              />
              
              <StatsCard
                title="Equipe Total"
                value="247"
                description="Distribuída em campo"
                icon={Users}
                trend={{ value: "8%", isPositive: true }}
                variant="success"
              />
              
              <StatsCard
                title="Custo Total Mês"
                value="R$ 1.23M"
                description="Vs R$ 1.18M previsto"
                icon={DollarSign}
                trend={{ value: "4.2%", isPositive: false }}
                variant="warning"
              />
              
              <StatsCard
                title="Itens Críticos"
                value="5"
                description="Estoque baixo"
                icon={Package}
                trend={{ value: "2", isPositive: false }}
                variant="destructive"
              />
            </div>

            {/* Performance Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="CPI Médio"
                value="0.96"
                description="Cost Performance Index"
                icon={TrendingUp}
                variant="warning"
              />
              
              <StatsCard
                title="SPI Médio"
                value="1.02"
                description="Schedule Performance Index"
                icon={Clock}
                variant="success"
              />
              
              <StatsCard
                title="Obras no Prazo"
                value="9/12"
                description="75% das obras"
                icon={CheckCircle}
                variant="success"
              />
              
              <StatsCard
                title="Alertas Ativos"
                value="8"
                description="Requer atenção"
                icon={AlertTriangle}
                variant="destructive"
              />
            </div>

            {/* Charts and Lists Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CostChart />
              <ProjectsList />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;