import React, { useState } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs';
import { FiTruck } from 'react-icons/fi';
import { BsCurrencyDollar } from 'react-icons/bs';
import { CiPercent } from 'react-icons/ci';
import { BsHeadphones, BsEye } from 'react-icons/bs';
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineCloseCircle } from 'react-icons/ai';
import Homeproduct from './homeproduct';
import { useAuth0 } from "@auth0/auth0-react";
import "./home.css"
import { useAccount } from 'wagmi';


function Home({ detail, view, close, setClose, addtocart }) {
    
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const {address} = useAccount()

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
            <div className="top_banner">
                <div className="container">
                    <div className="detail">
                        <h2>The Best Not Book Collection 2023</h2>
                        <Link to="/product" className="link">Shop Now <BsArrowRight /></Link>
                    </div>
                    <div className="img_box">
                        <img src="./img/laptop-slider.png" alt="" />
                    </div>

                </div>
            </div>

            <div className="product_type">
                <div className="container">
                    <div className="box">
                        <div className="img_box">
                            <img src="./img/mobile.png" alt="" />
                        </div>
                        <div className="detail">
                            <p>23 products</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="img_box">
                            <img src="./img/watch.png" alt="" />
                        </div>
                        <div className="detail">
                            <p>18 products</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="img_box">
                            <img src="./img/headphone.png" alt="" />
                        </div>
                        <div className="detail">
                            <p>52 products</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="img_box">
                            <img src="./img/fan.png" alt="" />
                        </div>
                        <div className="detail">
                            <p>12 products</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="about">
                <div className="container">
                    <div className="box">
                        <div className="icon">
                            <FiTruck />
                        </div>
                        <div className="detail">
                            <h3>Free Shipping</h3>
                            <p>Oder above $1000</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="icon">
                            <BsCurrencyDollar />
                        </div>
                        <div className="detail">
                            <h3>Return & Refund</h3>
                            <p>Money Back Gaurenty</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="icon">
                            <CiPercent />
                        </div>
                        <div className="detail">
                            <h3>Member Discount</h3>
                            <p>On every oder</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="icon">
                            <BsHeadphones />
                        </div>
                        <div className="detail">
                            <h3>Customer Support</h3>
                            <p>Every Time Call Support</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="product">
                <h2>Top Products</h2>
                <div className="container">
                    {
                        Homeproduct.map((curElm) => {
                            return (
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
                            )
                        })
                    }
                </div>
            </div>
            <div className="banner">
                <div className="container">
                    <div className="detail">
                        <h4>LATEST TECHNOLOGY ADDED</h4>
                        <h3>Apple iPad 10.2 9th Gen - 2023</h3>
                        <p><BsCurrencyDollar />986</p>
                        <Link to='/product' className="link">Shop Now <BsArrowRight /></Link>
                    </div>
                    <div className="img_box">
                        <img src="./img/laptop-slider.png" alt="sliderimg" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home