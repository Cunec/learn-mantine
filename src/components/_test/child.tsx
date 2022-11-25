import { Button, Text } from "@mantine/core";
import { useState } from "react";

interface IProps {
  parentCallback: (value : number) => void
}

export default function Child({ parentCallback: parentCallback } : IProps ) {
  const [childValue, setChildValue] = useState(0);

  const setChildValue2 = (value : number) => {
    setChildValue(value);
    parentCallback(childValue);
  }

  return (
    <div>
      <Text>
        childValue : {childValue}
      </Text>
      <Button 
        onClick={() => { setChildValue2(childValue + 1) } }
        color="gray"
      >
        Child OnClick
      </Button>
    </div>
  );
}