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
