/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import style from "../css/TodoItems.module.css";
import TodoItem from "./TodoItem";
import { useContext, useEffect } from "react";
import { TodoItemsContext } from "../store/todo-items-store";
import Message from "./Message";

export default function TodoItems() {
  const { allItems, todoItems } = useContext(TodoItemsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/todo-items");
        if (!response.ok) {
          throw new Error("Error Fetching Data");
        }
        const data = await response.json();
        allItems(data.items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [allItems]);

  return (
    <>
      {todoItems.length === 0 && <Message></Message>}
      <div className={style["item-container"]}>
        {todoItems.map((item) => (
          <TodoItem key={item._id} todoItems={item}></TodoItem>
        ))}
      </div>
    </>
  );
}
