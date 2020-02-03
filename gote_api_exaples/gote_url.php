<?php
require '../vendor/autoload.php';

use TheCodingMachine\Gotenberg\Client;
use TheCodingMachine\Gotenberg\URLRequest;
use TheCodingMachine\Gotenberg\Request;

    $createdFileName = 'youtube';
    $dest = '/Users/blaise/mygit/pdfviewer/pdf_viewer/pdfs/'.$createdFileName.'.pdf';
    
    
    // url -> reads page
    $client = new Client('http://localhost:3000', new \Http\Adapter\Guzzle6\Client());
    $request = new URLRequest('https://www.youtube.com/');
try {
    $request->setMargins(Request::NO_MARGINS);
    $client->store($request, $dest);
} catch (\TheCodingMachine\Gotenberg\RequestException $e) {
} catch (\Safe\Exceptions\FilesystemException $e) {
} catch (\TheCodingMachine\Gotenberg\ClientException $e) {
}


?>
