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
      if (!result.success) {
        $(".container").append(`
                    <h1>Errror</h1>
                `);
      } else {
        $("body").append(`
        <header>
        <div class="hleft">
          <img
            src="https://github.com/MayPham2571/train-booking-ticket-system/blob/main/UI/Asset/logo@2x.png?raw=true"
            alt=""
          />
        </div>
        <div class="hright">
          <a href="ChangePassword.html">Change Password</a>
          <a class="lg" href="Viewpage.html">Logout</a>
        </div>
      </header>
      <div class="container">
        <div class="head">
          <h3>View Personal Information</h3>
          <div class="back">
            <i class="fas fa-less-than"></i>
            <a href="homepage.html">Back</a>
          </div>
        </div>
        <div class="content">
          <h1>Personal Information</h1>
          <div class="inside">
            <div class="box">
              <h2>Fullname: ${result.data.name}</h2>
              <h2>Date of Birth:${result.data.date}</h2>
              <h2>Address:${result.data.address}</h2>
              <h2>Phone number:${result.data.phone}</h2>
              <h2>Email: ${result.data.email}</h2>
              <h2>ID card number:${result.data.idCard}</h2>
              <div>
                <button>Update information</button>
              </div>
              
            </div>
          </div>
        </div>  
      </div>`);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
loadUserDetailpage();
