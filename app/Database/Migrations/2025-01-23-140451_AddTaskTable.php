<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddTaskTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => 11,
                'null' => false,
                'auto_increment' => true
            ],
            'task_name' => [
                'type' => 'VARCHAR',
                'constraint' => 128,
                'null' => false
            ],
            'task_description' => [
                'type' => 'TEXT',
                'null' => true
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => false
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => false
            ],
            'status_id' => [
                'type' => 'INT',
                'constraint' => 11,
                'null' => false,
            ]
        ]);

        $this->forge->addPrimaryKey('id');
        $this->forge->addForeignKey('status_id', 'task_status', 'id', 'NO ACTION', 'RESTRICT', 'task_status_id_fk');
        $this->forge->createTable('task');
    }

    public function down()
    {
        $this->forge->dropTable('task');
    }
}
