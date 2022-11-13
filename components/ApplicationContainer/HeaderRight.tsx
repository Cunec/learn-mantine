import { Modal } from "@mantine/core";
import { useState } from "react";
import { AuthenticationForm } from "../AuthenticationForm/AuthenticationForm";

interface AuthenticationModal {
  children : React.ReactNode,
  modalOpen? : boolean,
  typeName? : 'register' | 'login',
}

const HeaderRight: React.FC<AuthenticationModal> = ({ modalOpen, typeName }) => {

  const [modalOpened, setModalOpened] = useState(false);
  const [formType, setFormType] = useState<'register' | 'login'>('register');
  
  // setModalOpened(modalOpen);
  
  return (
    <Modal
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      {/* <AuthenticationForm formtype={formType} /> */}
    </Modal>
    );
};

export default HeaderRight;