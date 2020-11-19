function sendRequest(method, url, data) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    if (method == "PUT" && data) {
      xhr.send(JSON.stringify(data));
    } else {
      xhr.send();
    }
  });
}

// const sendRequest = (method, url, data) => {
//   let otherParam = {
//     header: { "content-type": "application/json; charset=UTF-8" },
//     body: data,
//     method: method,
//   };

//   fetch(url, otherParam)
//     .then(function (response) {
//       if (response.status !== 200) {
//         console.log(
//           "Looks like there was a problem. Status Code: " + response.status
//         );
//         return;
//       }

//       Examine the text in the response
//       response.json().then(function (data) {
//         console.log(data);
//       });
//     })
//     .catch(function (err) {
//       console.error("Fetch Error : ", err);
//     });
// };
