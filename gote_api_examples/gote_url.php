<?php
require '../vendor/autoload.php';

use TheCodingMachine\Gotenberg\Client;
use TheCodingMachine\Gotenberg\URLRequest;
use TheCodingMachine\Gotenberg\Request;


    $createdFileName = 'youtube';
    $dest = '../pdfs/'.$createdFileName.'.pdf';

//    example request
//    http://localhost:8888/pdfviewer/pdf_viewer/gote_api_examples/gote_url.php?url_address=https://stackoverflow.com/questions/15757750/how-can-i-call-php-functions-by-javascript

    print_r($_GET);

    if(isset($_GET['url_address'])) {

        $url = $_GET['url_address'];
        echo $url;
        // url -> reads page
        $client = new Client('http://localhost:3000', new \Http\Adapter\Guzzle6\Client());
        $request = new URLRequest($url);
        $request->setWaitTimeout(20);

        try {
            $request->setMargins(Request::NO_MARGINS);
            $client->store($request, $dest);

        } catch (\TheCodingMachine\Gotenberg\RequestException $e) {
            echo $e->getCode().' '.$e->getMessage();
        } catch (\Safe\Exceptions\FilesystemException $e) {
            echo $e->getCode().' '.$e->getMessage();
        } catch (\TheCodingMachine\Gotenberg\ClientException $e) {
            echo $e->getCode().' '.$e->getMessage();
        } catch (Exception $e) {
            echo $e->getCode().' '.$e->getMessage();
        }

        echo 'gote_url finished';
    }
    else {
        echo 'wrong url';
    }

?>
