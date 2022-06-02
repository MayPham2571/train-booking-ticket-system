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
getData("http://localhost:3000/api/v1/user/").then(
    (result) => {
        
    }       
)