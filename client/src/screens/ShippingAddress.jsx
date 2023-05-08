import React, { useContext, useInsertionEffect, useState } from 'react';
import { Store } from '../Store';
import './Shipping.css'
import { useNavigate } from 'react-router-dom';

function ShippingAddress(props) {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");
    const navigate = useNavigate();

    const { state, dispatch: ctxDispatch } = useContext(Store);

    const { userInfo, cart: { shippingAddress }, } = state;

    console.log(shippingAddress);


    const saveShippingAddress = (e) => {
        e.preventDefault();
        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                name,
                address,
                pincode,
            },
        });
        localStorage.setItem(
            'shippingAddress',
            JSON.stringify({
                name,
                address,
                pincode,
            })
        );
        navigate('/placeorder');
    };


    return (
        <div>
            <section className='address-center'>
                <form className='address-form' onSubmit={saveShippingAddress} >
                    <input type="text"
                        placeholder='name'
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)} required/> <br />
                    <br />
                    <input type="text"
                        placeholder='address'
                        name='address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)} required /> <br />
                    <br />
                    <input type="number"
                        name='pincode'
                        placeholder='pincode'
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)} required /> <br />
                    <br />
                    <button className='button' type='submit'>Add Address</button> <br />
                </form>
            </section>
        </div>
    );
}

export default ShippingAddress;