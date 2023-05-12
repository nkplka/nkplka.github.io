<?php

// Проверяем, что пришли данные методом POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

  // Получаем переданные сообщения
  $messages = $_POST['messages'];

  // Открываем файл для записи
  $file = fopen('js/messages.js', 'a');

  // Записываем каждое сообщение в файл
  foreach ($messages as $message) {
    fwrite($file, $message . PHP_EOL);
  }

  // Закрываем файл
  fclose($file);

  // Отправляем ответ об успешном сохранении сообщений
  echo 'Messages saved successfully!';
}