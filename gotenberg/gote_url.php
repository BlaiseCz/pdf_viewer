<?php
require_once __DIR__ . '/vendor/autoload.php';

use TheCodingMachine\Gotenberg\Client;
use TheCodingMachine\Gotenberg\URLRequest;
use TheCodingMachine\Gotenberg\Request;

    $createdFileName = 'google';
    $dest = '/var/www/html/testpdfjs/pdfs/'.$createdFileName.'.pdf';
    
    
    // url -> reads page
    $client = new Client('http://localhost:3000', new \Http\Adapter\Guzzle6\Client());
    $request = new URLRequest('https://google.com');
    $request->setMargins(Request::NO_MARGINS);
    
    $client->store($request, $dest);

?>
