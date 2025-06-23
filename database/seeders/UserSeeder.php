<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $user = User::create([
        //     'name' => 'Keimal Reyyan',
        //     'email' => 'keimal@gmail.com',
        //     'password' => bcrypt('password'),
        // ]);

        // // get admin role
        // $role = Role::where('name', 'super-admin')->first();

        // // get all permissions
        // $permissions = Permission::all();

        // // assign role to user
        // $user->syncPermissions($permissions);

        // // assign a role to user
        // $user->assignRole($role);

        // $cashier = User::create([
        //     'name' => 'Cashier',
        //     'email' => 'cashier@gmail.com',
        //     'password' => bcrypt('password'),
        // ]);

        // $transactionsPermission = Permission::where('name', 'transactions-access')->first();

        $superAdminUser = User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'),
        ]);

        $superAdminRole = Role::where('name', 'super-admin')->first();

        $allPermissions = Permission::all();

        $superAdminUser->syncPermissions($allPermissions);

        $superAdminUser->assignRole($superAdminRole);

        $cashierUser = User::create([
            'name' => 'Cashier',
            'email' => 'cashier@gmail.com',
            'password' => bcrypt('password'),
        ]);

        $transactionsPermission = Permission::where('name', 'transactions-access')->first();

        if ($transactionsPermission) {
            $cashierUser->syncPermissions($transactionsPermission);
        } else {
            echo "Warning: 'transactions-access' permission not found for Cashier user.\n";
        }

        $kepalaSekolahUser = User::create([
            'name' => 'Kepala Sekolah',
            'email' => 'kepala.sekolah@gmail.com', 
            'password' => bcrypt('password'), 
        ]);

        $kepalaSekolahRole = Role::where('name', 'kepala-sekolah')->first();

        if ($kepalaSekolahRole) {
            $kepalaSekolahUser->assignRole($kepalaSekolahRole);
        } else {
            echo "Warning: 'kepala-sekolah' role not found for Kepala Sekolah user.\n";
        }

        $kepalaKoperasiUser = User::create([
            'name' => 'Kepala Koperasi',
            'email' => 'kepala.koperasi@gmail.com', 
            'password' => bcrypt('password'), 
        ]);

        $kepalaKoperasiRole = Role::where('name', 'kepala-koperasi')->first();

        if ($kepalaKoperasiRole) {
            $kepalaKoperasiUser->assignRole($kepalaKoperasiRole);
        } else {
            echo "Warning: 'kepala-koperasi' role not found for Kepala Sekolah user.\n";
        }
    }
}
