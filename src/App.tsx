import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colorLetter } from "./utils/colorLetter";

const App = () => {
  const initial = "Hello World Counter";
  const [title, setTitle] = useState<string>("Hello World Counter");
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const html = colorLetter(initial);
    setTitle(html);
  }, [count]);

  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: title }}></div>
      <Counter>
        <button onClick={() => setCount(count + 1)}>+</button>
        <h1>{count}</h1>
        <button onClick={() => setCount(count - 1)}>-</button>
      </Counter>
    </Container>
  );
};

export default App;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;

  h1 {
    color: #494949;
  }

  span {
    color: red;
    font-size: 40px;
  }
`;

const Counter = styled.div`
  display: flex;
  align-items: center;
  button {
    height: 30px;
    width: 70px;
    color: white;
    background-color: #3e507c;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }

  h1 {
    margin: 0 30px;
  }
`;
