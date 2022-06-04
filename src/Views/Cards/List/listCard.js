import React, { useEffect, useState }  from 'react';
import api from './../../../Services/Api'

export default function ListCards(props){

    const [count, setCount] = useState(0);
    const [cards, setCards] = useState([]);

    async function getCards(){
        await api.get("/card").then(result => {
            setCards(result.data);
            setCount(result.data.length)
        });
    }

    useEffect(() => {
        getCards();
    }, []);

    return(
        <section>
            <div className='screenControl'>
                <h2>Meus cartões</h2>

                <div>
                    <button className="addBtn" onClick={() => {props.setPage("criar")}}>ADICIONAR CARTÃO</button>
                </div>
            </div>
            <p className="pageDescription">
                Visualize, edite e cadastre seus cartões.
            </p>

            {
                cards ?
                    <ul className="cardsList">
                        {
                            cards.map((card) => (
                                <li key={card.id}>
                                    <div className='cardControl'>
                                        <h3>{card.name}</h3>


                                        <div>
                                            ✏´
                                            ❌
                                        </div>
                                    </div>

                                    <p className="limitLabel">LIMITE</p>
                                    <span>R$ {card.limit}</span>

                                    <p className="expirationLabel">DIA DE VENCIMENTO</p>
                                    <span>Dia {card.expirationDay}</span>
                                </li>
                            ))
                        }
                    </ul>
                :
                    <div>
                        <p>Não há nenhum cartão para ser exibido.</p>
                    </div>
            }
        </section>
    );
}