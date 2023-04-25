import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const Root = () => {
    return (
        <div>
            <h1>Root</h1>
            <Header />
            <Outlet />
        </div>
    );
};

export default Root;
