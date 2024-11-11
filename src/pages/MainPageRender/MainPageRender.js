import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";
import MainPage from '../MainPage/MainPage';
import ProductCategory from '../../components/ProductCategory/ProductCategory';
import Category from '../../components/Category/Category';
import Loading from '../../components/Loading/Loading';

function MainPageRender() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await api.get('/category');
      setCategories(response.data);
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCategories();
  }, []);

  const addCategory = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const removeProduct = (productId) => {
    setProducts((prevProducts) => prevProducts.filter(product => product.product_id !== productId));
  };

  const updateProduct = (productId, updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.product_id === productId ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const updateCategory = (categoryId, newCategoryName, newCategoryImage) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.category_id === categoryId
          ? { ...category, category_name: newCategoryName, category_image: newCategoryImage }
          : category
      )
    );
  };

  const removeCategory = (categoryId) => {
    setCategories((prevCategories) => prevCategories.filter(
      category => category.category_id !== categoryId
    ));
  };

  const handleClickShow = (categoryId) => {
    navigate(`/buyandsell/${categoryId}`);
  };

  return (
    <MainPage title="Produtos">
      {loading ? (
        <Loading />
      ) : (
        categories.map((category) => {
          const categoryProducts = products.filter(product => product.category_id === category.category_id);
          return (
            <div key={category.category_id}>
              <ProductCategory
                categoryKey={category.category_id}
                products={categoryProducts}
                onProductAdded={addProduct}
                onProductDeleted={removeProduct}
                categoryName={category.category_name}
                onCategoryUpdated={updateCategory}
                onCategoryDeleted={removeCategory}
                onProductUpdated={updateProduct}
                categoryImage={category.category_image}
                category={category}
                onClickShow={() => handleClickShow(category.category_id)}
              />
            </div>
          );
        })
      )}
      <Category onCategoryAdded={addCategory} />
    </MainPage>
  );
}

export default MainPageRender;