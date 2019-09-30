// Rendering Elements
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById("root"));

function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById("root"));
}

setInterval(tick, 1000);

// React only Updates What's Necessary
// Components and Props

//simplest way to define a component is to write a javascript function
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// but ES6 class
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

//
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />; // 함수 호출
ReactDOM.render(element, document.getElementById("root"));

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}
