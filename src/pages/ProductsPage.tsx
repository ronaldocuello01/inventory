import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../features/products/productsSlice";
import { fetchCategories } from "../features/categories/categoriesSlice";

import type { Product } from "../features/products/productsSlice";
import ProductForm from "../components/ProductForm"; // Componente Formulario
import ProductTable from "../components/ProductTable"; // Componente Tabla
import './styles/ProductPage.css'; // Estilos globales de la página
import { ROLES } from "../config/constants";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  // El tipo de 'state' se infiere mejor, pero lo mantendremos explícito si es necesario
  // const { items, loading, error } = useAppSelector((state) => state.products);

  // 🎯 Obtener el estado de productos
  const { items: products, loading: productsLoading, error: productsError } = useAppSelector((state: any) => state.products);

  // 🎯 Obtener el estado y los items de categorías
  const { items: categories, loading: categoriesLoading, error: categoriesError } = useAppSelector((state: any) => state.categories);

  const { loggedUser } = useAppSelector((state) => state.users);

  // Estados del formulario
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [productCategory, setProductCategory] = useState<number>(0);
  const [editId, setEditId] = useState<number | null>(null);

  // Carga inicial de datos
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Manejador de envío de formulario (Crear/Actualizar)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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

    // Resetear formulario
    setName("");
    setPrice(0);
    setStock(0);
    setProductCategory(0);
    setEditId(null);
  };

  // Manejador para iniciar la edición
  const handleEdit = (product: Product) => {
    setName(product.name);
    setPrice(product.price);
    setStock(product.stock);
    setProductCategory(product.productCategory);
    setEditId(product.id);
  };

  // Manejador para eliminar
  const handleDelete = (id: number) => {
    // Es buena práctica pedir confirmación
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      dispatch(deleteProduct(id));
    }
  };

  // Estado de Carga y Error
  // if (loading) return <p className="products-page-container">Cargando productos...</p>;
  // if (error) return <p className="products-page-container" style={{ color: 'red' }}>Error al cargar: {error}</p>;

  if (productsLoading || categoriesLoading) return <p className="products-page-container">Cargando datos...</p>;
  if (productsError || categoriesError) return <p className="products-page-container" style={{ color: 'red' }}>Error: {productsError || categoriesError}</p>;

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
            categories={categories}
            categoriesLoading={categoriesLoading}
          />
        )
      }


      {/* Componente de Tabla */}
      <ProductTable
        items={products}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}
