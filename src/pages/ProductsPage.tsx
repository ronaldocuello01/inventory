import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import {
	createProduct,
	updateProduct,
	deleteProduct,
} from "../features/products/productsSlice";

import type { Product } from "../features/products/productsSlice";
import ProductForm from "../components/ProductForm"; // Componente Formulario
import ProductTable from "../components/ProductTable"; // Componente Tabla
import './styles/ProductPage.css'; // Estilos globales de la página
import { ROLES } from "../config/constants";

export default function ProductsPage() {
    const dispatch = useAppDispatch();

	const { loggedUser } = useAppSelector((state) => state.users);


	const [name, setName] = useState("");
	const [price, setPrice] = useState<number>(0);
	const [stock, setStock] = useState<number>(0);
	const [productCategory, setProductCategory] = useState<number>(0);
	const [editId, setEditId] = useState<number | null>(null);




	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (price <= 0) {
			alert("Debe colocar un precio válido.");
			return;
		}

		if (stock < 0) {
			alert("Debe colocar un stock válido.");
			return;
		}

		if (!productCategory) {
			alert("Debe seleccionar una Categoría válida para el producto.");
			return;
		}

		const productData = { name, price, stock, productCategory };

		if (editId) {
			dispatch(updateProduct({ id: editId, ...productData }));
		} else {
			dispatch(createProduct(productData));
		}

		setName("");
		setPrice(0);
		setStock(0);
		setProductCategory(0);
		setEditId(null);
	};

	const handleEdit = (product: Product) => {
		setName(product.name);
		setPrice(product.price);
		setStock(product.stock);
		setProductCategory(product.productCategory);
		setEditId(product.id);
	};

	const handleDelete = (id: number) => {
		if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
			dispatch(deleteProduct(id));
		}
	};

	// if (productsLoading || categoriesLoading) return <p className="products-page-container">Cargando datos...</p>;
	// if (productsError || categoriesError) return <p className="products-page-container" style={{ color: 'red' }}>Error: {productsError || categoriesError}</p>;

	return (
		<div className="products-page-container">
			{
				(loggedUser?.role == ROLES.ADMIN || loggedUser?.role == ROLES.OPERATOR) && (
					/* Componente de Formulario */
					< ProductForm
						name={name} setName={setName}
						price={price} setPrice={setPrice}
						stock={stock} setStock={setStock}
						productCategory={productCategory} setProductCategory={setProductCategory}
						editId={editId}
						handleSubmit={handleSubmit}
					/>
				)
			}


			{/* Componente de Tabla */}
			<ProductTable
				handleEdit={handleEdit}
				handleDelete={handleDelete}
			/>
		</div>
	);
}
