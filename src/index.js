const http = require("http");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1:3003");
  const searchParams = url.searchParams;

  if (searchParams.size === 0) {
    response.statusCode = 200;
    response.end("Hello, World!");
  } else if (searchParams.has("hello")) {
    const name = searchParams.get("hello");
    if (!name) {
      response.statusCode = 400;
      response.end("Enter a name");
    } else {
      response.statusCode = 200;
      response.end(`Hello, ${name}.`);
    }
  } else if (searchParams.has("users")) {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.end(getUsers());
  } else {
    response.statusCode = 500;
    response.end("");
  }
});

const port = 3003;
server.listen(port, () =>
  console.log("Ссылка на сервер: http://127.0.0.1:3003")
);
