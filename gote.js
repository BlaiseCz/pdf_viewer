var got = require("gotenberg-js-client")
var fs = require('fs');



//office
const toPDF = got.pipe(
    got.gotenberg('http://localhost:3000'),
    got.convert,
    got.office,
    got.to(got.a4, got.landscape),
    got.set(got.filename('result.pdf')),
    got.please
  )

  // --- 8< ---
  const start = async function() {
    const pdf = await toPDF('file://test2.docx')

      console.log('halo')
      pdf.pipe(fs.createWriteStream('index1.pdf'))
  }
 

  start();


  // html
// const toPDF = got.pipe(
//     got.gotenberg('http://localhost:3000'),
//     got.convert,
//     got.markdown,
//     got.please
//   )
// const start = async function() {
//     const pdf = await toPDF({
//         'index.html': `
//           <!doctype html>
//           <html lang="en">
//             <head>
//               <meta charset="utf-8">
//               <title>My PDF</title>
//             </head>
//             <body>
//               {{ toHTML .DirPath "content.md" }}
//             </body>
//           </html>`,
      
//         'content.md': `
//           # My awesome markdown
//           ...
//         `,
//       })

//       console.log('halo')
//       pdf.pipe(fs.createWriteStream('index.pdf'))
//   }