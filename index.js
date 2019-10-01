class TodoListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      done: false
    };
  }

  onListItemClick() {
    this.setState({
      done: !this.state.done
    });
  }
  render() {
    const style = {
      textDecoration: this.state.done ? "line-through" : "none"
    };

    return (
      <li style={style} onClick={this.onListItemClick.bind(this)}>
        {this.props.todo}
      </li>
    );
  }
}
