<template>
  <div id="admin-panel">
    <!-- Panel lateral -->
    <aside class="sidebar">
      <nav>
        <ul>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#users">Usuarios</a></li>
          <li><a href="#settings">Configuraciones</a></li>
        </ul>
      </nav>
    </aside>

    <!-- Contenido principal -->
    <div class="main-content">
      <header>
        <h1>Panel Administrativo</h1>
      </header>

      <section class="content">
        <h2>Bienvenido al panel administrativo</h2>
        <!-- Botón que ya tienes en tu código -->
        <button class="btn btn-primary"> Botón de prueba </button>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
/* Estilos para el panel administrativo */
#admin-panel {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #2c3e50;
  padding: 20px;
  color: white;
}

.sidebar nav ul {
  list-style: none;
  padding: 0;
}

.sidebar nav ul li {
  margin: 15px 0;
}

.sidebar nav ul li a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.main-content {
  flex: 1;
  background-color: #ecf0f1;
  display: flex;
  flex-direction: column;
}

header {
  background-color: #34495e;
  padding: 20px;
  color: white;
}

.content {
  flex: 1;
  padding: 20px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
