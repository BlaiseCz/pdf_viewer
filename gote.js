var got = require("gotenberg-js-client")
var fs = require('fs');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var save = require('save-file')

//url
// prettier-ignore
const toPDF = got.pipe(
        got.gotenberg('http://localhost:3000'),
        got.convert,
        got.url,
        got.please,
        got.set( 
            got.timeout(20)
        )
  )
  
  // --- 8< ---

  const getfile = async function(filepath) {
    console.log('getfile')
    const buff = await save('data-uri string', filepath)
    console.log( buff.saveSync)
    start( buff.saveSync)
  }
  
  // 'https://bip.poznan.pl/bip/attachments.att?co=show&instance=1057&parent=37297&lang=pl&id=309423'
  const start = async function(file) {
    console.log('start')

    const pdf = await toPDF(file)

      console.log('halo')
      pdf.pipe(fs.createWriteStream('remote.pdf'))
  }

  getfile('https://bip.poznan.pl/bip/attachments.att?co=show&instance=1057&parent=37297&lang=pl&id=309423')
 

//   var fileUrl = 'https://bip.poznan.pl/bip/attachments.att?co=show&instance=1057&parent=37297&lang=pl&id=309423'
//   console.log(fileUrl)
//   var rawFile = new XMLHttpRequest();
//   rawFile.open("GET",fileUrl,false);
//     rawFile.onreadystatechange = function() {
//         console.log('here')
//         if(rawFile.readyState === 4) {
//             if(rawFile.status === 200 || rawFile.status === 0)
//             {
//                 console.log('here')
//                 var allText = rawFile.responseText;
//                 console.log(allText)
//                 start(allText);
//             }
//         }
//     }
//     rawFile.send(null);





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


//office
// const toPDF = got.pipe(
//     got.gotenberg('http://localhost:3000'),
//     got.convert,
//     got.office,
//     got.to(got.a4, got.landscape),
//     got.set(got.filename('result.pdf')),
//     got.please
//   )

//   // --- 8< ---
//   const start = async function() {
//     const pdf = await toPDF('file://test2.docx')

//       console.log('halo')
//       pdf.pipe(fs.createWriteStream('index1.pdf'))
//   }
 