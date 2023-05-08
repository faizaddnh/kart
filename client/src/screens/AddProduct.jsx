
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProduct(props) {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");

    const navigate = useNavigate();

    const addprdct = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/product/', { name, brand, image, price });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };




    return (
        <div>
            <section className='address-center'>
                <form className='address-form' onSubmit={addprdct}>
                    <input type="text"
                        placeholder='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)} required /> <br /> <br />

                    <input type="text"
                        placeholder='brand'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)} required /> <br /> <br />

                    <input type="text"
                        placeholder='image'
                        value={image}
                        onChange={(e) => setImage(e.target.value)} required /> <br /> <br />

                    <input type="text"
                        placeholder='price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)} required /> <br /> <br />

                    <button type='submit' className='button' >ADD-PRODUCT</button> <br /> <br />

                </form>
            </section>
        </div>
    );
}

export default AddProduct;