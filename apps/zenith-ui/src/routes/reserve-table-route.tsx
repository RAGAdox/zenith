import { TextInput, TextInputRef } from "@zenith/components";
import { useRef } from "react";
import { Navigate, useNavigate } from "react-router";
import { Loader } from "../components/Loader";
import { useFetch } from "../hooks";
import { FETCH_DATA } from "../hooks/useFetch";
import { setCart } from "../store/cartStore";

const ReserveTableRoute = () => {
  const inputRef = useRef<TextInputRef>(null);
  const navigate = useNavigate();
  const { execute: getCart } = useFetch("cart", {
    method: "GET",
    isProtectedApi: true,
    executeOnMount: false,
    onSuccessCallback(data) {
      setCart(data);
    },
  });
  const { data, isError, isFetching, isLoaded, isSuccess } = FETCH_DATA(
    (store) => store.table
  );

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

  // const [value, setValue] = useState<string>("");

  const handleReservation = async () => {
    const value = inputRef.current?.getValue();
    if (value) {
      postTable({
        requestData: { tableId: value },
        force: true,
      });
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
        <TextInput ref={inputRef} />
        <button onClick={handleReservation}>Reserve</button>
      </div>
    );
  }
};

export default ReserveTableRoute;
