import React, { Component } from "react";

export default class React_Study012 extends Component {
  render() {
    return <div></div>;
  }
}

class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "Hello!" };
    // 이 부분이 중요합니다!
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    alert(this.state.message);
  }

  render() {
    // `this.handleClick`이 바인딩 되었기 때문에, 이를 이벤트 핸들러로 사용할 수 있습니다.
    return <button onClick={this.handleClick}>Say hello</button>;
  }
}

class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "Hello!" };
  }
  // 경고: 이 문법은 실험적입니다!
  // 화살표 함수를 통해 메서드를 바인딩합니다.
  handleClick = () => {
    alert(this.state.message);
  };

  render() {
    return <button onClick={this.handleClick}>Say hello</button>;
  }
}
