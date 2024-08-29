class FormValidation {
  //validation actions
  private isEmpty = (input: string) => {
    return input === "";
  };

  isValidTitle(title: string, errors: string[]) {
    if (this.isEmpty(title)) {
      errors.push("title is empty");
    }
  }

  isValidDescription(description: string, errors: string[]) {
    if (this.isEmpty(description)) {
      errors.push("description is empty");
    }
  }

  isCreationDateValid(creationDate: Date | null, errors: string[]) {
    if (!creationDate) {
      errors.push("creation date is empty");
    }
  }

  isValidDeadline(creationDate: Date | null, deadline: Date | null, errors: string[]) {
    if (!deadline) {
      errors.push("deadline is empty");
      return;
    }

    if(!creationDate){
      return;
    }

    if(creationDate > deadline ){
      errors.push("deadline must come before the creationDate");
    }
  }
}

export default FormValidation;
