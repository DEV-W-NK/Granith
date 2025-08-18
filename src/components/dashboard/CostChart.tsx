import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const costData = [
  {
    period: "Jan/25",
    pessoas: 450000,
    materiais: 320000,
    servicos: 180000,
    total: 950000
  },
  {
    period: "Fev/25",
    pessoas: 520000,
    materiais: 420000,
    servicos: 210000,
    total: 1150000
  },
  {
    period: "Mar/25",
    pessoas: 480000,
    materiais: 380000,
    servicos: 195000,
    total: 1055000
  },
  {
    period: "Abr/25",
    pessoas: 510000,
    materiais: 445000,
    servicos: 225000,
    total: 1180000
  },
  {
    period: "Mai/25",
    pessoas: 495000,
    materiais: 390000,
    servicos: 205000,
    total: 1090000
  },
  {
    period: "Jun/25",
    pessoas: 530000,
    materiais: 460000,
    servicos: 240000,
    total: 1230000
  }
];

export function CostChart() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
          <div className="border-t border-border pt-2 mt-2">
            <p className="font-medium text-foreground">
              Total: {formatCurrency(payload.reduce((sum: number, entry: any) => sum + entry.value, 0))}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Custos por Categoria</CardTitle>
        <CardDescription>
          Evolução mensal dos custos por tipo (Jan-Jun 2025)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={costData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="period" 
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="pessoas" 
              name="Pessoas" 
              fill="hsl(var(--primary))" 
              radius={[0, 0, 0, 0]}
            />
            <Bar 
              dataKey="materiais" 
              name="Materiais" 
              fill="hsl(var(--info))" 
              radius={[0, 0, 0, 0]}
            />
            <Bar 
              dataKey="servicos" 
              name="Serviços" 
              fill="hsl(var(--success))" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}