<?php
    require '../vendor/autoload.php';
    header('Content-Type: application/json');

    use Safe\Exceptions\FilesystemException;
    use TheCodingMachine\Gotenberg\Client;
    use TheCodingMachine\Gotenberg\DocumentFactory;
    use TheCodingMachine\Gotenberg\OfficeRequest;

    function create_pdf($url) {

            $client_path = 'http://localhost:3000';

        try {
            $file_string = get_file_string_from_url($url);
        } catch (Exception $e) {
            echo '1Wystąpił wyjątek nr '.$e->getCode().', jego komunikat to:'.$e->getMessage();
        }
        $client = new Client($client_path, new \Http\Adapter\Guzzle6\Client());

        try {
            $files = [
                DocumentFactory::makeFromString('test.doc', $file_string),
            ];
        } catch (FilesystemException $e) {
            echo '2Wystąpił wyjątek nr '.$e->getCode().', jego komunikat to:'.$e->getMessage();
        }

        try {             
            $request = new OfficeRequest($files);
            $request->setWaitTimeout(20);
        
            $response = $client->get_response($request); 
            $fileStream = $response->getBody()->getContents();
            // var_dump($fileStream); // pdf            
            $client->post($request);
//            $client->store($request, '../pdfs/'.$name.'.pdf');
            return $fileStream;
        } catch (Exception $e) {
            echo '3Wystąpił wyjątek nr '.$e->getCode().', jego komunikat to:'.$e->getMessage();
        }

        return '-1';
    }

    function get_file_string_from_url($url) {
        $file_string = file_get_contents($url);    
        if($file_string === false){
            throw new Exception('Failed to download file at: ' . $url);
        }

        return $file_string;
    }

    //po stornie js lub php encode/decode atrybutu GET
    $url1 = 'http://poznan.pl/public/bip/attachments.att?co=show&instance=1057&parent=37297&lang=pl&id=309410';

    /**
     * SET url which you want to be passed
     *
     * pattern
     * http://mypage.com?url_address=http://secondpage.com/att.pdf
     */
    if(isset($_GET['url_address'])){
            $url = urldecode($_GET['url_address']);
            echo create_pdf($url);
    }

?>