// State and Lifecycle

/*
Mounting
constructor()
static getDerivedStateFromProps()
render()
componentDidMount()

Updating
static getDerivedStateFromProps()
shouldComponentUpdate()
render()
getSnapshotBeforeUpdate()
componetDidUpdate()

Unmounting --> component is being removed from the DOM
componentWillUnmount()

Error Handling --> there is an error during rendering
static getDerivedStateFromError()
componentDidCatch()

Other APIs
setState()
forceUpdate()

Class Properties
defaultProps
displayName

Instance Properties
props
state
*/


constructor(props) {
    super(props);
    // Don't do this!
    this.state = { color: props.color };
}

componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.userID !== prevProps.userID) {
      this.fetchData(this.props.userID);
    }
  }