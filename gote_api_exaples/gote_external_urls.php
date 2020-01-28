<?php
    require '../vendor/autoload.php';

    use TheCodingMachine\Gotenberg\Client;
    use TheCodingMachine\Gotenberg\DocumentFactory;
    use TheCodingMachine\Gotenberg\OfficeRequest;
    use TheCodingMachine\Gotenberg\Request;
  
    function create_pdf($url) {

        $client_path = 'http://localhost:3000';

        $file_string = get_file_string_from_url($url);
        $client = new Client($client_path, new \Http\Adapter\Guzzle6\Client());
    
        $files = [
            DocumentFactory::makeFromString('test.doc',  $file_string),
        ];

        try {             
            $request = new OfficeRequest($files);
            $request->setWaitTimeout(20);
        
            $response = $client->get_response($request); 
            $fileStream = $response->getBody()->getContents();
            // var_dump($fileStream); // pdf            
            $client->post($request);  
              
            return $fileStream;
        } catch (RequestException $e) {
            echo 'Wystąpił wyjątek nr '.$e->getCode().', jego komunikat to:'.$e->getMessage();
        } catch (ClientException $e) {
            echo 'Wystąpił wyjątek nr '.$e->getCode().', jego komunikat to:'.$e->getMessage();
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

    $url = 'http://poznan.pl/public/bip/attachments.att?co=show&instance=1057&parent=37297&lang=pl&id=309410';

    echo create_pdf($url);
?>