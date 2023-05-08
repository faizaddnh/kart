import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import './Home.css';

function Home(props) {
    const [product, setProduct] = useState([]);

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;
    const navigate= useNavigate();

    const addCart = async (id) => {
        const existItem = cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/product/${id}`);
        console.log(data)

        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...data, quantity },
        });
        navigate("/cart");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('/api/product/');
                console.log(result.data);
                setProduct(result.data);

            }
            catch (err) {
                console.log(err.message);
            }
        };
        fetchData();

    }, []);



    return (
        <div>
            <section>
                <div className='grid-display'>
                    {product.map((item) => (

                        <div className='flex'>

                            <Link className='link' to={'/product/' + item._id}>
                                
                                <img className='img' src={item.image} alt="" />
                                <div>{item.name}</div>
                                <div>{item.brand}</div>
                                <div>{item.price}</div>
                            </Link>

                            <button className='button' onClick={() => { addCart(item._id) }} >ADD TO CART</button>

                        </div>


                    ))}
                </div>
                <div><p>Developed By || Falahee Tech </p></div>
            </section>
            
        </div>

    );
}

export default Home;
