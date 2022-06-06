import React from 'react';
import api from './../../../Services/Api'

export default function DeleteExpense(props){

    async function deleteExpense(e){

        e.preventDefault();

        await api.delete("/expenses/"+props.selected.id)
        .then(() => {
            props.setPage("listar");
            props.setJobSuccess(true);
            props.setDeleteConfirm(false);
            props.setSelected({});
        })
        .catch(e => {
            console.error("Ocorreu um erro ao remover a despesa. \nDetalhes do erro: " + e);
        });

    }

    return(
        <div className="removeAlertBackDrop" onClick={() => {props.setDeleteConfirm(false)}}>
            {/* e.stopPropagation() para que o onClick do ".removeAlertBackDrop", que fecha o alerta, não se aplique à div do alerta*/}
            <div className="removeAlert" onClick={e => e.stopPropagation()}>
                <h4>Você tem certeza?</h4>
                <p>Deseja realmente remover a despesa <span>{props.selected.name}</span>? Esta ação é permanente e não poderá ser desfeita.</p>
                
                <div className="alertControl">
                    <div>
                        <button type="reset" className="cancelBtn" onClick={() => {props.setDeleteConfirm(false)}}>CANCELAR</button>
                    </div>
                    <div>
                        <button className="addBtn" onClick={e => deleteExpense(e)}>REMOVER</button>
                    </div>
                </div>
            </div>
        </div>
    );
}