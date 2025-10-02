import type { Product } from '../features/products/productsSlice'; // Importa el tipo Product
import './styles/ProductTable.css'; // Importa los estilos

interface ProductTableProps {
    items: Product[];
    handleEdit: (product: Product) => void;
    handleDelete: (id: number) => void;
}

export default function ProductTable({ items, handleEdit, handleDelete }: ProductTableProps) {
    return (
        <div className="product-table-container">
            <h2>Inventario de Productos ({items.length})</h2>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Categoría ID</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.stock}</td>
                            <td>{product.productCategory}</td>
                            <td>
                                <button
                                    onClick={() => handleEdit(product)}
                                    className="action-button edit"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="action-button delete"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {items.length === 0 && <p style={{ textAlign: 'center', marginTop: '20px', color: '#718096' }}>No hay productos en el inventario.</p>}
        </div>
    );
}