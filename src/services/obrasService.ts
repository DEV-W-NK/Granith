import { supabase } from '../integrations/supabase/client';
import { Obra, NovaObra, StatusObra, ObrasStats, SearchObrasParams } from '../types/obra';

class ObrasService {
  // Criar nova obra
  async createObra(obraData: NovaObra): Promise<string> {
    const { data, error } = await supabase
      .from('obras')
      .insert([{
        ...obraData,
        gasto_atual: obraData.gastoAtual || 0,
        progresso_fisico: obraData.progressoFisico || 0,
        equipe: obraData.equipe || 0
      }])
      .select()
      .single();

    if (error) {
      throw new Error(`Erro ao criar obra: ${error.message}`);
    }

    return data.id;
  }

  // Obter todas as obras
  async getAllObras(): Promise<Obra[]> {
    const { data, error } = await supabase
      .from('obras')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Erro ao carregar obras: ${error.message}`);
    }

    return this.formatObrasData(data || []);
  }

  // Pesquisar obras
  async searchObras(params: SearchObrasParams): Promise<Obra[]> {
    let query = supabase.from('obras').select('*');

    if (params.searchTerm) {
      query = query.or(`nome.ilike.%${params.searchTerm}%,cliente.ilike.%${params.searchTerm}%`);
    }

    if (params.statusFilter) {
      query = query.eq('status', params.statusFilter);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Erro na pesquisa: ${error.message}`);
    }

    return this.formatObrasData(data || []);
  }

  // Atualizar obra
  async updateObra(id: string, obraData: Partial<Obra>): Promise<void> {
    const { error } = await supabase
      .from('obras')
      .update(obraData)
      .eq('id', id);

    if (error) {
      throw new Error(`Erro ao atualizar obra: ${error.message}`);
    }
  }

  // Deletar obra
  async deleteObra(id: string): Promise<void> {
    const { error } = await supabase
      .from('obras')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Erro ao deletar obra: ${error.message}`);
    }
  }

  // Obter estatísticas
  async getEstatisticas(): Promise<ObrasStats> {
    const { data, error } = await supabase
      .from('obras')
      .select('status, orcamento_total, gasto_atual, progresso_fisico');

    if (error) {
      throw new Error(`Erro ao carregar estatísticas: ${error.message}`);
    }

    const obras = data || [];
    
    return {
      totalObras: obras.length,
      obrasAtivas: obras.filter(o => o.status === 'ativa').length,
      obrasPausadas: obras.filter(o => o.status === 'pausada').length,
      obrasConcluidas: obras.filter(o => o.status === 'concluida').length,
      orcamentoTotal: obras.reduce((sum, o) => sum + (o.orcamento_total || 0), 0),
      gastoTotal: obras.reduce((sum, o) => sum + (o.gasto_atual || 0), 0),
      progressoMedio: obras.length > 0 
        ? obras.reduce((sum, o) => sum + (o.progresso_fisico || 0), 0) / obras.length 
        : 0
    };
  }

  // Listener para mudanças em tempo real
  onObrasChange(callback: (obras: Obra[]) => void): () => void {
    const subscription = supabase
      .channel('obras_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'obras' }, 
        async () => {
          const obras = await this.getAllObras();
          callback(obras);
        }
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }

  // Formatar dados do banco
  private formatObrasData(data: any[]): Obra[] {
    return data.map(item => ({
      id: item.id,
      nome: item.nome,
      cliente: item.cliente,
      status: item.status,
      localizacao: item.localizacao,
      dataInicio: item.data_inicio,
      previsaoTermino: item.previsao_termino,
      orcamentoTotal: item.orcamento_total,
      gastoAtual: item.gasto_atual,
      progressoFisico: item.progresso_fisico,
      equipe: item.equipe,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    }));
  }
}

export const obrasService = new ObrasService();