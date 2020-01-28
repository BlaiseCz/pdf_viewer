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
                getPDFsource(elem.value)
            }
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