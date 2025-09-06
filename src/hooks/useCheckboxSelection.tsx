import { useState } from "react";

export const useCheckboxSelection = () => {
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<number[]>([]);
    const [initialSelectedCheckboxes, setInitialSelectedCheckboxes] = useState<number[]>([]);
    const [isFooterVisible, setIsFooterVisible] = useState(false);

    const handleCheckboxChange = (id: number, checked: boolean) => {
        let updated;

        if (checked) {
            updated = [...selectedCheckboxes, id];
        } else {
            updated = selectedCheckboxes.filter((item) => item !== id);
        }

        setSelectedCheckboxes(updated);

        const hasChanges =
            JSON.stringify(updated.sort()) !== JSON.stringify(initialSelectedCheckboxes.sort());
        setIsFooterVisible(hasChanges);
    };

    const resetSelection = () => {
        setSelectedCheckboxes([]);
        setInitialSelectedCheckboxes([]);
        setIsFooterVisible(false);
    };

    return {
        selectedCheckboxes,
        isFooterVisible,
        handleCheckboxChange,
        resetSelection,
        setInitialSelectedCheckboxes,
    };
};