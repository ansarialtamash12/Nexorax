"use client"
import { useState } from "react";
export default function Todo() {
  const [list, setList] = useState(["hello"]);

  const handleAdd = () => {
    setList((prevList) => [...prevList, list]);

  }

  return (
    <>
      <div className="mt-10 flex gap-4 items-center justify-center">
        <input type="text" placeholder="Enter your task" onChange={(e) => setList(e.target.value)} />
        <button onClick={handleAdd}>Add</button>
      </div>

      <p className="text-center pt-8">{list}</p>
    </>
  )
}