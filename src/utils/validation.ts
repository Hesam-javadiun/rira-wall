import { StickyNotesType } from "@/App";


class FormValidation {
  isValidTitle(title: string) {
    return title !== "";
  }

  isValidDescription(description: string) {
    return description !== "";
  }

  isCreationDateValid() {
    return true;
  }

  isValidDeadline() {
    return true;
  }

//   validateState(args: Partial<StickyNotesType>): ValidityState {
    
//     return {
//       isValidTitle: this.isValidTitle(title),
//       isValidDescription: this.isValidDescription(description),
//       isValidDeadline: this.isValidDeadline(deadline),
//     };
//   }
}

export default FormValidation;
