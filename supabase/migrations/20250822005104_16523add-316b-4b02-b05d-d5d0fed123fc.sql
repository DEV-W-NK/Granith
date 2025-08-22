-- Create enum for funcionario status
CREATE TYPE funcionario_status AS ENUM ('em_campo', 'folga', 'ausente', 'ferias');

-- Create enum for funcionario tipo
CREATE TYPE funcionario_tipo AS ENUM ('clt', 'pj', 'terceirizado');

-- Create funcionarios table
CREATE TABLE public.funcionarios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  funcao TEXT NOT NULL,
  tipo funcionario_tipo NOT NULL DEFAULT 'clt',
  obra_id UUID REFERENCES public.obras(id),
  status funcionario_status NOT NULL DEFAULT 'folga',
  localizacao TEXT,
  telefone TEXT,
  email TEXT,
  salario DECIMAL(10,2),
  data_admissao DATE,
  ultimo_ponto TIMESTAMP WITH TIME ZONE,
  horas_hoje DECIMAL(4,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create enum for compra status
CREATE TYPE compra_status AS ENUM ('pendente', 'aprovado', 'em_entrega', 'entregue', 'cancelado');

-- Create enum for compra tipo
CREATE TYPE compra_tipo AS ENUM ('requisicao', 'pedido_compra', 'contrato');

-- Create compras table
CREATE TABLE public.compras (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  numero TEXT NOT NULL UNIQUE,
  tipo compra_tipo NOT NULL DEFAULT 'requisicao',
  fornecedor TEXT,
  obra_id UUID REFERENCES public.obras(id),
  valor DECIMAL(15,2) DEFAULT 0,
  data_pedido DATE NOT NULL DEFAULT CURRENT_DATE,
  prazo_entrega DATE,
  status compra_status NOT NULL DEFAULT 'pendente',
  itens_quantidade INTEGER DEFAULT 1,
  solicitante TEXT NOT NULL,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create fornecedores table
CREATE TABLE public.fornecedores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  cnpj TEXT UNIQUE,
  telefone TEXT,
  email TEXT,
  endereco TEXT,
  cidade TEXT,
  estado TEXT,
  cep TEXT,
  contato_principal TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.funcionarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fornecedores ENABLE ROW LEVEL SECURITY;

-- Create policies for funcionarios
CREATE POLICY "Enable read access for funcionarios" ON public.funcionarios FOR SELECT USING (true);
CREATE POLICY "Enable insert for funcionarios" ON public.funcionarios FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for funcionarios" ON public.funcionarios FOR UPDATE USING (true);
CREATE POLICY "Enable delete for funcionarios" ON public.funcionarios FOR DELETE USING (true);

-- Create policies for compras
CREATE POLICY "Enable read access for compras" ON public.compras FOR SELECT USING (true);
CREATE POLICY "Enable insert for compras" ON public.compras FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for compras" ON public.compras FOR UPDATE USING (true);
CREATE POLICY "Enable delete for compras" ON public.compras FOR DELETE USING (true);

-- Create policies for fornecedores
CREATE POLICY "Enable read access for fornecedores" ON public.fornecedores FOR SELECT USING (true);
CREATE POLICY "Enable insert for fornecedores" ON public.fornecedores FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for fornecedores" ON public.fornecedores FOR UPDATE USING (true);
CREATE POLICY "Enable delete for fornecedores" ON public.fornecedores FOR DELETE USING (true);

-- Create triggers for updated_at
CREATE TRIGGER update_funcionarios_updated_at
  BEFORE UPDATE ON public.funcionarios
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_compras_updated_at
  BEFORE UPDATE ON public.compras
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_fornecedores_updated_at
  BEFORE UPDATE ON public.fornecedores
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();