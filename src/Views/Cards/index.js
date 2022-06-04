import React, { useState }  from 'react';
import './style.css';
import ListCards from './List/listCard';
import CreateCards from './Create/createCard';
import DeleteCards from './Delete/deleteCard';

export default function Cards(props){

    const [page, setPage] = useState("listar");
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [jobSuccess, setJobSuccess] = useState(false);

    return(
        <main>
            <article>
                    
                    {
                        deleteConfirm ?
                            <DeleteCards card={selectedCard} setSelectedCard={setSelectedCard} jobSuccess={jobSuccess} 
                                 setJobSuccess={setJobSuccess} setDeleteConfirm={setDeleteConfirm} setPage={setPage}/>
                        :
                            ""
                    }

                    {
                        page === "listar" ?
                            <ListCards setSelectedCard={setSelectedCard} jobSuccess={jobSuccess} setJobSuccess={setJobSuccess} 
                                               setDeleteConfirm={setDeleteConfirm} setPage={setPage}/>
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