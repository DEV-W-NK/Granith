import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NovoFuncionario, FuncionarioTipo } from "@/types/funcionario";
import { Obra } from "@/types/obra";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { obrasService } from "@/services/obrasService";

interface NovoFuncionarioModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function NovoFuncionarioModal({ open, onOpenChange, onSuccess }: NovoFuncionarioModalProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [obras, setObras] = useState<Obra[]>([]);
  const [formData, setFormData] = useState<NovoFuncionario>({
    nome: "",
    funcao: "",
    tipo: "clt" as FuncionarioTipo,
    telefone: "",
    email: "",
  });

  useEffect(() => {
    if (open) {
      loadObras();
    }
  }, [open]);

  const loadObras = async () => {
    try {
      const obrasData = await obrasService.getAllObras();
      setObras(obrasData);
    } catch (error) {
      console.error("Erro ao carregar obras:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('funcionarios')
        .insert([{
          nome: formData.nome,
          funcao: formData.funcao,
          tipo: formData.tipo,
          obra_id: formData.obraId || null,
          telefone: formData.telefone || null,
          email: formData.email || null,
          salario: formData.salario || null,
          data_admissao: formData.dataAdmissao || null,
        }]);

      if (error) throw error;

      toast({
        title: "Funcionário cadastrado com sucesso!",
        description: "O novo funcionário foi adicionado ao sistema.",
      });
      onOpenChange(false);
      onSuccess?.();
      setFormData({
        nome: "",
        funcao: "",
        tipo: "clt" as FuncionarioTipo,
        telefone: "",
        email: "",
      });
    } catch (error) {
      toast({
        title: "Erro ao cadastrar funcionário",
        description: "Ocorreu um erro ao cadastrar o funcionário. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Novo Funcionário</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="funcao">Função *</Label>
              <Input
                id="funcao"
                value={formData.funcao}
                onChange={(e) => setFormData({ ...formData, funcao: e.target.value })}
                placeholder="Ex: Pedreiro, Engenheiro, Mestre de Obras"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Contrato</Label>
              <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value as FuncionarioTipo })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clt">CLT</SelectItem>
                  <SelectItem value="pj">PJ</SelectItem>
                  <SelectItem value="terceirizado">Terceirizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="obra">Obra</Label>
              <Select value={formData.obraId} onValueChange={(value) => setFormData({ ...formData, obraId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma obra" />
                </SelectTrigger>
                <SelectContent>
                  {obras.map((obra) => (
                    <SelectItem key={obra.id} value={obra.id}>
                      {obra.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                placeholder="(11) 99999-9999"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="funcionario@empresa.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salario">Salário (R$)</Label>
              <Input
                id="salario"
                type="number"
                step="0.01"
                value={formData.salario || ""}
                onChange={(e) => setFormData({ ...formData, salario: parseFloat(e.target.value) || undefined })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dataAdmissao">Data de Admissão</Label>
              <Input
                id="dataAdmissao"
                type="date"
                value={formData.dataAdmissao}
                onChange={(e) => setFormData({ ...formData, dataAdmissao: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Cadastrando..." : "Cadastrar Funcionário"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}