import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Loader } from "../components/Loader";
import { useFetch } from "../hooks";
import { FETCH_DATA } from "../hooks/useFetch";
import { addToCart } from "../store/cartStore";

const ReserveTableRoute = () => {
  const navigate = useNavigate();
  const { execute: getCart } = useFetch("cart", {
    method: "GET",
    isProtectedApi: true,
    executeOnMount: false,
    onSuccessCallback(data) {
      Object.keys(data).map((itemId) =>
        addToCart(parseInt(itemId), data[itemId])
      );
    },
  });
  const { data, isError, isFetching, isLoaded, isSuccess } = FETCH_DATA(
    (store) => store.table
  );
  // console.log("FETCH_DATA Store===>", tableId);
  const { execute: postTable } = useFetch("table", {
    method: "POST",
    isProtectedApi: true,
    executeOnMount: false,
    onSuccessCallback(data: string) {
      if (data) {
        getCart({ force: true });
        navigate("/menu");
      }
    },
  });

  const [value, setValue] = useState<string>("");

  const handleReservation = async () => {
    if (value) {
      postTable({ requestData: { tableId: value }, force: true });
    }
  };

  if (isFetching || !isLoaded) {
    return <Loader />;
  }
  if (isSuccess && data.tableId) {
    return <Navigate to="/menu" />;
  }
  if (isError || !isFetching) {
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
  }
};

export default ReserveTableRoute;
