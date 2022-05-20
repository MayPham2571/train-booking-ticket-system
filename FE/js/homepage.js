const loadHomepage = () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  const url = "http://localhost:3000/api/v1/auth/home";
  fetch(url, options)
    .then((response) => response.json())
    .then((result) => {
      if (!result.success) {
        $(".container").append(`
                  <h1>Errror</h1>
              `);
      } else {
        $(".container").append(`
        <h1>Welcome</h1>
        <a href="UserDetail.html">View Personal Information</a>
        <a href="ChangePassword.html">Change Password</a>
        <a href="BookTicket.html">Book Ticket</a>
        <a href="ViewTicket.html">View Ticket</a>
        <a href="ViewTrip.html">View Trip</a>
        <a href="Payment.html">Payment</a>
        <a href="RechargeBalance.html">Recharge Balance</a>
        <button class="logout">Logout</button>
              `);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
$(document).on("click", ".logout", function (e) {
  e.preventDefault();
  window.localStorage.clear();
  window.location.replace("login.html");
});
loadHomepage();
