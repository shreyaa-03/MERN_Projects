import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import FetchingItems from "../components/FetchingItems";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../../../9-Myntra Clone/3-myntra-react-clone/src/components/LoadingSpinner";

export default function App() {
  const fetchStatus = useSelector((store) => store.loader);

  return (
    <>
      <Header />
      <FetchingItems />
      {fetchStatus.currentlyFetching ? <LoadingSpinner /> : <Outlet />}

      <Footer></Footer>
    </>
  );
}
