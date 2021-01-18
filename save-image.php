<?php
    ini_set('display_errors', 1);
    echo "called";
    $response = [];
    if(isset($_POST['img'])){
         $img = $_POST['img'];
         $img = str_replace('data:image/png;base64,', '', $img);
         $img = str_replace(' ', '+', $img);


        $dir = __DIR__ ."/pytorch-CycleGAN-and-pix2pix/datasets/web/test";
        $file_name = 'photo.jpg';

        print($file_name);

        is_dir($dir) || @mkdir($dir) || die("I can't create a directory");
        file_put_contents($dir ."/" . $file_name, base64_decode($img));
         
        chdir("./pytorch-CycleGAN-and-pix2pix");
        echo getcwd();
        exec('python test.py --dataroot ./datasets/web --name human_pix2pix --model pix2pix --direction BtoA --batch_size 256 --gpu_ids -1', $output, $return_var);
        var_dump($output);
        var_dump($return_var);
        
    };
    
    

    $response['success'] = true;
    $response['message'] = 'call handled';
    
    echo json_encode($response);
?>