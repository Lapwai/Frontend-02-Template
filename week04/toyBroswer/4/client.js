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
  send(connection) {
    return new Promise((resolve, rejects) => {
      const parser = new ResponseParser();
      if (connection) {
        connection.write(this.toString());
      } else {
        connection = net.createConnection(
          {
            host: this.host,
            port: this.port,
          },
          () => {
            connection.write(this.toString());
          }
        );
      }
      connection.on("data", (data) => {
        console.log(data.toString());
        parser.receive(data.toString());
        if (parser.isFinished) {
          resolve(parser.response);
          connection.end();
        }
      });
      connection.on("error", (err) => {
        reject(err);
        connection.end();
      });
    });
  }
  toString() {
    return `${this.method} ${this.path} HTTP/1.1 \r
      ${Object.keys(this.headers)
        .map((key) => `${key}:${this.headers[k]}`)
        .join("\r\n")}\r\n${this.bodyText}`;
  }
}

//逐步接受Response的文本
class ResponseParser {
  constructor() {
    this.WAITING_STATUS_LINE = 0;
    this.WAITING_STATUS_LINE_END = 1;
    this.WAITING_HEADER_NAME = 2;
    this.WAITING_HEADER_SPACE = 3;
    this.WAITING_HEADER_VALUE = 4;
    this.WAITING_HEADER_LINE_END = 5;
    this.WAITING_HEADER_BLOCK_END = 6;
    this.WAITING_BODY = 7;

    this.current = this.WAITING_STATUS_LINE;
    this.statusLine = "";
    this.headers = {};
    this.headerName = "";
    this.headerValue = "";
    this.bodyParser = null;
  }
  receive(str) {
    for (let i = 0; i < str.length; i++) {
      this.receiveChar(str.charAt(i));
    }
  }
  receiveChar(char) {
    if (this.current === this.WAITING_STATUS_LINE) {
      if (char === "\r") {
        this.current = this.WAITING_STATUS_LINE_END;
      } else {
        this.statusLine += char;
      }
    } else if (this.current === this.WAITING_STATUS_LINE_END) {
      if (char === "\n") {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if (this.current === this.WATTING) {
      //
    }
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

//第一步
/*
HTTP 请求总结
1. 设计一个HTTP请求的类
2. Content Type 是一个必要的字段，要有默认值
3. body是KEY-VALUE格式
4. 不同的Content-Type影相Body的格式
*/

//第二步
/*
1. 在Request的构造器中收集必要的信息
2. 设计一个send函数，把请求发送到服务器
3. send函数应该是异步的，最终返回一个Promise
*/
//第三步
/*
1. 设计支持已有的connection或者自己新建connection
2. 收到数据传给parser
3. 根据parser的状态resolve Promise
*/
