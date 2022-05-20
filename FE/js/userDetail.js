const loadUserDetailpage = () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  const url = "http://localhost:3000/api/v1/user/detail";
  fetch(url, options)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (!result.success) {
        $(".container").append(`
                    <h1>Errror</h1>
                `);
      } else {
        $(".container").append(`
          <h1>User Detail</h1>
          <table>
            <tr>
              <td>Full name:</td>
              <td>${result.data.name}</td>
            </tr>
            <tr>
              <td>Date of birth:</td>
              <td>${result.data.dob.slice(0, -14)}</td>
            </tr>
            <tr>
              <td>Address:</td>
              <td>${result.data.address}</td>
            </tr>
            <tr>
              <td>Phone number:</td>
              <td>${result.data.phone}</td>
            </tr>
            <tr>
              <td>ID card number:</td>
              <td>${result.data.idCard}</td>
            </tr>
          </table>
          <a href="homepage.html">Back</a>
                `);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
loadUserDetailpage();
