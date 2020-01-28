<?php
    
    require_once __DIR__ . '/vendor/autoload.php';
    use TheCodingMachine\Gotenberg\Client;
    use TheCodingMachine\Gotenberg\DocumentFactory;
    use TheCodingMachine\Gotenberg\OfficeRequest;
    use TheCodingMachine\Gotenberg\Request;

    // $url = 'https://bip.poznan.pl/bip/attachments.att?co=show&instance=1057&parent=37297&lang=pl&id=309423';
    // $url = 'http://poznan.pl/public/bip/attachments.att?co=show&instance=1058&parent=37297&lang=pl&id=312378';
    // $url = 'http://poznan.pl/public/bip/attachments.att?co=show&instance=1057&parent=37297&lang=pl&id=309422';
    $url = 'http://poznan.pl/public/bip/attachments.att?co=show&instance=1057&parent=37297&lang=pl&id=309410';
    $file_name = 'test.pdf';
    $client_path = 'http://localhost:3000';

    create_pdf($url, $file_name, $client_path);

    function create_pdf($url, $file_name, $client_path) {

        $file_string = get_file_string_from_url($url);
        $pathTofiles = '/var/www/html/testpdfjs/pdfs';

        $client = new Client($client_path, new \Http\Adapter\Guzzle6\Client());
    
        $files = [
            DocumentFactory::makeFromString('test.doc',  $file_string),
        ];

        try {        
            echo "processing...\n";        
            $request = new OfficeRequest($files);
            $request->setWaitTimeout(20);
            
            // $client->store($request, $pathTofiles.'/'.$file_name);
            // $response = $this->handleResponse($this->client->sendRequest($this->makeMultipartFormDataRequest($request)));
            // $fileStream = $response->getBody();
            $fileStream = $client->get_file_stream($request);            
            $client->post($request);   
            var_dump($fileStream);
            // var_dump($request);
            // var_dump($client);
        } catch (RequestException $e) {
            echo 'Wystąpił wyjątek nr '.$e->getCode().', jego komunikat to:'.$e->getMessage();
        } catch (ClientException $e) {
            echo 'Wystąpił wyjątek nr '.$e->getCode().', jego komunikat to:'.$e->getMessage();
        } 

        echo "creating pdf done..\n";
    }

    function get_file_string_from_url($url) {
        
        $file_string = file_get_contents($url);
        
        if($file_string === false){
            throw new Exception('Failed to download file at: ' . $url);
        }
        
        echo "content retrieved...\n";
        return $file_string;
    }
?>