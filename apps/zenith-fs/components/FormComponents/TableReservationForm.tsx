"use client";

import { postTableReservationData } from "@/actions/reserveTableActions";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";

const TableReservationForm = () => {
  const [tableId, setTableId] = useState<string>("");

  return (
    <div>
      <h1 className="mt-0 mb-0">Reserve a table</h1>
      <Input
        className=""
        value={tableId}
        onChange={(e) => setTableId(e.target.value)}
      />
      <Button onClick={() => postTableReservationData(tableId)}>Submit</Button>
    </div>
  );
};

export default TableReservationForm;
