import React, { useState } from 'react'
import Productdetail from './productdetail'
import { BsEye } from 'react-icons/bs';
import { useAuth0 } from "@auth0/auth0-react";
import "./product.css";
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineCloseCircle } from 'react-icons/ai';
import { useAccount } from 'wagmi';
function Product({ product, setProduct, detail, view, close, setClose, addtocart }) {

    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const {address} = useAccount()

    const filtterproduct = (product) => {
        const update = Productdetail.filter((x) => {
            return x.Cat === product;
        })
        setProduct(update);
    }
    const AllProducts = () => {
        setProduct(Productdetail);
    }
    return (
        <>
            {
                close ?
                    <div className="product_detail">
                        <div className="container">
                            <button onClick={() => setClose(false)} className="closebtn"><AiOutlineCloseCircle /></button>
                            {
                                detail.map((curElm) => {
                                    return (
                                        <>
                                            <div className="productbox">
                                                <div className="img-box">
                                                    <img src={curElm.Img} alt={curElm.Title} />
                                                </div>
                                                <div className="detail">
                                                    <h4>{curElm.Cat}</h4>
                                                    <h2>{curElm.Title}</h2>
                                                    <p>A Screen every will Love: whether your family is protects to the light.</p>
                                                    <h3>{curElm.Price} ETH</h3>
                                                    {
                                                isAuthenticated || address ?
                                                <button onClick={() => addtocart(curElm)}>Add To Cart</button>
                                                    :
                                                <button onClick={() => loginWithRedirect()}>Add To Cart</button>
                                            }
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div> : null
            }
            <div className="products">
                <h2># Products</h2>
                <p>Home . products</p>
                <div className="container">
                    <div className="filter">
                        <div className="categories">
                            <h3>categories</h3>
                            <ul>
                                <li onClick={() => AllProducts()}>All Products</li>
                                <li onClick={() => filtterproduct("mobile")}>Mobiles</li>
                                <li onClick={() => filtterproduct("watch")}>Smart Watch</li>
                                <li onClick={() => filtterproduct("headphone")}>Headphone</li>
                                <li onClick={() => filtterproduct("laptop")}>Laptops</li>
                            </ul>
                        </div>
                    </div>
                    <div className="productbox">
                        <div className="contant">
                            {
                                product.map((curElm) => {
                                    return (
                                        <>
                                            <div className="box" key={curElm.id}>
                                                <div className="img_box">
                                                    <img src={curElm.Img} alt={curElm.Title} />
                                                    <div className="icon">
                                                        {
                                                            isAuthenticated || address ?
                                                            <li onClick={() => addtocart(curElm)}><AiOutlineShoppingCart /></li>
                                                            :
                                                            <li onClick={() => loginWithRedirect()}><AiOutlineShoppingCart /></li>
                                                        }
                                                        <li onClick={() => view(curElm)}><BsEye /></li>
                                                        <li><AiOutlineHeart /></li>
                                                    </div>
                                                </div>
                                                <div className="detail">
                                                    <p>{curElm.Cat}</p>
                                                    <h3>{curElm.Title}</h3>
                                                    <h4>{curElm.Price} ETH</h4>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product