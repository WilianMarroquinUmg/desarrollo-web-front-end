<script setup lang="ts">
import {ref, shallowRef} from 'vue';
import sidebarItems from '@/components/layout/full/vertical-sidebar/sidebarItem';
import {Menu2Icon, UsersIcon} from 'vue-tabler-icons';
import Icon from "~/components/layout/full/vertical-sidebar/Icon.vue";
import RecursiveItemMenu from "~/components/layout/full/recursiveItemMenu.vue";

const menuItems = shallowRef(sidebarItems);

const sDrawer = ref(true);

</script>

<template>

  <v-navigation-drawer left elevation="0" app class="leftSidebar" v-model="sDrawer">
    <!---Logo part -->
    <div style="background: blue; height: 60px; padding: 20px; ">
      <LayoutFullLogo/>
    </div>

    <div>
      <perfect-scrollbar class="scrollnavbar pa-3" style="background: #2c3e50    ">

        <v-list style="background: #2c3e50    ">
          <recursive-item-menu
              v-for="(item, i) in menuItems.values()"
              :key="i"
              :item="item"
          ></recursive-item-menu>
        </v-list>

        <div class="pa-4">
          <LayoutFullVerticalSidebarExtraBox/>
        </div>
      </perfect-scrollbar>
    </div>

  </v-navigation-drawer>

  <v-app-bar height="60" style="background: blue">
    <div class="d-flex align-center justify-space-between w-100">
      <div>
        <v-btn class="hidden-lg-and-up ms-md-3 ms-sm-5 ms-3 text-muted" @click="sDrawer = !sDrawer" icon variant="flat"
               size="small">
          <Menu2Icon size="20" stroke-width="1.5"/>
        </v-btn>
        <!-- Notification -->
        <LayoutFullVerticalHeaderNotificationDD/>
      </div>
      <div>
        <!-- Upgrade button -->

        <!-- User Profile -->
        <LayoutFullVerticalHeaderProfileDD/>
      </div>
    </div>
  </v-app-bar>

</template>
