<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class AddDefaultTaskStatusRecords extends Seeder
{
    public function run()
    {
        $tasksStatus = ['Backlog', 'Ready to do', 'In progress', 'Done'];

        foreach ($tasksStatus as $key => $status) {
            $this->db->query(
                'INSERT INTO task_status(id, status_name) VALUES(?, ?) ON DUPLICATE KEY UPDATE status_name = VALUES(status_name)',
                [$key, $status]
            );
        }
    }
}
