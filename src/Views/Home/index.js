import React  from 'react';
import { SavingMoney } from '../../Utils/Illustrations';
import './style.css';

export default function Home(){

    return(
        <main>
            <article>
                <section id="home">
                    <h2>Bem-vindo ao aplicativo Meus Gastos!</h2>
                    <p>
                        Tenha maior controle sobre seus gastos e gerencia suas finanças com maior praticidade.
                    </p>

                    <SavingMoney/>
                </section>
            </article>
        </main>
    );
}