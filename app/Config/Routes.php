<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

$routes->group('api', ['namespace' => '\App\Controllers\Api'], static function ($routes) {
    $routes->options('(:any)', 'PreFlight::options');
    $routes->options('(:any)/(:any)', 'PreFlight::options');

    $routes->resource('task', ['placeholder' => '(:num)']);
    $routes->get('taskstatus', 'TaskStatus::index');
});
