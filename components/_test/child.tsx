import { Button, Text } from "@mantine/core";
import { useState } from "react";

interface IProps {
  callback: (value : number) => void
}

export default function Child({ callback } : IProps ) {
  const [childValue, setChildValue] = useState(0);

  const setChildValue2 = (value : number) => {
    setChildValue(value);
    callback(childValue);
  }

  return (
    <div>
      <Button onClick={() => { setChildValue2(childValue + 1) } }>
        OnClick
      </Button>
      <Text>
        {childValue}
      </Text>
    </div>
  );
}