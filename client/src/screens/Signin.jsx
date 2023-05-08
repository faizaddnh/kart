import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signin(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const doSignin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/user/signin', { email, password });
            console.log(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/');
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    const goToSignup=()=>{
        navigate('/signup')
    }



    return (
        <div>
            <section className='address-center'>
                <form className='address-form' onSubmit={doSignin}>
                    <input type="text"
                        placeholder='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} required /> <br /> <br />

                    <input type="text"
                        placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} required  /><br /> <br />

                    <button className='button' type='submit' >Login</button>

                </form>
                <br /> 
                <div>
                   Are You a New User
                </div> <br />
                <div>
                <button className='button' onClick={goToSignup} >Register</button> 
                </div>

            </section>
        </div>
    );
}

export default Signin;