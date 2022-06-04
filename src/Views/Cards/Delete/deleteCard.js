import React from 'react';
import api from './../../../Services/Api'

export default function DeleteCards(props){

    async function deleteCard(e){

        e.preventDefault();

        await api.delete("/card/"+props.card.id)
        .then(() => {
            props.setPage("listar");
            props.setJobSuccess(true);
            props.setDeleteConfirm(false);
            props.setSelectedCard({});
        })
        .catch(e => {
            console.error("Ocorreu um erro ao remover o cartão. \nDetalhes do erro: " + e);
        });

    }

    return(
        <div className="removeAlertBackDrop" onClick={() => {props.setDeleteConfirm(false)}}>
            {/* e.stopPropagation() para que o onClick do ".removeAlertBackDrop", que fecha o alerta, não se aplique à div do alerta*/}
            <div className="removeAlert" onClick={e => e.stopPropagation()}>
                <h4>Você tem certeza?</h4>
                <p>Deseja realmente remover o cartão <span>{props.card.name}</span>? Esta ação é permanente e não poderá ser desfeita.</p>
                
                <div className="alertControl">
                    <div>
                        <button type="reset" className="cancelBtn" onClick={() => {props.setDeleteConfirm(false)}}>CANCELAR</button>
                    </div>
                    <div>
                        <button className="addBtn" onClick={e => deleteCard(e)}>REMOVER</button>
                    </div>
                </div>
            </div>
        </div>
    );
}