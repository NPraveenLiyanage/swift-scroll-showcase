
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
