<template>
  <v-app>
    <!-- Barra superior con gradiente -->
    <v-app-bar app dark :style="{ background: 'linear-gradient(90deg, #4e54c8, #8f94fb)' }">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="ml-4">Admin Panel</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon large>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon large>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Contenedor principal -->
    <v-main>
      <v-container fluid>
        <v-row>
          <!-- Menú lateral con fondo degradado -->
          <v-navigation-drawer v-model="drawer" app permanent :style="{ background: 'linear-gradient(180deg, #333, #444)' }">
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="title text-h5 white--text">
                    <strong>Menú</strong>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              
              <v-divider></v-divider>

              <v-list-item-group v-model="selectedItem" active-class="deep-purple--text text--accent-4">
                <v-list-item
                  v-for="(item, index) in menuItems"
                  :key="index"
                  @click="navigateTo(item)"
                  :class="['pt-2 hoverable', { 'active-item': item === pageTitle }]"
                >
                  <v-list-item-icon>
                    <v-icon large>{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-navigation-drawer>

          <!-- Contenido del panel -->
          <v-col>
            <v-card class="pa-4" outlined elevation="3" :style="{ borderRadius: '12px', backgroundColor: '#f5f7fa' }">
              <transition name="fade" mode="out-in">
                <component :is="currentComponent" :key="currentComponent"></component>
              </transition>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app dark class="py-3" :style="{ backgroundColor: '#4e54c8' }">
      <v-container fluid class="text-center">
        <span class="white--text">&copy; 2024 Admin Panel</span>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      selectedItem: 0,
      pageTitle: "Dashboard",
      currentComponent: "DashboardComponent",
      menuItems: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Usuarios", icon: "mdi-account-group" },
        { title: "Proyectos", icon: "mdi-briefcase" },
        { title: "Ajustes", icon: "mdi-cog" },
      ],
    };
  },
  methods: {
    navigateTo(item) {
      this.pageTitle = item.title;
      this.currentComponent = `${item.title}Component`;
    },
  },
};
</script>

<style>
.title {
  font-size: 20px;
  color: white;
}
.v-navigation-drawer {
  width: 260px;
}
.v-footer {
  font-size: 14px;
}
.v-btn > .v-icon {
  font-size: 30px;
}

.hoverable {
  transition: background-color 0.3s;
}
.hoverable:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.v-card {
  transition: box-shadow 0.3s;
}
.v-card:hover {
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.active-item {
  background-color: rgba(100, 100, 255, 0.1);
}
</style>
