
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetails from './routes/ProductDetails';
import ClientHome from './routes/ClientHome';
import Catalog from './routes/Catalog';


export default function App() {

  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ClientHome />}>
        <Route index element={<Catalog/>} />
        <Route path="catalog" element={<Catalog/>} />
        <Route path="product-details/:productId" element={<ProductDetails/>} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

