import { ReactNode, useRef, useState } from "react";
import Layout from "@/components/layout";
import Modal from "@/components/modal";
import Form from "@/components/form";
import Button from "@/components/button";
import useNotes from "@/hooks/use-notes";
import { GridContainer, GridItem } from "@/components/gird";
import { PlusIcon } from "@/components/icons";
import StickyNoteCard from "./components/sticky-note-card/sticky-node-card";
import { searchParamsUtils } from "./utils";
import { type DragEvent } from "react";

export type StickyNotesType = {
  title: string;
  description: string;
  creationDate: Date;
  deadline: Date;
};

function App() {
  const { notes, addNote, removeNote, editNote, onDropNote } = useNotes();
  const [needToShowModal, setShowModal] = useState(false);
  const draggedItemSlug = useRef<number | null>(null);

  const showModal = (slug?: number) => {
    searchParamsUtils.addSearchParamToBrowserURL(slug);
    setShowModal(true);
  };

  const dragStartHandler = (slug: number) => {
    draggedItemSlug.current = slug;
  };

  const dragOverHandler = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
  };

  const dropHandler = (droppedItemSlug: number) => {
    onDropNote(draggedItemSlug.current!, droppedItemSlug);
  };

  let list: ReactNode;
  const editNoteButtonHandler = (slug: number) => {
    showModal(slug);
  };

  if (notes.length > 0) {
    list = (
      <GridContainer>
        {notes.map((note: StickyNotesType, index: number) => {
          return (
            <GridItem>
              <StickyNoteCard
                key={note.creationDate.toDateString() + note.title}
                removeHandler={removeNote.bind(null, index)}
                editHandler={editNoteButtonHandler.bind(null, index)}
                note={note}
                draggable
                onDragStart={dragStartHandler.bind(null, index)}
                onDragOver={dragOverHandler}
                onDrop={dropHandler.bind(null, index)}
              ></StickyNoteCard>
            </GridItem>
          );
        })}
      </GridContainer>
    );
  }

  const plusBtnClickHandler = () => {
    showModal();
  };

  const closeModal = () => {
    searchParamsUtils.navigateBack();
    setShowModal(false);
  };

  return (
    <>
      <Layout
        openModalButton={
          <Button onClick={plusBtnClickHandler}>
            <PlusIcon />
          </Button>
        }
      >
        <h1>Wall of Sticky Notes</h1>
        {list}
      </Layout>
      {needToShowModal && (
        <Modal>
          <Form
            listOfNotes={notes}
            onClose={closeModal}
            addNote={addNote}
            editNote={editNote}
          ></Form>
        </Modal>
      )}
    </>
  );
}

export default App;
