import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react';
import Header from "./Views/Components/Header";
import Home from "./Views/Home";
import Cards from "./Views/Cards";
import Expenses from "./Views/Expenses";

export default function Router(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>

                <Route path="/cartoes" element={<Cards/>}/>

                <Route path="/despesas" element={<Expenses/>}/>

                {/* <Route path="/despesas" component={Home}>
                        <Route path="/criar"/>
                </Route>
                <Route path="/cartoes" component={Home}/> */}
            </Routes>
        </BrowserRouter>
    );
}