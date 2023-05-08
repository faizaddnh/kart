import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../Store';
import './Cart.css'
import axios from 'axios';
function Cart(props) {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;
    console.log(cartItems);

    const total_price = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
    const navigate = useNavigate();

    const updateCartHandler = async (item, quantity) => {
        //const { data } = await axios.get(`/api/products/${item._id}`);
        //if (data.countInStock < quantity) {
        //window.alert('Sorry. Product is out of stock');
        //return;
        //}
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity },
        });
    };



    const removeItemHandler = (item) => {
        ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    };

    const goToShipping=()=>{
         navigate('/shipping');
    };

    const goToHome=()=>{
        navigate('/');
   };

    


    return (
        <div>
            <section>
                <div className='grid-cart'>
                    <div>
                        {cartItems.map((item) => (

                            <div className='grid-5'>
                                <img className='img-cart' src={item.image} alt="" />
                                <div>{item.name}</div>
                                <div>
                                    <button onClick={() =>
                                        updateCartHandler(item, item.quantity + 1)
                                    }>+</button>{' '}
                                    <span>{item.quantity}</span>{' '}
                                    <button onClick={() =>
                                        updateCartHandler(item, item.quantity - 1)} disabled={item.quantity === 1}>-</button>{' '}

                                </div>
                                <div>{item.price}</div>
                                <button className='button' onClick={() => removeItemHandler(item)}>delete</button>
                            </div>



                        ))}
                    </div>
                    <div className='sub-total'>
                        <h3>Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '} items) : $
                            {total_price}
                        </h3>
                        <div>
                            <button className='long-but' onClick={goToShipping}>Proceed to Checkout</button> 
                            <button className='long-but' onClick={goToHome} to="/">Shopping More</button>
                        </div>


                    </div>
                </div>



            </section>


        </div>

    );
}

export default Cart;