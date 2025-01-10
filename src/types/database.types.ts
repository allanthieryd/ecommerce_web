export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      categories: {
        Row: {
          date_creation: string | null
          date_modification: string | null
          id_categorie: number
          nom: string
        }
        Insert: {
          date_creation?: string | null
          date_modification?: string | null
          id_categorie?: number
          nom: string
        }
        Update: {
          date_creation?: string | null
          date_modification?: string | null
          id_categorie?: number
          nom?: string
        }
        Relationships: []
      }
      produits: {
        Row: {
          caracteristiques_techniques: string | null
          date_creation: string | null
          date_modification: string | null
          description: string | null
          disponibilite: boolean | null
          duree_abonnement: number | null
          id_produit: number
          image_url: string | null
          nom: string | null
          nom_categorie: string | null
          tarif_annuel: number | null
          tarif_appareil: number | null
          tarif_mensuel: number | null
          tarif_utilisateur: number | null
        }
        Insert: {
          caracteristiques_techniques?: string | null
          date_creation?: string | null
          date_modification?: string | null
          description?: string | null
          disponibilite?: boolean | null
          duree_abonnement?: number | null
          id_produit?: number
          image_url?: string | null
          nom?: string | null
          nom_categorie?: string | null
          tarif_annuel?: number | null
          tarif_appareil?: number | null
          tarif_mensuel?: number | null
          tarif_utilisateur?: number | null
        }
        Update: {
          caracteristiques_techniques?: string | null
          date_creation?: string | null
          date_modification?: string | null
          description?: string | null
          disponibilite?: boolean | null
          duree_abonnement?: number | null
          id_produit?: number
          image_url?: string | null
          nom?: string | null
          nom_categorie?: string | null
          tarif_annuel?: number | null
          tarif_appareil?: number | null
          tarif_mensuel?: number | null
          tarif_utilisateur?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "produits_nom_categorie_fkey"
            columns: ["nom_categorie"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["nom"]
          },
        ]
      }
      utilisateurs: {
        Row: {
          date_creation: string | null
          email: string
          id_utilisateur: string
          nom: string
          prenom: string
          role: string | null
        }
        Insert: {
          date_creation?: string | null
          email: string
          id_utilisateur: string
          nom: string
          prenom: string
          role?: string | null
        }
        Update: {
          date_creation?: string | null
          email?: string
          id_utilisateur?: string
          nom?: string
          prenom?: string
          role?: string | null
        }
        Relationships: []
      }
      contact: {
        row: {
          id_message: string
          nom: string
          prenom: string
          email: string
          created_at: string | null
          num: string
          message: string
        }
        insert: {
          id_message: number
          nom: string
          prenom: string
          email: string
          num: string
          message: string
          created_at: string | null
        }
        update: {
          id_message: number
          nom: string
          prenom: string
          email: string
          num: string
          message: string
          created_at: string | null
        }
        relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
