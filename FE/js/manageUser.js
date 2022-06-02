async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
async function getData(url = "") {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
var resetUser = () => {
  $(".list li").forEach((value) => {
    value.remove();
  });
};
var arr = [];
const rendeUser = (arr) => {
  $(".list").empty();
  arr.forEach((value, index) => {
    $(".list").append(`  <li class="user${value._id}">
<span>${index + 1}<span id = "email">${value.email}</span></span>
<div class="btn-box">
    <a href="UpdateUser?id=${value._id}.html" class="button">Update</a>
    <button id="${
      value._id
    }" class="delete-btn button" onclick="deleteUser(event, '${
      value._id
    }')">Delete</button>
    <a href="RechargeBalance?id=${
      value._id
    }.html" class="button">Recharge Balance</a>
</div>
</li>`);
  });
};
$("#email").on("keyup", function () {
  const letter = this.value;
  getData("http://localhost:3000/api/v1/user/").then((result) => {
    var filterArr = result.data.filter(
      (value) => value.email.includes(letter) && value.role === "user"
    );
    rendeUser(filterArr);
  });
});
const deleteUser = (evt, id) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  const url = `http://localhost:3000/api/v1/user/${id}`;
  fetch(url, options)
    .then((response) => response.json())
    .then((result) => {
      $(`.user${id}`).remove();
    });
};
