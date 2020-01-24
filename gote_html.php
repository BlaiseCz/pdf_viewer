<?php 
require_once __DIR__ . '/vendor/autoload.php';

use TheCodingMachine\Gotenberg\Client;
use TheCodingMachine\Gotenberg\DocumentFactory;
use TheCodingMachine\Gotenberg\HTMLRequest;

$client = new Client('http://localhost:3000', new \Http\Adapter\Guzzle6\Client());
$index = DocumentFactory::makeFromPath('test.html', '/var/www/html/testpdfjs/pdfs/');
$request = new HTMLRequest($index);
$dest = '/var/www/html/testpdfjs/pdfs/html_test.pdf';
$client->store($request, $dest);

?>