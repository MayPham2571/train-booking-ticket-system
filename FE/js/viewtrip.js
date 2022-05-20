$(".search").click(function (e) {
  e.preventDefault();
  const result = {
    source: document.getElementById("source").value,
    destination: document.getElementById("destination").value,
  };
  console.log(JSON.stringify(result));
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
      for (i = 0; i < result.data.length; i++) {
        $(".getTrip").append(`
      <div class="trip">
      <table>
        <tr>
            <td>
                <ul>
                    <li>Source: ${result.data[i].source}</li>
                    <li>Destination: ${result.data[i].destination}</li>
                    <li>Date: ${result.data[i].Date.slice(0, -14)}</li>
                    <li>StartTime: ${result.data[i].StartTime}</li>
                    <li>EndTime: ${result.data[i].EndTime}</li>
                    <li>Price: ${result.data[i].price}</li>
                </ul>
            </td>
            <td><a href="BookTicket.html">Book Ticket</a></td>
        </tr>
      </table>
    </div>
              `);
      }
    })
    .catch((error) => {
      console.error("Error:", error); // ghi log nếu xảy ra lỗi
    });
});
