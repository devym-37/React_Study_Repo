// HTML 속성 작성 하듯이 작성


constructor(props){
    super(props);
    this.state = {
        liked : false,
    }
}

render(){
    return e('button', {onClick : () => {this.setState({liked : true})}, type : "submit"}, this.state.liked ? 'Liked' : 'Like');
    // <button onclick="() => {console.log("clicked")}" type="sub mit">Like</button>    와 같은 문법
}
ReactDOM.render(<LikeButton />, document.getElementById("root"));
// 

<Liked />
render(){ 
    return <button onClick  = ></button>
}

class GuGudan extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            first: Math.ceil(Math.random() * 9),
            second : Math.ceil(Math.random() * 9),
            value : '',
            result : '',
        }; // 상태의 초기값
    }

    render(){
        return (
            <div>
                <div>{this.state.first} 곱하기 {this.state.second}는?</div>
                    <form>
                        <input type="number" value = {this.state.value} onChage={(e) => this.setState({value : e.target.value })}/>
                    </form>
            </div>
            )
        );
    }
}
onChage = (e) => {
    this.setState = { value : e.target.value }
}

this.setState((prevState) => {
    // 이전 값
    return {
        result : prevState.value;
    }
})

ReactDOM.render(<GuGudan />, document.getElementById("root"));