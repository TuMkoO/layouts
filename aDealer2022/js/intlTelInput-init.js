// Phone country field
var input = document.querySelector("#phone"),
  errorMsg = document.querySelector("#error-msg"),
  validMsg = document.querySelector("#valid-msg");

// here, the index maps to the error code returned from getValidationError - see readme
var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];

// initialise plugin
var iti = window.intlTelInput(input, {
  initialCountry: "ua",
  customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
    return "+" + selectedCountryData.dialCode;
  },
  nationalMode: false,
  utilsScript: "js/utils.js"
});

var reset = function() {
  input.classList.remove("error");
  errorMsg.innerHTML = "";
  errorMsg.classList.add("hide");
  validMsg.classList.add("hide");
};

// on blur: validate
input.addEventListener('blur', function() {
  reset();
  if (input.value.trim()) {
    if (iti.isValidNumber()) {
      validMsg.classList.remove("hide");
    } else {
      input.classList.add("error");
      var errorCode = iti.getValidationError();
      errorMsg.innerHTML = errorMap[errorCode];
      errorMsg.classList.remove("hide");
    }
  }
});

// on keyup / change flag: reset
input.addEventListener('change', reset);
input.addEventListener('keyup', reset);

// Добавить/удалить класс при открытии/закрытии для анимации
input.addEventListener("open:countrydropdown", function() {
  document.body.classList.add("iti-mobile-opened");
});
input.addEventListener("close:countrydropdown", function() {
  document.body.classList.remove("iti-mobile-opened");
});
