<?php

namespace App\Controllers\Api;

use App\Models\TaskStatusModel;
use CodeIgniter\RESTful\ResourceController;

class TaskStatus extends ResourceController
{   
    private TaskStatusModel $taskStatusModel;
    public function __construct()
    {
        $this->taskStatusModel = new TaskStatusModel();    
    }

    public function index()
    {   
        return $this->respond($this->taskStatusModel->findAll());
    }
}
