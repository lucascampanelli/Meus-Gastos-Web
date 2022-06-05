import React, { useEffect, useState }  from 'react';
import api from './../../../Services/Api'

export default function CreateExpense(props){

    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [installmentValue, setInstallmenteValue] = useState(0);
    const [installmentAmount, setInstallmenteAmount] = useState(0);
    const [cardId, setCardId] = useState(0);

    const [cards, setCards] = useState([]);

    const [error, setError] = useState("");

    async function createExpense(e){

        e.preventDefault();

        await api.post("/expenses", {
            "name": name.toString(),
            "startDate": startDate.toString(),
            "installmentValue": parseFloat(installmentValue),
            "installmentAmount": parseInt(installmentAmount),
            "cardId" : parseInt(cardId)
        })
        .then(() => {
            props.setPage("listar");
        })
        .catch(e => {
            console.error("Ocorreu um erro ao criar a despesa. \nDetalhes do erro: " + e);
            setError("Opsss... Ocorreu um erro ao criar a despesa. Tente novamente mais tarde.");
        });

    }

    async function getCards(){
        await api.get("/card").then(result => {
            setCards(result.data);
            setCardId(result.data[0].id);
        });
    }

    useEffect(() => {
        getCards();
    }, []);

    return(
        <section>
            <div className='screenControl'>
                <h2>Criar despesa</h2>
            </div>
            <p className="pageDescription">
                Crie uma nova despesa para ter uma melhor visão sobre seus gastos.
            </p>

            <form onSubmit={createExpense}>
                <input placeholder='NOME' type="text" maxLength={15} onChange={e => setName(e.target.value)}/>
                <input placeholder='DATA DO INÍCIO' type='text' max="7" min="7" onChange={e => setStartDate(e.target.value)}/>
                <input placeholder='VALOR DA PARCELA' type="text" onChange={e => setInstallmenteValue(e.target.value)}/>
                <input placeholder='QUANTIDADE DE PARCELAS' type="number" min="1" onChange={e => setInstallmenteAmount(e.target.value)}/>
                {
                    cards ?
                        <>
                            <label>CARTÃO DO PARCELAMENTO</label>
                            <select placeholder='VALOR DA PARCELA' type="number" onChange={e => setCardId(e.target.value)}>
                                {
                                    cards.map((card) => (
                                        <option value={card.id} key={card.id}>{card.name}</option>
                                    ))
                                }
                            </select>
                        </>
                    :
                        ""
                }
                
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
        </section>
    );
}