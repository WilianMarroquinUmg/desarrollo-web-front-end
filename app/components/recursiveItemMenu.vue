<script lang="ts">
import {defineComponent} from 'vue'
import {useRoute} from 'vue-router';
export default defineComponent({
  name: "recursiveItemMenu",
  props: {
    item: Object
  },
  setup(props) {
    const route = useRoute();

    const isActive = (to: string) => {
      return route.path === to;  // Compara la ruta actual con el destino del ítem
    };

    return { isActive };
  }

})
</script>

<template>
  <div>
    <v-list-group v-if="item.children"
                  :value="item.title"
    >
      <template v-slot:activator="{ props }">
        <v-list-item
            v-bind="props"
            :prepend-icon="item.icon"
            :title="item.title"
            rounded
        ></v-list-item>
      </template>

      <recursive-item-menu
          v-for="(child, i) in item.children"
          :key="i"
          :item="child"
      ></recursive-item-menu>
    </v-list-group>


    <v-list-item v-else
                 :to="item.to"
                 rounded
                 class="mb-1"
                 active-color="primary"
                 color="primary"
                 variant="plain"
                 :class="{ 'active-item': isActive(item.to) }"

    >

      <v-list-item-title>{{item.title }}</v-list-item-title>

      <v-list-item-subtitle v-if="item.subCaption" class="text-caption mt-n1 hide-menu">
        {{ item.subCaption }}
      </v-list-item-subtitle>


    </v-list-item>


  </div>
</template>

<style scoped>
.active-item {
  background-color: #b3e5fc; /* Fondo celeste para ítem activo */
  color: #007bff; /* Color de texto para ítem activo */
}
</style>
