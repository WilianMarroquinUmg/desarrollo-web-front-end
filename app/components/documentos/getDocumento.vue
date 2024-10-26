<template>
  <div>

    <UButton @click="fetchHTML"
             color="blue"
             variant="solid"
             size="sm"
             icon="i-heroicons-printer"
    />
  </div>
</template>

<script>

const cliente = useSanctumRequest();
const {notifyError} = useToastNotifications();
const configSanctum = useSanctumConfig();
export default {
  props: {
    paja_id: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      fechaActual: new Date().toLocaleDateString(),
      baseUrl: configSanctum.baseUrl,
    };
  },

  methods: {



  },
};
</script>


