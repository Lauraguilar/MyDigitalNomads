let form = document.getElementById("registration");

const checkDate = (field) => {
  let minYear = 1902;
  let maxYear = new Date().getFullYear();

  let errorMsg = "";

  if (field.value != "") {
    const pdate = field.value.split("-");
    const yy = parseInt(pdate[0]);
    if (yy < minYear || yy > maxYear) {
      errorMsg =
        "Invalid value for year: " +
        yy +
        " - must be between " +
        minYear +
        " and " +
        maxYear;
    }
  } else {
    errorMsg = "Empty date not allowed!";
  }

  if (errorMsg != "") {
    Swal.fire({
      title: "Error!",
      text: errorMsg,
      icon: "error",
      confirmButtonText: "Ok",
    });
    return false;
  }

  return true;
};
const checkPassword = (passwordField, validationField) => {
  let errorMsg = "";

  // regular expression to password
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d]|[^ ]){8,}$/;

  if (passwordField.value !== "" || validationField.value !== "") {
    if (!re.test(passwordField.value)) {
      errorMsg =
        "Password should have Minimum 8 characters (1 uppercase and 1 lowercase and 1 number) and does not accept empty spaces";
    }
    if (!re.test(validationField.value)) {
      errorMsg =
        "Validation password should have Minimum 8 characters (1 uppercase and 1 lowercase and 1 number) and does not accept empty spaces";
    }
  } else {
    errorMsg = "Empty password or validation password not allowed!";
  }

  if (errorMsg != "") {
    Swal.fire({
      title: "Error!",
      text: errorMsg,
      icon: "error",
      confirmButtonText: "Ok",
    });
    return false;
  }
  return true;
};

const checkForm = () => {
  if (!checkDate(form.dateOfBirth)) return false;
  if (!checkPassword(form.password, form.passwordValidation)) return false;
  return true;
};

const handleSubmit = async (event) => {
  event.preventDefault();
  if (checkForm()) {
    const data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire({
            title: "Success!",
            text: "Your registration was successful",
            icon: "success",
            confirmButtonText: "Ok",
          });
          form.reset();
        } else {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong, please try again later",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong, please try again later",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  }
};
form.addEventListener("submit", handleSubmit);
