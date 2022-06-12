import React, { useState }  from 'react';
import { PlainCreditCard } from '../../../Utils/Illustrations';
import api from './../../../Services/Api'

export default function CreateCards(props){

    const [name, setName] = useState();
    const [limit, setLimit] = useState();
    const [expiration, setExpiration] = useState();
    const [error, setError] = useState("");

    async function createCard(e){

        e.preventDefault();

        await api.post("/card", {
            "name": name.toString(),
            "limit": parseInt(limit),
            "expirationDay": parseInt(expiration)
        })
        .then(() => {
            props.setPage("listar");
        })
        .catch(e => {
            console.error("Ocorreu um erro ao inserir o cartão. \nDetalhes do erro: " + e);
            setError("Opsss... Ocorreu um erro ao adicionar o cartão. Tente novamente mais tarde.");
        });

    }

    return(
        <section id="cardCreate">
            <div className='screenControl'>
                <h2>Criar cartão</h2>
            </div>
            <p className="pageDescription">
                Crie um novo cartão para gerenciar suas finanças.
            </p>

            <div className="container">
                <form onSubmit={createCard}>
                    <input placeholder='NOME' type="text" maxLength={30} onChange={e => setName(e.target.value)}/>
                    <input placeholder='LIMITE' type='number' onChange={e => setLimit(e.target.value)}/>
                    <input placeholder='DIA DO VENCIMENTO' type="number" max="31" min="1" onChange={e => setExpiration(e.target.value)}/>
                    
                    {
                        error ?
                            <p className="errorMsg">{error}</p>
                        :
                            ""
                    }

                    <div className='formControl'>
                        <button type="reset" className="cancelBtn" onClick={() => {props.setPage("listar")}}>CANCELAR</button>
                        <button className="addBtn">ADICIONAR CARTÃO</button>
                    </div>
                </form>

                <div>
                    <PlainCreditCard/>
                </div>
            </div>
        </section>
    );
}