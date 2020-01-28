<?php
require '../vendor/autoload.php';

use TheCodingMachine\Gotenberg\Client;
use TheCodingMachine\Gotenberg\URLRequest;
use TheCodingMachine\Gotenberg\Request;

    $createdFileName = 'youtube';
    $dest = '/var/www/html/testpdfjs/pdfs/'.$createdFileName.'.pdf';
    
    
    // url -> reads page
    $client = new Client('http://localhost:3000', new \Http\Adapter\Guzzle6\Client());
    $request = new URLRequest('https://www.youtube.com/');
    $request->setMargins(Request::NO_MARGINS);
    
    $client->store($request, $dest);

?>
