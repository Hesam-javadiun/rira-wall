import { DeadlineStatus, dateHelper } from "@/utils";
import { useState, useEffect } from "react";

function useAddRedHighlightToUpcomingDeadline(deadline: Date) {
  const [deadlineStatus, setStatus] = useState<DeadlineStatus>(
    DeadlineStatus.IS_NOT_NEAR
  );

  useEffect(() => {
    const status = dateHelper.compareDeadlineDateWithNow(deadline);
    setStatus(status);
  }, [deadline]);

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
