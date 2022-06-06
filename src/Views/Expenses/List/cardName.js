import React, { useEffect, useState }  from 'react';
import api from './../../../Services/Api'

export default function CardName(props){

    const [name, setName] = useState();

    async function getName(id){
        await api.get("/card/"+id).then(result => {
            setName(result.data.name);
        });
    }

    useEffect(() => {
        getName(props.id);
    }, []);

    return(
        <span>{name}</span>
    );
}