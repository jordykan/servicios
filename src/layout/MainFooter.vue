<template>
  <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div class="container">
      <nav>
        <ul>
          <li>
            <a href="https://www.creative-tim.com">
              Politicas de Uso
            </a>
          </li>
          <li>
            <a href="https:///presentation.creative-tim.com">
             Acerca de Nosotros
            </a>
          </li>
        
        </ul>
      </nav>
      <div class="copyright">
        &copy; {{ year }}, Designed by
        <a href="https:///www.invisionapp.com" target="_blank" rel="noopener"
          >Arrow Marine Logistics Services</a
        >. Coded by
        <a href="https://binarcode.com" target="_blank" rel="noopener"
          >Jordy Can</a
        >
       
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    backgroundColor: String,
    type: String
  },
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
