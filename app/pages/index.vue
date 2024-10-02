<script setup lang="ts">

definePageMeta({
    title: 'Dashboard',
    //agregar un moddleware
    middleware: ['sanctum:auth'],
});

import SalesOverview from '@/components/dashboard/SalesOverview.vue';

</script>
<template>
    <v-row>
        <v-col cols="12">
            <v-row>
                <!-- Sales overview -->
                <v-col cols="12" lg="8">
                    <SalesOverview />
                </v-col>
                <!-- Yearly Breakup / Monthly Earnings -->

            </v-row>
        </v-col>
        <v-col class="text-center mt-2">
            <p class="text-muted">Design and Developed by <a flat variant="text" href="https://adminmart.com/" target="_blank" class="pl-1 text-primary">AdminMart.com</a></p>
        </v-col>
    </v-row>
</template>
