<script lang="ts" setup>
import {defineComponent, computed} from 'vue'
import {useRoute} from 'vue-router';

const props = defineProps<{
  item: {
    title: string,
    icon: string,
    to: string,
    subCaption: string,
    children: any[]
  }
}>()


const activo = useState('activeItem');

const estaActivo = computed(() => {
  return activo.value === props.item.value;
})



</script>

<template>
  <div class="todo">
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
                 variant="plain"
                 :class="{ 'active-item': estaActivo }"
                 :prepend-icon="item.icon"

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
  background-color: blue; /* Fondo celeste para ítem activo */
  color: white; /* Color de texto para ítem activo */
}
.todo {
  color: white; /* Color de texto para ítem activo */
}
</style>
