<template>
  <div class="page-header clear-filter" >
    <div
     v-if="!logueado"
      class="page-header-image"
      style="background-image: url('img/AMLS7.jpg')"
    ></div>
     <div
     v-if="logueado"
      class="page-header-image"
      style="background-image: url('img/plataformas.png')"
    ></div>

    
    <div >
      <div class="container">
       <br><br><br>
        <div class="col-md-4 ml-auto mr-auto"  >
          <card type="login" plain >
            <div slot="header" wid>
              <img v-lazy="'img/logo1.png'" style="height:150px" alt="" />
            </div>

            <fg-input
            v-if="!logueado"
              class="no-border input-lg"
              addon-left-icon="now-ui-icons users_circle-08"
              placeholder="Correo"
               v-model="email" 
            >
            </fg-input>

            <fg-input
            v-if="!logueado"
              class="no-border input-lg"
              addon-left-icon="now-ui-icons objects_key-25"
              placeholder="Contraseña"
              type="password"
              v-model="password"
             
            >
            </fg-input>
  <div class="card-footer text-center">
                <a
                v-if="!logueado"
                  @click="ingresar()"
                  class="btn btn-primary btn-round btn-lg btn-block"
                  >Inicar Sesion</a
                >
              </div>
            <template slot="raw-content">
            
             
              <div class="pull-right">
                <h6>
                  <a href="#pablo" class="link footer-link"  v-if="!logueado">Necesitas ayuda?</a>
                </h6>
              </div>
            </template>
          </card>
        </div>
          <div class="text-center ma-2">
   
    <v-snackbar 
      v-model="snackbar" 
      color='error' 
      right="right==right"
      top="top === top"
      timeout="6000"
      v-if="errorM" 
    
    >
            {{errorM}}
            <v-btn
                color="white"
                text
                @click="snackbar = false"
            >
                Close
        </v-btn>
    </v-snackbar>
    </div>
      </div>
    </div>
    <main-footer></main-footer>
  </div>
</template>
<script>
import { Card, Button, FormGroupInput } from '@/components';
import axios from 'axios'
import MainFooter from '@/layout/MainFooter';
export default {
  name: 'login-page',
  bodyClass: 'login-page',
  data(){
        return{
            email:'',
            password:'',
            errorM: '',
            snackbar: false
        }
    },
  components: {
    Card,
    MainFooter,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
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
        ingresar(){
            axios.post('usuario/login',{email:this.email,password:this.password})
            .then(respuesta =>{
                return respuesta.data;
            })
            .then(data =>{
                this.$store.dispatch("guardarToken",data.tokenReturn)
            })
            .catch(function(error){
                this.errorM=null;
               if(error.response.status==404){
                   this.errorM="No existe el usuario o las credenciales son incorrectas"
                   this.snackbar=true;
               }else{
                   this.errorM="Ocurrio un error con el servidor"
               }
            })
        }
    }
};
</script>
<style></style>
