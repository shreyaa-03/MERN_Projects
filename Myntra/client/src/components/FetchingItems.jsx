import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { itemsAction } from "../store/itemsSlice";
import { loaderActions } from "../store/loaderSlice";

export default function FetchingItems() {
  const fetchStatus = useSelector((store) => store.loader);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchStatus.fetchDone) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        dispatch(loaderActions.fetchingStarted());
        const response = await fetch("http://localhost:3000/items", { signal });
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        const items = data.items;
        dispatch(loaderActions.fetchDone());
        dispatch(loaderActions.fetchingFinished());
        dispatch(itemsAction.addInitialItems(items[0]));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    return () => {
      controller.abort();
    };
  }, [fetchStatus]);

  return (
    <div>
      Fetch Status: {fetchStatus.fetchDone}
      Currently Fetching : {fetchStatus.currentlyFetching}
    </div>
  );
}
