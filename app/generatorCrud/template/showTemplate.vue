<script setup lang="ts">
import MiCard from '~/components/personalized/MiCard.vue';

const route = useRoute();

const item = ref( {{ fields }} );

let cliente = useSanctumRequest();

const getItem = async () => {

  try {

    const id = route.params.id;

    let res = await cliente.get(`{{ url }}/${id}`);

    item.value = res.data;

  } catch (e) {

    notifyError('Error', e.message);

  }

};

const fiels = Object.keys( {{ fields }} );

getItem();

const formatString = (str) => {
  return str
      .split('_')
      .filter(word => word.toLowerCase() !== 'id')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}


const active = useState('activeItem');
active.value = '{{ model }}';

</script>


<template>

  <mi-card borderColor="#e74c3c">

    <div class="grid grid-cols-2 gap-4">

      <template v-for="field in Object.keys(item)">

        <div class="flex flex-col space-y-2">

          <label class="text-sm font-semibold text-gray-600"
                 v-text="formatString(field)+ ':'"
          ></label>

          <p class="text-sm text-gray-800"
             v-text="item[field]"
          ></p>

        </div>

      </template>
    </div>

    <template #footer>
      <div>
        <UButton type="button"
                 color="red"
                 icon="i-heroicons-arrow-left-end-on-rectangle"
                 variant="solid"
                 label="Regresar"
                 @click="navigateTo('/{{ directory }}')"
        />
      </div>
    </template>
  </mi-card>

</template>

<style scoped></style>
