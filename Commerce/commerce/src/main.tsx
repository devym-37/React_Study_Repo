import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, useRoutes } from "react-router-dom";
import "../src/scss/index.scss";

import App from "./app";

/*
Vite는 개발환경에서는 ESModule을 그대로 쓴다. -> bundling을 안한다. 

웹팩은 초기로딩에 성능이 느릴수 밖에 없다.(bundling)이 되기 때문에 -> Why vite 참고
*/

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
