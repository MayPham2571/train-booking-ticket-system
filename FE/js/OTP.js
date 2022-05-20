$(".getOTP").click(function (e) {
  e.preventDefault();
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  console.log(options);
  fetch(`http://localhost:3000/api/v1/ticket/checkBalance/${id}`, options)
    .then((response) => response.json()) // chuyển kết quả trả về thành json object
    .then((result) => {
      $.notify(result.message, "success");
    })
    .catch((error) => {
      console.error("Error:", error); // ghi log nếu xảy ra lỗi
    });
});

$(".Pay").click(function (e) {
  e.preventDefault();
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const result = {
    OTP: document.getElementById("OTP").value,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(result),
  };
  console.log(options);
  fetch(`http://localhost:3000/api/v1/ticket/payTicket/${id}`, options)
    .then((response) => response.json()) // chuyển kết quả trả về thành json object
    .then((result) => {
      alert(result.message);
    })
    .catch((error) => {
      console.error("Error:", error); // ghi log nếu xảy ra lỗi
    });
});
