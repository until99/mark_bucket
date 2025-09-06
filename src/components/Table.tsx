import { type IProduct } from "../interfaces/IProducts";
import { formatPrice, formatDate } from "../utils/formatters";

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
    columns?: string[];
    data: IProduct[];
    onCheckboxChange?: (id: number, checked: boolean) => void;
    selectedCheckboxes?: number[];
}

const TableData = ({ column, row }: { column: string; row: IProduct }) => {
    const formatValue = (column: string, row: IProduct) => {
        switch (column) {
            case 'price':
                return formatPrice(row.price);
            case 'created_at':
                return formatDate(row.created_at);
            case 'updated_at':
                return formatDate(row.updated_at);
            default:
                return row[column as keyof IProduct];
        }
    };

    return (
        <>
            <td style={row.purchased ? { textDecoration: "line-through" } : {}}>
                {formatValue(column, row)}
            </td>
        </>
    );
}


export const Table = ({ data, columns = [], onCheckboxChange, selectedCheckboxes = [], ...props }: TableProps) => {
    return (
        <table {...props}>
            <thead>
                {data.length > 0 && (
                    <tr>
                        {columns?.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))}
                    </tr>
                )}
            </thead>
            <tbody>
                {data.map((row, rowIndex) => {
                    return (
                        <tr key={rowIndex}>
                            <TableData column="name" row={row} />
                            <TableData column="quantity" row={row} />
                            <TableData column="brand" row={row} />
                            <TableData column="price" row={row} />
                            <td>
                                <input
                                    type="checkbox"
                                    name={`produto${row.id}`}
                                    id={`produto${row.id}`}
                                    checked={selectedCheckboxes.includes(row.id)}
                                    onChange={(e) =>
                                        onCheckboxChange?.(row.id, e.target.checked)
                                    }
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
            <tfoot>
                {data.length > 0 && (
                    <tr>
                        <td colSpan={4}><strong>Total:</strong></td>
                        <td><strong>{formatPrice(data.reduce((total, product) => total + product.price, 0))}</strong></td>
                    </tr>
                )}
            </tfoot>
        </table>
    );
};
