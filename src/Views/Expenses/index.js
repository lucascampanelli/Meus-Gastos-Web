import React  from 'react';

export default function Expenses(props){

    return(
        <main>
            <article>
                <section>
                    <div className='screenControl'>
                        <h2>Minhas despesas</h2>
                        <button className="addBtn">CRIAR DESPESA</button>
                    </div>
                    <p>
                        Visualize e cadastre suas despesas.
                    </p>
                </section>
            </article>
        </main>
    );
}