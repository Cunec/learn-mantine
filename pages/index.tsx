import { Group, useMantineTheme } from "@mantine/core";
import BigText from "../components/test/BigText";

export default function Home() {
  const theme = useMantineTheme();
  return (
    <div>
      <BigText></BigText>
    </div>
  )
}
