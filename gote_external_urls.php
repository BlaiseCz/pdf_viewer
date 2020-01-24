<?php
    
    require_once __DIR__ . '/vendor/autoload.php';
    use TheCodingMachine\Gotenberg\Client;
    use TheCodingMachine\Gotenberg\DocumentFactory;
    use TheCodingMachine\Gotenberg\OfficeRequest;

    // $url = 'https://bip.poznan.pl/bip/attachments.att?co=show&instance=1057&parent=37297&lang=pl&id=309423';
    $url = 'http://poznan.pl/public/bip/attachments.att?co=show&instance=1058&parent=37297&lang=pl&id=312378';
    $file_name = 'test1.pdf';

    create_pdf($url, $file_name);

    function create_pdf($url, $file_name) {

        $file_string = get_file_string_from_url($url);
        $pathTofiles = '/var/www/html/testpdfjs/pdfs';

        $client = new Client('http://localhost:3000', new \Http\Adapter\Guzzle6\Client());
    
        $files = [
            DocumentFactory::makeFromString('test.doc',  $file_string),
        ];

        try {
                    
            $request = new OfficeRequest($files);
            $request->setWaitTimeout(20);
            $request->setLandscape(true);

            $client->store($request, $pathTofiles.'/'.$file_name);
            $client->post($request);  
        } catch (RequestException $e) {
            // this exception is thrown if given paper size or margins are not correct.
        } catch (ClientException $e) {
            // this exception is thrown by the client if the API has returned a code != 200.
        } 

        echo "creating pdf done..\n";
    }

    function get_file_string_from_url($url) {
           
        //Download the file using file_get_contents.
        $file_string = file_get_contents($url);
        
        // var_dump($downloadedFileContents);
        //Check to see if file_get_contents failed.
        if($file_string === false){
            throw new Exception('Failed to download file at: ' . $url);
        }
        
        //The path and filename that you want to save the file to.
        $fileName = 'downloaded.doc';
        
        //Save the data using file_put_contents.
        $save = file_put_contents($fileName, $file_string);
        
        //Check to see if it failed to save or not.
        if($save === false){
            throw new Exception('Failed to save file to: ' , $fileName);
        }

        echo "bytes retrieved...\n";
        return $file_string;
    }
?>