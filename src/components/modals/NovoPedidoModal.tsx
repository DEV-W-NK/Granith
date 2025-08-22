import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { NovaCompra, CompraTipo } from "@/types/compra";
import { Obra } from "@/types/obra";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { obrasService } from "@/services/obrasService";

interface NovoPedidoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function NovoPedidoModal({ open, onOpenChange, onSuccess }: NovoPedidoModalProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [obras, setObras] = useState<Obra[]>([]);
  const [formData, setFormData] = useState<NovaCompra>({
    tipo: "requisicao" as CompraTipo,
    valor: 0,
    dataPedido: new Date().toISOString().split('T')[0],
    itensQuantidade: 1,
    solicitante: "",
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

  const generateNumber = (tipo: CompraTipo): string => {
    const prefix = tipo === 'requisicao' ? 'MR' : tipo === 'pedido_compra' ? 'PO' : 'CT';
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${year}-${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const numero = generateNumber(formData.tipo);
      
      const { data, error } = await supabase
        .from('compras')
        .insert([{
          numero,
          tipo: formData.tipo,
          fornecedor: formData.fornecedor || null,
          obra_id: formData.obraId || null,
          valor: formData.valor,
          data_pedido: formData.dataPedido,
          prazo_entrega: formData.prazoEntrega || null,
          itens_quantidade: formData.itensQuantidade,
          solicitante: formData.solicitante,
          observacoes: formData.observacoes || null,
        }]);

      if (error) throw error;

      const tipoLabel = formData.tipo === 'requisicao' ? 'Requisição' : 
                      formData.tipo === 'pedido_compra' ? 'Pedido de Compra' : 'Contrato';

      toast({
        title: `${tipoLabel} criado com sucesso!`,
        description: `${tipoLabel} ${numero} foi cadastrado no sistema.`,
      });
      onOpenChange(false);
      onSuccess?.();
      setFormData({
        tipo: "requisicao" as CompraTipo,
        valor: 0,
        dataPedido: new Date().toISOString().split('T')[0],
        itensQuantidade: 1,
        solicitante: "",
      });
    } catch (error) {
      toast({
        title: "Erro ao criar pedido",
        description: "Ocorreu um erro ao cadastrar o pedido. Tente novamente.",
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
          <DialogTitle>Novo Pedido</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo *</Label>
              <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value as CompraTipo })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="requisicao">Requisição</SelectItem>
                  <SelectItem value="pedido_compra">Pedido de Compra</SelectItem>
                  <SelectItem value="contrato">Contrato</SelectItem>
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
              <Label htmlFor="solicitante">Solicitante *</Label>
              <Input
                id="solicitante"
                value={formData.solicitante}
                onChange={(e) => setFormData({ ...formData, solicitante: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fornecedor">Fornecedor</Label>
              <Input
                id="fornecedor"
                value={formData.fornecedor || ""}
                onChange={(e) => setFormData({ ...formData, fornecedor: e.target.value })}
                placeholder="Nome do fornecedor"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valor">Valor (R$)</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                value={formData.valor}
                onChange={(e) => setFormData({ ...formData, valor: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dataPedido">Data do Pedido *</Label>
              <Input
                id="dataPedido"
                type="date"
                value={formData.dataPedido}
                onChange={(e) => setFormData({ ...formData, dataPedido: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prazoEntrega">Prazo de Entrega</Label>
              <Input
                id="prazoEntrega"
                type="date"
                value={formData.prazoEntrega || ""}
                onChange={(e) => setFormData({ ...formData, prazoEntrega: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="itensQuantidade">Quantidade de Itens</Label>
            <Input
              id="itensQuantidade"
              type="number"
              min="1"
              value={formData.itensQuantidade}
              onChange={(e) => setFormData({ ...formData, itensQuantidade: parseInt(e.target.value) || 1 })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes || ""}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              placeholder="Informações adicionais sobre o pedido..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Criando..." : "Criar Pedido"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}