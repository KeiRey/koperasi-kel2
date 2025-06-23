<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    // Refactor the RoleSeeder to improve readability and avoid repetitive code
    public function run(): void
    {
        $rolesData = [
            'users-access' => '%users%',
            'roles-access' => '%roles%',
            'permission-access' => '%permissions%',
            'categories-access' => '%categories%',
            'products-access' => '%products%',
            'customers-access' => '%customers%',
            'transactions-access' => '%transactions%',
        ];

        foreach ($rolesData as $roleName => $permissionPattern) {
            $this->createRoleWithPermissions($roleName, $permissionPattern);
        }

        $kepalaSekolahRole = Role::firstOrCreate(['name' => 'kepala-sekolah']);
        $kepalaSekolahPermissions = Permission::whereIn('name', [
            'dashboard-access',
            'history-access',
            'profit-access',
            'incoming-access',
        ])->get();
        $kepalaSekolahRole->givePermissionTo($kepalaSekolahPermissions);
        
        $kepalaKoperasiRole = Role::firstOrCreate(['name' => 'kepala-koperasi']);
        $kepalaKoperasiPermissions = Permission::whereIn('name', [
            'dashboard-access',
            'products-access',
            'categories-access',
            'history-access',
            'incoming-access',
            'profit-access',
        ])->get();
        $kepalaKoperasiRole->givePermissionTo($kepalaKoperasiPermissions);

        Role::firstOrCreate(['name' => 'super-admin']);
    }

    private function createRoleWithPermissions($roleName, $permissionNamePattern)
    {
        $role = Role::firstOrCreate(['name' => $roleName]);
        $permissions = Permission::where('name', 'like', $permissionNamePattern)->get();
        $role->givePermissionTo($permissions);
    }
}
