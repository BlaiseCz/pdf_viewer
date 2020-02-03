<?php
require '../vendor/autoload.php';

    use TheCodingMachine\Gotenberg\Client;
    use TheCodingMachine\Gotenberg\DocumentFactory;
    use TheCodingMachine\Gotenberg\OfficeRequest;

    $pathToFile = '/var/www/html/testpdfjs';
    $createdFileName = 'office';
    $dest = '/var/www/html/testpdfjs/pdfs/'.$createdFileName.'.pdf';

    $client = new Client('http://localhost:3000', new \Http\Adapter\Guzzle6\Client());

    //pierwszy param -> nazwa pliku, wg ktorej gutenberg conwertuje do formatu pdf
    //jesli pojawia sie dwa razy te same nazwy to zignoruje druga
    $files = [
        // DocumentFactory::makeFromPath('test.doc',  $pathToFile.'/test.doc'),
        // DocumentFactory::makeFromPath('test1.doc',  $pathToFile.'/test.doc'),
        DocumentFactory::makeFromPath('test2.docx', $pathToFile.'/test2.docx'),
        // DocumentFactory::makeFromPath('test2.docx', $pathToFile),
    ];

    
    try {
        
        $request = new OfficeRequest($files);
        $request->setWaitTimeout(20);
        $request->setLandscape(true);

        
        // store method allows you to... store the resulting PDF in a particular destination.
        $client->store($request, $dest);
        
        //if you wish to redirect the response directly to the browser, you may also use:
        $client->post($request);          
    } catch (RequestException $e) {
        // this exception is thrown if given paper size or margins are not correct.
    } catch (ClientException $e) {
        // this exception is thrown by the client if the API has returned a code != 200.
    }
?>