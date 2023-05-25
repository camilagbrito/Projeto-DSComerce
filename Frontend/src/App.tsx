
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProductDetails from './routes/ClientHome/ProductDetails';
import ClientHome from './routes/ClientHome';
import Catalog from './routes/ClientHome/Catalog';
import Cart from './routes/ClientHome/Cart';


export default function App() {

  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ClientHome />}>
        <Route index element={<Catalog/>} />
        <Route path="catalog" element={<Catalog/>} />
        <Route path="cart" element={<Cart/>} />
        <Route path="product-details/:productId" element={<ProductDetails/>} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
  );
}

