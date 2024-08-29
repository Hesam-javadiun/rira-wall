import { useRef } from "react";
import Layout from "@/components/layout";
import Modal, { type ModalExposedRef } from "@/components/modal";
import Form from "@/components/form";
import Button from "@/components/button";
import useNotes from "@/hooks/use-notes";
import Grid from "@/components/gird";
import { PlusIcon } from "@/components/icons";

export type StickyNotesType = {
  title: string;
  description: string;
  creationDate: Date;
  deadline: Date;
};

function App() {
  const { notes, addNote, removeNote, editNote } = useNotes();

  const modalRef = useRef<ModalExposedRef>(null);

  const onClose = () => {
    const modal = modalRef.current!;
    modal.close();
  };

  const onClickHandler = () => {
    const modal = modalRef.current!;
    modal.show();
  };

  const button = (
    <Button onClick={onClickHandler}>
      <PlusIcon />
    </Button>
  );

  return (
    <>
      <Layout openModalButton={button}>
        <h1>Wall of Sticky Notes</h1>
        <Grid />
      </Layout>
      <Modal ref={modalRef}>
        <Form
          listOfNotes={notes}
          onClose={onClose}
          addNote={addNote}
          editNote={editNote}
        ></Form>
      </Modal>
    </>
  );
}

export default App;
