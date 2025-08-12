import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Database = {
  public: {
    Tables: {
      about: {
        Row: {
          id: number
          name: string
          tagline: string
          description: string
          photo: string | null
          resume: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          tagline: string
          description: string
          photo?: string | null
          resume?: string | null
        }
        Update: {
          name?: string
          tagline?: string
          description?: string
          photo?: string | null
          resume?: string | null
        }
      }
      skills: {
        Row: {
          id: number
          name: string
          level: number
          category: string
          created_at: string
        }
        Insert: {
          name: string
          level: number
          category: string
        }
        Update: {
          name?: string
          level?: number
          category?: string
        }
      }
      projects: {
        Row: {
          id: number
          title: string
          description: string
          image: string | null
          tech_stack: string[]
          live_url: string | null
          github_url: string | null
          featured: boolean
          created_at: string
        }
        Insert: {
          title: string
          description: string
          image?: string | null
          tech_stack: string[]
          live_url?: string | null
          github_url?: string | null
          featured?: boolean
        }
        Update: {
          title?: string
          description?: string
          image?: string | null
          tech_stack?: string[]
          live_url?: string | null
          github_url?: string | null
          featured?: boolean
        }
      }
      clients: {
        Row: {
          id: number
          name: string
          company: string
          testimonial: string
          photo: string | null
          created_at: string
        }
        Insert: {
          name: string
          company: string
          testimonial: string
          photo?: string | null
        }
        Update: {
          name?: string
          company?: string
          testimonial?: string
          photo?: string | null
        }
      }
      contact_info: {
        Row: {
          id: number
          email: string
          phone: string
          location: string
          linkedin: string | null
          github: string | null
          twitter: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          email: string
          phone: string
          location: string
          linkedin?: string | null
          github?: string | null
          twitter?: string | null
        }
        Update: {
          email?: string
          phone?: string
          location?: string
          linkedin?: string | null
          github?: string | null
          twitter?: string | null
        }
      }
      messages: {
        Row: {
          id: number
          name: string
          email: string
          subject: string
          message: string
          read: boolean
          created_at: string
        }
        Insert: {
          name: string
          email: string
          subject: string
          message: string
          read?: boolean
        }
        Update: {
          read?: boolean
        }
      }
    }
  }
}