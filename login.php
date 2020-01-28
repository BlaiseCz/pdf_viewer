<?php


if (isset($_POST['username']) && $_POST['username'] && isset($_POST['password']) && $_POST['password']) {
    
    $_pass = $_POST['password'];
    $_username = $_POST['username'];

    if($_pass === 'asd' && $_username === 'asd') {
        echo json_encode(array('success' => 1));
    } else {
        echo json_encode(array('success' => 0));
    }
} else {
    echo json_encode(array('success' => 0));
}