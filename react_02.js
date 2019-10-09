var array = [
    [['firstName', 'Joe'], ['lastName', 'Blow'], ['age', 42], ['role', 'clerk']],
    [['firstName', 'Mary'], ['lastName', 'Jenkins'], ['age', 36], ['role', 'manager']],
  ];
  function transformEmployeeData(array) {
    var newArr = [];
    var newObj = {};
    var count = array.map((elem) => elem.length);
    console.log(count);
}

console.log(transformEmployeeData(array));