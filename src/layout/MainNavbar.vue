<template>
  <navbar
    position="fixed"
    type=""
    :transparent="transparent"
   
    menu-classes="ml-auto"
  >
    <template slot-scope="{ toggle, isToggled }">
      <router-link v-popover:popover1 class="navbar-brand" to="/">
        ARROW SISTEM
      </router-link>
      <el-popover
        ref="popover1"
        popper-class="popover"
        placement="bottom"
        width="200"
        trigger="hover"
      >
        <div class="popover-body">
          Designed by Arrow Marine. Coded by Jordy Can
        </div>
      </el-popover>
    </template>
    <template slot="navbar-menu">
      <li class="nav-item" v-if="logueado">
        <a
          class="nav-link"
          @click="salir()"
          target="_blank"
        >
          <i class="now-ui-icons media-1_button-power"></i>
          <p>Salir</p>
        </a>
      </li>

   <template v-if="esAdministrador">
       <drop-down
        tag="li"
        title="Datos"
        icon="now-ui-icons files_single-copy-04"
        class="nav-item"
      >
        <nav-link to="embarcaciones">
          <i class="now-ui-icons objects_support-17"></i> Embarcaciones
        </nav-link>
        <nav-link to="agencias">
          <i class="now-ui-icons business_briefcase-24"></i> Agencias
        </nav-link>
        <nav-link to="companias">
          <i class="now-ui-icons business_globe"></i> Compañias
        </nav-link>
    
      </drop-down>
   </template>

       <template v-if="esComercial || esAdministrador">
       <drop-down
        tag="li"
        title="DN"
        icon="now-ui-icons education_agenda-bookmark"
        class="nav-item"
      >
        <nav-link to="confirmarServicio">
          <i class="now-ui-icons ui-1_check"></i> Confirmar Servicio
        </nav-link>
        <nav-link to="seguimientoServicio">
          <i class="now-ui-icons design_vector"></i> Seguimiento del Servicio
        </nav-link>
     
    
      </drop-down>
       </template>

       <template v-if="esLogistico || esAdministrador">
       <drop-down
        tag="li"
        title="Log y Ag"
        icon="now-ui-icons transportation_bus-front-12"
        class="nav-item"
      >
        <nav-link to="servicios">
          <i class="now-ui-icons ui-1_calendar-60"></i> Servicios
        </nav-link>
        <nav-link to="onhire">
          <i class="now-ui-icons ui-2_time-alarm"></i> On-Hire
        </nav-link>
         <nav-link to="ofhire">
          <i class="now-ui-icons ui-2_time-alarm"></i> Off-Hire
        </nav-link>
     
    
      </drop-down>
       </template>

         <template v-if="esTerrestre || esAdministrador">
         <drop-down
        tag="li"
        title="Log Terres"
        icon="now-ui-icons transportation_bus-front-12"
        class="nav-item"
      >
        <nav-link to="servicioTerrestre">
          <i class="now-ui-icons ui-1_calendar-60"></i> Servicios
        </nav-link>
    
      <nav-link to="hojaServicio">
          <i class="now-ui-icons files_single-copy-04"></i> Hoja de Servicio
        </nav-link>
    
      </drop-down>
         </template>

 <template v-if="esAdministrador">
         <drop-down
        tag="li"
        title="Monitoreo"
        icon="now-ui-icons ui-1_zoom-bold"
        class="nav-item"
      >
        <nav-link to="monitoreo">
          <i class="now-ui-icons emoticons_satisfied"></i> Monitoreo de Embarcaciones
        </nav-link>
        
      
    
      </drop-down>
 </template>
      
      <drop-down
        tag="li"
        title="Datos"
        icon="now-ui-icons files_single-copy-04"
        class="nav-item"
      >
        <nav-link to="/">
          <i class="now-ui-icons business_chart-pie-36"></i> All components
        </nav-link>
        <a
          href="https://demos.creative-tim.com/vue-now-ui-kit/documentation"
          target="_blank"
          class="dropdown-item"
        >
          <i class="now-ui-icons design_bullet-list-67"></i> Documentation
        </a>
      </drop-down>
      
      <drop-down
              tag="li"
              title="Examples"
              icon="now-ui-icons design_image"
              class="nav-item"
      >
       
        <nav-link to="/landing">
          <i class="now-ui-icons education_paper"></i> 
        </nav-link>
        
        <nav-link to="/login">
          <i class="now-ui-icons users_circle-08"></i> Login
        </nav-link>
        
      </drop-down>
      
      

      <li class="nav-item"> 
        <a
          v-if="!logueado"
          class="nav-link"
          rel="tooltip"
          title="Siguenos en Linkedin"
          data-placement="bottom"
          href="https://www.linkedin.com/company/amls-agency-vessels/"
          target="_blank"
        >
          <i class="fab fa-linkedin"></i>
          <p class="d-lg-none d-xl-none">Linkedin</p>
        </a>
      </li>
      <li class="nav-item">
        <a
         v-if="!logueado"
          class="nav-link"
          rel="tooltip"
          title="Siguenos en Facebook"
          data-placement="bottom"
          href="https://www.facebook.com"
          target="_blank"
        >
          <i class="fab fa-facebook-square"></i>
          <p class="d-lg-none d-xl-none">Facebook</p>
        </a>
      </li>
      <li class="nav-item">
        <a
         v-if="!logueado"
          class="nav-link"
          rel="tooltip"
          title="Contactanos"
          data-placement="bottom"
          href="https://api.whatsapp.com/send?phone=529383890612"
          target="_blank"
        >
          <i class="fab fa-whatsapp"></i>
          <p class="d-lg-none d-xl-none">Whatsapp</p>
        </a>
      </li>
    </template>
  </navbar>
</template>

<script>
import { DropDown, NavbarToggleButton, Navbar, NavLink } from '@/components';
import { Popover } from 'element-ui';
export default {
  name: 'main-navbar',
  props: {
    transparent: Boolean,
    colorOnScroll: Number
  },
  components: {
    DropDown,
    Navbar,
    NavbarToggleButton,
    NavLink,
    [Popover.name]: Popover
  },

    computed:{
      logueado(){
        return this.$store.state.usuario;
      },
      esAdministrador(){
        return this.$store.state.usuario && this.$store.state.usuario.rol == 'administrador'
      },
      esLogistico(){
        return this.$store.state.usuario && this.$store.state.usuario.rol == 'logistico'
      },
      esComercial(){
        return this.$store.state.usuario && this.$store.state.usuario.rol == 'comercial'
      },
       esTerrestre(){
        return this.$store.state.usuario && this.$store.state.usuario.rol == 'terrestre'
      }
    },
    created () {
      this.$store.dispatch("autoLogin");
      this.$vuetify.theme.dark = false
    },
    methods:{
      salir(){
        this.$store.dispatch("salir")
      }
    }

};
</script>
<style>
  #formato{
    background-color: #ffffff;
  }
#encabezado{
  color: black
}
#fact{
  color: black
}
      

      

       
      
