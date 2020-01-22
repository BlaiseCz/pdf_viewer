// import { pipe, gotenberg, convert, html, please } from 'gotenberg-js-client'
var got = require("gotenberg-js-client")
var fs = require('fs');

// prettier-ignore
// const toPDF = got.pipe(
//     got.gotenberg('http://localhost:3000'),
//     got.convert,
//     got.html,
//     got.please
// )

// --- 8< ---

// convert file from disk
// const pdf = toPDF('/home/blaise/Desktop/testpdfjs/test2.docx')
// console.log('Hello world!')
// console.log(pdf)
// or convert stream
// const pdf = await toPDF(fs.createReadStream('index.html'))

// or convert string!
// const pdf = await toPDF('<html>...</html>')

// library returns NodeJS.ReadableStream,
// so you can save it to file, if you want, for example
const toPDF = got.pipe(
    got.gotenberg('http://localhost:3000'),
    got.convert,
    got.office,
    got.to(got.landscape),
    got.please
  )
  
  // --- 8< ---
  
//   const pdf = toPDF('test.doc')
const pdf = toPDF('file:///home/blaise/Desktop/testpdfjs/test2.docx')


// pdf.pipe(fs.createWriteStream('index1.pdf'))
// or you can send it as response in Express application
// app.get('/pdf', function(req, res) {
  //...
//   pdf.pipe(res)
// })