<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
    rel="stylesheet" />
</head>

<body style="margin: 0; font-family: 'Inter', sans-serif; line-height: 1.5;">
  <div>
    @yield('content')
  </div>
  <div style="color: #092C4C; background-color: #E0E0E0; font-size: 14px;">
    <div style="max-width: 750px; margin: auto; padding: 16px 12px;">
      <span>Miquéias Costa - {{ date('Y') }}</span>
    </div>
  </div>
</body>

</html>
