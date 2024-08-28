
class FormValidation {
  //validation actions
  private isEmpty = (input: string) => {
    return input=== ''
  }

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

  isCreationDateValid(creationDate: string, errors: string[]) {
    if (creationDate !== "") {
      errors.push("creationDate is empty");
    }
  }

  isValidDeadline(deadline: string, errors: string[]) {
    if (deadline !== "") {
      errors.push("deadline is empty");
    }
  }
}

export default FormValidation;
