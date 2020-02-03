window.onload = function() {

    console.log('###### pdfviewer.js - BlaiseCz ######');


    document.getElementById('view_pdf').addEventListener('click', (e) => {
            console.log('1tu')

            var link= 'https://bip.poznan.pl/public/bip/attachments.att?co=show&instance=1057&parent=37857&lang=pl&id=313196';
            var link2 = 'http://poznan.pl/public/bip/attachments.att?co=show&instance=1057&parent=37297&lang=pl&id=309410&';
            getPDFsource('http://localhost:8888/pdfviewer/pdf_viewer/gote_api_examples/gote_external_urls.php?url_address='+link2);
            console.log('2tu')
    });

    /**
     * PDF.JS VIEWING TOOL
    */
    var myState = {
                pdf:null,
                currentPage:1,
                zoom:1
            };
    
    function getPDFsource(pdfSource) {
        pdfjsLib.getDocument(pdfSource).then(pdf => {
                alert('pdf source ' + pdfSource);
                myState.pdf = pdf;
                render()
            })
    }

    function render() {
        console.log('rendering started..')

        myState.pdf.getPage(myState.currentPage).then(page => {
            var canvas = document.getElementById("pdf_renderer");
            var ctx = canvas.getContext("2d");
            var viewport = page.getViewport({scale:myState.zoom});


            canvas.width = viewport.width;
            canvas.height = viewport.height;
    
            // render
            page.render({
                canvasContext:ctx,
                viewport:viewport
            });
            console.log('out of render..')
        })
    }
    
    /**
     * PDF CONTROLLERS
     * 
     */
    document.getElementById('go_previous').addEventListener('click', (e) => {
        if(myState.pdf == null || myState.currentPage === 1) return; //pierwsza strona
    
        myState.currentPage -= 1;
        document.getElementById('current_page').value = myState.currentPage;
    
        render()
    });
    
    document.getElementById('go_next').addEventListener('click', (e) => {
        if(myState.pdf == null || myState.currentPage >= myState.pdf._pdfInfo.numPages) return; //ostatnia strona
    
        myState.currentPage = myState.currentPage + 1;
        document.getElementById('current_page').value = myState.currentPage;
    
        render()
    });
    
    document.getElementById('current_page').addEventListener('keypress', (e) => {
        if(myState.pdf == null) return;
    
        //keycode
        var code = (e.keyCode ? e.keyCode : e.which)

        var code1 = (e.key ? e.key : e.key)
        if(code === 13)
        {
            var desiredPage = document.getElementById('current_page').valueAsNumber
    
            if(desiredPage >= 1 && desiredPage <= myState.pdf._pdfInfo.numPages)
            {
                myState.currentPage = desiredPage;
                document.getElementById('current_page').value = desiredPage;
    
                render();
            }
        }
    });
    
    document.getElementById('zoom_in').addEventListener('click', (e) => {
        if(myState.pdf == null) return;
        if(myState.zoom < 3) {
            myState.zoom = myState.zoom + 0.5;
            render()
        }
    });
    
    document.getElementById('zoom_out').addEventListener('click', (e) => {
        if(myState.pdf == null) return;
        if(myState.zoom > 0.5) {
            myState.zoom = myState.zoom - 0.5;
            render()
        }
    });

};