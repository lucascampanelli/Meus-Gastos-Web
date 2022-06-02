import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react';
import Header from "./Views/Components/Header";
import Home from "./Views/Home";

export default function Router(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                {/* <Route path="/despesas" component={Home}>
                        <Route path="/criar"/>
                </Route>
                <Route path="/cartoes" component={Home}/> */}
            </Routes>
        </BrowserRouter>
    );
}