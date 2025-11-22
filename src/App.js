import Nav from "./Nav";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Rout from "./rout";
import Footer from "./footer";
import Productdetail from "./productdetail";
import Providers from "./providers/Providers";

function App() {

  // add to cart
  const [cart, setCart] = useState([]);

  //Product Details
  const [close, setClose] = useState(false)
  const [detail, setDetail] = useState([]);


  //Filter product section
  const [product, setProduct] = useState(Productdetail)
  const searchbtn = (product) => {
    const change = Productdetail.filter((x) => {
      return x.Cat === product;
    })
    setProduct(change);
  }  

  //product detail
  const view = (product) => {
    setDetail([{...product}])
    setClose(true)
  }

  //add to cart

  const addtocart = (product) => {
    const exsit = cart.find((x) => {
      return x.id === product.id
    })
    if(exsit){
      alert("This Product is alredy added to cart")
    }
    else{
      setCart([...cart, {...product, qty:1}])
      alert("Product is added to cart")
    }
  }
  return (
    <>
    <Providers>
    <Router>
      <Nav searchbtn={searchbtn} />
      <Rout product={product} setProduct={setProduct} detail={detail} view={view} close={close} setClose={setClose} cart={cart} setCart={setCart} addtocart={addtocart}/>
      <Footer />
    </Router>
    </Providers>
    </>
  );
}

export default App;
