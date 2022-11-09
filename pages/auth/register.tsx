import { useState } from "react";
import { Button, Group, Modal } from "@mantine/core";
import { AuthenticationForm } from "../../components/AuthenticationForm/AuthenticationForm";
//import { useForm, UseFormReturnType } from '@mantine/form';

export default function Register() {
  const [opened, setOpened] = useState(false);
  
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
      >
        <AuthenticationForm />
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </Group>
    </>
  );
}