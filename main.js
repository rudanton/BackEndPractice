var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  if (pathname === '/') {
    if (queryData.id === undefined) {
      fs.readdir('./data', function (err, fileList) {
        console.log(fileList);

        var title = 'Welcome';
        var description = 'Hello Node.js';
        var list = '<ol>';
        for (var i = 0; i < fileList.length; i++) {
          list = list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
        }
        var list = list + '</ol>';
        var template = `
          <!doctype html>
          <html>
          <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
          </head>
          <body>
          <h1><a href="/">WEB</a></h1>
          ${list}
          <h2>${title}</h2>
          <p>
          ${description}
          </p>
          </body>
          </html>
          `;

        response.writeHead(200);
        response.end(template);
      });
    }
    else 
    {
      var list = '<ol>';
      fs.readdir('./data', function (err, fileList) {
        for (var i = 0; i < fileList.length; i++) {
          list = list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
        }
      });
      list = list + '</ol>';
      var title = queryData.id;
      fs.readFile(`data/${title}`, 'utf8', (err, description) => {
        var template = `
          <!doctype html>
          <html>
          <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
          </head>
          <body>
          <h1><a href="/">WEB</a></h1>
          <ol>
          ${list}
          </ol>
          <h2>${title}</h2>
          <p>
          ${description}
          </p>
          </body>
          </html>
          `;
        response.writeHead(200);
        response.end(template);
      });
    }

  }
  else {
    response.writeHead(404);
    response.end('NOT FOUND');
  }

});
app.listen(3000);