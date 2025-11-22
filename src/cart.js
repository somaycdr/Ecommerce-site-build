import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./cart.css";
import { useAccount, useSendTransaction } from "wagmi";
import { parseEther } from "viem";

function Cart({ cart, setCart }) {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(false)

  const { sendTransaction, isLoading, isSuccess } = useSendTransaction();

  //increase qty
  const incqty = (product) => {
    const exsit = cart.find((x) => {
      return x.id === product.id;
    });
    setCart(
      cart.map((curElm) => {
        return curElm.id === product.id
          ? { ...exsit, qty: exsit.qty + 1 }
          : curElm;
      })
    );
  };
  //decrease qty
  const decqty = (product) => {
    const exsit = cart.find((x) => {
      return x.id === product.id;
    });
    setCart(
      cart.map((curElm) => {
        return curElm.id === product.id
          ? { ...exsit, qty: exsit.qty - 1 }
          : curElm;
      })
    );
  };

  //Remove cart product
  const removeproduct = (product) => {
    const exsit = cart.find((x) => {
      return x.id === product.id;
    });
    if (exsit.qty > 0) {
      setCart(
        cart.filter((x) => {
          return x.id !== product.id;
        })
      );
    }
  };

  const handlePayment = async () => {
    if (!address) {
      window.alert("Please connect your wallet.");
      return;
    }
    setLoading(true)
    try {
      const tx = sendTransaction({
        to: "0x5BC37b2a9b875F3b807a7eeFf3b8a641769D7482",
        value: parseEther(Totalprice.toString()), // fixed value or you can make dynamic based on cart
      });

      console.log("Transaction sent!", tx);
    } catch (error) {
        setLoading(false)
      console.error("Transaction failed:", error);
      window.alert("Transaction failed. See console for details.");
    }finally{setLoading(false)}
  };

  //total price
  const Totalprice = cart.reduce(
    (price, item) => price + item.qty * item.Price,
    0
  );
  return (
    <>
      <div className="cartcontainer">
        {cart.length === 0 && (
          <div className="emptycart">
            <h2 className="empty">Cart is Empty</h2>
            <Link to="/product" className="emptycartbtn">
              Shop Now
            </Link>
          </div>
        )}
        <div className="contant">
          {cart.map((curElm) => {
            return (
              <div className="cart_item" key={curElm.id}>
                <div className="img_box">
                  <img src={curElm.Img} alt={curElm.Title} />
                </div>
                <div className="detail">
                  <div className="info">
                    <h4>{curElm.Cat}</h4>
                    <h3>{curElm.Title}</h3>
                    <p>Price: {curElm.Price} ETH</p>
                    <div className="qty">
                      <button className="decqty" onClick={() => decqty(curElm)}>
                        -
                      </button>
                      <input type="text" value={curElm.qty} />
                      <button className="incqty" onClick={() => incqty(curElm)}>
                        +
                      </button>
                    </div>
                    <h4>sub total: {Number(curElm.Price * curElm.qty).toFixed(4)} ETH</h4>
                  </div>
                  <div className="close">
                    <button onClick={() => removeproduct(curElm)}>
                      <AiOutlineClose />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {cart.length > 0 && (
          <>
            <h2 className="totalprice">total: {Number(Totalprice).toFixed(4)} ETH</h2>
            <button
              disabled={isLoading}
              className="checkout"
              onClick={handlePayment}
            >
              {isLoading || loading ? "Paying..." : "Pay"}
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
