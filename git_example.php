<?php 
require_once __DIR__ . '/vendor/autoload.php';

use TheCodingMachine\Gotenberg\Client;
use TheCodingMachine\Gotenberg\ClientException;
use TheCodingMachine\Gotenberg\DocumentFactory;
use TheCodingMachine\Gotenberg\HTMLRequest;
use TheCodingMachine\Gotenberg\Request;
use TheCodingMachine\Gotenberg\RequestException;
use GuzzleHttp\Psr7\LazyOpenStream;

$pathTofiles = '/var/www/html/testpdfjs';

# create the client.
$client = new Client('http://localhost:3000', new \Http\Adapter\Guzzle6\Client());
# ... or the following if you want the client to discover automatically an installed implementation of the PSR7 `HttpClient`.
$client = new Client('http://localhost:3000');

# prepare the files required for your conversion.


# from a path.
// $index = DocumentFactory::makeFromPath('test.html', $pathTofiles);
# ... or from your own stream.
$stream = new LazyOpenStream($pathTofiles.'/index.html', 'r');
$index = DocumentFactory::makeFromStream('index.html', $stream);
// ... or from a string.


try {
    $request = new HTMLRequest($index);
    
    // store method allows you to... store the resulting PDF in a particular destination.
    $client->store($request, $pathTofiles.'/pdfs/stored.pdf');
    
    //if you wish to redirect the response directly to the browser, you may also use:
    $client->post($request);          
} catch (RequestException $e) {
    // this exception is thrown if given paper size or margins are not correct.
} catch (ClientException $e) {
    // this exception is thrown by the client if the API has returned a code != 200.
}

?>