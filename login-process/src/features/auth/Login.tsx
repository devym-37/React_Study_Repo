import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { getErrorMessage } from "./loginUtil";

const Login = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [user, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login({ user, password }).unwrap();
            /*
            useMutation hook은 'mutation trig'기능을 포함하는 튜플과 'mutation 결과'에
            대한 속성을 포함하는 객체를 반환한다. 'mutation trigger' 호출은 endpoint에 대한 mutation
            request을 시작하는 기능이다. 'mutation trigger'를 호출하면, unwrap 프로퍼티를 가진
            Promise을 리턴한다. unwrap을 호출하면 바로 raw response/error를 제공한다.
            
            */
            dispatch(setCredentials({ ...userData, user }));
            setUser("");
            setPassword("");
            navigate("/welcome");
        } catch (err) {
            const errMessage = getErrorMessage(err?.response);
            setErrMsg(errMessage);
            errRef.current?.focus();
        }
    };

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value);

    const handlePwdInput = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    return (
        <>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <section className='login'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>
                        {errMsg}
                    </p>

                    <h1>Employee Login</h1>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor='username'>Username:</label>
                        <input
                            type='text'
                            id='username'
                            ref={userRef}
                            value={user}
                            onChange={handleUserInput}
                            autoComplete='off'
                            required
                        />

                        <label htmlFor='password'>Password:</label>
                        <input type='password' id='password' onChange={handlePwdInput} value={password} required />
                        <button>Sign In</button>
                    </form>
                </section>
            )}
        </>
    );
};

export default Login;
