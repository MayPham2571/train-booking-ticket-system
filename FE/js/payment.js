const loadTicketpage = () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  const url = "http://localhost:3000/api/v1/ticket/getUnpaidTicket";
  fetch(url, options)
    .then((response) => response.json())
    .then((result) => {
      console.log(result.data);
      if (!result.success) {
        $(".container").append(`
                      <h1>Errror</h1>
                  `);
      } else {
        for (i = 0; i < result.data.length; i++) {
          $(".ticketTable").append(`
            <tr>
                <td>${i + 1}</td>
                <td>
                <ul>
                    <li>Source: ${result.data[i].tripID.source}</li>
                    <li>Destination: ${result.data[i].tripID.destination}</li>
                    <li>Date: ${result.data[i].tripID.Date.slice(0, -14)}</li>
                    <li>StartTime: ${result.data[i].tripID.StartTime}</li>
                    <li>EndTime: ${result.data[i].tripID.EndTime}</li>
                    <li>Seat Number: ${result.data[i].Seatnumber}</li>
                </ul>
                </td>
                <td>
                <a href="http://127.0.0.1:5500/OTP.html?id=${
                  result.data[i]._id
                }">Pay</a>
                </td>
            </tr>
            
                  `);
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
loadTicketpage();
