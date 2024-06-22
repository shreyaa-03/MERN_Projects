/* eslint-disable react/prop-types */
import { useContext, useRef } from "react";
import style from "../css/AddTodo.module.css";
import { TodoItemsContext } from "../store/todo-items-store";

export default function AddTodo() {
  const itemNameElement = useRef();
  const itemDueElement = useRef();
  const { addItem } = useContext(TodoItemsContext);

  const handleOnSumbit = async (event) => {
    event.preventDefault();

    const newItem = {
      todoName: itemNameElement.current.value,
      todoDue: itemDueElement.current.value,
    };

    try {
      const response = await fetch("http://localhost:3000/api/todo-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
      if (!response.ok) {
        throw new Error("Error posting item");
      }
      const data = await response.json();
      addItem(data.item);

      itemNameElement.current.value = "";
      itemDueElement.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="container text-center" onSubmit={handleOnSumbit}>
      <div className={` ${style["kg-row"]} row `}>
        <div className="col-6">
          <input
            type="text"
            name="newItem"
            placeholder="Enter todo here"
            ref={itemNameElement}
          />
        </div>
        <div className="col-4">
          <input type="date" name="newDate" id="" ref={itemDueElement} />
        </div>
        <div className="col-2">
          <button
            type="submit"
            className={`${style["kg-button"]} btn btn-success`}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
