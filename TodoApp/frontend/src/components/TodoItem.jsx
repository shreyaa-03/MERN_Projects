/* eslint-disable react/prop-types */
import style from "../css/TodoItem.module.css";

function TodoItem({ todoItems }) {
  return (
    <div className="container text-center">
      <div className={` ${style["kg-row"]} row `}>
        <div className="col-6">{todoItems.title}</div>
        <div className="col-4">{todoItems.date}</div>
        <div className="col-2">
          <button
            type="button"
            className={`${style["kg-button"]} btn btn-danger`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default TodoItem;
