import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const passRef = useRef(null)
  const [state, setstate] = useState();
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);

  const passGenerator = useCallback(() => {
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let pass = "";
    if (number) {
      str += "1234567890";
    }
    if (char) {
      str += "@#$%^&*(){}[]";
    }

      for (let i = 0; i < length; i++) {
        console.log(str)
        let randomNum = str[Math.floor(Math.random() * str.length)];
        pass += randomNum;
        console.log(pass)
      }
    
    setstate(pass);
  }, [length, number, char, setstate]);

  const copyPassword = useCallback(()=>{
    passRef.current?.select()
   window.navigator.clipboard.writeText(state)
  }, [state]);


  useEffect(() => {
    passGenerator();
  }, [passGenerator, length, number, char]);
  return (
    <div className="App">
      <span className='header'>
        {passGenerator}
        <input type="text" readOnly value={state} placeholder="Pass-Generator" className="inp" ref={passRef}/>
        <button onClick={copyPassword} className='btn'>copy</button>
      </span>

      <div className="elBar">
        <input
          type="range"
          min={1}
          max={10}
          length={length}
          onChange={(e) => {
            setLength(e.target.value);
          }}
        />
        <label>length : {length}</label>
        <label>
          <input
            type="checkbox"
            className="numberCheckbox"
            defaultChecked = {number}
            onChange={() => {
              setNumber((prev) => !prev);
            }}
          />{" "}
          Number
        </label>
        <label>
          <input
            type="checkbox"
            className="charCheckbox"
            defaultChecked = {char}
            onChange={() => {
              setChar((prev) => !prev);
            }}
          />{" "}
          Characters
        </label>
      </div>
    </div>
  );
}

export default App;
