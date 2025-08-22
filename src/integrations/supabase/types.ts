export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      compras: {
        Row: {
          created_at: string
          data_pedido: string
          fornecedor: string | null
          id: string
          itens_quantidade: number | null
          numero: string
          obra_id: string | null
          observacoes: string | null
          prazo_entrega: string | null
          solicitante: string
          status: Database["public"]["Enums"]["compra_status"]
          tipo: Database["public"]["Enums"]["compra_tipo"]
          updated_at: string
          valor: number | null
        }
        Insert: {
          created_at?: string
          data_pedido?: string
          fornecedor?: string | null
          id?: string
          itens_quantidade?: number | null
          numero: string
          obra_id?: string | null
          observacoes?: string | null
          prazo_entrega?: string | null
          solicitante: string
          status?: Database["public"]["Enums"]["compra_status"]
          tipo?: Database["public"]["Enums"]["compra_tipo"]
          updated_at?: string
          valor?: number | null
        }
        Update: {
          created_at?: string
          data_pedido?: string
          fornecedor?: string | null
          id?: string
          itens_quantidade?: number | null
          numero?: string
          obra_id?: string | null
          observacoes?: string | null
          prazo_entrega?: string | null
          solicitante?: string
          status?: Database["public"]["Enums"]["compra_status"]
          tipo?: Database["public"]["Enums"]["compra_tipo"]
          updated_at?: string
          valor?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "compras_obra_id_fkey"
            columns: ["obra_id"]
            isOneToOne: false
            referencedRelation: "obras"
            referencedColumns: ["id"]
          },
        ]
      }
      fornecedores: {
        Row: {
          cep: string | null
          cidade: string | null
          cnpj: string | null
          contato_principal: string | null
          created_at: string
          email: string | null
          endereco: string | null
          estado: string | null
          id: string
          nome: string
          telefone: string | null
          updated_at: string
        }
        Insert: {
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          contato_principal?: string | null
          created_at?: string
          email?: string | null
          endereco?: string | null
          estado?: string | null
          id?: string
          nome: string
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          contato_principal?: string | null
          created_at?: string
          email?: string | null
          endereco?: string | null
          estado?: string | null
          id?: string
          nome?: string
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      funcionarios: {
        Row: {
          created_at: string
          data_admissao: string | null
          email: string | null
          funcao: string
          horas_hoje: number | null
          id: string
          localizacao: string | null
          nome: string
          obra_id: string | null
          salario: number | null
          status: Database["public"]["Enums"]["funcionario_status"]
          telefone: string | null
          tipo: Database["public"]["Enums"]["funcionario_tipo"]
          ultimo_ponto: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          data_admissao?: string | null
          email?: string | null
          funcao: string
          horas_hoje?: number | null
          id?: string
          localizacao?: string | null
          nome: string
          obra_id?: string | null
          salario?: number | null
          status?: Database["public"]["Enums"]["funcionario_status"]
          telefone?: string | null
          tipo?: Database["public"]["Enums"]["funcionario_tipo"]
          ultimo_ponto?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          data_admissao?: string | null
          email?: string | null
          funcao?: string
          horas_hoje?: number | null
          id?: string
          localizacao?: string | null
          nome?: string
          obra_id?: string | null
          salario?: number | null
          status?: Database["public"]["Enums"]["funcionario_status"]
          telefone?: string | null
          tipo?: Database["public"]["Enums"]["funcionario_tipo"]
          ultimo_ponto?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "funcionarios_obra_id_fkey"
            columns: ["obra_id"]
            isOneToOne: false
            referencedRelation: "obras"
            referencedColumns: ["id"]
          },
        ]
      }
      obras: {
        Row: {
          cliente: string
          created_at: string
          data_inicio: string
          equipe: number
          gasto_atual: number
          id: string
          localizacao: string
          nome: string
          orcamento_total: number
          previsao_termino: string
          progresso_fisico: number
          status: Database["public"]["Enums"]["status_obra"]
          updated_at: string
        }
        Insert: {
          cliente: string
          created_at?: string
          data_inicio: string
          equipe?: number
          gasto_atual?: number
          id?: string
          localizacao: string
          nome: string
          orcamento_total?: number
          previsao_termino: string
          progresso_fisico?: number
          status?: Database["public"]["Enums"]["status_obra"]
          updated_at?: string
        }
        Update: {
          cliente?: string
          created_at?: string
          data_inicio?: string
          equipe?: number
          gasto_atual?: number
          id?: string
          localizacao?: string
          nome?: string
          orcamento_total?: number
          previsao_termino?: string
          progresso_fisico?: number
          status?: Database["public"]["Enums"]["status_obra"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      compra_status:
        | "pendente"
        | "aprovado"
        | "em_entrega"
        | "entregue"
        | "cancelado"
      compra_tipo: "requisicao" | "pedido_compra" | "contrato"
      funcionario_status: "em_campo" | "folga" | "ausente" | "ferias"
      funcionario_tipo: "clt" | "pj" | "terceirizado"
      status_obra:
        | "ativa"
        | "pausada"
        | "concluida"
        | "cancelada"
        | "planejamento"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      compra_status: [
        "pendente",
        "aprovado",
        "em_entrega",
        "entregue",
        "cancelado",
      ],
      compra_tipo: ["requisicao", "pedido_compra", "contrato"],
      funcionario_status: ["em_campo", "folga", "ausente", "ferias"],
      funcionario_tipo: ["clt", "pj", "terceirizado"],
      status_obra: [
        "ativa",
        "pausada",
        "concluida",
        "cancelada",
        "planejamento",
      ],
    },
  },
} as const
