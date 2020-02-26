//rewrite to jquery
$(document).ready(function() {

    console.log('###### pdfviewer - BlaiseCz ######');


    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    var url_address = getUrlParameter('url_address');

    var loadPAge = function(url_address) {

            console.log(url_address)
            var encoded = encodeURIComponent(url_address);

            getPDFsource('http://localhost:8000/pdf_viewer.php/?url_address='
                + encoded );
    };

    loadPAge(url_address)

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
        console.log('render');
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

            $('.lds-spinner').css('display', 'none');
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