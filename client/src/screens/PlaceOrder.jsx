import React, { useContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import axios from 'axios';
import './Placeorder.css';

function PlaceOrder(props) {
    const navigate = useNavigate();

    const [dispatch] = useReducer();

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;
    const {
        cart: { cartItems },
    } = state;

    const {
        cart: { shippingAddress },
    } = state;

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
    cart.itemsPrice = round2(
        cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
    cart.taxPrice = round2(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    console.log(cart.totalPrice)


    function loadScript(src) {

        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }



    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // creating a new order  
        const result = await axios.post("/api/payment/orders", { amount: cart.totalPrice });

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        // Getting the order details back
        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: "rzp_test_EjCOFxOlCvpgfJ", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Olive Deterg.",
            description: "Test Transaction",
            //image: { logo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    //amount: orderAmount,
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await axios.post("/api/payment/success", data);

                alert(result.data.msg);
            },
            prefill: {
                name: "Olive Detergant",
                email: "faizaddnh@gmail.com",
                contact: "9539173271",
            },
            notes: {
                address: "Dharu najath house, olavilam post, 673313",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }


    return (
        <div>
            <section>
                <h1>preview order</h1>
                <div className='main-sect'>
                    <div >
                        <div className='sect'>
                            <h3>shipping</h3>
                            <p>name: {shippingAddress.name}</p>
                            <p>address : {shippingAddress.address}</p>
                            <p>pincode : {shippingAddress.pincode}</p>
                        </div>
                        <br /><br />
                        <div>
                            <div className='sect'>
                                <h3>items</h3>
                                <div>
                                    {cartItems.map((item) => (
                                        <div className='grid-cart'>
                                            <img className='img-cart' src={item.image} alt="" />
                                            <div>{item.name}</div>

                                        </div>

                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='sect'>
                        <h3>order summary</h3>
                        <div className='grid'>
                            <p>Items :</p>
                            <p>{cart.itemsPrice}</p>
                        </div>
                        <div className='grid'>
                            <p>Shipping :</p>
                            <p>{cart.shippingPrice}</p>
                        </div>
                        <div className='grid'>
                            <p>Tax :</p>
                            <p>{cart.taxPrice}</p>
                        </div>
                        <div className='grid'>
                            <p>Order Total :</p>
                            <p>{cart.totalPrice}</p>
                        </div>
                        <button className="long-but" onClick={() => displayRazorpay(cart.totalPrice)} >
                            Pay {cart.totalPrice}
                        </button>

                    </div>
                </div>




            </section>


        </div>
    );
}

export default PlaceOrder;