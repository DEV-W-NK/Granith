import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, FileText, Download, Calendar, Filter, Eye } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";

const relatorios = [
  {
    id: "R-001",
    nome: "Relatório de Custos por Obra",
    categoria: "Financeiro",
    descricao: "Análise detalhada de custos por obra e centro de custo",
    frequencia: "Mensal",
    ultimaGeracao: "2024-08-15",
    proximaGeracao: "2024-09-15",
    formato: "PDF + Excel",
    status: "Disponível",
    tamanho: "2.3 MB"
  },
  {
    id: "R-002",
    nome: "Performance de Equipes",
    categoria: "Workforce",
    descricao: "Produtividade e controle de ponto por equipe e funcionário",
    frequencia: "Semanal",
    ultimaGeracao: "2024-08-18",
    proximaGeracao: "2024-08-25",
    formato: "Excel",
    status: "Disponível",
    tamanho: "1.8 MB"
  },
  {
    id: "R-003",
    nome: "Análise de Estoque",
    categoria: "Materiais",
    descricao: "Saldos, movimentações e itens em estoque crítico",
    frequencia: "Quinzenal",
    ultimaGeracao: "2024-08-16",
    proximaGeracao: "2024-08-30",
    formato: "PDF",
    status: "Processando",
    tamanho: "-"
  },
  {
    id: "R-004",
    nome: "Indicadores EVM",
    categoria: "Performance",
    descricao: "Earned Value Management - CPI, SPI e projeções",
    frequencia: "Mensal",
    ultimaGeracao: "2024-08-01",
    proximaGeracao: "2024-09-01",
    formato: "Dashboard + PDF",
    status: "Agendado",
    tamanho: "-"
  },
  {
    id: "R-005",
    nome: "Avaliação de Fornecedores",
    categoria: "Compras",
    descricao: "Performance de entrega, qualidade e preços por fornecedor",
    frequencia: "Trimestral",
    ultimaGeracao: "2024-07-31",
    proximaGeracao: "2024-10-31",
    formato: "Excel + Dashboard",
    status: "Disponível",
    tamanho: "3.1 MB"
  },
  {
    id: "R-006",
    nome: "Conciliação Fiscal",
    categoria: "Contábil",
    descricao: "Conciliação de notas fiscais e pagamentos",
    frequencia: "Mensal",
    ultimaGeracao: "2024-08-10",
    proximaGeracao: "2024-09-10",
    formato: "Excel",
    status: "Erro",
    tamanho: "-"
  }
];

const categorias = [
  { nome: "Financeiro", cor: "bg-primary/10 text-primary" },
  { nome: "Workforce", cor: "bg-success/10 text-success" },
  { nome: "Materiais", cor: "bg-info/10 text-info" },
  { nome: "Performance", cor: "bg-warning/10 text-warning" },
  { nome: "Compras", cor: "bg-secondary/50 text-foreground" },
  { nome: "Contábil", cor: "bg-destructive/10 text-destructive" }
];

export default function Relatorios() {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Disponível": return "default";
      case "Processando": return "secondary";
      case "Agendado": return "outline";
      case "Erro": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponível": return "text-success";
      case "Processando": return "text-info";
      case "Agendado": return "text-warning";
      case "Erro": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getCategoriaStyle = (categoria: string) => {
    const cat = categorias.find(c => c.nome === categoria);
    return cat ? cat.cor : "bg-muted text-muted-foreground";
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
                <h1 className="text-3xl font-bold text-foreground">Relatórios & BI</h1>
                <p className="text-muted-foreground">Relatórios automáticos e dashboards executivos</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filtros
                </Button>
                <Button className="gap-2">
                  <FileText className="h-4 w-4" />
                  Novo Relatório
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categorias.map((categoria) => (
                <Card key={categoria.nome} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${categoria.cor}`}>
                        <BarChart3 className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">{categoria.nome}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {relatorios.filter(r => r.categoria === categoria.nome).length} relatórios disponíveis
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Lista de Relatórios</CardTitle>
                <CardDescription>Relatórios automáticos configurados no sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relatorios.map((relatorio) => (
                    <div key={relatorio.id} className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="lg:col-span-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{relatorio.nome}</h4>
                            <p className="text-sm text-muted-foreground">{relatorio.descricao}</p>
                            <div className={`inline-block px-2 py-1 rounded-full text-xs mt-1 ${getCategoriaStyle(relatorio.categoria)}`}>
                              {relatorio.categoria}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="lg:col-span-2">
                        <p className="text-sm text-muted-foreground">Frequência</p>
                        <p className="font-medium">{relatorio.frequencia}</p>
                        <p className="text-xs text-muted-foreground">{relatorio.formato}</p>
                      </div>
                      
                      <div className="lg:col-span-2">
                        <p className="text-sm text-muted-foreground">Última Geração</p>
                        <p className="text-sm">{new Date(relatorio.ultimaGeracao).toLocaleDateString('pt-BR')}</p>
                        <p className="text-xs text-muted-foreground">
                          {relatorio.tamanho !== "-" ? relatorio.tamanho : ""}
                        </p>
                      </div>
                      
                      <div className="lg:col-span-2">
                        <p className="text-sm text-muted-foreground">Próxima Geração</p>
                        <p className="text-sm">{new Date(relatorio.proximaGeracao).toLocaleDateString('pt-BR')}</p>
                      </div>
                      
                      <div className="lg:col-span-1">
                        <Badge variant={getStatusVariant(relatorio.status)}>
                          {relatorio.status}
                        </Badge>
                      </div>
                      
                      <div className="lg:col-span-1 flex items-center justify-end gap-1">
                        {relatorio.status === "Disponível" && (
                          <>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4" />
                            </Button>
                          </>
                        )}
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