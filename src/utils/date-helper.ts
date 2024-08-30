export enum DeadlineStatus {
  IS_PASSED,
  IS_NEAR,
  IS_NOT_NEAR,
}

export default class DateHelper {
  getDateFromInput(value: string) {
    if (value === "") {
      return null;
    }
    return new Date(value.replace(/-/g, "/"));
  }

  convertDateToInputValue(date: Date | null) {
    if (!date) {
      return "";
    }

    const years = date.getFullYear();

    let month: string | number = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;

    let day: string | number = date.getDate();
    day = day < 10 ? "0" + day : day;

    return `${years}-${month}-${day}`;
  }

  customizeDateStringForShowing(date: Date) {
    return date.toDateString();
  }

  compareDeadlineDateWithNow(deadline: Date): DeadlineStatus | never {
    const now = new Date().getTime();
    const diff = deadline.getTime() - now;
    const days = +(diff / (24 * 60 * 60 * 1000)).toFixed() + 1;
    console.log('days',days);
    if (days >= 7) {
      return DeadlineStatus.IS_NOT_NEAR;
    }

    if (days < 8 && days >= 0) {
      return DeadlineStatus.IS_NEAR;
    }

    if (days < 0) {
      return DeadlineStatus.IS_PASSED;
    }

    throw Error("what the fuck just happend in compareDeadlineDateWithNow");
  }
}
