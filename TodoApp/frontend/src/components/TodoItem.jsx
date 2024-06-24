/* eslint-disable react/prop-types */
import { useContext } from "react";
import style from "../css/TodoItem.module.css";
import { TodoItemsContext } from "../store/todo-items-store";

function TodoItem({ todoItems  }) {
  const { deleteItem } = useContext(TodoItemsContext);

  const handleOnDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/todo-items/${todoItems._id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        console.log("Error deleting item");
      }
      deleteItem(todoItems._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container text-center">
      <div className={` ${style["kg-row"]} row `}>
        <div className="col-6">{todoItems.title}</div>
        <div className="col-4">{todoItems.date}</div>
        <div className="col-2">
          <button
            type="button"
            className={`${style["kg-button"]} btn btn-danger`}
            onClick={handleOnDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default TodoItem;
