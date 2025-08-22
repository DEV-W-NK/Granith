import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { NovaObra, StatusObra } from "@/types/obra";
import { useToast } from "@/hooks/use-toast";
import { obrasService } from "@/services/obrasService";

interface NovaObraModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function NovaObraModal({ open, onOpenChange, onSuccess }: NovaObraModalProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<NovaObra>({
    nome: "",
    cliente: "",
    status: "planejamento" as StatusObra,
    localizacao: "",
    dataInicio: "",
    previsaoTermino: "",
    orcamentoTotal: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await obrasService.createObra(formData);
      toast({
        title: "Obra criada com sucesso!",
        description: "A nova obra foi cadastrada no sistema.",
      });
      onOpenChange(false);
      onSuccess?.();
      setFormData({
        nome: "",
        cliente: "",
        status: "planejamento" as StatusObra,
        localizacao: "",
        dataInicio: "",
        previsaoTermino: "",
        orcamentoTotal: 0,
      });
    } catch (error) {
      toast({
        title: "Erro ao criar obra",
        description: "Ocorreu um erro ao cadastrar a obra. Tente novamente.",
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
          <DialogTitle>Nova Obra</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome da Obra *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cliente">Cliente *</Label>
              <Input
                id="cliente"
                value={formData.cliente}
                onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as StatusObra })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planejamento">Planejamento</SelectItem>
                  <SelectItem value="ativa">Ativa</SelectItem>
                  <SelectItem value="pausada">Pausada</SelectItem>
                  <SelectItem value="concluida">Concluída</SelectItem>
                  <SelectItem value="cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="localizacao">Localização *</Label>
              <Input
                id="localizacao"
                value={formData.localizacao}
                onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dataInicio">Data de Início *</Label>
              <Input
                id="dataInicio"
                type="date"
                value={formData.dataInicio}
                onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="previsaoTermino">Previsão de Término *</Label>
              <Input
                id="previsaoTermino"
                type="date"
                value={formData.previsaoTermino}
                onChange={(e) => setFormData({ ...formData, previsaoTermino: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="orcamentoTotal">Orçamento Total (R$) *</Label>
            <Input
              id="orcamentoTotal"
              type="number"
              step="0.01"
              value={formData.orcamentoTotal}
              onChange={(e) => setFormData({ ...formData, orcamentoTotal: parseFloat(e.target.value) || 0 })}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Criando..." : "Criar Obra"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}