import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Product {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  quantity: number;
  brand: string;
  price: number;
  purchased: boolean;
}

interface Database {
  public: {
    Products: {
      Row: {
        // the data expected from .select()
        id: number;
        created_at: Date;
        updated_at: Date;
        name: string;
        quantity: number;
        brand: string;
        price: number;
        purchased: boolean;
      };
      Insert: {
        // the data expected from .insert()
        created_at: Date;
        updated_at: Date;
        name: string;
        quantity: number;
        brand: string;
        price: number;
        purchased: boolean;
      };
      Update: {
        // the data to be passed to .update()
        created_at?: Date;
        updated_at?: Date;
        name?: string;
        quantity?: number;
        brand?: string;
        price?: number;
        purchased?: boolean;
      };
    };
  };
}

export default supabase;
export type { Product, Database };
