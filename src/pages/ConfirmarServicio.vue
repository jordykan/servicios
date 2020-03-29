<template>
  <div class="page-header clear-filter" >
      
    <div
      class="page-header-image"
      style="background-image: url('img/2.png')"
    ></div>
   
   
      
         
             
                        <v-container >
                          <br>
                           <h3>Registro de Servicios</h3>
       <h5>Favor de </h5>
 <v-app style="background-color: transparent">
  <template>
    <v-layout align-start>
        <v-flex>
                    <v-data-table
                :headers="headers"
                :items="confirmarServicio"
               :search="search"
                class="elevation-1"
                se
            >
              <template v-slot:item.estado="{ item }">
                <v-chip class="ma-2" color="orange" text-color="white"  v-if="item.estado==0">
                <v-avatar left>
                    <v-icon>restore</v-icon>
                </v-avatar>
                    Tentativo
                </v-chip>

                <v-chip class="ma-2" color="primary" text-color="white"  v-if="item.estado==1">
                <v-avatar left>
                    <v-icon>check</v-icon>
                </v-avatar>
                    Confirmado
                </v-chip>
            </template>
                <template v-slot:top>
                <v-toolbar flat color="yellow">
                    <v-toolbar-title>Confirmar Servicios</v-toolbar-title>
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
                        <v-btn color="success" small class="mb-1" v-on="on"> Nuevo Servicio</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                        <v-container>
                            <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-autocomplete  v-model="cia" :items="companias"  label="Compañia"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-autocomplete  v-model="embarcacion" :items="embarcaciones"  label="Embarcacion"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-autocomplete  v-model="agencia" :items="agencias"  label="Agencia"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                               <v-datetime-picker label="Horario de ON-HIRE" locale="es" v-model="onhire"> </v-datetime-picker>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="programa" label="Programa"></v-text-field>
                            </v-col>
                             <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="detalles" label="Detalles"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="muelle" label="Muelle"></v-text-field>
                            </v-col>
                              <v-col cols="12" sm="12" md="12">
                                <v-autocomplete  v-model="tipoServicio" :items="tipoServicios"  label="Tipo de Servicio"></v-autocomplete>
                            </v-col>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="urlCotizacion" label="Url Cotizacion"></v-text-field>
                            </v-col>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="urlSoporte" label="Url Soporte"></v-text-field>
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
                  Estas a punto de <span v-if="adAccion==1">Confirmar</span>
                  <span v-if="adAccion==0">Cancelar</span> el Servicio {{adNombre}}
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
            embarcaciones:[],
            agencias:[],
            companias:[],
            confirmarServicio:[],
            tipoServicios:['Terrestre','Cabotaje'],
            headers: [
                { text: 'Acciones', value: 'action', sortable: false },
                { text: 'Compañia', value: 'cia.cia' },
                { text: 'embarcacion', value: 'embarcacion.nombre' },
                { text: 'agencia', value: 'agencia.agencia' },
                { text: 'On-Hire', value: 'onhire' },
                { text: 'Programa', value: 'programa' },
                { text: 'Muelle', value: 'muelle' },
                { text: 'Detalles', value: 'detalles' },
                
                { text: 'Tipo de Servicio', value: 'tipo_servicio' },
                { text: 'Estado', value: 'estado' },
            ],
            nombre:'',
            editedIndex: -1,
            _id:'',
            cia:'',
            embarcacion:'',
            agencia:'',
            onhire:'',
            muelle:'',
            programa:'',
            detalles:'',
            tipoServicio:'',
            urlSoporte:'',
            urlCotizacion:'',
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
      return this.editedIndex === -1 ? 'Nueva Embarcación' : 'Editar Embarcación'
    },
    },
    
  watch: {
    dialog (val) {
      val || this.close()
    },
  },
    created () {
      this.listar()
    this.selectEmbarcaciones()
    this.selectAgencias()
    this.selectCia()
    },
   methods:{

        listar(){
         let header={"Token":this.$store.state.token};
          let configuracion= {headers: header}
          let me=this
          axios.get('confirmarServicio/list',configuracion).then(function (response){
              me.confirmarServicio=response.data
          }).catch(function(error){
              console.log(error)
          })
      },
      limpiar(){
          this._id='';
          this.nombre='',
          this.tipo='',
          this.armador='',
          this.eslora='',
          this.manga='',
          this.tbr='',
          this.trb='',
          this.calado=''
          this.editedIndex=-1
      },
      guardar(){
          let me = this;
            let header={"Token":this.$store.state.token};
          let configuracion= {headers: header}
          if(this.editedIndex >-1){
               axios.put('confirmarServicio/update',{'_id':this._id,'cia':this.cia,'embarcacion':this.embarcacion,'agencia':this.agencia,
              'onhire':this.onhire,'programa':this.programa, 'muelle':this.muelle,'detalles':this.detalles,'tipo_servicio':this.tipoServicio,'url_soporte':this.urlSoporte,'url_cotizacion':this.urlCotizacion},configuracion)
              .then(function(response){
                  me.limpiar();
                  me.close();
                  me.listar();
              })
              .catch(function(error){
                  console.log(error);
              })
          }else{
             axios.post('confirmarServicio/add',
             {
             'cia':this.cia,
             'embarcacion':this.embarcacion,
             'agencia':this.agencia,
             'onhire':this.onhire,
             'muelle':this.muelle,
             'programa':this.programa,
             'usuario':this.$store.state.usuario._id,
             'detalles':this.detalles,
             'tipo_servicio':this.tipoServicio,
             'url_cotizacion':this.urlCotizacion,
             'url_soporte':this.urlSoporte
              },configuracion)
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

    selectEmbarcaciones(){
            let me = this;
            let embarcacionArray=[];
            let header={"Token":this.$store.state.token};
            let configuracion= {headers: header}
            axios.get('embarcacion/list',configuracion).then((response)=>{
              embarcacionArray=response.data;
              embarcacionArray.map(function(x){
                me.embarcaciones.push({text:x.nombre, value:x._id})
              });
            }).catch(function(error){
              console.log(error);
            })
          },

      selectAgencias(){
            let me = this;
            let agenciaArray=[];
            let header={"Token":this.$store.state.token};
            let configuracion= {headers: header}
            axios.get('agencia/list',configuracion).then((response)=>{
              agenciaArray=response.data;
              agenciaArray.map(function(x){
                me.agencias.push({text:x.agencia, value:x._id})
              });
            }).catch(function(error){
              console.log(error);
            })
          },
       selectCia(){
            let me = this;
            let companiaArray=[];
            let header={"Token":this.$store.state.token};
            let configuracion= {headers: header}
            axios.get('compania/list',configuracion).then((response)=>{
              companiaArray=response.data;
              companiaArray.map(function(x){
                me.companias.push({text:x.cia, value:x._id})
              });
            }).catch(function(error){
              console.log(error);
            })
       },

    
    editItem (item) {
        this._id=item._id
        this.cia=item.cia._id
        this.embarcacion=item.embarcacion._id
        this.agencia=item.agencia._id
        this.onhire=item.onhire
        this.programa=item.programa
        this.detalles=item.detalles
        this.muelle = item.muelle
        this.tipoServicio=item.tipo_servicio
        this.urlSoporte=item.url_soporte
        this.urlCotizacion=item.url_cotizacion
        this.editedIndex=1;
        this.dialog=true
    },

   activarDesactivarMostrar(accion,item){
        this.adModal=1;
          this.adNombre=item.programa;
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
           axios.put('confirmarServicio/activate',{'_id':this.adId},configuracion)
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
           axios.put('confirmarServicio/deactivate',{'_id':this.adId},configuracion)
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
