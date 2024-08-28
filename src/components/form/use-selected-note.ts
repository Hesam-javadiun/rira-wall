import { searchParamsUtils } from "@/utils";
import { useMemo } from "react";
import { type StickyNotesType } from "@/App";

function useSelectedNote(listOfNotes: StickyNotesType[]) {
  const slug = searchParamsUtils.getSlugFromSearchParam();

  const selectedStickyNote = useMemo<StickyNotesType | null>(() => {
    return listOfNotes.find((_, index) => index === slug) ?? null;
  }, [slug, listOfNotes]);

  return { selectedStickyNote };
}

export default useSelectedNote;
