// /* get request */
// /* then */
// fetch("http://localhost:3000/data")
//   .then((response) => response.json())
//   .then((data) => console.log(data));

//https://stackoverflow.com/questions/47236927/how-to-make-get-request-with-express-js-to-a-local-json-file/47237111
// /* fetch data locally */
var fs = require("fs");
var data;
fs.readFile("test.json", "utf8", function (err, data) {
  if (err) throw err;
  data = JSON.parse(data);
  console.log(data);
});

// const r = async () => {
// let x = await fetch("http://localhost:3000/data");
//   return x;
// };

// r();
