import React, { useState } from 'react'
import { FaTruckMoving } from 'react-icons/fa';
import { AiOutlineHeart, AiOutlineUser } from 'react-icons/ai';
import { BsBagCheck } from 'react-icons/bs';
import { CiLogin, CiLogout } from 'react-icons/ci';
import { useAuth0 } from "@auth0/auth0-react";
import './nav.css'
import {Link} from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function Nav({searchbtn}) {
  const [search, setSearch] = useState();
  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();
  const { logout } = useAuth0();

  return (
    <>
      <div className="free">
        <div className="icon">
          <FaTruckMoving />
        </div>
        <p>FREE Shipping when shopping upto $1000</p>
      </div>
      <div className="main_header">
        <div className="container">
          <div className="logo">
            <img src="./img/logo.png" alt=""/>
            <h1>Shofy.</h1>
          </div>
          <div className="search_box">
            <input type="text" value={search} placeholder="Enter The Product Name" autoComplete="off" onChange={(e) => setSearch(e.target.value)}/>
            <button onClick={() => searchbtn (search)}>Search</button>
          </div>
          <div className="icon">
            {
              isAuthenticated &&
              (
                <div className="account">
              <div className="user_icon">
              <AiOutlineUser />
              </div>
              <p>Hello, {user.name}</p>
            </div>
              )
            }
            <ConnectButton />
            <div className="second_icon">
              <Link to="/" className="link"><p><AiOutlineHeart /></p></Link>
              <Link to="/cart" className="link"><p><BsBagCheck /></p></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <div className="container">
          <div className="nav">

          <ul>
            <li>
              <Link to="/" className="link">Home</Link>
            </li>
            <li>
              <Link to="/product" className="link">Product</Link>
            </li>
            <li>
              <Link to="/about" className="link">About</Link>
            </li>
            <li>
              <Link to="/contact" className="link">Contact</Link>
            </li>
          </ul>
          </div>
        </div>
        <div className="auth">
          {
            isAuthenticated ?
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}><CiLogout /></button>
            :
            <button onClick={() => loginWithRedirect()}><CiLogin /></button>

          }
          </div>
      </div>
    </>
  )
}

export default Nav