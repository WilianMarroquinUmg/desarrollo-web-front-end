<template>
 <template>
  <v-app>
    <!-- Barra superior -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Admin Panel</v-toolbar-title>
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
          <!-- Menú lateral -->
          <v-navigation-drawer v-model="drawer" app permanent color="grey darken-3">
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="title">
                    <strong>Menú</strong>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              
              <v-divider></v-divider>

              <v-list-item-group v-model="selectedItem" active-class="deep-purple--text text--accent-4">
                <v-list-item @click="navigateTo('dashboard')" class="pt-2">
                  <v-list-item-icon>
                    <v-icon>mdi-view-dashboard</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Dashboard</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item @click="navigateTo('usuarios')" class="pt-2">
                  <v-list-item-icon>
                    <v-icon>mdi-account-group</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Usuarios</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item @click="navigateTo('proyectos')" class="pt-2">
                  <v-list-item-icon>
                    <v-icon>mdi-briefcase</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Proyectos</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item @click="navigateTo('ajustes')" class="pt-2">
                  <v-list-item-icon>
                    <v-icon>mdi-cog</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Ajustes</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-navigation-drawer>

          <!-- Contenido del panel -->
          <v-col>
            <v-card class="pa-4" outlined elevation="2">
              <h1 class="text-h4 font-weight-bold mb-3">{{ pageTitle }}</h1>
              <component :is="currentComponent"></component>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app color="primary" dark class="py-2">
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
      currentComponent: "DashboardComponent"
    };
  },
  methods: {
    navigateTo(page) {
      this.pageTitle = page.charAt(0).toUpperCase() + page.slice(1);
      this.currentComponent = `${page.charAt(0).toUpperCase()}${page.slice(1)}Component`;
    }
  }
};
</script>

<style>
.title {
  font-size: 18px;
  color: white;
}
.v-navigation-drawer {
  width: 250px;
}
.v-footer {
  font-size: 14px;
}
.v-btn > .v-icon {
  font-size: 28px;
}
</style>
</template>
