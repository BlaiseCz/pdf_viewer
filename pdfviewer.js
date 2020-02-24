//rewrite to jquery
$(document).ready(function() {

    console.log('###### pdfviewer - BlaiseCz ######');

    $('#view_pdf').click(function() {

            var value = this.getAttribute("value");
            var encoded = encodeURIComponent(value);

            getPDFsource('http://localhost:8888/pdfviewer/pdf_viewer/gote_api_examples/gote_external_urls.php?url_address='
                + encoded );
    });

    /**
     * PDF.JS VIEWING TOOL
    */
    var myState = {
                pdf:null,
                currentPage:1,
                zoom:1,
            };
    
    function getPDFsource(pdfSource) {
        pdfjsLib.getDocument(pdfSource).then(pdf => {
                myState.pdf = pdf;
                render()
            })
    }

    function render() {
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

            $('#my_pdf_viewer').css('display', 'block');

            console.log('done');
        })
    }
    
    /**
     * PDF CONTROLLERS
     */
    $('#go_previous').click(function() {
        if(myState.pdf == null || myState.currentPage === 1) return; //pierwsza strona
    
        myState.currentPage -= 1;
        document.getElementById('current_page').value = myState.currentPage;
    
        render()
    });

    $('#go_next').click(function() {
        if(myState.pdf == null || myState.currentPage >= myState.pdf._pdfInfo.numPages) return; //ostatnia strona
    
        myState.currentPage = myState.currentPage + 1;
        document.getElementById('current_page').value = myState.currentPage;
    
        render()
    });

    $('#current_page').click(function() {
        if(myState.pdf == null) return;
    
        //keycode
        var code = (e.keyCode ? e.keyCode : e.which)

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

    $('#zoom_in').click(function() {
        if(myState.pdf == null) return;
        if(myState.zoom < 3) {
            myState.zoom = myState.zoom + 0.5;
            render()
        }
    });

    $('#zoom_out').click(function() {
        if(myState.pdf == null) return;
        if(myState.zoom > 0.5) {
            myState.zoom = myState.zoom - 0.5;
            render()
        }
    });
});