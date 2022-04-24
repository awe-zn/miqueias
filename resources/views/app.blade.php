<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title inertia>{{ config('app.name', 'Miquéias Costa') }}</title>

  @if (env('APP_ENV') === 'production')
    <link rel="shortcut icon" href="{{ asset('public/images/favicon.ico') }}"
      type="image/x-icon">
  @else
    <link rel="shortcut icon" href="{{ asset('images/favicon.ico') }}"
      type="image/x-icon">
  @endif


  <!-- Fonts -->
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

  <!-- Styles -->
  @if (env('APP_ENV') === 'production')
    <link rel="stylesheet" href="{{ asset('public/css/app.css') }}">
  @else
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
  @endif

  <!-- Scripts -->
  @routes
  @if (env('APP_ENV') === 'production')
    <script src="{{ asset('public/js/app.js') }}" defer></script>
  @else
    <script src="{{ mix('js/app.js') }}" defer></script>
  @endif

  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
    rel="stylesheet" />
</head>

<body>
  @inertia
</body>

</html>
