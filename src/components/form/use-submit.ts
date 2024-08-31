import { searchParamsUtils } from "@/utils";
import { type StickyNotesType } from "@/App";

function isNumber(number: unknown) {
  return !isNaN(number as number) && typeof number === 'number'
}

function useSubmit(
  listOfNotes: StickyNotesType[],
  addNote: (note: StickyNotesType) => void,
  editNote: (slug: number, note: StickyNotesType) => void
) {

  const slug = searchParamsUtils.getSlugFromSearchParam();

  let selectedStickyNote = null;
  let onSubmit = addNote;
  if(isNumber(slug)){
    selectedStickyNote = listOfNotes.find((_, index) => index === slug) ?? null;
    onSubmit = editNote.bind(null, slug as number)
  }

  return { selectedStickyNote, onSubmit };
}

export default useSubmit;
