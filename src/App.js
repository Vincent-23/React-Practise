import React,{ useState, useContext } from 'react';
import './App.css';
import { MyContext } from './Context';
import EmiCalculator from './components/Emi Calculator/EmiCalculator';
import HomeComponent from './components/HomeComponent';
import Layout from './components/Layout';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
  Routes
} from "react-router-dom";
import VideoGallery from './components/Video Gallery/VideoGallery';
import Product from './components/Shopping Cart/Product';
import ProductDetails from './components/Shopping Cart/ProductDetails';
import Cart from './components/Shopping Cart/Cart';
import Tasks from './components/Task Tracker/Tasks';

function App() {
  const [emi, setEmi] = useState(0);
  const [errorText, setErrorText] = useState("");
  const [productData, setProductData] = useState([]);
  const {breadcrumb, setBreadCrumb} = useContext(MyContext);
  return (
    <div className="App">
      <MyContext.Provider value={{emi, setEmi, errorText, setErrorText,breadcrumb, setBreadCrumb, productData, setProductData}}>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomeComponent />} />
            <Route path="task/*" element={<Tasks />} />
            <Route path="emicalculator/*" element={<EmiCalculator />} />
            <Route path="videogallery/*" element={<VideoGallery />} />
            <Route path="/:id" element={<VideoGallery />} />
            <Route path="product/*" element={<Product />} />
            <Route path="/productDetails/:id" element={<ProductDetails />} />
            <Route path="/cart/" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </MyContext.Provider>
    </div>
  );
}

export default App;
