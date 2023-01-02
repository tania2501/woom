<?php
    // Получение данных с формы:
    $Name = htmlspecialchars($_POST['Name']);
    $Email = htmlspecialchars($_POST['Email']);
    $Phone = htmlspecialchars($_POST['Phone']);

    // Параметры для функции mail:
    $source = getenv('HTTP_REFERER');
    $subject = 'Тема письма клиенту';
    $message = "Текст письма:
        <br><br>
        Имя: $Name<br>
        E-mail: $Email<br>
        Телефон: $Phone<br>
        Источник (ссылка): $source
    ";
    $headers = "From: $email\r\nReply-To: $email\r\nContent-type: text/html; charset=utf-8\r\n";

    // Отправка данных на почту:
    $success = mail("tatyana.evdunova@mail.ru", $subject, $message, $headers);

    // Сохранение инфо о лидах в файл leads.xls :

    $date=date("d.m.y"); // число.месяц.год  
    $time=date("H:i"); // часы:минуты:секунды

    $f = fopen("leads.xls", "a+");
    fwrite($f," <tr>");    
    fwrite($f," <td>$Email</td> <td>$Name</td> <td>$Phone</td> <td>$date/$time</td>");   
    fwrite($f," <td>$source</td>");    
    fwrite($f," </tr>");  
    fwrite($f,"\n ");    
    fclose($f);