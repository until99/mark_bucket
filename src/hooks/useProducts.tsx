import { useState, useEffect } from "react";
import supabase from "../services/supabase";
import type { IProduct } from "../interfaces/IProducts";

export const useProducts = () => {
    const [productsList, setProductsList] = useState<IProduct[]>([]);

    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("purchased", false);

        if (error) {
            console.error("Erro ao buscar produtos:", error);
            return;
        }

        setProductsList(
            data
                .map((item) => ({
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    brand: item.brand,
                    price: item.price,
                    purchased: item.purchased,
                    created_at: item.created_at,
                    updated_at: item.updated_at,
                }))
                .sort((a, b) => a.id - b.id)
        );
    };

    const addProduct = async (productData: {
        name: string;
        quantity: number;
        brand: string;
        price: number;
        purchased: boolean;
    }) => {
        const { error } = await supabase.from("products").insert([productData]);

        if (error) {
            console.error("Erro ao adicionar produto:", error);
            return false;
        }

        await fetchProducts();
        return true;
    };

    const markProductsAsPurchased = async (productIds: number[]) => {
        if (productIds.length === 0) return true;

        const { error } = await supabase
            .from("products")
            .update({ purchased: true, updated_at: new Date() })
            .in("id", productIds);

        if (error) {
            console.error("Erro ao atualizar produtos:", error);
            return false;
        }

        const updatedList = productsList.filter(
            (product) => !productIds.includes(product.id)
        );
        setProductsList(updatedList);
        return true;
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return {
        productsList,
        fetchProducts,
        addProduct,
        markProductsAsPurchased,
    };
};
