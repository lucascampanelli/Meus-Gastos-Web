import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Header(){

    const navigate = useNavigate();

    return(
        <header>
            <h1>Meus Gastos</h1>

            <nav>
                <ul>
                    <li onClick={() => navigate("/")}>Início</li>
                    <li onClick={() => navigate("/despesas")}>Despesas</li>
                    <li onClick={() => navigate("/cartoes")}>Cartões</li>
                </ul>
            </nav>
        </header>
    );
}