<script setup lang="ts">

</script>

<template>
  <UForm :schema="schema"
         :state="state"
         class="space-y-4"
         @submit="onSubmit"
  >
    <UFormGroup label="Primer Nombre" name="primer_nombre">
      <UInput v-model="state.primer_nombre" />
    </UFormGroup>

    <UFormGroup label="Segundo Nombre" name="segundo_nombre">
      <UInput v-model="state.segundo_nombre" />
    </UFormGroup>

    <!-- Segunda columna -->
    <UFormGroup label="Primer Apellido" name="primer_apellido">
      <UInput v-model="state.primer_apellido" />
    </UFormGroup>

    <UFormGroup label="Segundo Apellido" name="segundo_apellido">
      <UInput v-model="state.segundo_apellido" />
    </UFormGroup>

    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>

    <UFormGroup label="Confirmar Password" name="password_confirmation">
      <UInput v-model="state.password_confirmation" type="password" />
    </UFormGroup>

    <div class="buttons">
      <UButton type="submit">
        Submit
      </UButton>
    </div>
  </UForm>
</template>

<style scoped>

</style>
