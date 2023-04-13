import { Global, css } from "@emotion/react";

export const globalStyles = (
    <Global
        styles={css`
            html {
                font-size: 62.5%;
                box-sizing: border-box;
                background-color: red;
            }
        `}
    />
);
