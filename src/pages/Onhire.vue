<template>
  <div class="page-header clear-filter" >
      
    <div
      class="page-header-image"
      style="background-image: url('img/2.png')"
    ></div>
   
   
      
         
             
                        <v-container >
                          <br>
                           <h3>Registro de Entrada en Contrado</h3>
       <h5>Favor de registrar los datos correctamente</h5>
 <v-app style="background-color: transparent">
    <template>
    <v-layout align-start>
        <v-flex>
                    <v-data-table
                :headers="headers"
                :items="onhires" 
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
                    <v-toolbar-title>On-Hire</v-toolbar-title>
                    <v-divider
                    class="mx-4"
                    inset
                    vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Busqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="700px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="success" small class="mb-1" v-on="on"> On-Hire</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                        <v-container>
                            <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-autocomplete  v-model="servicio" :items="servicios"  label="Servicios"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="4" md="4">
                                <v-text-field type=number v-model="diesel" label="Diesel"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4" md="4">
                                <v-text-field type=number v-model="aceite_e" label="Aceite de Engranes"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4" md="4">
                                <v-text-field type=number v-model="agua_p" label="Agua Potable"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4" md="4">
                                <v-text-field type=number v-model="aceite_l" label="Aceite Lubricante"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4" md="4">
                                <v-text-field type=number v-model="aceite_h" label="Aceite Hidraulico"></v-text-field>
                            </v-col>
                             <v-col cols="12" sm="4" md="4">
                                <v-text-field type=number v-model="aceite_l2" label="Aceite Lubricante 2"></v-text-field>
                            </v-col>
                              <v-col cols="12" sm="4" md="4">
                               <v-datetime-picker label="Horario de ON-HIRE" locale="es" v-model="onhire"> </v-datetime-picker>
                            </v-col>
                             <v-col cols="12" sm="4" md="4">
                                <v-text-field type=number v-model="consumibleAmls" label="Consumo AMLS"></v-text-field>
                            </v-col>
                             <v-col cols="12" sm="4" md="4">
                                <v-text-field type=number v-model="consumibleCliente" label="Consumo Cliente"></v-text-field>
                            </v-col>
                               <v-col cols="12" sm="12" md="12">
                                <v-text-field type=url v-model="soporteUrl" label="URL SOPORTE"></v-text-field>
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
                  <span v-if="adAccion==0">Desactivar</span> la embarcacion {{adNombre}}
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
            servicios:[],
            onhires:[],
            headers: [
                { text: 'Acciones', value: 'action', sortable: false },
                { text: 'Diesel', value: 'diesel' },
                { text: 'Aceite L 1', value: 'aceiteLubricante' },
                { text: 'Muelle', value: 'servicio.muelle' },
                { text: 'Aceite L 2', value: 'aceiteLubricante2' },
                { text: 'Hidraulico', value: 'aceiteHidraulico' },
                { text: 'Engrandes', value: 'aceiteEngranes' },
                { text: 'Agua Potable', value: 'aguaPotable' },
              
            ],
            nombre:'',
            editedIndex: -1,
            _id:'',
            servicio:'',
            diesel:'',
            aceite_l:'',
            aceite_l2:'',
            onhire:'',
            consumoAmls:'',
            consumoCliente:'',
            consumibleAmls:'',
            consumibleCliente:'',
            aceite_h:'',
            aceite_e:'',
            soporteUrl:'',
            agua_p:'',
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
      return this.editedIndex === -1 ? 'Nuevo On-Hire' : 'Editar On-Hire'
    },
    },
    
  watch: {
    dialog (val) {
      val || this.close()
    },
  },
    created () {
      this.listar()
    this.selectServicios()
    },
   methods:{

           selectServicios(){
            var options = { year: 'numeric', month: 'long', day: 'numeric' };
            let me = this;
            let servicioArray=[];
            let header={"Token":this.$store.state.token};
            let configuracion= {headers: header}
            axios.get('confirmarServicio/listServicio',configuracion).then((response)=>{
              servicioArray=response.data;
              servicioArray.map(function(x){
                  var fec=new Date(x.onhire)
                  var fecha = fec.toLocaleString()
                me.servicios.push({text:x.detalles+' con la embarcación '+x.embarcacion.nombre+' en el muelle '+x.muelle+' el '+fecha,value:x._id})
              });
            }).catch(function(error){
              console.log(error);
            })
          },

      listar(){
          let me=this
           let header={"Token":this.$store.state.token};
           let configuracion= {headers: header}
          axios.get('onhire/list',configuracion).then(function (response){
              me.onhires=response.data
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
               axios.put('onhire/update',
               {
                '_id':this._id,
                'servicio':this.servicio,
                'diesel':this.diesel,
                'aceiteLubricante':this.aceite_l,
                'aceiteLubricante2':this.aceite_l2,
                'aceiteHidraulico':this.aceite_h,
                'aceiteEngranes':this.aceite_e,
                'aguaPotable':this.agua_p,
                'onhire':this.onhire,
                'consumibleAmls':this.consumibleAmls,
                'consumibleCliente':this.consumibleCliente,
                 'soporteUrl':this.soporteUrl
                },configuracion)
              .then(function(response){
                  me.limpiar();
                  me.close();
                  me.listar();
              })
              .catch(function(error){
                  console.log(error);
              })
          }else{
              axios.post('onhire/add',{
                'servicio':this.servicio,
                'diesel':this.diesel,
                'aceiteLubricante':this.aceite_l,
                'aceiteLubricante2':this.aceite_l2,
                'aceiteHidraulico':this.aceite_h,
                'usuario':this.$store.state.usuario._id,
                'aceiteEngranes':this.aceite_e,
                'aguaPotable':this.agua_p,
                'onhire':this.onhire,
                'consumibleAmls':this.consumibleAmls,
                'consumibleCliente':this.consumibleCliente,
                'soporteUrl':this.soporteUrl
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

    editItem (item) {
        this._id=item._id
        this.servicio=item.servicio
        this.diesel=item.diesel
        this.aceite_l=item.aceiteLubricante
        this.aceite_l2=item.aceiteLubricante2
        this.aceite_h=item.aceiteHidraulico
        this.consumibleAmls=item.consumibleAmls
        this.consumibleCliente=item.consumibleCliente
        this.aceite_e=item.aceiteEngranes
        this.agua_p=item.aguaPotable
        this.trb=item.trb
        this.calado=item.calado
        this.soporteUrl=item.soporteUrl
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
           axios.put('embarcacion/activate',{'_id':this.adId},configuracion)
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
           axios.put('embarcacion/deactivate',{'_id':this.adId},configuracion)
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
