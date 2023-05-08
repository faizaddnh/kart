import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    const doSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/user/signup', { name, email, password });
            console.log(res.data);
            navigate('/signin')
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <section className='address-center'>
                <form className='address-form' onSubmit={doSignup}>
                    <input type="text"
                        placeholder='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)} required /> <br /><br />

                    <input type="text"
                        placeholder='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} required /> <br /><br />

                    <input type="text"
                        placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} required /><br /><br />

                    <button className='button' type='submit' >SIGNUP</button><br /><br />

                </form>
            </section>

        </div>
    );
}

export default Signup;