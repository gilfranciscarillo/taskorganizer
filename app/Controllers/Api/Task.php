<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use App\Models\TaskModel;
use App\Entities\TaskEntity;

class Task extends ResourceController
{
    private TaskModel $taskModel;
    private TaskEntity $taskEntity;
    public function __construct()
    {
        $this->taskModel = new TaskModel();
        $this->taskEntity = new TaskEntity();
    }

    public function index()
    {
        $tasks = $this->taskModel->findAll();

        return $this->respond($tasks);
    }

    public function create()
    {
        $this->taskEntity->fill($this->request->getJSON(true));

        if ($this->taskModel->save($this->taskEntity) === false) {
            return $this->fail('Bad request', 400);
        }

        $newRecordId = $this->taskModel->insertID();

        return $this->response->setJSON($this->taskModel->find($newRecordId));
    }

    /**
     * @param int|string|null $id
     */
    public function update($id = null)
    {
        $this->taskEntity = $this->taskModel->find($id);
        $this->taskEntity->fill($this->request->getJSON(true));

        if ($this->taskEntity->hasChanged() && $this->taskModel->save($this->taskEntity) === false) {
            return $this->fail('Bad request', 400);
        }

        return $this->response->setJSON($this->taskModel->find($id));
    }

    public function delete($id = null)
    {
        $task = $this->taskModel->find($id);
        if ($task && $this->taskModel->delete($id) === false) {
            return $this->fail('Bad request: ', 400);
        }

        return $this->respondDeleted(['id' => $id]);
    }
}
