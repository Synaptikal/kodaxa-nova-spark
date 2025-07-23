export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      add_ons: {
        Row: {
          active: boolean | null
          category: string | null
          created_at: string
          description: string | null
          features: Json | null
          id: string
          name: string
          price_monthly: number | null
          stripe_price_id: string | null
        }
        Insert: {
          active?: boolean | null
          category?: string | null
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          name: string
          price_monthly?: number | null
          stripe_price_id?: string | null
        }
        Update: {
          active?: boolean | null
          category?: string | null
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          name?: string
          price_monthly?: number | null
          stripe_price_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company_name: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          linkedin_url: string | null
          phone: string | null
          role: string | null
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company_name?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          linkedin_url?: string | null
          phone?: string | null
          role?: string | null
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company_name?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          linkedin_url?: string | null
          phone?: string | null
          role?: string | null
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          annual_billing: boolean | null
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_id: string | null
          subscription_status: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          annual_billing?: boolean | null
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_id?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          annual_billing?: boolean | null
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_id?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      subscription_limits: {
        Row: {
          ai_processing_limit: number | null
          api_calls_limit: number | null
          business_analysis_limit: number | null
          compliance_assessment_limit: number | null
          features: Json | null
          patent_search_limit: number | null
          storage_limit_gb: number | null
          team_members_limit: number | null
          tier: string
        }
        Insert: {
          ai_processing_limit?: number | null
          api_calls_limit?: number | null
          business_analysis_limit?: number | null
          compliance_assessment_limit?: number | null
          features?: Json | null
          patent_search_limit?: number | null
          storage_limit_gb?: number | null
          team_members_limit?: number | null
          tier: string
        }
        Update: {
          ai_processing_limit?: number | null
          api_calls_limit?: number | null
          business_analysis_limit?: number | null
          compliance_assessment_limit?: number | null
          features?: Json | null
          patent_search_limit?: number | null
          storage_limit_gb?: number | null
          team_members_limit?: number | null
          tier?: string
        }
        Relationships: []
      }
      usage_tracking: {
        Row: {
          billing_period: string | null
          cost_per_unit: number | null
          created_at: string
          id: string
          metadata: Json | null
          quantity: number | null
          service_type: string
          total_cost: number | null
          user_id: string | null
        }
        Insert: {
          billing_period?: string | null
          cost_per_unit?: number | null
          created_at?: string
          id?: string
          metadata?: Json | null
          quantity?: number | null
          service_type: string
          total_cost?: number | null
          user_id?: string | null
        }
        Update: {
          billing_period?: string | null
          cost_per_unit?: number | null
          created_at?: string
          id?: string
          metadata?: Json | null
          quantity?: number | null
          service_type?: string
          total_cost?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_add_ons: {
        Row: {
          active: boolean | null
          add_on_id: string | null
          created_at: string
          id: string
          stripe_subscription_id: string | null
          user_id: string | null
        }
        Insert: {
          active?: boolean | null
          add_on_id?: string | null
          created_at?: string
          id?: string
          stripe_subscription_id?: string | null
          user_id?: string | null
        }
        Update: {
          active?: boolean | null
          add_on_id?: string | null
          created_at?: string
          id?: string
          stripe_subscription_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_add_ons_add_on_id_fkey"
            columns: ["add_on_id"]
            isOneToOne: false
            referencedRelation: "add_ons"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
