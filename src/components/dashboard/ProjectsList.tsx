import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Calendar, DollarSign, Users } from "lucide-react";

const projects = [
  {
    id: "OB-001",
    name: "Residencial Vista Verde",
    client: "Incorporadora ABC",
    location: "São Paulo, SP",
    progress: 75,
    budget: {
      approved: 2500000,
      spent: 1875000,
      committed: 312500
    },
    team: 24,
    deadline: "2025-12-15",
    status: "EM_ANDAMENTO"
  },
  {
    id: "OB-002", 
    name: "Centro Comercial Norte",
    client: "Grupo XYZ Ltda",
    location: "Rio de Janeiro, RJ",
    progress: 45,
    budget: {
      approved: 5200000,
      spent: 2340000,
      committed: 780000
    },
    team: 42,
    deadline: "2026-08-30",
    status: "EM_ANDAMENTO"
  },
  {
    id: "OB-003",
    name: "Galpão Industrial Oeste",
    client: "Logística Brasil S.A.",
    location: "Campinas, SP", 
    progress: 90,
    budget: {
      approved: 1800000,
      spent: 1620000,
      committed: 54000
    },
    team: 16,
    deadline: "2025-09-20",
    status: "FINALIZACAO"
  }
];

const statusColors = {
  EM_ANDAMENTO: "bg-info text-info-foreground",
  FINALIZACAO: "bg-warning text-warning-foreground", 
  CONCLUIDO: "bg-success text-success-foreground",
  PAUSADO: "bg-destructive text-destructive-foreground"
};

const statusLabels = {
  EM_ANDAMENTO: "Em Andamento",
  FINALIZACAO: "Finalização",
  CONCLUIDO: "Concluído",
  PAUSADO: "Pausado"
};

export function ProjectsList() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Obras Ativas
          <Badge variant="secondary">{projects.length}</Badge>
        </CardTitle>
        <CardDescription>
          Acompanhamento em tempo real das obras em execução
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project) => {
          const budgetUsage = (project.budget.spent / project.budget.approved) * 100;
          const isOverBudget = budgetUsage > 100;
          
          return (
            <div key={project.id} className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{project.name}</h3>
                    <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                      {statusLabels[project.status as keyof typeof statusLabels]}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{project.client}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {project.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(project.deadline).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {project.team} pessoas
                    </span>
                  </div>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  ID: {project.id}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Progresso Físico</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Orçamento Utilizado</span>
                    <span className={`font-medium ${isOverBudget ? 'text-destructive' : 'text-foreground'}`}>
                      {budgetUsage.toFixed(1)}%
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(budgetUsage, 100)} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                    <span>Gasto: {formatCurrency(project.budget.spent)}</span>
                    <span>Orçado: {formatCurrency(project.budget.approved)}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}