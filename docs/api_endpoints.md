## Endpoints

### /app/ (GET)

#### Request cURL

```
curl http://localhost:5555/app/
```

#### Response body
```
200 OK
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: text/plain
Date: Sat, 30 Apr 2022 14:30:32 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/analysis/:uname (GET)
    ex: {"uname":"vlalitha"}
    
#### Request cURL

```
curl http://localhost:5555/app/analysis/vlalitha
```

#### Response body
```
{"id":1,"uname":"vlalitha","name":"Lalitha","sleep":2,"sleepQuality":"good","appetite":"satisfied","mood":"good","reflect":"Finals"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 142
ETag: W/"8e-ZrpZqIy+7kTfKWfkif7nSaaoboM"
Date: Sat, 30 Apr 2022 14:35:20 GMT
Connection: keep-alive
```

### /app/log/ (POST)

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"uname":"vlalitha","name":"Lalitha","sleep":8,"sleepQuality":"good","appetite":"neutral","mood":"okay","reflect":"Final Exam stress!"}' http://localhost:5555/app/log/ 
```

#### Response body
```
{"uname":"vlalitha","name":"Lalitha","sleep":8,"sleepQuality":"good","appetite":"neutral","mood":"okay","reflect":"Final Exam stress!"}
```

#### Response headers
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 135
ETag: W/"87-BfVumJWJWlCRlWb+/z2MUmNcEWM"
Date: Sat, 30 Apr 2022 14:42:28 GMT
Connection: keep-alive
```
### /app/createAccount/ (POST)

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"uname":"vlalitha"}' http://localhost:5555/app/createAccount/  
```

#### Response body
```
{"message":"Your account has been created! Login in to your account!"}
```

#### Response headers
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 70
ETag: W/"46-WdcaLiLF7hmcp6JTTYujJ2RuG6Y"
Date: Sat, 30 Apr 2022 15:10:04 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```
### /app/authentication/ (POST)

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"uname":"vlalitha"}' http://localhost:5555/app/authentication/ 
```

#### Response body
```
{"uname":"vlalitha","message":"Logged in!"}
```

#### Response headers
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 43
ETag: W/"2b-hc6uJFSdAxr2kMDLO7E98wuhu6w"
Date: Sat, 30 Apr 2022 15:14:07 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```
### /app/remove/ (POST)

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"uname":"Lalitha"}' http://localhost:5555/app/remove/
```

#### Response body
```
{"message":"Your account has been deleted!"}
```

#### Response headers
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 99
ETag: W/"63-cueBeKv3RuJFe42Oq2ZYKC2q8LI"
Date: Mon, 02 May 2022 11:17:20 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```