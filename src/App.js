import './App.css';
import Nav from './Component/nav';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Footer from './Component/footer';
import SignUp from './Component/signup';

function App() {
  return (
    <>
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<h1>Product Listing Componenet</h1>}/>
          <Route path='/add' element={<h1>Add Product Componenet</h1>}/>
          <Route path='/update' element={<h1>Update Product Componenet</h1>}/>
          <Route path='/logout' element={<h1>log out</h1>}/>
          <Route path='/profile' element={<h1>profile</h1>}/>
          <Route path='/signup' element={<SignUp />}/>
        </Routes>
      </BrowserRouter>
    </div>
      <Footer />
    </>
  );
}

export default App;
