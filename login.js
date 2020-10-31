$("#submit").click(function (e) {
  let mail = $("#input-email").val();
  let pass = $("#input-password").val();
  let record = JSON.parse(localStorage.getItem(mail));

  if (localStorage.getItem(mail)) {
    if (pass === record.password) {
      Swal.fire({
        icon: "success",
        title: "login success",
        text: "",
        timer: 3000,
      });
      console.log("welcome");
      localStorage.setItem("status", "loggedIn");
      setTimeout(() => {
        window.location.href = "./home.html"; //relative to domain
      }, 2.0 * 1000);
    }
  }
});
