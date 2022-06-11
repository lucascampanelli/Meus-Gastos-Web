import React, { useState }  from 'react';
import api from './../../../Services/Api'

export default function UpdateCards(props){

    const [name, setName] = useState(props.card.name);
    const [limit, setLimit] = useState(props.card.limit);
    const [expiration, setExpiration] = useState(props.card.expirationDay);
    const [error, setError] = useState("");

    async function updateCard(e){

        e.preventDefault();

        var changes = [];

        if(props.card.name !== name)
            changes.push({"name": name.toString()});

        if(props.card.limit !== limit)
            changes.push({"limit": parseInt(limit)});

        if(props.card.expirationDay !== expiration)
            changes.push({"expirationDay": parseInt(expiration)});

        changes.forEach(async function (change, index) {
                await api.patch("/card/" + props.card.id, change)
                    .then(() => {
                        if (index === changes.length - 1)
                            props.setPage("listar");
                    })
                    .catch(e => {
                        console.error("Ocorreu um erro ao atualizar o cartão. \nDetalhes do erro: " + e);
                        if (!error)
                            setError("Opsss... Ocorreu um erro ao atualizar o cartão. Tente novamente mais tarde.");
                    });
            });

        if(changes.length < 1)
            props.setPage("listar");
    }

    return(
        <section>
            <div className='screenControl'>
                <h2>Atualizar cartão</h2>
            </div>
            <p className="pageDescription">
                Edite as informações do seu cartão para o melhor controle de suas finanças.
            </p>

            <form onSubmit={updateCard}>
                <label>NOME</label>
                <input placeholder='NOME' type="text" value={name} maxLength={30} onChange={e => setName(e.target.value)}/>
                <label>LIMITE</label>
                <input placeholder='LIMITE' type='number' value={limit} onChange={e => setLimit(e.target.value)}/>
                <label>DIA DO VENCIMENTO</label>
                <input placeholder='DIA DO VENCIMENTO' value={expiration} type="number" max="31" min="1" onChange={e => setExpiration(e.target.value)}/>
                
                {
                    error ?
                        <p className="errorMsg">{error}</p>
                    :
                        ""
                }

                <div className='formControl'>
                    <button type="reset" className="cancelBtn" onClick={() => {props.setPage("listar")}}>CANCELAR</button>
                    <button className="addBtn">ATUALIZAR CARTÃO</button>
                </div>
            </form>
        </section>
    );
}