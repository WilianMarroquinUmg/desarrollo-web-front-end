<!-- Vue component -->
<template>
  <div>
    <multiselect v-model="value" :options="options"></multiselect>
  </div>
</template>

<script>


export default {

  components: { Multiselect },
  data () {
    return {
      value: null,
      options: ['list', 'of', 'options']
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
</style>
