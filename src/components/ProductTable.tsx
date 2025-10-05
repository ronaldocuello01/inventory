import { fetchProducts, fetchProductsByName, type Product } from '../features/products/productsSlice';
import { type Category } from '../features/categories/categoriesSlice';
import './styles/ProductTable.css'; // Importa los estilos
import { ROLES } from '../config/constants';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import { useEffect, useState } from 'react';

interface ProductTableProps {
    handleEdit: (product: Product) => void;
    handleDelete: (id: number) => void;
}

export default function ProductTable({ handleEdit, handleDelete }: ProductTableProps) {

    const dispatch = useAppDispatch();

    const { items } = useAppSelector((state: any) => state.products);


    const { items: categories } = useAppSelector((state: any) => state.categories);
    const { loggedUser } = useAppSelector((state) => state.users);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);


	const [filterProductName, setFilterProductName] = useState("");

	useEffect(() => {
		const searchText = filterProductName.trim();
		const delaySearch = setTimeout(() => {
			if (searchText.length > 0) {
				dispatch(fetchProductsByName(searchText));
			} else {
                dispatch(fetchProducts());
			}
		}, 300);
		return () => clearTimeout(delaySearch);
	}, [filterProductName, dispatch]);
    

    return (
        <div className="product-table-container">
            <h2>Inventario de Productos ({items.length})</h2>
            <div className="form-group">
                <label htmlFor="productName">Buscar Producto por Nombre::</label>
                <input
                    id="productName"
                    type="text"
                    value={filterProductName}
                    onChange={(e) => setFilterProductName(e.target.value)}
                    required
                />
            </div>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Categoría ID</th>
                        {(loggedUser?.role == ROLES.ADMIN || loggedUser?.role == ROLES.OPERATOR) && (<th>Acciones</th>)}
                    </tr>
                </thead>
                <tbody>
                    {items.map((product: Product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.stock}</td>
                            <td>{categories.filter((c: Category) => c.id == product.productCategory)[0].name}</td>
                            {
                                (loggedUser?.role == ROLES.ADMIN || loggedUser?.role == ROLES.OPERATOR) && (
                                    <td>
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="action-button edit"
                                        >
                                            Editar
                                        </button>
                                        {
                                            (loggedUser?.role == ROLES.ADMIN) && (
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="action-button delete"
                                                >
                                                    Eliminar
                                                </button>
                                            )
                                        }
                                    </td>
                                )
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
            {items.length === 0 && <p style={{ textAlign: 'center', marginTop: '20px', color: '#718096' }}>No hay productos en el inventario.</p>}
        </div>
    );
}