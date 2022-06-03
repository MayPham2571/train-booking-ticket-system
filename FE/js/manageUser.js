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
    $('.list li').forEach(value => {
      value.remove()
    })
  }
var arr = [];
getData("http://localhost:3000/api/v1/user/").then(
    (result) => {
        result.data.forEach((item, index) =>{
          arr[index] = item
        })
    }       
)

var renderUser = (arr) => {
  $(".list").empty()
  arr.forEach((value) => {
    // let re = new RegExp($("#email").value, 'g')
    // $(".list").append(`  <li>
    // <span>1<span id = "email">${value.email}</span></span>
    // <div class="btn-box">
    //     <a href="UpdateUser?id=${value._id}.html" class="button">Update</a>
    //     <input type="submit" id="delete-btn" value="Delete" class="button">
    //     <a href="RechargeBalance?id=.html" class="button">Recharge Balance</a>
    // </div>
    // </li>`);
    console.log("a")
  })
}
console.log(arr)
renderUser(arr)

