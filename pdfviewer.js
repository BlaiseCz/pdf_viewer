window.onload = function() {

    console.log('###### pdfviewer - BlaiseCz ######');

    var my_pdf_viewer = document.getElementById("my_pdf_viewer");
    var pdf_button = document.getElementById('view_pdf');

    pdf_button.addEventListener('click', (e) => {

        if(myState.opened === 0) {
            var value = pdf_button.getAttribute("value");
            //loading
            my_pdf_viewer.classList.add("loader")

            getPDFsource('http://localhost:8888/pdfviewer/pdf_viewer/gote_api_examples/gote_external_urls.php?url_address='
                + value );

        } else {
            myState.opened = 0;
            my_pdf_viewer.style.display = "none";
        }
    });


    /**
     * PDF.JS VIEWING TOOL
    */
    var myState = {
                pdf:null,
                currentPage:1,
                zoom:1,
                opened:0
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

            my_pdf_viewer.classList.remove("loader");
            my_pdf_viewer.style.display = "block";
            myState.opened = 1;

            console.log('done');
        })
    }
    
    /**
     * PDF CONTROLLERS
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