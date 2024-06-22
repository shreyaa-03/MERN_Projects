import { createContext, useReducer } from "react";

export const TodoItemsContext = createContext({
  todoItems: [],
  addItem: () => {},
  allItems: () => {},
  deleteItem: () => {},
});

const addItemsReducer = (currValue, action) => {
  let newTodoItems = currValue;
  if (action.type === "ALL_ITEMS") {
    newTodoItems = action.payload.items;
  }
  return newTodoItems;
};

const TodoItemsContextProvider = ({ children }) => {
  const [todoItems, dispatchTodoItems] = useReducer(addItemsReducer, []);

  const allItems = (items) => {
    dispatchTodoItems({
      type: "ALL_ITEMS",
      payload: {
        items
      },
    });
  };

  const addItem = () => {};

  const deleteItem = () => {};

  return (
    <TodoItemsContext.Provider
      value={{ todoItems, addItem, allItems, deleteItem }}
      >{ children}</TodoItemsContext.Provider>
  );
};

export default TodoItemsContextProvider;
