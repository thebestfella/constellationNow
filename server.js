const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use("/assets", express.static("assets"));

app.get("/", (req, res) => {
  res.send("hello world from express");
  console.log(`/ ${port}`);
});

app.get("/index", (req, res) => {
  const d = new Date();
  res.set("data-fetch", "4life");
  res.status(200);
  //console.log(path.join(__dirname, "test.json"));
  res.sendFile(path.join(__dirname, "/", "index.html"));
  console.log(`/index ${port} [${d.getHours()}:${d.getMinutes()}]`);
});

app.get("/lesson01", (req, res) => {
  const d = new Date();
  res.set("data-fetch", "4life");
  res.status(200);
  //console.log(path.join(__dirname, "test.json"));
  res.sendFile(path.join(__dirname, "/", "lesson01.html"));
  console.log(`/index ${port} [${d.getHours()}:${d.getMinutes()}]`);
});

app.get("/demo", (req, res) => {
  res.set("X-full-stack", "4life"); //add header "X-full-stack", "4life" in demo under network
  res.status(418);
  res.send("CRUNCH time!! I prefer coffee and a starburst /demo"); //screen output
  console.log(`/demo ${port}`); //server console output
});

var data = {};
app.get("/data", (req, res) => {
  /* Insted of doing all this */
  // res.writeHead(200, {
  //    'Content-type': 'application/json'
  // });
  // res.end(JSON.stringify(data));

  /* Just send the file */

  const d = new Date();
  res.set("data-fetch", "4life");
  res.status(418);
  //console.log(path.join(__dirname, "test.json"));
  res.sendFile(path.join(__dirname, "/", "test.json"));
  console.log(`/data ${port} [${d.getHours()}:${d.getMinutes()}]`);
});

app.listen(port, () => console.log(`example app listening on port ${port}!`));
