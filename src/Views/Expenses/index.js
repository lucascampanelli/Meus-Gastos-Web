import React, { useState }  from 'react';
import CreateExpense from './Create/createExpense';
import ListExpense from './List/listExpense';
import './style.css';

export default function Expenses(props){

    const [page, setPage] = useState("criar");
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [selected, setSelected] = useState({});
    const [jobSuccess, setJobSuccess] = useState(false);

    return(
        <main>
            <article>
                {
                    page === "listar" ?
                        <ListExpense setPage={setPage} jobSuccess={jobSuccess} setJobSuccess={setJobSuccess}/>
                    :
                        page === "criar" ?
                            <CreateExpense setPage={setPage}/>
                        :
                            "Você está em um local desconhecido"
                }
            </article>
        </main>
    );
}