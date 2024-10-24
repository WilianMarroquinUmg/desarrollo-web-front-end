<template>
  <div id="admin-panel" class="container">
    <h1 class="my-4">Panel Administrativo - Pajas de Agua</h1>
    
    <b-row>
      <b-col md="3">
        <b-card title="Menú" class="mb-3">
          <b-list-group>
            <b-list-group-item @click="view = 'registroPersonas'">Registro de Propietarios</b-list-group-item>
            <b-list-group-item @click="view = 'certificados'">Certificados de Propiedad</b-list-group-item>
            <b-list-group-item @click="view = 'historialPajas'">Historial de Compras/Ventas</b-list-group-item>
            <b-list-group-item @click="view = 'crearPaja'">Crear Paja de Agua</b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>

      <b-col md="9">
        <b-card v-if="view === 'registroPersonas'" title="Registro de Propietarios">
          <b-form @submit.prevent="registrarPropietario">
            <b-form-group label="Nombre Completo:" label-for="nombre">
              <b-form-input id="nombre" v-model="nuevoPropietario.nombre" placeholder="Ingrese el nombre completo"></b-form-input>
            </b-form-group>
            <b-form-group label="Dirección:" label-for="direccion">
              <b-form-input id="direccion" v-model="nuevoPropietario.direccion" placeholder="Ingrese la dirección"></b-form-input>
            </b-form-group>
            <b-form-group label="Número de Teléfono:" label-for="telefono">
              <b-form-input id="telefono" v-model="nuevoPropietario.telefono" placeholder="Ingrese el número de teléfono"></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Registrar Propietario</b-button>
          </b-form>

          <b-table :items="propietarios" :fields="fieldsPropietarios" striped hover class="mt-3"></b-table>
          <b-table :items="propietarios" :fields="fieldsPropietarios" striped hover class="mt-3">
          <template #cell(acciones)="row">
         <b-button variant="danger" @click="eliminarPropietario(row.index)">Eliminar</b-button>
        </template>
    </b-table>
        </b-card>

        <b-card v-if="view === 'certificados'" title="Certificados de Propiedad">
          <b-form-group label="Seleccionar Propietario:">
            <b-form-select v-model="propietarioSeleccionado" :options="opcionesPropietarios" class="mb-3"></b-form-select>
          </b-form-group>
          <b-button @click="emitirCertificado" variant="success">Emitir Certificado</b-button>

          <b-table :items="certificados" :fields="fieldsCertificados" striped hover class="mt-3"></b-table>
        </b-card>

        <b-card v-if="view === 'historialPajas'" title="Historial de Compras/Ventas de Pajas de Agua">
          <b-table :items="historialPajas" :fields="fieldsHistorial" striped hover class="mt-3"></b-table>
        </b-card>

 <!-- Crear Paja de Agua -->
        <b-card v-if="view === 'crearPaja'" title="Crear Paja de Agua"> <!-- Nueva vista -->
          <b-form @submit.prevent="crearPaja">
            <b-form-group label="Número de Paja de Agua:" label-for="numeroPaja">
              <b-form-input id="numeroPaja" v-model="nuevaPaja.numero" placeholder="Ingrese el número de la paja"></b-form-input>
            </b-form-group>
            <b-form-group label="Propietario:" label-for="propietarioPaja">
              <b-form-select id="propietarioPaja" v-model="nuevaPaja.propietario" :options="opcionesPropietarios"></b-form-select>
            </b-form-group>
            <b-button type="submit" variant="primary">Registrar Paja de Agua</b-button>
          </b-form>

          <b-table :items="pajas" :fields="fieldsPajas" striped hover class="mt-3"></b-table>
        </b-card>

      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      view: 'registroPersonas', // Cambiar la vista según el menú seleccionado
      nuevoPropietario: {
        nombre: '',
        direccion: '',
        telefono: ''
      },
      propietarios: [], // Lista de propietarios registrados
      fieldsPropietarios: [
        { key: 'nombre', label: 'Nombre Completo' },
        { key: 'direccion', label: 'Dirección' },
        { key: 'telefono', label: 'Teléfono' }
      ],
      propietarioSeleccionado: null, // Para emitir certificados
      certificados: [], // Lista de certificados emitidos
      fieldsCertificados: [
        { key: 'nombre', label: 'Nombre del Propietario' },
        { key: 'certificado', label: 'Certificado Emitido' }
      ],
      historialPajas: [], // Historial de compras y ventas
      fieldsHistorial: [
        { key: 'propietario', label: 'Propietario' },
        { key: 'accion', label: 'Acción' },
        { key: 'fecha', label: 'Fecha' }
      ],
      opcionesPropietarios: [] // Opciones de selección para emitir certificado
    };
  },
  methods: {
    registrarPropietario() {
      // Agregar nuevo propietario
      this.propietarios.push({ ...this.nuevoPropietario });
      this.nuevoPropietario = { nombre: '', direccion: '', telefono: '' };
      this.actualizarOpcionesPropietarios();
    },
    actualizarOpcionesPropietarios() {
      this.opcionesPropietarios = this.propietarios.map(p => p.nombre);
    },
    emitirCertificado() {
      if (this.propietarioSeleccionado) {
        this.certificados.push({
          nombre: this.propietarioSeleccionado,
          certificado: `Certificado de propiedad emitido para ${this.propietarioSeleccionado}`
        });
      }
    }
    eliminarPropietario(index) { // Método para eliminar propietario
      this.propietarios.splice(index, 1); // Elimina el propietario en la posición 'index'
      this.actualizarOpcionesPropietarios(); // Actualiza las opciones de propietarios
    }
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
}

.mt-3 {
  margin-top: 1rem !important;
}
</style>
