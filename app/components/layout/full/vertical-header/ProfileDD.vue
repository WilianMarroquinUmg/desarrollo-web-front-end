<script setup lang="ts">
import { UserIcon, MailIcon, ListCheckIcon } from 'vue-tabler-icons';

const { logout } = useSanctumAuth();

</script>

<template>

    <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <v-btn class="profileBtn custom-hover-primary" variant="text" v-bind="props" icon>
                <v-avatar size="35">
                    <img src="/images/users/avatar-1.jpg" height="35" alt="user" />
                </v-avatar>
            </v-btn>
        </template>
        <v-sheet rounded="md" width="200" elevation="10" class="mt-2">

            <div class="pt-4 pb-4 px-5 text-center">
                <v-btn color="danger"
                       variant="outlined"
                       block
                       @click="logout"
                >
                  Logout
                </v-btn>
            </div>
        </v-sheet>
    </v-menu>
</template>
