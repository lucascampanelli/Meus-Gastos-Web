import React, { useState }  from 'react';
import CreateExpense from './Create/createExpense';
import DeleteExpense from './Delete/deleteExpense';
import ListExpense from './List/listExpense';
import './style.css';
import UpdateExpense from './Update/updateExpense';

export default function Expenses(props){

    const [page, setPage] = useState("listar");
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [selected, setSelected] = useState({});
    const [jobSuccess, setJobSuccess] = useState(false);

    return(
        <main>
            <article>
                {
                    deleteConfirm ?
                        <DeleteExpense selected={selected} setSelected={setSelected} jobSuccess={jobSuccess} setPage={setPage}
                                                          setJobSuccess={setJobSuccess} setDeleteConfirm={setDeleteConfirm} />
                    :
                        ""
                }

                {
                    page === "listar" ?
                        <ListExpense setPage={setPage} setSelected={setSelected} setDeleteConfirm={setDeleteConfirm} 
                                                             jobSuccess={jobSuccess} setJobSuccess={setJobSuccess}/>
                    :
                        page === "criar" ?
                            <CreateExpense setPage={setPage}/>
                        :
                            page === "editar" ?
                                <UpdateExpense setPage={setPage} expense={selected}/>
                            :
                                "Você está em um local desconhecido"
                }
            </article>
        </main>
    );
}