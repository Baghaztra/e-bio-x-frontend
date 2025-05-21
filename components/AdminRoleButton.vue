<template>
    <select
                v-model="user.role"
                @change="updateUserRole(user)"
                class="form-select border-green-300 focus:ring-green-500">
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
</template>

<scripts setup>

</scripts>