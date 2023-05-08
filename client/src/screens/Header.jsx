import React, { useContext, useState } from 'react';
import './Header.css'
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { FaBars } from "react-icons/fa";

function Header(props) {
    const [style, setStyle] = useState("navbar");
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { fullBox, cart, userInfo } = state;
    const { cart: { cartItems } } = state;
    console.log(cartItems);

    const navigate = useNavigate();
    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        setStyle("navbar");
        navigate('/signin');
    };
    

    const navActive=()=>{
        setStyle("nactive");
    }
    window.onscroll = () =>{
        setStyle("navbar");
    }
    const navDactive=()=>{
        setStyle("navbar");
    }

    







    return (
        <header className="head">
            <div className="header">
                <img className="logo" src="https://image.shutterstock.com/image-vector/tf-letter-logo-circle-gold-600w-698190973.jpg" alt="" />
                <div>TFKart</div>
                <FaBars id="menu-btn" onClick={navActive} />
                <nav className={style} data-aos="fade-right" data-aos-delay="600">
                    <Link className='a' onClick={navDactive} to="/">Home</Link>
                    <Link className='a' onClick={navDactive} to="/cart">About</Link>

                    <Link className='a' onClick={navDactive} to="/cart">Gallery</Link>
                    <Link className='a' onClick={navDactive} to="/add-product">Add-product</Link>
                    <Link className='a' onClick= {signoutHandler} data-aos="fade-right" data-aos-delay="900" >SignOut</Link>

                    {userInfo ? (<Link className='a' onClick={navDactive}>{userInfo.name}</Link>) : (<Link className='a' onClick={navDactive} to="/signin">SignIn</Link>)}

                    <Link className='a' onClick={navDactive} to="/cart">Wishlist</Link>




                    <Link className='a' onClick={navDactive}  to="/cart">Cart
                        {cartItems.length > 0 && (
                            <sup className='cart-span'>
                                {cartItems.reduce((a, c) => a + c.quantity, 0)}
                            </sup>
                        )}
                    </Link>
                </nav>
            </div>

        </header>


    );
}

export default Header;