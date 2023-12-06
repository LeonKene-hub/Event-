import React, { useEffect, useContext, useState } from 'react';
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import logo from "../../assets/images/logo-pink.svg";
import { Input, Button } from "../../components/FormComponents/FormComponents";
import api, { loginResource } from '../../Services/Service'
import { UserContext, userDecodeToken } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import "./LoginPage.css";

const LoginPage = () => {
    const [user, setUser] = useState({ email: "admin@gmail.com", senha: "12345" });

    //Importa os dados globais do usuario
    const { userData, setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if(userData.nome){
    //         navigate("/");
    //     }
    // }, [userData]); 

    async function handleSubmit(e) {
        e.preventDefault();

        if (user.email.trim().length >= 3 && user.senha.trim().length >= 3) {
            try {
                const promise = await api.post(loginResource, {
                    email: user.email,
                    senha: user.senha
                });

                //Decodifica o token vindo da API
                const userFullToken = userDecodeToken(promise.data.token);

                //Guarda o token globalmente
                setUserData(userFullToken);

                localStorage.setItem("token", JSON.stringify(userFullToken));


                navigate("/");// envia o usuario para home



            } catch (error) {
                //Erro da API: bad request(401) ou erro de conexão
                alert("Verifique os dados e a conexão com a internet!")
            }
        }

        else {
            alert("Preencha os dados corretamente!")
        }


    }

    return (
        <div className="layout-grid-login">
            <div className="login">
                <div className="login__illustration">
                    <div className="login__illustration-rotate"></div>
                    <ImageIllustrator
                        imageName="login-img"
                        altText="Imagem de um homem em frente de uma porta de entrada"
                        addicionalClass={"login-illustrator"}
                    />
                </div>

                <div className="frm-login">
                    <img src={logo} className="frm-login__logo" alt="" />

                    <form className="frm-login__formbox" onSubmit={handleSubmit}>
                        <Input
                            className="frm-login__entry"
                            type="email"
                            id="login"
                            name="login"
                            required={true}
                            value={user.email}
                            manipulationFuntion = {(e) => {setUser({...user, email: e.target.value.trim() })}}
                            placeholder="Username"
                        />
                        <Input
                            className="frm-login__entry"
                            type="password"
                            id="senha"
                            name="senha"
                            required={true}
                            value={user.senha}
                            manipulationFuntion={ (e) => {setUser({...user, senha: e.target.value.trim() })}}
                            placeholder="****"
                        />

                        <a href="" className="frm-login__link">
                            Esqueceu a senha?
                        </a>

                        <Button
                            textButton="Login"
                            id="btn-login"
                            name="btn-login"
                            type="submit"
                            additionalClass="frm-login__button"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
