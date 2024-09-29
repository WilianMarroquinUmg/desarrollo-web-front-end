<script lang="ts">
import {defineComponent} from 'vue'

//definir el layaut
export default defineComponent({
  name: "index",
  layout: 'default',
  data(){
    return {
      title: 'Hola desde Nuxt.js 3'
    }
  },
  methods: {
    changeTitle(){
      console.log('Cambiando el titulo')
    }
  }
})

</script>

<template>

  <!-- Button trigger modal -->
  <b-button
      button="outline-primary"
      toggle="modal"
      target="#exampleModal"
  >
    Launch demo modal
  </b-button>
  <!-- Modal -->
  <Modal id="exampleModal">
    <ModalDialog>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Modal title</ModalTitle>
          <CloseButton dismiss="modal" />
        </ModalHeader>
        <ModalBody>...</ModalBody>
        <ModalFooter>
          <b-button
              button="secondary"
              dismiss="modal"
          >
            Close
          </b-button>
          <b-button button="primary">
            Save changes
          </b-button>
        </ModalFooter>
      </ModalContent>
    </ModalDialog>
  </Modal>

</template>

<style scoped>

</style>
