import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../views/home/home"

const RouteProvider = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}></Route>
        </Routes>
    </BrowserRouter>
)

export default RouteProvider;
