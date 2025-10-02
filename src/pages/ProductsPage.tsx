import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../features/products/productsSlice";

import type { Product } from "../features/products/productsSlice";
import ProductForm from "../components/ProductForm"; // Componente Formulario
import ProductTable from "../components/ProductTable"; // Componente Tabla
import './styles/ProductPage.css'; // Estilos globales de la página

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  // El tipo de 'state' se infiere mejor, pero lo mantendremos explícito si es necesario
  const { items, loading, error } = useAppSelector((state) => state.products);

  // Estados del formulario
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [productCategory, setProductCategory] = useState<number>(0);
  const [editId, setEditId] = useState<number | null>(null);

  // Carga inicial de datos
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Manejador de envío de formulario (Crear/Actualizar)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
  if (loading) return <p className="products-page-container">Cargando productos...</p>;
  if (error) return <p className="products-page-container" style={{ color: 'red' }}>Error al cargar: {error}</p>;

  return (
    <div className="products-page-container">
      {/* Componente de Formulario */}
      <ProductForm 
        name={name} setName={setName}
        price={price} setPrice={setPrice}
        stock={stock} setStock={setStock}
        productCategory={productCategory} setProductCategory={setProductCategory}
        editId={editId}
        handleSubmit={handleSubmit}
      />

      {/* Componente de Tabla */}
      <ProductTable 
        items={items}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}




/*
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../features/products/productsSlice";

import type { Product } from "../features/products/productsSlice";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.products);

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [productCategory, setProductCategory] = useState<number>(0);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      dispatch(updateProduct({ id: editId, name, price, stock, productCategory: productCategory }));
    } else {
      dispatch(createProduct({ name, price, stock, productCategory: productCategory }));
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
    dispatch(deleteProduct(id));
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>{editId ? "Editar Producto" : "Nuevo Producto"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Categoria ID:</label>
          <input
            type="number"
            value={productCategory}
            onChange={(e) => setProductCategory(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          {editId ? "Actualizar" : "Crear"}
        </button>
      </form>

      <h2 style={{ marginTop: "40px" }}>Productos</h2>
      <ul>
        {items.map((product) => (
          <li key={product.id} style={{ marginBottom: "10px" }}>
            {product.id} - {product.name} - ${product.price} - CatID: {product.productCategory}
            <button
              onClick={() => handleEdit(product)}
              style={{ marginLeft: "10px" }}
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              style={{ marginLeft: "5px" }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
*/