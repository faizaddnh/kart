import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Product.css'

function Product(props) {

    const [data, setData] = useState([]);

    let params = useParams();
    const productId = params.id;

    useEffect(() => {
        axios.get('/api/product/' + productId).then(res => {
            setData([res.data])
            console.log(data)

        })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    return (
        <div>
            <section>
                {data.map((product) => (
                    <div className='grid-prdct'>
                        <div className='flex-prdct'>
                            <img className='img-prdct' src={product.image} alt="" />
                            <div>
                                <button className='button'>ADD TO CART</button>
                                <button className='button'>Buy Now</button>
                            </div>
                        </div>
                        <div>
                            <h1 className='name'>{product.name}</h1>
                            <h1>{product.brand}</h1>
                            <h1>{product.price}</h1>
                        </div>
                    </div>

                ))}
            </section>
        </div>
    );
}

export default Product;