<script setup lang="ts">
import {ref, shallowRef} from 'vue';
import sidebarItems from '@/components/layout/full/vertical-sidebar/sidebarItem';
import {Menu2Icon} from 'vue-tabler-icons';
import Icon from "~/components/layout/full/vertical-sidebar/Icon.vue";

const sidebarMenu = shallowRef(sidebarItems);
const sDrawer = ref(true);

const menuItems = ref([
  {
    title: 'Home',
    icon: 'mdi-home',
    value: 'home',
    to: '/',
  },
  {
    title: 'Users',
    icon: 'mdi-account-circle',
    value: 'users',
    children: [
      {
        title: 'Admin',
        icon: '',
        value: 'admin',
        children: [
          { title: 'View Admins', icon: 'mdi-eye', value: 'view-admins', to: '/prueba2' },
          { title: 'Add Admin', icon: 'mdi-plus', value: 'add-admin' },
        ],
      },
      {
        title: 'Actions',
        icon: '',
        value: 'actions',
        children: [
          { title: 'Create User', icon: 'mdi-account-plus', value: 'create-user', to: '/users' },
          { title: 'Edit User', icon: 'mdi-account-edit', value: 'edit-user', to: '/prueba' },
        ],
      },
    ],
  },
]);

</script>

<template>

  <v-navigation-drawer left elevation="0" app class="leftSidebar" v-model="sDrawer">
    <!---Logo part -->
    <div style="background: skyblue; height: 60px; padding: 20px; ">
      <LayoutFullLogo/>
    </div>

    <div>
      <perfect-scrollbar class="scrollnavbar">

        <!--        <v-list class="pa-6">-->
        <!--          &lt;!&ndash;-Menu Loop &ndash;&gt;-->
        <!--          <template v-for="(item, i) in sidebarMenu" :key="i">-->

        <!--            <LayoutFullVerticalSidebarNavGroup v-if="item.header"-->
        <!--                                               :item="item"-->
        <!--                                               :key="item.title"-->
        <!--            />-->

        <!--            <LayoutFullVerticalSidebarNavItem v-else-if="!item.children"-->
        <!--                                              :item="item"-->
        <!--                                              class="leftPadding"-->
        <!--            />-->

        <!--            <v-list-group v-else-->
        <!--                          :value="item.title"-->
        <!--            >-->

        <!--              <template v-slot:activator=" props " >-->

        <!--                <v-list-item-->
        <!--                    v-bind="props"-->
        <!--                    :title="item.title"-->
        <!--                    rounded-->
        <!--                >-->
        <!--                </v-list-item>-->

        <!--              </template>-->

        <!--              <template v-for="(child, i) in item.children">-->
        <!--                <LayoutFullVerticalSidebarNavItem :item="child"-->
        <!--                                                  class="leftPadding"-->
        <!--                />-->
        <!--              </template>-->
        <!--            </v-list-group>-->

        <!--          </template>-->
        <!--        </v-list>-->

        <v-list>
          <recursive-item-menu
              v-for="(item, i) in menuItems"
              :key="i"
              :item="item"
          ></recursive-item-menu>
        </v-list>

<!--        <template>-->
<!--          <v-card-->
<!--              class="mx-auto"-->
<!--              width="300"-->
<!--          >-->
<!--            <v-list v-model:opened="open">-->
<!--              <v-list-item prepend-icon="mdi-home" title="Home"></v-list-item>-->

<!--              <v-list-group value="Users">-->
<!--                <template v-slot:activator="{ props }">-->
<!--                  <v-list-item-->
<!--                      v-bind="props"-->
<!--                      prepend-icon="mdi-account-circle"-->
<!--                      title="Users"-->
<!--                  ></v-list-item>-->
<!--                </template>-->

<!--                <v-list-group value="Admin">-->
<!--                  <template v-slot:activator="{ props }">-->
<!--                    <v-list-item-->
<!--                        v-bind="props"-->
<!--                        title="Admin"-->
<!--                    ></v-list-item>-->
<!--                  </template>-->

<!--                  <v-list-item-->
<!--                      v-for="([title, icon], i) in admins"-->
<!--                      :key="i"-->
<!--                      :prepend-icon="icon"-->
<!--                      :title="title"-->
<!--                      :value="title"-->
<!--                  ></v-list-item>-->
<!--                </v-list-group>-->

<!--                <v-list-group value="Actions">-->
<!--                  <template v-slot:activator="{ props }">-->
<!--                    <v-list-item-->
<!--                        v-bind="props"-->
<!--                        title="Actions"-->
<!--                    ></v-list-item>-->
<!--                  </template>-->

<!--                  <v-list-item-->
<!--                      v-for="([title, icon], i) in cruds"-->
<!--                      :key="i"-->
<!--                      :prepend-icon="icon"-->
<!--                      :title="title"-->
<!--                      :value="title"-->
<!--                  ></v-list-item>-->
<!--                </v-list-group>-->
<!--              </v-list-group>-->
<!--            </v-list>-->
<!--          </v-card>-->
<!--        </template>-->


        <div class="pa-4">
          <LayoutFullVerticalSidebarExtraBox/>
        </div>
      </perfect-scrollbar>
    </div>

  </v-navigation-drawer>

  <v-app-bar height="60" style="background: skyblue">
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
