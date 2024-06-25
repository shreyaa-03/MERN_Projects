/* eslint-disable react/prop-types */
import { createContext, useCallback, useReducer, useEffect } from "react";

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
  } else if (action.type === "ADD")
    newTodoItems = [action.payload.item, ...currValue];
  else if (action.type === "DELETE") {
    newTodoItems = currValue.filter((item) => item._id !== action.payload.id);
  }
  return newTodoItems;
};

const TodoItemsContextProvider = ({ children }) => {
  const [todoItems, dispatchTodoItems] = useReducer(addItemsReducer, []);

  // every time parent changes, all its child methods ref change and each method is treaded as new object
  // as a solution useCallBack -> only repaints the object based on dependency array
  // you can directly pass allItems as a reference object instead of new obj
  const allItems = useCallback(
    (items) => {
      dispatchTodoItems({
        type: "ALL_ITEMS",
        payload: {
          items,
        },
      });
    },
    [dispatchTodoItems]
  );

  const addItem = (item) => {
    dispatchTodoItems({
      action: "ADD",
      payload: {
        item,
      },
    });
  };

  const deleteItem = (id) => {
    dispatchTodoItems({
      type: "DELETE",
      payload: {
        id,
      },
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/todo-items", {
          signal,
        });
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

    //useEffect cleanUp
    return () => {
      controller.abort();
    };
  }, [addItem]);

  return (
    <TodoItemsContext.Provider
      value={{ todoItems, addItem, allItems, deleteItem }}
    >
      {children}
    </TodoItemsContext.Provider>
  );
};

export default TodoItemsContextProvider;
