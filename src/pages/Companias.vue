<template>
  <div class="page-header clear-filter" >
      
    <div
      class="page-header-image"
      style="background-image: url('img/2.png')"
    ></div>
                        <v-container >
                          <br>
                           <h3>Registro de Compañias</h3>
       <h5>Favor de registrar los datos correctamente</h5>
 <v-app style="background-color: transparent">
     <template>
    <v-layout align-start>
        <v-flex>
                    <v-data-table
                :headers="headers"
                :items="companias"
               :search="search"
                class="elevation-1"
                se
            >
              <template v-slot:item.estado="{ item }">
                <v-chip class="ma-2" color="green" text-color="white"  v-if="item.estado==1">
                <v-avatar left>
                    <v-icon>touch_app</v-icon>
                </v-avatar>
                    Activo
                </v-chip>

                <v-chip class="ma-2" color="primary" text-color="white"  v-if="item.estado==0">
                <v-avatar left>
                    <v-icon>error</v-icon>
                </v-avatar>
                    Desactivado
                </v-chip>
            </template>
                <template v-slot:top>
                <v-toolbar flat color="indigo lighten-4">
                    <v-toolbar-title>Compañias</v-toolbar-title>
                    <v-divider
                    class="mx-4"
                    inset
                    vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Busqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="success" small class="mb-1" v-on="on"> Nueva Compañia</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                        <v-container>
                            <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="cia" label="CIA"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="representante" label="Representante"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="rfc" label="RFC"></v-text-field>
                            </v-col>
                         
                            </v-row>
                        </v-container>
                        </v-card-text>

                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                        <v-btn color="blue darken-1" text @click="guardar">Guardar</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                    <v-dialog v-model="adModal" max-width="290">
            <v-card>
              <v-card-title class="headline" v-if="adAccion==1">
                  Activar Item
              </v-card-title>
              <v-card-title class="headline" v-if="adAccion==0">
                  Desactivar Item
              </v-card-title>

              <v-card-text>
                  Estas a punto de <span v-if="adAccion==1">Activar</span>
                  <span v-if="adAccion==0">Desactivar</span> la Compañia {{adNombre}}
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="activarDesactivarCerrar()" small color="error">
                  Cancelar
                </v-btn>
                 <v-btn v-if="adAccion==1" @click="activar()"  small color="primary">
                  Activar
                </v-btn>
                <v-btn v-if="adAccion==0" @click="desactivar()" small color="purple">
                  Desactivar
                </v-btn>

              </v-card-actions>

            </v-card>
          </v-dialog>
                </v-toolbar>
                </template>
                <template v-slot:item.action="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
                >
                    edit
                </v-icon>
                <template v-if="item.estado">
                    <v-icon
                        small
                        @click="activarDesactivarMostrar(0,item)"
                    >
                        block
                    </v-icon>
                </template>
                  <template v-else>
                    <v-icon
                        small
                        @click="activarDesactivarMostrar(1,item)"
                    >
                        check
                    </v-icon>
                </template>
                </template>
                <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template> 
 </v-app>
                        </v-container>
         
  
    
   
    <main-footer></main-footer>
  </div>
</template>
<script>
import { Card, Button, FormGroupInput } from '@/components';
import axios from 'axios'
import MainFooter from '@/layout/MainFooter';
import bootstrap from 'bootstrap'
export default {
  name: 'login-page',
  bodyClass: 'login-page',
  data(){
        return{
          search:'',
            dialog: false,
            companias:[],
            headers: [
                { text: 'Acciones', value: 'action', sortable: false },
                { text: 'CIA', value: 'cia' },
                { text: 'Representante', value: 'representante' },
                { text: 'RFC', value: 'rfc' },
                { text: 'Estado', value: 'estado' },
            ],
            nombre:'',
            editedIndex: -1,
            
            cia:'',
            representante:'',
            rfc:'',
            adAccion:0,
            adNombre:'',
            adModal:'',
            adId:''
       
        }
    },
  components: {
    Card,
    MainFooter,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
  },

   computed:{
     formTitle () {
      return this.editedIndex === -1 ? 'Nueva Compañia' : 'Editar Compañia'
    },
    },
    
  watch: {
    dialog (val) {
      val || this.close()
    },
  },
    created () {
      
      this.listar()
    },
   methods:{

        listar(){
          let header={"Token":this.$store.state.token};
          let configuracion= {headers: header}
          let me=this
          axios.get('compania/list',configuracion).then(function (response){
              me.companias=response.data
          }).catch(function(error){
              console.log(error)
          })
      },
      limpiar(){
          this._id='';
          this.cia='',
          this.representa='',
          this.rfc='',
          this.editedIndex=-1

      },
      guardar(){
          let header={"Token":this.$store.state.token};
          let configuracion= {headers: header}
          let me = this;
          if(this.editedIndex >-1){
               axios.put('compania/update',{'_id':this._id,'cia':this.cia,'representante':this.representante,'rfc':this.rfc},configuracion)
              .then(function(response){
                  me.limpiar();
                  me.close();
                  me.listar();
              })
              .catch(function(error){
                  console.log(error);
              })
          }else{
              axios.post('compania/add',{'cia':this.cia,'representante':this.representante,'rfc':this.rfc,},configuracion)
              .then(function(response){
                  me.limpiar();
                  me.close();
                  me.listar();
              })
              .catch(function(error){
                  console.log(error);
              })
          }
      },
    initialize () {
     
    },

    editItem (item) {
        this._id=item._id
        this.cia=item.cia
        this.representante=item.representante
        this.rfc=item.rfc
        this.editedIndex=1;
        this.dialog=true
    },

   activarDesactivarMostrar(accion,item){
        this.adModal=1;
          this.adNombre=item.nombre;
          this.adId=item._id;
          if(accion==1){
            this.adAccion=1
          }else if(accion==0){
            this.adAccion=0
          }else{
            this.adMmodal=0;
          }
   },
   activar(){
          let me=this;
          let header={"Token":this.$store.state.token};
          let configuracion= {headers: header}
           axios.put('compania/activate',{'_id':this.adId},configuracion)
               .then(function(response){
                 me.adModal=0,
                 me.adAccion=0,
                 me.adNombre='',
                 me.adId='',
                 me.listar();
               }).catch(function(error){
                 console.log(error)
               });
        },

        desactivar(){
          let me=this;
           let header={"Token":this.$store.state.token};
          let configuracion= {headers: header}
           axios.put('compania/deactivate',{'_id':this.adId},configuracion)
               .then(function(response){
                 me.adModal=0,
                 me.adAccion=0,
                 me.adNombre='',
                 me.adId='',
                 me.listar();
               }).catch(function(error){
                 console.log(error)
               });
        },
        activarDesactivarCerrar(){
          this.adModal=0;
        },

    close () {
      this.dialog = false
     
    },
    },
    
};
</script>
<style></style>
