import { DeadlineStatus, dateHelper } from "@/utils";
import { useState, useEffect, useRef } from "react";

function useAddRedHighlightToUpcomingDeadline(deadline: Date) {
  const [deadlineStatus, setStatus] = useState<DeadlineStatus>(
    dateHelper.compareDeadlineDateWithNow(deadline)
  );

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setStatus(dateHelper.compareDeadlineDateWithNow(deadline));
  }, [deadline]);
  console.log("cardColorClass", deadlineStatus);

  useEffect(() => {
    const id = setInterval(() => {
      const status = dateHelper.compareDeadlineDateWithNow(deadline);
      setStatus(status);
    }, 24 * 60 * 60 * 1000);

    return () => {
      clearInterval(id);
    };
  }, [deadline]);

  return { deadlineStatus };
}

export default useAddRedHighlightToUpcomingDeadline;
