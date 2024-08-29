import { searchParamsUtils } from "@/utils";
import { type StickyNotesType } from "@/App";

function useSubmit(
  listOfNotes: StickyNotesType[],
  addNote: (note: StickyNotesType) => void,
  editNote: (slug: number, note: StickyNotesType) => void
) {

  const slug = searchParamsUtils.getSlugFromSearchParam();

  console.log(slug);
  let selectedStickyNote = null;
  let onSubmit = addNote;

  if(slug){
    selectedStickyNote = listOfNotes.find((_, index) => index === slug) ?? null;
    onSubmit = editNote.bind(null, slug)
  }

  // const selectedStickyNote = useMemo<StickyNotesType | null>(() => {
  //   return listOfNotes.find((_, index) => index === slug) ?? null;
  // }, [slug, listOfNotes]);

  return { selectedStickyNote, onSubmit };
}

export default useSubmit;
