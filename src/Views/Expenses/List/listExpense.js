import React, { useEffect, useState }  from 'react';
import api from './../../../Services/Api'
import { MdEdit, MdOutlineClear, MdOutlineAdd } from 'react-icons/md';

export default function ListExpense(props){

    const [count, setCount] = useState(0);
    const [cards, setExpenses] = useState([]);

    async function getExpense(){
        await api.get("/expenses").then(result => {
            setExpenses(result.data);
            setCount(result.data.length)
        });
    }

    useEffect(() => {
        getExpense();
    }, []);

    useEffect(() => {
        if(props.jobSuccess)
            getExpense();
            
        props.setJobSuccess(false);
    }, [props.jobSuccess]);

    return(
        <section>
            <div className='screenControl'>
                <h2>Minhas despesas</h2>

                <div>
                    <button className="addBtn" onClick={() => {props.setPage("criar")}}><MdOutlineAdd/> ADICIONAR DESPESA</button>
                </div>
            </div>
            <p className="pageDescription">
                Visualize, edite e cadastre suas despesas.
            </p>

           
        </section>
    );
}