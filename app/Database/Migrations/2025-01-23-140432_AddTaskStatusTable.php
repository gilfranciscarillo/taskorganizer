<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddTaskStatusTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => 11,
                'null' => false,
            ],
            'status_name' => [
                'type' => 'VARCHAR',
                'constraint' => 128,
                'null' => false
            ]
        ]);

        $this->forge->addPrimaryKey('id');
        $this->forge->createTable('task_status');
    }

    public function down()
    {
        $this->forge->dropTable('task_status');
    }
}
