<template>
  <v-app>
    <!-- Barra superior -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Admin Panel</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Contenedor principal -->
    <v-main>
      <v-container fluid>
        <v-row>
          <!-- Menú lateral -->
          <v-navigation-drawer v-model="drawer" app permanent>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="title">
                    Menu
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              
              <v-divider></v-divider>

              <v-list-item-group v-model="selectedItem" active-class="deep-purple--text text--accent-4">
                <v-list-item @click="navigateTo('dashboard')">
                  <v-list-item-icon>
                    <v-icon>mdi-view-dashboard</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Dashboard</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item @click="navigateTo('usuarios')">
                  <v-list-item-icon>
                    <v-icon>mdi-account-group</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Usuarios</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item @click="navigateTo('proyectos')">
                  <v-list-item-icon>
                    <v-icon>mdi-briefcase</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Proyectos</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item @click="navigateTo('ajustes')">
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
            <v-card class="pa-4">
              <h1>{{ pageTitle }}</h1>
              <component :is="currentComponent"></component>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app color="primary" dark>
      <span class="white--text">&copy; 2024 Admin Panel</span>
    </v-footer>
  </v-app>
</template>
