<?php

// 1. connect to local MySql Server (using XAMPP or MAMPP)
$username = "root";
$conn = new mysqli("localhost",$username, "", "course_calendar");
$conn->set_charset("utf8mb4");