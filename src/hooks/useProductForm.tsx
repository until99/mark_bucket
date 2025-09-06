import { useState } from "react";

export const useProductForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddProduct = async (
        event: React.FormEvent<HTMLFormElement>,
        onSubmit: (productData: {
            name: string;
            quantity: number;
            brand: string;
            price: number;
            purchased: boolean;
        }) => Promise<boolean>,
        onSuccess?: () => void
    ) => {
        event.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);

        const form = event.currentTarget;
        const formData = new FormData(form);

        const priceValue = formData.get("preco") as string;
        const parsedPrice = parseFloat(priceValue);

        const productData = {
            name: formData.get("nome") as string,
            quantity: parseInt(formData.get("quantidade") as string),
            brand: formData.get("marca") as string,
            price: isNaN(parsedPrice) ? 0 : parsedPrice,
            purchased: false,
        };

        try {
            const success = await onSubmit(productData);

            if (success) {
                form.reset();
                onSuccess?.();
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        isSubmitting,
        handleAddProduct,
    };
};
