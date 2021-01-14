<?php
    ini_set('display_errors', 1);
    $response = [];
    if(isset($_POST['img'])){
         $img = $_POST['img'];
         $img = str_replace('data:image/png;base64,', '', $img);
         $img = str_replace(' ', '+', $img);
         echo $img;
         $file_name = 'photo.png';

         print($file_name);
         file_put_contents($file_name, base64_decode($img));
         shell_exec('mv ./photo.png photo2.png');
    };
    
    

    $response['success'] = true;
    $response['message'] = 'call handled';
    
    echo json_encode($response);
?>