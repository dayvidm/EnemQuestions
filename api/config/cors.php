<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    // 'paths' => ['*'],

    // 'allowed_methods' => ['*'],

    // 'allowed_origins' => ['http://localhost:3000'],

    // 'allowed_origins_patterns' => [],

    // // 'allowed_headers' => ['Content-Type', 'X-XSRF-TOKEN', 'Authorization', 'X-Requested-With', 'X-Custom-Header', 'Accept'],
    // 'allowed_headers' => ['*'],

    // 'exposed_headers' => [],

    // 'max_age' => 0,

    // 'supports_credentials' => true,

    'paths' => [
        'api/*' => [
            'origin' => ['http://localhost:3000'],
            'methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
            'headers' => ['Content-Type', 'Authorization'],
            'exposed_headers' => [],
            'max_age' => 0,
            'credentials' => true,
        ],
        'sanctum/csrf-cookie' => [
            'origin' => ['http://localhost:3000'],
            'methods' => ['GET'],
            'headers' => [],
            'exposed_headers' => [],
            'max_age' => 0,
            'credentials' => true,
        ],
    ],

];
