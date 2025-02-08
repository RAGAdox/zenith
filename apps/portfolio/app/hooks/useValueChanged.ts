import { useState } from "react";

const useValueChanged = (value: any) => {
  const [previousValue, setPrevious] = useState<any>(value);
  const [newValue, setNewValue] = useState<any>();

  return;
};
