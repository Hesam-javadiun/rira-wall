import { useRef } from "react";
import Layout from "@/components/layout";
import Modal, { type ModalExposedRef } from "@/components/modal";
import Form from "@/components/form";
import Button from "@/components/button";

export type StickyNotesType = {
  title: string;
  description: string;
  creationDate: Date;
  deadline: Date;
};

function App() {
  const modalRef = useRef<ModalExposedRef>(null);

  const onSave = (data: StickyNotesType) => {
    console.log("form submitted with data => ", data);
  };

  const onClose = () => {
    const modal = modalRef.current!;
    modal.close();
  };

  const onClickHandler = () => {
    const modal = modalRef.current!;
    modal.show();
  };

  return (
    <>
      <Layout
        openModalButton={<Button onClick={onClickHandler}>plus icon</Button>}
      >
        <h1>sticky notes</h1>
      </Layout>
      <Modal ref={modalRef}>
        <Form onSave={onSave} listOfNotes={[]} onClose={onClose}></Form>
      </Modal>
    </>
  );
}

export default App;
