import React, { useEffect, useState }  from 'react';
import './style.css';
import ListCards from './List/listCard';
import CreateCards from './Create/createCard';

export default function Cards(props){

    const [page, setPage] = useState("listar");

    return(
        <main>
            <article>
                    {
                        page === "listar" ?
                            <ListCards setPage={setPage}/>
                        :
                            page === "criar" ?
                                <CreateCards setPage={setPage}/>
                            :
                                "Você está em um local desconhecido"
                    }
            </article>
        </main>
    );
}