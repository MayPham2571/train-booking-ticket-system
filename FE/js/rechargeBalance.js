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
        $("body").append(`
                    <h1>Error</h1>
                `);
      } else {
        $('#balance').html(result.data.balance)
    }
  });

  
};

// $(document).on("click","#update-btn", function (e) {
//     e.preventDefault();
//     const resultdata = {
//         amount: +document.getElementById("amount").value,
//         cardNum: document.getElementById("cardNum").value,
//         CVV: document.getElementById("CVV").value,
//         expiredDate: document.getElementById("expiredDate").value,
//     };
//       postData(`http://localhost:3000/api/v1/user/recharge`, resultdata).then(
//         (result) => {
//             if (!result.success) {
//                 alert(result.message);
//             }else{
//                 console.log(result.recharge);
//                 // window.location.replace("RechargeBalance.html");
//             }
          
//           }
        
//       );
//     });

    $(document).on("click", ".lg", function (e) {
      e.preventDefault();
      window.localStorage.clear();
      window.location.replace("FirstPage.html");
    });

    loadUserDetailpage();

    // $( ".btn" ).click(function() {
    //     e.preventDefault();
    // const resultdata = {
    //     amount: +document.getElementById("amount").value,
    //     cardNum: document.getElementById("cardNum").value,
    //     CVV: document.getElementById("CVV").value,
    //     expiredDate: document.getElementById("expiredDate").value,
    // };

    // console.log(resultdata);

    //   postData(`http://localhost:3000/api/v1/user/recharge`, resultdata).then(
    //     (result) => {
    //         if (!result.success) {
    //             alert(result.message);
    //         }else{
    //             console.log(result.recharge);
    //             // window.location.replace("RechargeBalance.html");
    //         }
          
    //       }
        
    //   );
    //   });

      const recharge = () => {
        const resultdata = {
            amount: +document.getElementById("amount").value,
            cardNum: document.getElementById("cardNum").value,
            CVV: document.getElementById("CVV").value,
            expiredDate: document.getElementById("expiredDate").value,
        };
    
        console.log(resultdata);
    
          postData(`http://localhost:3000/api/v1/user/recharge`, resultdata).then(
            (result) => {
                if (!result.success) {
                    alert(result.message);
                }else{
                    console.log(result.recharge);
                    // window.location.replace("RechargeBalance.html");
                }
              
              }
            
          );
      };

