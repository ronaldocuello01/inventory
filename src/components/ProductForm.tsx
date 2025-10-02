import React from 'react';
// import type { Product } from '../features/products/productsSlice'; // Importa el tipo Product
import './styles/ProductForm.css';
import type { Category } from '../features/categories/categoriesSlice';

interface ProductFormProps {
    name: string;
    setName: (value: string) => void;
    price: number;
    setPrice: (value: number) => void;
    stock: number;
    setStock: (value: number) => void;
    productCategory: number;
    setProductCategory: (value: number) => void;
    editId: number | null;
    handleSubmit: (e: React.FormEvent) => void;
    categories: Category[];
    categoriesLoading: boolean;
}

export default function ProductForm({
    name, setName, price, setPrice, stock, setStock, productCategory, setProductCategory, editId, handleSubmit, categories, categoriesLoading
}: ProductFormProps) {

    return (
        <div className="product-form-card">
            <h2>{editId ? "Editar Producto" : "Nuevo Producto"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="name">Nombre:</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Precio:</label>
                        <input
                            id="price"
                            type="number"
                            step="0.01" // Permite decimales para el precio
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stock">Stock:</label>
                        <input
                            id="stock"
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(Number(e.target.value))}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Categoría:</label>
                        <select
                            id="category"
                            value={productCategory}
                            onChange={(e) => setProductCategory(Number(e.target.value))}
                            required
                            disabled={categoriesLoading}
                        >
                            <option value={0} disabled>
                                {categoriesLoading ? "Cargando..." : "Seleccione una categoría"}
                            </option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>


                </div>
                <button type="submit" className="form-submit-button">
                    {editId ? "Actualizar Producto" : "Crear Producto"}
                </button>
            </form>
        </div>
    );
}



{/* <div className="form-group">
    <label htmlFor="category">Categoria ID:</label>
    <input
        id="category"
        type="number"
        value={productCategory}
        onChange={(e) => setProductCategory(Number(e.target.value))}
        required
    />
</div> */}