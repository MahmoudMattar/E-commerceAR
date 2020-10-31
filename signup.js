$(document).ready(function () {
  const i = 0;
  let isValid = true;
  let fname = $("#input-firstname").val();
  let lname = $("#input-lastname").val();
  let mail = $("#input-email").val();
  let phone = $("#input-telephone").val();
  let fax = $("#input-fax").val();
  let company = $("#input-company").val();
  let city = $("#input-city").val();
  let postcode = $("#input-postcode").val();
  let country = $("#input-country").val();
  let pass = $("#input-password").val();
  let passconfirm = $("#input-confirm").val();

  //--fname lname mail phone validation

  $("#input-firstname").on("keyup", function () {
    if ($("#input-firstname").val().length < 7) {
      $(this).css({
        border: "1px solid red",
        background: "#ffcccb",
      });
    } else {
      $(this).css({
        border: "1px solid red",
        background: "lightgreen",
      });
    }
  });

  $("#input-lastname").on("keyup", function () {
    if ($("#input-lastname").val().length < 7) {
      $(this).css({
        border: "1px solid red",
        background: "#ffcccb",
      });
    } else {
      $(this).css({
        border: "1px solid red",
        background: "lightgreen",
      });
    }
  });

  $("#input-telephone").on("keyup", function () {
    var regex = new RegExp(/^01[0-2]{1}[0-9]{8}$/);
    if (regex.test($("#input-telephone").val())) {
      $(this).css({
        border: "1px solid red",
        background: "lightgreen",
      });
    } else {
      $(this).css({
        border: "1px solid red",
        background: "#ffcccb",
      });
    }
  });

  $("#input-password, #input-confirm").on("keyup", function () {
    if ($("#input-password").val() == $("#input-confirm").val()) {
      $("#input-password, #input-confirm").css({
        border: "1px solid red",
        background: "lightgreen",
      });
    } else {
      $("#input-password, #input-confirm").css({
        border: "1px solid red",
        background: "#ffcccb",
      });
    }
  });

  $("#input-email").on("keyup", function () {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        $("#input-email").val()
      )
    ) {
      $("#input-email").css({
        border: "1px solid red",
        background: "lightgreen",
      });
    } else {
      $("#input-email").css({
        border: "1px solid red",
        background: "#ffcccb",
      });
    }
  });

  //--fname lname mail validation ends

  $("#submit").click(function (e) {
    if (isValid == false) {
      //return null;
    }

    $("#input-firstname,#input-lastname,#input-email,#input-password").each(
      function () {
        if ($.trim($(this).val()) == "") {
          $(this).css({
            border: "1px solid red",
            background: "#FFCECE",
          });
        } else {
          $(this).css({
            border: "",
            background: "",
          });
          // var client = $("#input-firstname").val();

          var client = new Client(
            //$("#input-email").val(),
            $("#input-password").val(),
            $("#input-firstname").val() + $("#input-lastname").val()
          );
          localStorage.setItem($("#input-email").val(), JSON.stringify(client));
        }
      }
    );

    if (isValid == false) e.preventDefault();
  });

  //----------
  function addClient(client) {
    i++;
    var client = {
      firstName: "",
      lastName: "",
      Email: "",
      password: "",
    };

    localStorage.setItem(i, JSON.stringify(client));
  }
});

class Client {
  constructor(/*_email,*/ _password, _userName) {
    //this.emailAddress = _email;
    this.password = _password;
    this.user = _userName;
  }
}
