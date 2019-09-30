// variable declaration
const element = <h1>Hello, world!</h1>;

// Embedding Expressions in JSX
const name = "Josh Perez";
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(element, document.getElementById("root"));

//
function formatName(user) {
  return user.firstName + " " + user.lastName;
}

const user = {
  firstName: "Harper",
  lastName: "Perez"
};

const element = <h1>Hello, {formatName(user)}!</h1>;

ReactDOM.render(element, document.getElementById("root"));

// if or for loops 안에 JSX 사용할 수 있다
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}

//
const element = <img src={user.avatarUrl}></img>;
//===
const element = <img src={user.avatarUrl} />;

// JSX tags may contain children
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);

//
const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;
