function sayHello(name) {
    return "Hello " + name;
}

// arrow function
const sayHi = (name) => "Hello " + name;

// Template
const sayHis = name => ` Hello ${name}`;

// structuring 
const human = {
    name: 'nico',
    lastName: 'lee',
    nationality: 'wish i was korean',
    favFood: {
        breakfast: "ramen",
        lunch: "rice",
        dinner: "hamberger"
    }
};

// const name = human.name;
// const lastName = human.lastName;

// 좋은 코드가 아니다.
// Structuring

const {
    name,
    lastName,
    nationality: difName,
    favFood: {
        breakfast,
        lunch,
        dinner
    }
} = human;



console.log(name, lastName, difName, breakfast, lunch, dinner);

// spread Operator
const days = ["mon", "tues", "wed"];
const otherDays = ["thu", "fri", "sat"];

let alldays = [...days, ...otherDays];
console.log(alldays);