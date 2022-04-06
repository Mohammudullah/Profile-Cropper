<?php
    if(isset($_FILES['profile'])) {
        $extension = strtolower(pathinfo($_FILES['profile']['name'], PATHINFO_EXTENSION));
        if($extension == 'jpg' || $extension == 'jpeg' || $extension == 'png' ) {
            list($width,$height) = getimagesize($_FILES['profile']['tmp_name']);
            $base64EncodedData = base64_encode(file_get_contents($_FILES['profile']['tmp_name']));
            if($base64EncodedData != null && $width/$height == 1) {
                json_encode(http_response_code(201));
                print_r('data:'.$_FILES['profile']['type'].';base64,'.$base64EncodedData);
            }
            else {
                json_encode(http_response_code(400));
            }
        }
        else {
            json_encode(http_response_code(415));
        }
    }
    else {
        json_encode(http_response_code(403));
    }
    
?>