学习笔记
HTTP Request
POST/HTTP/1.1 Request Line
/: Path
Host:127.0.0.1
Content-Type:application/x-www-form-urlencoded Headers, ended by a blank line

filed1=aaa&codex%3D1 Body, the format of body depends on the 'Content-Type' variable. The content of body follows key value data structures.

Use Newline character (\r\n) to separate Http headers.

HTTP Response
HTTP/1.1 200 OK //Status Line 1. Http version 2. status code 3. Http status text
Content-Type:text/html //Http Headers
Date: Sun, 26 July 2020 22:14 GMT
Connection: keep-alive
Transfer-Encoding: chunked

26

<html><body>I am Andy</body></html> //Chunk body
0

//第一步
/\*
HTTP 请求总结

1. 设计一个 HTTP 请求的类
2. Content Type 是一个必要的字段，要有默认值
3. body 是 KEY-VALUE 格式
4. 不同的 Content-Type 影相 Body 的格式
   \*/

//第二步
/\*

1. 在 Request 的构造器中收集必要的信息
2. 设计一个 send 函数，把请求发送到服务器
3. send 函数应该是异步的，最终返回一个 Promise
   _/
   //第三步
   /_
4. 设计支持已有的 connection 或者自己新建 connection
5. 收到数据传给 parser
6. 根据 parser 的状态 resolve Promise
   \*/
