window.onload = function() {

    //read file src
    document.getElementById('file-src').addEventListener('keypress', (e) => {
        e = e || window.event;
    
    
        if(e.keyCode == 13) {
            var elem = e.srcElement || e.target;
    
    
            if (elem.value == null || elem.value == "") {
                alert('empty file')
            }
            else {
                if(isProperFileExtension(elem.value)) {
                    getPDFsource(elem.value)
                }
            }
        }
    });


   
    function isProperFileExtension(fileSource) {
        var last3 = fileSource.slice(fileSource.length -3, fileSource.length);
        var last4 = fileSource.slice(fileSource.length -4, fileSource.length);
        
        alert(last3 + ' ' + last4)
    
        if(last3 == 'pdf' || last3 == 'doc' || last4 == 'docx') {
            return true;
        }
    
        return false;
    
    }

    function LoadPdf() {
    // Sending Ajax request to the controller to get base 64 string
    $.ajax({
        url: '/api/PdfViewer/GetDocument',
        type: 'POST',
        dataType: 'json',
        crossDomain: true,
        traditional: true,
        contentType: 'application/json; charset=utf-8',
        data: '',
        success: function (data) {
            // Render the PDF viewer control
            var viewer = new ej.pdfviewer.PdfViewer({      
            //Sets the base64 string to the documentPath API          
                documentPath: data,
                serviceUrl: '/api/PdfViewer'
            });
            ej.pdfviewer.PdfViewer.Inject(ej.pdfviewer.TextSelection, ej.pdfviewer.TextSearch, ej.pdfviewer.Print, ej.pdfviewer.Navigation);
            viewer.appendTo('#pdfViewer');
        },
        error: function (msg, textStatus, errorThrown) {
            alert('Exception' + msg.responseText);
        }
    });
    }

    //asynchronous reader
    $.ajax({
        url: 'http://poznan.pl/public/bip/attachments.att?co=show&instance=1057&parent=37297&lang=pl&id=309410',
        success: function(data) {
          var blob=new Blob([data]);
          var link=document.createElement('a');
          link.href=window.URL.createObjectURL(blob);
          link.download="<FILENAME_TO_SAVE_WITH_EXTENSION>";
          link.click();
        }
      });
    // PDF.JS viewing tool
    var myState = {
                pdf:null,
                currentPage:1,
                zoom:1
            }
    
    function getPDFsource(pdfSource) {
        pdfjsLib.getDocument(pdfSource).then(pdf => {
                alert(pdfSource)
                myState.pdf = pdf
                render()
            })
    }
    
    function render() {
        myState.pdf.getPage(myState.currentPage).then(page => {
            var canvas = document.getElementById("pdf_renderer")
            var ctx = canvas.getContext("2d")
            var viewport = page.getViewport(myState.zoom, 0)
    
            canvas.width = viewport.width;
            canvas.height = viewport.height;
    
            //render
            page.render({
                canvasContext:ctx,
                viewport:viewport
            })
        })
    }
    
    /**
     * PDF CONTROLLERS
     * 
     */
    document.getElementById('go_previous').addEventListener('click', (e) => {
        if(myState.pdf == null || myState.currentPage == 1) return; //pierwsza strona
    
        myState.currentPage = myState.currentPage - 1;
        document.getElementById('current_page').value = myState.currentPage;
    
        render()
    })
    
    document.getElementById('go_next').addEventListener('click', (e) => {
        if(myState.pdf == null || myState.currentPage > myState.pdf._pdfInfo.numPages) return; //ostatnia strona
    
        myState.currentPage = myState.currentPage + 1;
        document.getElementById('current_page').value = myState.currentPage;
    
        render()
    })
    
    document.getElementById('current_page').addEventListener('keypress', (e) => {
        if(myState.pdf == null) return;
    
        //keycode
        var code = (e.keyCode ? e.keyCode : e.which)
    
        if(code == 13)
        {
            var desiredPage = document.getElementById('current_page').valueAsNumber
    
            if(desiredPage >= 1 && desiredPage <= myState.pdf._pdfInfo.numPages)
            {
                myState.currentPage = desiredPage
                document.getElementById('current_page').value = desiredPage;
    
                render();
            }
        }
    })
    
    document.getElementById('zoom_in').addEventListener('click', (e) => {
        if(myState.pdf == null) return;
        if(myState.zoom < 3) {
            myState.zoom = myState.zoom + 0.5
            render()
        }
    })
    
    document.getElementById('zoom_out').addEventListener('click', (e) => {
        if(myState.pdf == null) return;
        if(myState.zoom > 0.5) {
            myState.zoom = myState.zoom - 0.5
            render()
        }
    })
}