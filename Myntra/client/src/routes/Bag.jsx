import { useSelector } from "react-redux";
import BagItem from "../components/BagItem";
import BagSummary from "../components/BagSummary";

export default function Bag() {
  const bagItems = useSelector((store) => store.bag);
  const items = useSelector((store) => store.items);
  const filnalItems = items.filter((item) => bagItems.includes(item.id));
  return (
    <main>
      <div className="bag-page">
        <div className="bag-items-container">
          {filnalItems.map((item) => (
            <BagItem key={item.id} item={item} />
          ))}
        </div>
        <BagSummary />
      </div>
    </main>
  );
}
