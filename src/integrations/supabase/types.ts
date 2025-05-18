export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      about_me: {
        Row: {
          bio: string
          created_at: string
          email: string | null
          full_name: string
          headline: string
          id: string
          location: string | null
          phone: string | null
          profile_pic_url: string | null
          resume_url: string | null
          updated_at: string
        }
        Insert: {
          bio: string
          created_at?: string
          email?: string | null
          full_name: string
          headline: string
          id?: string
          location?: string | null
          phone?: string | null
          profile_pic_url?: string | null
          resume_url?: string | null
          updated_at?: string
        }
        Update: {
          bio?: string
          created_at?: string
          email?: string | null
          full_name?: string
          headline?: string
          id?: string
          location?: string | null
          phone?: string | null
          profile_pic_url?: string | null
          resume_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      admin_access: {
        Row: {
          id: string
          last_updated: string
          password_hash: string
        }
        Insert: {
          id?: string
          last_updated?: string
          password_hash: string
        }
        Update: {
          id?: string
          last_updated?: string
          password_hash?: string
        }
        Relationships: []
      }
      certifications: {
        Row: {
          created_at: string
          date: string
          details: string | null
          id: string
          image_url: string | null
          issuer: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          details?: string | null
          id?: string
          image_url?: string | null
          issuer: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          details?: string | null
          id?: string
          image_url?: string | null
          issuer?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          read: boolean | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          read?: boolean | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          read?: boolean | null
        }
        Relationships: []
      }
      experiences: {
        Row: {
          company: string
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          is_current: boolean | null
          location: string | null
          start_date: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          company: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          location?: string | null
          start_date: string
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          location?: string | null
          start_date?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          challenges: string | null
          created_at: string
          description: string
          full_description: string | null
          id: string
          image_url: string | null
          link: string | null
          tags: string[]
          technologies: string[]
          title: string
          updated_at: string
        }
        Insert: {
          challenges?: string | null
          created_at?: string
          description: string
          full_description?: string | null
          id?: string
          image_url?: string | null
          link?: string | null
          tags: string[]
          technologies: string[]
          title: string
          updated_at?: string
        }
        Update: {
          challenges?: string | null
          created_at?: string
          description?: string
          full_description?: string | null
          id?: string
          image_url?: string | null
          link?: string | null
          tags?: string[]
          technologies?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author: string
          created_at: string
          id: string
          image_url: string | null
          role: string
          text: string
          updated_at: string
        }
        Insert: {
          author: string
          created_at?: string
          id?: string
          image_url?: string | null
          role: string
          text: string
          updated_at?: string
        }
        Update: {
          author?: string
          created_at?: string
          id?: string
          image_url?: string | null
          role?: string
          text?: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
