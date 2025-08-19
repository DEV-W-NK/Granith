import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Obras from "./pages/Obras";
import Workforce from "./pages/Workforce";
import Materiais from "./pages/Materiais";
import Compras from "./pages/Compras";
import Contabilidade from "./pages/Contabilidade";
import Fornecedores from "./pages/Fornecedores";
import Relatorios from "./pages/Relatorios";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/obras" element={<Obras />} />
          <Route path="/workforce" element={<Workforce />} />
          <Route path="/materiais" element={<Materiais />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/contabilidade" element={<Contabilidade />} />
          <Route path="/fornecedores" element={<Fornecedores />} />
          <Route path="/relatorios" element={<Relatorios />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
