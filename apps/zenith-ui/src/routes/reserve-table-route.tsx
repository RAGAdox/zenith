import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import urls from "../utils/api";

const ReserveTableRoute = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("");
  const handleReservation = async () => {
    if (value) {
      const searchParam = new URLSearchParams({ tableId: value });
      const response = await fetch(urls.table + "?" + searchParam.toString(), {
        method: "GET",
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (response.ok) {
        navigate("/menu");
      }
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
