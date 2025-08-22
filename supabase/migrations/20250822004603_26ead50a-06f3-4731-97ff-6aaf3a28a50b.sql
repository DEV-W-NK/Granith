-- Create status enum for obras
CREATE TYPE status_obra AS ENUM ('ativa', 'pausada', 'concluida', 'cancelada', 'planejamento');

-- Create obras table
CREATE TABLE public.obras (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  cliente TEXT NOT NULL,
  status status_obra NOT NULL DEFAULT 'planejamento',
  localizacao TEXT NOT NULL,
  data_inicio DATE NOT NULL,
  previsao_termino DATE NOT NULL,
  orcamento_total DECIMAL(15,2) NOT NULL DEFAULT 0,
  gasto_atual DECIMAL(15,2) NOT NULL DEFAULT 0,
  progresso_fisico INTEGER NOT NULL DEFAULT 0 CHECK (progresso_fisico >= 0 AND progresso_fisico <= 100),
  equipe INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.obras ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust based on your auth requirements)
CREATE POLICY "Enable read access for all users" ON public.obras FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON public.obras FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.obras FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON public.obras FOR DELETE USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_obras_updated_at
  BEFORE UPDATE ON public.obras
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();