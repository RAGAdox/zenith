"use client";

import { postTableReservationData } from "@/actions/reserveTableActions";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";

const TableReservationForm = () => {
  const [tableId, setTableId] = useState<string>("");

  return (
    <div className="card bg-base-100">
      <div className="card-body prose px-4 py-2">
        <h4 className="mt-0 mb-0">Reserve a table</h4>
        <Input
          className=""
          value={tableId}
          onChange={(e) => setTableId(e.target.value)}
        />
        <div className="card-actions justify-end ">
          <Button
            variant="cta"
            className=""
            onClick={() => postTableReservationData(tableId)}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TableReservationForm;
