import {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate
} from 'react-router-dom';
import './App.css'; 
import Login from './pages/Login/Login'; 
import InitialSignUp from './pages/InitialSignUp/InitialSignUp'
import api from "./services/api"
import MainPage from './pages/MainPage/MainPage';
import ProductCategory from './components/ProductCategory/ProductCategory';
import Category from './components/Category/Category';
import Loading from './components/Loading/Loading';

function App() {
  /**
   * Renderização do componente de loading
   */
  const [loading, setLoading] = useState(true)

  /**
   * Funcionalidade para pegar todas as categorias para renderizar o componente
   * de cada categoria
   */
  const [categories, setCategories] = useState([])

  const fetchCategories = async () => {
    try {
      await api.get('/category')
      .then(response => setCategories(response.data))
      fetchProducts()
    } catch(err) {
      console.log(err)
    }
  }

  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    try {
      await api.get('/products')
      .then(response => setProducts(response.data))
    } catch(err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchCategories()
  }, [])

  /**
   * Função para dinamicamente adicionar a nova categoria após ela ser criada
   */
  const addCategory = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory])
  }

  /**
   * Função para dinamicamente adicionar o novo produto após ele ser criado
   */
  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  }

  /**
   * Funcionalidade para checar se algum usuário no banco de dados, se sim,
   * exibirá a tela de login, senão o usuário será redirecionado para a tela
   * de primeiro cadastro
   */
  const [adminExists, setAdminExists] = useState(false);
  useEffect(() => {
    api
      .get("/users")
      .then(response => setAdminExists(response.data.exists))
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      {/* <Router>
        <Routes>
          <Route path="/" element={adminExists ? <Navigate to="/login" /> : <Navigate to="/initial-signup" />} />
          <Route path="/initial-signup" element={<InitialSignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router> */}
      {/* {adminExists ? <Login /> : <InitialSignUp />} */}
      <MainPage title="Produtos">
        {loading ? (
          <Loading />
        ) :
        categories.map((category) => {
          const categoryProducts = products.filter(product => product.category_id === category.category_id);
          return (
              <ProductCategory key={category.category_id} categoryKey={category.category_id} products={categoryProducts} onProductAdded={addProduct} />
          )
        })}
        <Category onCategoryAdded={addCategory} />
      </MainPage>
    </div>
  );
}

export default App;
