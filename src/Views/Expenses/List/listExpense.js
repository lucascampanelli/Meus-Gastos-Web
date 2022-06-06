import React, { useEffect, useState }  from 'react';
import api from './../../../Services/Api'
import { MdEdit, MdOutlineClear, MdOutlineAdd, MdCreditCard, MdPayments } from 'react-icons/md';
import CardName from './cardName';

export default function ListExpense(props){

    const [count, setCount] = useState(0);
    const [expenses, setExpenses] = useState([]);

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

            {
                expenses ?
                    <ul className="expenseList">
                        {
                            expenses.map((expense) => (
                                <li key={expense.id}>
                                    <div className="expenseCard">
                                        <div className="expenseColumn">
                                            <div className="expenseIcon">
                                                <MdPayments/>
                                            </div>
                                        </div>

                                        <div className="rightColumn">

                                            <div className="infoRow">
                                                <div className="expenseName">
                                                    <h3>{expense.name}</h3>
                                                </div>
                                                <div className="expenseActions">
                                                    <MdEdit className="editIcon" onClick={() => {props.setSelected(expense); props.setPage("editar");}}/>
                                                    <MdOutlineClear className="exitIcon" onClick={() => {props.setSelected(expense); props.setDeleteConfirm(true);}}/>
                                                </div>
                                            </div>

                                            <div className="valueRow">
                                                <div className="cardInfo">
                                                    <p className="expenseCardName"><MdCreditCard/><CardName id={expense.cardId}/></p>
                                                    <p className='startDate'>INICIADO EM {expense.startDate.toString().split('-')[1]}/{expense.startDate.toString().split('-')[0]}</p>
                                                </div>
                                                <div className="expenseValue">
                                                    <p className="installValue">R$ {
                                                                                        (expense.installmentValue).toString().includes(".") ?
                                                                                            (expense.installmentValue).toString().replace(".", ",")
                                                                                        :
                                                                                            (expense.installmentValue).toString() + ",00"
                                                                                } ({expense.installmentAmount}x)</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                :
                <div>
                    <p>Não há despesas cadastradas ainda para serem exibidas aqui.</p>
                </div>

            }
           
        </section>
    );
}