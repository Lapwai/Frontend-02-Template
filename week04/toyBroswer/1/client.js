const net = require("net");
const { resolve } = require("path");
const { rejects } = require("assert");
class Request {
  constructor(options) {
    this.method = options.method || "GET";
    this.host = options.host;
    this.port = options.port || 80;
    this.path = options.path || "/";
    this.body = options.body || {};
    this.headers = options.headers || {};
    if (!this.headers["Content-Type"]) {
      this.headers["Content-Type"] = "application/x-www.form-urlencoded";
    }
    if (this.headers["Content-Type"] === "application/json")
      this.bodyText = JSON.stringify(this.body);
    else if (
      this.headers["Content-Type"] === "application/x-www.form-urlencoded"
    )
      this.bodyText = Object.keys(this.body)
        .map((key) => `${key}=${encodeURIComponent(this.body[key])}`)
        .join("&");
    this.headers["Content-Length"] = this.bodyText.length;
  }
  send() {
    return new Promise((resolve, rejects) => {
      //....
    });
  }
}

void (async function () {
  //Config Object
  let request = new Request({
    //From Http
    method: "POST",
    //From IP
    host: "127.0.0.1",
    //From TCP
    port: "8088",
    //From Http
    path: "/",
    headers: {
      ["X-Foo2"]: "customed",
    },
    body: {
      name: "andy",
    },
  });
  let response = await request.send();
  console.log(response);
})();

/*
HTTP 请求总结
1. 设计一个HTTP请求的类
2. Content Type 是一个必要的字段，要有默认值
3. body是KEY-VALUE格式
4. 不同的Content-Type影相Body的格式
*/
