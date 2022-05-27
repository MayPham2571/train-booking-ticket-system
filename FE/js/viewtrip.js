$(".search").click(function (e) {
  e.preventDefault();
  const result = {
    source: document.getElementById("source").value,
    destination: document.getElementById("destination").value,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(result),
  };
  fetch("http://localhost:3000/api/v1/trip/", options)
    .then((response) => response.json()) // chuyển kết quả trả về thành json object
    .then((result) => {
      console.log(result);
      if (!result.success) {
        alert(result.message);
      }
      $(".getTrip").empty();
      $(".getTrip").append(`
        <h2>${result.data[0].source} - ${result.data[0].destination}</h2>
              `);
      for (i = 0; i < result.data.length; i++) {
        $(".getTrip").append(`
        <div class="trip">
              <div class="title">
                <div class="tleft">
                  <div>
                    <h4>Date</h4>
                    <p>${result.data[i].Date.slice(0, -14)}</p>
                  </div>
                  <div>
                    <h4>StartTime</h4>
                    <p>${result.data[i].StartTime}</p>
                  </div>
                  <div>
                    <h4>EndTime</h4>
                    <p>${result.data[i].EndTime}</p>
                  </div>
                  <div>
                    <h4>Price</h4>
                    <p>${result.data[i].price}</p>
                  </div>
                </div>
                <div class="tright">
                  <button
                  id="btn${i}"
                  class="btn"
                  onclick="openSeat(event, 'below${i}', ${
          result.data[i].NumOfSeat
        })"
                >
                  Choose Seat
                </button>
                <button
                  id="btn${i}"
                  class="btn"
                  onclick="closeSeat(event, 'below${i}')"
                >
                  X
                </button>
                </div>
              </div>
              <div class="below" id="below${i}">
                <hr/>
                <div id="seatNum" class="seatNum">
                   <div class="left left${i}"></div>
                   <div class="right right${i}"></div>
                   <div>
                        <button
                        id="btn${i}"
                        class="btn"
                        onclick="book(event, 'below${i}')"
                      >
                        Book
                      </button>
                   </div>
                </div>
              </div>
            </div>
              `);
      }
      for (i = 0; i < result.data.length; i++) {
        $(".routeInfo").append(`
        <table>
        <tr>
          <th>Source</th>
          <td></td>
        </tr>
        <tr>
          <th>Destination</th>
          <td></td>
        </tr>
        <tr>
          <th>Date</th>
          <td></td>
        </tr>
        <tr>
          <th>StartTime</th>
          <td></td>
        </tr>
        <tr>
          <th>EndTime</th>
          <td></td>
        </tr>
        <tr>
          <th>Seat Number</th>
          <td></td>
        </tr>
        <tr>
          <th>Price</th>
          <td></td>
        </tr>
      </table>
        `);
      }
    })
    .catch((error) => {
      console.error("Error:", error); // ghi log nếu xảy ra lỗi
    });
});
const openSeat = (evt, stepName, num) => {
  document.getElementById(stepName).style.display = "block";
  const a = stepName.slice(-1);
  $(`.seatNum${a}`).empty();
  for (i = 0; i < num; i++) {
    if (i % 2 === 0) {
      $(`.left${a}`).append(`
      <div>
      <span><i class="fa-solid fa-couch"></i></span>
      <span>${i}<input type="radio" id="s${i}" name="SeatCheck" value="${i}"></span>
      </div>
   `);
    } else {
      $(`.right${a}`).append(`
      <div>
      <span><i class="fa-solid fa-couch"></i></span>
      <span>${i}<input type="radio" id="s${i}" name="SeatCheck" value="${i}"></span>
      </div>
   `);
    }
  }
};
const closeSeat = (evt, stepName) => {
  console.log(stepName);
  document.getElementById(stepName).style.display = "none";
};
const book = (evt, stepName) => {
  var checkbox = document.getElementsByName("SeatCheck");
  var seatNum;
  for (var i = 0; i < checkbox.length; i++) {
    if (checkbox[i].checked === true) {
      seatNum = checkbox[i].value;
    }
  }
  if (!seatNum) {
    alert("Please choose seat number !");
  } else {
    document.getElementById("seatNum").style.display = "none";
    $(".getTrip").empty();
    $(".getTrip").append(`
        <h2>Seat Number: ${seatNum}</h2>
              `);
    document.getElementById("stepBtn").style.display = "block";
  }
};
const openStep = (evt, stepName) => {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(stepName).style.display = "block";
  evt.currentTarget.className += " active";
};
const eventButton = () => {
  const previousBtn = document.getElementById("previousBtn");
  const nextBtn = document.getElementById("nextBtn");
  const previousBtn2 = document.getElementById("previousBtn2");
  const nextBtn2 = document.getElementById("nextBtn2");
  const nextBtn3 = document.getElementById("nextBtn3");
  const Continue = document.getElementById("Continue");
  const bullets = [...document.querySelectorAll(".bullet")];
  const MAX_STEPS = 4;
  let currentStep = 1;
  nextBtn.addEventListener("click", () => {
    bullets[currentStep - 1].classList.add("completed");
    currentStep += 1;
    if (currentStep === MAX_STEPS) {
      nextBtn.disabled = true;
      finishBtn.disabled = false;
    }
  });
  previousBtn.addEventListener("click", () => {
    bullets[currentStep - 2].classList.remove("completed");
    currentStep -= 1;
    nextBtn.disabled = false;
    finishBtn.disabled = true;
    if (currentStep === 1) {
      previousBtn.disabled = true;
    }
  });
  nextBtn2.addEventListener("click", () => {
    bullets[currentStep - 1].classList.add("completed");
    currentStep += 1;
    previousBtn.disabled = false;
    if (currentStep === MAX_STEPS) {
      nextBtn.disabled = true;
      finishBtn.disabled = false;
    }
  });
  previousBtn2.addEventListener("click", () => {
    bullets[currentStep - 2].classList.remove("completed");
    currentStep -= 1;
    nextBtn.disabled = false;
    finishBtn.disabled = true;
    if (currentStep === 1) {
      previousBtn.disabled = true;
    }
  });
  nextBtn3.addEventListener("click", () => {
    bullets[currentStep - 1].classList.add("completed");
    currentStep += 1;
    bullets[currentStep - 1].classList.add("completed");
    if (currentStep === MAX_STEPS) {
      Continue.disabled = false;
    }
  });
  Continue.addEventListener("click", () => {
    for (i = 1; i <= MAX_STEPS; i++) {
      bullets[currentStep - i].classList.remove("completed");
    }
    currentStep -= 3;
    if (currentStep === 1) {
      nextBtn.disabled = false;
    }
    $(".getTrip").empty();
    document.getElementById("stepBtn").style.display = "none";
  });
};
eventButton();
/* ===== Logic for creating fake Select Boxes ===== */
$(".sel").each(function () {
  $(this).children("select").css("display", "none");
  var $current = $(this);
  $(this)
    .find("option")
    .each(function (i) {
      if (i == 0) {
        $current.prepend(
          $("<div>", {
            class: $current.attr("class").replace(/sel/g, "sel__box"),
          })
        );

        var placeholder = $(this).text();
        $current.prepend(
          $("<span>", {
            class: $current.attr("class").replace(/sel/g, "sel__placeholder"),
            text: placeholder,
            "data-placeholder": placeholder,
          })
        );

        return;
      }
      $current.children("div").append(
        $("<span>", {
          class: $current.attr("class").replace(/sel/g, "sel__box__options"),
          text: $(this).text(),
        })
      );
    });
});

// Toggling the `.active` state on the `.sel`.
$(".sel").click(function () {
  $(this).toggleClass("active");
});

// Toggling the `.selected` state on the options.
$(".sel__box__options").click(function () {
  var txt = $(this).text();
  var index = $(this).index();
  $(this).siblings(".sel__box__options").removeClass("selected");
  $(this).addClass("selected");
  var $currentSel = $(this).closest(".sel");
  $currentSel.children(".sel__placeholder").text(txt);
  $currentSel.children("select").prop("selectedIndex", index + 1);
});
