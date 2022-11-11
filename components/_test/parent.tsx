import { useEffect, useRef, useState } from "react";
import { Text } from "@mantine/core";
import Child from "./child";

export default function Parent() {
  const [parentValue, setParentValue] = useState(0);
  
  const handleCallback = (val : number) => {
    setParentValue(val);
  }

  return (
    <div>
      <Text>
        {parentValue}
      </Text>
      <Child callback={handleCallback} />
    </div>
  );
}