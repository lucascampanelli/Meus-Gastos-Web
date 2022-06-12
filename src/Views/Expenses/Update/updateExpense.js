import React, { useState, useEffect }  from 'react';
import { MobileBillings } from '../../../Utils/Illustrations';
import api from './../../../Services/Api'

export default function UpdateExpense(props){

    const [name, setName] = useState(props.expense.name);
    const [startDate, setStartDate] = useState(props.expense.startDate);
    const [installmentValue, setInstallmenteValue] = useState(props.expense.installmentValue);
    const [installmentAmount, setInstallmenteAmount] = useState(props.expense.installmentAmount);
    const [cardId, setCardId] = useState(props.expense.cardId);
    const [cards, setCards] = useState([]);
    const [error, setError] = useState("");

    // Método responsável por atualizar a despesa
    async function updateCard(e){

        // Cancela o comportamento padrão quando o formulário é submetido
        e.preventDefault();

        // Vetor que armazenará cada atributo mudado em forma de um objeto.
        // Esses objetos serão enviados como corpo da requisição patch para a API posteriormente
        var changes = [];

        // Se o name do formulário for diferente do name inicial
        if(props.expense.name !== name)
            // Adiciona um objeto com a chave name com o novo nome
            changes.push({"name": name.toString()});

        // Se a data de início no formulário for diferente da data inicial
        if(props.expense.startDate !== startDate)
            // Adiciona um objeto com a chave startDate com a nova data
            changes.push({"startDate": startDate.toString()});

        // Se o valor da parcela do formulário for diferente do valor inicial
        if(props.expense.installmentValue !== installmentValue)
            // Adiciona um objeto com a chave installmentValue com o novo valor
            changes.push({"installmentValue": parseFloat(installmentValue)});

        // Se a quantidade de parcelas do formulário for diferente da quantidade inicial
        if(props.expense.installmentAmount !== installmentAmount)
            // Adiciona um objeto com a chave installmentAmount com a nova quantidade
            changes.push({"installmentAmount": parseInt(installmentAmount)});

        // Se o cartão do formulário for diferente do cartão inicial
        if(props.expense.cardId !== cardId)
            // Adiciona um objeto com a chave installmentAmount com a nova quantidade
            changes.push({"cardId": cardId.toString()});

        /*
        * Ao fim, o vetor changes deverá ficar, por exemplo, da seguinte maneira:
        * [
        *   {name: "novoNome"},
        *   {startDate: "novaData"},
        *   {installmentValue: "novoValor"}
        * ]
        */


        // Para cada objeto no vetor de mudanças
        changes.forEach(async function (change, index) {
            // Faz uma requisição patch na API na rota expenses/id-da-despesa passando a mudança como body
                await api.patch("/expenses/" + props.expense.id, change)
                    .then(() => {

                        // Se for o último objeto na array de mudanças (Ou seja, não haverá outra requisição)
                        if (index === changes.length - 1)
                            // O componente de listagem voltará a ser exibido
                            props.setPage("listar");

                    })
                    .catch(e => {

                        // Se ocorreu um erro, mostra o erro no console
                        console.error("Ocorreu um erro ao atualizar a despesa. \nDetalhes do erro: " + e);

                        // Se não houver um erro armazenado no estado de erro, salva a mensagem de erro que será exibida no form
                        if (!error)
                            setError("Opsss... Ocorreu um erro ao atualizar a despesa. Tente novamente mais tarde.");
                    });
            });

        // Se não houver nenhuma mudança
        if(changes.length < 1)
            // O componente de listagem volta a ser exibido
            props.setPage("listar");
    }

    // Método responsável por buscar os cartões disponíveis
    async function getCards(){
        await api.get("/card").then(result => {
            setCards(result.data);
            setCardId(result.data[0].id);
        });
    }


    // Chama o método getCards no momento em que o componente é carregado
    useEffect(() => {
        getCards();
    }, []);

    return(
        <section id="expenseUpdate">
            <div className='screenControl'>
                <h2>Atualizar despesa</h2>
            </div>
            <p className="pageDescription">
                Edite as informações da sua despesa para o melhor controle de suas finanças.
            </p>

            <div className="container">
                <form onSubmit={updateCard}>
                    <label>NOME</label>
                    <input placeholder='NOME' type="text" value={name} maxLength={30} onChange={e => setName(e.target.value)}/>
                    <label>DATA DO INÍCIO</label>
                    <input placeholder='DATA DO INÍCIO' type='text' value={startDate} max="7" min="7" onChange={e => setStartDate(e.target.value)}/>
                    <label>VALOR DA PARCELA</label>
                    <input placeholder='VALOR DA PARCELA' type="text" value={installmentValue} onChange={e => setInstallmenteValue(e.target.value)}/>
                    <label>QUANTIDADE DE PARCELAS</label>
                    <input placeholder='QUANTIDADE DE PARCELAS' type="number" value={installmentAmount} min="1" onChange={e => setInstallmenteAmount(e.target.value)}/>
                    {
                        cards ?
                            <>
                                <label>CARTÃO DO PARCELAMENTO</label>
                                <select placeholder='VALOR DA PARCELA' type="number" onChange={e => setCardId(e.target.value)}>
                                    {
                                        cards.map((card) => (
                                            <option value={card.id} key={card.id}>{card.name}</option>
                                        ))
                                    }
                                </select>
                            </>
                        :
                            ""
                    }
                    
                    {
                        error ?
                            <p className="errorMsg">{error}</p>
                        :
                            ""
                    }

                    <div className='formControl'>
                        <button type="reset" className="cancelBtn" onClick={() => {props.setPage("listar")}}>CANCELAR</button>
                        <button className="addBtn">ATUALIZAR CARTÃO</button>
                    </div>
                </form>

                <div>
                    <MobileBillings/>
                </div>
            </div>
        </section>
    );
}