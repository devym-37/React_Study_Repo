import React, {useState} from 'react';

// url : https://medium.com/@sdolidze/the-iceberg-of-react-hooks-af0b588f43fb

// Level0: Hello world
export default function Level0() {
    const [count, setCount] = useState(0);

    return(
        <div>
            <span>{count => `${count}`}</span>
            <button onClick={() => setCount(count+1)}>+</button>
            <button onClick={() => setCount(count-1)}>-</button>
        </div>
    )
}

// Level1: setInterval
export default function Level1(){
    const [count, setCount] = useState(0);
    
    setInterval(() => {
        setCount(count+1)
    }, 500)

    return <div>count => {count}</div>
}

// Level2: useEffect
export default function Level2(){
    const [count, setCount] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setCount(count+1);
        }, 500)
    })
    return <div>count => {count}</div>
}

// Level3: run only once
export default function Level2(){
    const [count, setCount] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setCount(count+1);
        }, 500)
    },[])
    return <div>count => {count}</div>
}

// Level4: cleanup
export default function Level2(){
    const [count, setCount] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setCount(count+1);
        }, 300)
        return () => clearInterval(interval);
    }, []);

    return <div>count => {count}</div>
}

// level5: use count as dependency
export default function Level2(){
    const [count, setCount] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setCount(count+1);
        }, 300)
        return () => clearInterval(interval);
    }, [count]);

    return <div>count => {count}</div>
}

// Level6: setTimeout
export default function Level2(){
    const [count, setCount] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
          setCount(count + 1);
        }, 500);
        return () => clearTimeout(timeout);
      }, [count]);

    return <div>count => {count}</div>
}

// Level7: functional updates for useState
export default function Level2(){
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
          setCount(c => c + 1);
        }, 500);
        return () => clearInterval(interval);
      }, []);

    return <div>count => {count}</div>
}


// level8: local variable
export default function Level08() {
    const [count, setCount] = useState(0);
    let interval = null;
    const start = () => {
      interval = setInterval(() => {
        setCount(c => c + 1);
      }, 500);
    };
    const stop = () => {
      clearInterval(interval);
    };
    return (
      <div>
        count => {count}
        <button onClick={start}>start</button>
        <button onClick={stop}>stop</button>
      </div>
    );
  }

  // Level9: useRef
  export default function Level09() {
    const [count, setCount] = useState(0);
    const intervalRef = useRef(null);
    const start = () => {
      intervalRef.current = setInterval(() => {
        setCount(c => c + 1);
      }, 500);
    };
    const stop = () => {
      clearInterval(intervalRef.current);
    };
    return (
      <div>
        count => {count}
        <button onClick={start}>start</button>
        <button onClick={stop}>stop</button>
      </div>
    );
  }

  // Level10: useCallback
  export default function Level10() {
    const [count, setCount] = useState(0);
    const intervalRef = useRef(null);
    const start = () => {
      if (intervalRef.current !== null) {
        return;
      }
      intervalRef.current = setInterval(() => {
        setCount(c => c + 1);
      }, 500);
    };
    const stop = () => {
      if (intervalRef.current === null) {
        return;
      }
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
    return (
      <div>
        count => {count}
        <button onClick={start}>start</button>
        <button onClick={stop}>stop</button>
      </div>
    );
  }

  // Level11: useCallback
  export default function Level11() {
    const [count, setCount] = useState(0);
    const intervalRef = useRef(null);
    const start = useCallback(() => {
      if (intervalRef.current !== null) {
        return;
      }
      intervalRef.current = setInterval(() => {
        setCount(c => c + 1);
      }, 500);
    }, []);
    const stop = useCallback(() => {
      if (intervalRef.current === null) {
        return;
      }
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }, []);
  return (
      <div>
        count => {count}
        <button onClick={start}>start</button>
        <button onClick={stop}>stop</button>
      </div>
    );
  }

  // Level12: custom hook
  function useCounter(initialValue, ms) {
    const [count, setCount] = useState(initialValue);
    const intervalRef = useRef(null);
    const start = useCallback(() => {
      if (intervalRef.current !== null) {
        return;
      }
      intervalRef.current = setInterval(() => {
        setCount(c => c + 1);
      }, ms);
    }, []);
    const stop = useCallback(() => {
      if (intervalRef.current === null) {
        return;
      }
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }, []);
    const reset = useCallback(() => {
      setCount(0);
    }, []);
    return { count, start, stop, reset };
  }

  export default function Level12() {
    console.log('renderLevel12');
    const { count, start, stop, reset } = useCounter(0, 500);
    return (
      <div>
        count => {count}
        <button onClick={start}>start</button>
        <button onClick={stop}>stop</button>
        <button onClick={reset}>reset</button>
      </div>
    );
  }