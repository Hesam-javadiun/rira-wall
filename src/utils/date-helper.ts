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

  customizeDateStringForShowing(date: Date){
    return date.toDateString();
  }
}
