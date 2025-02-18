import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useFetch } from "../hooks";
import CART_STORE, { addToCart, setTable } from "../store/cartStore";

const ReserveTableRoute = () => {
  const navigate = useNavigate();
  const { execute } = useFetch("cart", {
    method: "GET",
    isProtectedApi: true,
    executeOnMount: false,
    onSuccessCallback(data) {
      Object.keys(data).map((itemId) =>
        addToCart(parseInt(itemId), data[itemId])
      );
    },
  });
  const tableId = CART_STORE((store) => store.tableId);
  const { execute: postTable } = useFetch("table", {
    method: "POST",
    isProtectedApi: true,
    executeOnMount: false,
    onSuccessCallback(data: string) {
      if (data) {
        setTable(data);
        execute({ force: true });
        navigate("/menu");
      }
    },
  });

  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (tableId) {
      navigate("/menu");
    }
  }, [tableId]);
  const handleReservation = async () => {
    if (value) {
      postTable({ requestData: { tableId: value }, force: true });
    }
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></input>
      <button onClick={handleReservation}>Reserve</button>
    </div>
  );
};

export default ReserveTableRoute;
