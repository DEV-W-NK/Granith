export type CompraStatus = 'pendente' | 'aprovado' | 'em_entrega' | 'entregue' | 'cancelado';
export type CompraTipo = 'requisicao' | 'pedido_compra' | 'contrato';

export interface Compra {
  id: string;
  numero: string;
  tipo: CompraTipo;
  fornecedor?: string;
  obraId?: string;
  valor: number;
  dataPedido: string;
  prazoEntrega?: string;
  status: CompraStatus;
  itensQuantidade: number;
  solicitante: string;
  observacoes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NovaCompra {
  tipo: CompraTipo;
  fornecedor?: string;
  obraId?: string;
  valor: number;
  dataPedido: string;
  prazoEntrega?: string;
  itensQuantidade: number;
  solicitante: string;
  observacoes?: string;
}