$(() => {
  $("form[name='registration']").validate({
    rules: {
      dateOfBirth: {
        required: true,
        date: true,
      },

      password: {
        required: true,
        minlength: 5,
      },

      passwordValidation: {
        required: true,
        minlength: 5,
        equalTo: "[name='password']",
      },
    },

    messages: {
      dateOfBirth: "Please enter a valid date",

      password: {
        required: "Please provide a password",
        minlength: "Your password must have at least 5 characters.",
      },

      passwordValidation: {
        required: "Please provide a password",
        minlength: "Your password must have at least 5 characters.",
        equalTo: "Passwords are not the same",
      },
    },

    submitHandler: (form) => {
      $.ajax({
        url: form.action,
        type: form.method,
        data: $(form).serialize(),
        success: (response) => {
          $("#answers").html(response);
          Swal.fire({
            title: "Success!",
            text: "Your registration was successful",
            icon: "success",
            confirmButtonText: "Ok",
          });
        },
        error: () => {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong, please try again later",
            icon: "error",
            confirmButtonText: "Ok",
          });
        
        },
      });
    },
  });
});
