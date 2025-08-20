import { useState, useEffect } from 'react';
import { obrasService } from '../services/obrasService';
import { Obra, NovaObra, StatusObra, ObrasStats } from '../types/obra';

interface UseObrasOptions {
  realTime?: boolean;
  autoLoad?: boolean;
}

interface UseObrasReturn {
  obras: Obra[];
  loading: boolean;
  error: string | null;
  loadObras: () => Promise<void>;
  searchObras: (searchTerm?: string, statusFilter?: StatusObra | null) => Promise<void>;
  createObra: (obraData: NovaObra) => Promise<string>;
  updateObra: (id: string, obraData: Partial<Obra>) => Promise<void>;
  deleteObra: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export const useObras = (options: UseObrasOptions = {}): UseObrasReturn => {
  const { realTime = false, autoLoad = true } = options;
  
  const [obras, setObras] = useState<Obra[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar obras
  const loadObras = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const obrasData = await obrasService.getAllObras();
      setObras(obrasData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Erro ao carregar obras:', err);
    } finally {
      setLoading(false);
    }
  };

  // Pesquisar obras
  const searchObras = async (
    searchTerm?: string, 
    statusFilter?: StatusObra | null
  ): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const obrasData = await obrasService.searchObras({
        searchTerm,
        statusFilter
      });
      setObras(obrasData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro na pesquisa';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Criar obra
  const createObra = async (obraData: NovaObra): Promise<string> => {
    try {
      const novoId = await obrasService.createObra(obraData);
      await loadObras(); // Recarrega a lista
      return novoId;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar obra';
      setError(errorMessage);
      throw err;
    }
  };

  // Atualizar obra
  const updateObra = async (id: string, obraData: Partial<Obra>): Promise<void> => {
    try {
      await obrasService.updateObra(id, obraData);
      await loadObras(); // Recarrega a lista
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar obra';
      setError(errorMessage);
      throw err;
    }
  };

  // Deletar obra
  const deleteObra = async (id: string): Promise<void> => {
    try {
      await obrasService.deleteObra(id);
      await loadObras(); // Recarrega a lista
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar obra';
      setError(errorMessage);
      throw err;
    }
  };

  // Effect para carregar dados
  useEffect(() => {
    if (!autoLoad) return;

    if (realTime) {
      // Listener em tempo real
      const unsubscribe = obrasService.onObrasChange((obrasData: Obra[]) => {
        setObras(obrasData);
        setLoading(false);
      });
      
      return () => unsubscribe();
    } else {
      // Carregamento único
      loadObras();
    }
  }, [realTime, autoLoad]);

  return {
    obras,
    loading,
    error,
    loadObras,
    searchObras,
    createObra,
    updateObra,
    deleteObra,
    refresh: loadObras
  };
};

// Hook específico para estatísticas
interface UseObrasStatsReturn {
  stats: ObrasStats | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const useObrasStats = (): UseObrasStatsReturn => {
  const [stats, setStats] = useState<ObrasStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadStats = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const statsData = await obrasService.getEstatisticas();
      setStats(statsData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar estatísticas';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return { stats, loading, error, refresh: loadStats };
};