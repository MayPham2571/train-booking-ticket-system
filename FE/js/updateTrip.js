$(".updateBtn").click(function (e) {
  e.preventDefault();
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const result = {
    source: document.getElementById("source").value,
    destination: document.getElementById("destination").value,
    Date: document.getElementById("Date").value,
    StartTime: document.getElementById("StartTime").value,
    EndTime: document.getElementById("EndTime").value,
    price: document.getElementById("price").value,
  };
  console.log(JSON.stringify(result));
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(result),
  };
  console.log(options);
  fetch(`http://localhost:3000/api/v1/trip/${id}`, options)
    .then((response) => response.json()) // chuyển kết quả trả về thành json object
    .then((result) => {
      if (result.success) {
        alert("Update Successfully");
      }
    })
    .catch((error) => {
      console.error("Error:", error); // ghi log nếu xảy ra lỗi
    });
});
