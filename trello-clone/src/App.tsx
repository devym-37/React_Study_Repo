import { ThemeProvider, createGlobalStyle } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { darkTheme } from "./theme";
import { hourSelector, minuteState } from "./atoms";
import { useRecoilState, useRecoilValue } from "recoil";

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0; 
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
* {
    box-sizing: border-box;
}
body {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.bgColor}
}
a {
    text-decoration: none;
    color: inherit;
}
`;

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);

  const hours = useRecoilValue(hourSelector);

  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <ReactQueryDevtools initialIsOpen />
        <div>
          <input
            value={minutes}
            onChange={onMinutesChange}
            type="number"
            placeholder="minutes"
          />
          <input value={hours} type="number" placeholder="hours" />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
