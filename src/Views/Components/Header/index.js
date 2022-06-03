import React from 'react';
import { useNavigate } from "react-router-dom";
import './style.css';

export default function Header(){

    const navigate = useNavigate();

    return(
        <header>
            <h1>MEUS GASTOS</h1>

            <nav>
                <ul>
                    <li onClick={() => navigate("/")}>INÍCIO</li>
                    <li onClick={() => navigate("/despesas")}>DESPESAS</li>
                    <li onClick={() => navigate("/cartoes")}>CARTÕES</li>
                </ul>
            </nav>
        </header>
    );
}