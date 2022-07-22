const fs = require("fs");
const http = require("http");
const { dirname } = require("path");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplates");

//so basically replaceTemplate here is also identical to the replace template in our code below
//where temp = tempCard representing the html
//and product representing el, which is also the array

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

//to read json file that contains the product properties
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

//convert json into an object so we can maniulate it
const dataObject = JSON.parse(data);

//to create a server, req-request, res-respond
const server = http.createServer((req, res) => {
  const baseURL = `http://${req.headers.host}`;
  const requestURL = new URL(req.url, baseURL);
  const pathName = requestURL.pathname;
  // const query = requestURL.searchParams.get("id");
  // console.log(pathName + ": PATHNAME");
  // console.log(query + ": query");

  //Overiew Page
  //confirming that root path and overview path leads to overview page
  if (pathName === "/" || pathName === "/overview") {
    //sending a response to the server that we are about to send content-type of html format
    res.writeHead(200, { "Content-type": "text/html" });

    //in this line of code, we are now turning our json turned object into an array, where 'el'
    //is a representation of where each array elemnt is like [0,1,2], el represents either positon 0,1,2
    const cardsHtml = dataObject
      .map((el) => replaceTemplate(tempCard, el)) // replaceTemplate is a function that accepts two parameters
      //tempCard whic is the html of the landing page and el, which is each element of the array
      //now to populate each unique element of the array with the appropriate descriptions, we create a const for replaceTemplate
      //
      .join(""); //turn it to string
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);

    //Product Page
  } else if (pathName === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObject[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    //API Page
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    //Not Found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("server started on port 8000");
});
