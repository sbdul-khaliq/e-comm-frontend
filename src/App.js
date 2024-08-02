import './App.css';
import Nav from './Component/nav';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Footer from './Component/footer';
import SignUp from './Component/signup';
import PrivateComponent from './Component/privateComponent';
import Login from './Component/login';
import AddProduct from './Component/addProduct';
import Products from './Component/products';
import UpdateProducts from './Component/UpdateProduct'

function App() {
  return (
    <>
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
          <Route path='/' element={<Products />}/>
          <Route path='/add' element={<AddProduct />}/>
          <Route path='/update/:id' element={<UpdateProducts />}/>
          <Route path='/logout' element={<h1>log out</h1>}/>
          <Route path='/profile' element={<h1>profile</h1>}/>
          </Route>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </div>
      <Footer />
    </>
  );
}

export default App;
