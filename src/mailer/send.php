<?php
// Файлы phpmailer
require 'class.phpmailer.php';
require 'class.smtp.php';

$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$code = $_POST['user_code'];

// Настройки
$mail = new PHPMailer;

$mail->isSMTP();
$mail->CharSet = 'utf-8'; 
$mail->Host = 'smtp.post.box';
$mail->SMTPAuth = true;
$mail->Username = 'email@addre.ss';
$mail->Password = 'passdeletedandrevoked';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;
$mail->setFrom('email@addre.ss', 'Energo Pro');
$mail->addAddress('email@addre.ss');

// Прикрепление файлов
  for ($ct = 0; $ct < count($_FILES['userfile']['tmp_name']); $ct++) {
        $uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES['userfile']['name'][$ct]));
        $filename = $_FILES['userfile']['name'][$ct];
        if (move_uploaded_file($_FILES['userfile']['tmp_name'][$ct], $uploadfile)) {
            $mail->addAttachment($uploadfile, $filename);
        } else {
            $msg .= 'Failed to move file to ' . $uploadfile;
        }
    }   
                                 
// Письмо
$mail->isHTML(true); 
$mail->Subject = 'Письмо c Energo Pro';
$mail->Body    = '
	Пользователь тестового сайта <b>Energo Pro</b> оставил заявку!<br><br> 
	Имя: ' . $name . ' <br>
	Номер телефона: ' . $phone . '<br>
    Код фильтра: ' . $code . '<br><br>
    Фото фильтра во вложении (вложение будет отсутствовать, если пользователь ничего не прикрепил к письму).';

// Результат
if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'ok';
}
?>