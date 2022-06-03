import React, { useEffect, useState }  from 'react';
import api from './../../Services/Api'
export default function Cards(props){

    const [page, setPage] = useState("listar");
    const [count, setCount] = useState(0);
    const [cards, setCards] = useState([]);

    async function getCards(){
        await api.get("/card").then(result => {
            setCards(result.data);
            setCount(result.data.length)

            console.log(result);

            console.log(count);
            console.log(cards);
        });
    }

    useEffect(() => {
        getCards();
    }, []);

    return(
        <main>
            <article>
                <section>
                    <div className='screenControl'>
                        <h2>Meus cartões</h2>
                        <button className="addBtn">ADICIONAR CARTÃO</button>
                    </div>
                    <p>
                        Visualize, edite e cadastre seus cartões.
                    </p>
                </section>
            </article>
        </main>
    );
}