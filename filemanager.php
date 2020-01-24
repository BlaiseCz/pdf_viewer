<?php
    $url = 'https://bip.poznan.pl/bip/attachments.att?co=show&instance=1057&parent=37297&lang=pl&id=309423';
    
    //Download the file using file_get_contents.
    $downloadedFileContents = file_get_contents($url);
    
    var_dump($downloadedFileContents);
    //Check to see if file_get_contents failed.
    if($downloadedFileContents === false){
        throw new Exception('Failed to download file at: ' . $url);
    }
    
    //The path and filename that you want to save the file to.
    $fileName = 'logo.png';
    
    //Save the data using file_put_contents.
    $save = file_put_contents($fileName, $downloadedFileContents);
    
    //Check to see if it failed to save or not.
    if($save === false){
        throw new Exception('Failed to save file to: ' , $fileName);
    }
?>