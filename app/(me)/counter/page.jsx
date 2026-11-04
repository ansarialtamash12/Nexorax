"use client"
import { useState } from 'react';

export default function Counter() {

  const [count, setCount] = useState(0);

  const handleLeftClick = () => {
    setCount(count > 0 ? count - 1 : 0);
  };

  const handleRightClick = () => {
    setCount(count + 1);
  };

  const handleReset = () => {
    setCount(0);
  }

  return (
    <>
      <div className="flex flex-row items-center justify-center gap-4">

        <button onClick={handleLeftClick}>
          left
        </button>
        <p>{count}</p>
        <button onClick={handleReset}> Reset</button>
        <button onClick={handleRightClick}>
          right
        </button>

      </div >
    </>

  )
}