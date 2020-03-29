<template>
  <div class="page-header clear-filter" >
      
    <div
      class="page-header-image"
      style="background-image: url('img/2.png')"
    ></div>
   
   
      
         
             
                        <v-container >
                          <br>
                           <h3>Registro de Embarcaciones</h3>
       <h5>Favor de registrar los datos correctamente</h5>
 <v-app style="background-color: transparent">
    <template>
  <v-layout align-start>
  <v-flex>
    <v-data-table
      :headers="headers"
      :items="monitoreo"
      :search="search"
      class="elevation-1"
      v-if="verNuevo==0"
    >
      <template v-slot:item.estado="{ item }">
         <v-chip class="ma-2" color="orange" text-color="white"  v-if="item.estado==0">
          <v-avatar left>
            <v-icon>restore</v-icon>
          </v-avatar>
            En proceso
         </v-chip>

          <v-chip class="ma-2" color="primary" text-color="white"  v-if="item.estado==1">
          <v-avatar left>
            <v-icon>done</v-icon>
          </v-avatar>
            Apropado por AMLS
         </v-chip>

          <v-chip class="ma-2" color="red" text-color="white"  v-if="item.estado==2">
          <v-avatar left>
            <v-icon>cancel</v-icon>
          </v-avatar>
            Anulado
         </v-chip>

          <v-chip class="ma-2" color="success" text-color="white"  v-if="item.estado==3">
          <v-avatar left>
            <v-icon>done_all</v-icon>
          </v-avatar>
            Aprobado por API
         </v-chip>
      </template>
      <template v-slot:top>
        <v-toolbar flat color="indigo lighten-4">
          <v-toolbar-title>Cambios de Guardia</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-text-field class="text-xs-center" v-if="verNuevo==0" v-model="search" append-icon="search" label="Busqueda" single-line hide-details></v-text-field>
          <v-spacer></v-spacer>
         <v-btn v-if="verNuevo==0" @click="mostrarNuevo()" color="success"  small>Nueva Solicitud</v-btn>
          
        
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{  }">
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                   
                   
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
              <v-card-title class="headline" v-if="adAccion==2">
                  Desactivar Item
              </v-card-title>

              <v-card-text>
                  Estas a punto de <span v-if="adAccion==1">Activar</span>
                  <span v-if="adAccion==2">Desactivar</span> la solicitud con folio {{adNombre}}
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="activarDesactivarCerrar()" color="green darken-1" flat="flat">
                  Cancelar
                </v-btn>
                 <v-btn v-if="adAccion==1" @click="activar()" color="orange darken-4" flat="flat">
                  Activar
                </v-btn>
                <v-btn v-if="adAccion==2" @click="desactivar()" color="orange darken-4" flat="flat">
                  Desactivar
                </v-btn>

              </v-card-actions>

            </v-card>
          </v-dialog>
       
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">

       <v-icon
        v-if="item.estado==0"
          small
          class="mr-2"
          @click="editItem(item)"
        >
          edit
        </v-icon>

      

    
       
        <v-icon
        v-if="item.estado==2"
          
          class="mr-2"
          @click="editItem(item)"
        >
          edit
        </v-icon>
       
          <v-icon
        v-if="item.estado==3"
          
          class="mr-2"
          @click="mostrarComprobante(item)"
        >
          print
        </v-icon>
       

      </template>
   

      
      <template v-slot:no-data>
        <v-btn color="primary" @click="listar()">Resetear</v-btn>
      </template>
    </v-data-table>

    <v-container grid-list-sm class="pa-4 gray" v-if="verNuevo" style="background-color: white">
        <v-layout row wrap>

            <v-flex xs12 sm4 lg12 x12>
              <v-autocomplete :items="servicios"  v-model="servicio" label="Servicio"></v-autocomplete>
            </v-flex>
  

            <v-flex xs12 sm2 md2 lg2 x12>
              <v-btn small fab dar color="" @click="agregarDetalle()">
                  <v-icon dark>playlist_add
</v-icon>
              </v-btn>
            </v-flex>

             <v-col cols="12" sm="6" md="12" v-show="valida">
                      <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v">

                      </div>
                    </v-col>

             <v-flex xs12 sm2 md12 lg12 xl12>
               <template>
                 <v-data-table
                  :headers="cabeceraDetalles"
                  :items="movimientos"
                  class="elevation-1"
                  hide-default-footer
                
                 >
                          <template slot="items" slot-scope="props">
                          
                           <td class="text-xs-center"><v-text-field v-model="props.items.color"></v-text-field></td>
                          <td class="text-xs-center"><v-text-field v-model="props.items.fecha"></v-text-field></td>
                          <td class="text-xs-center"><v-text-field v-model="props.items.tipoMovimiento"></v-text-field></td>
                          <td class="text-xs-center"><v-text-field v-model="props.items.detalles"></v-text-field></td>

                          

                      </template>
             <template  v-slot:item.borrar="{ item }">
                 <v-icon
          small
          @click="eliminarPasajero(movimientos,item)"
        >
          delete
        </v-icon>
            </template>

               

            <template  v-slot:item.color="{ item }">
                 <td class="text-xs-center"><v-text-field clearable="clearable" v-model="item.color"></v-text-field></td>
            </template>
              <template  v-slot:item.color="{ item }">
                 <td class="text-xs-center">  <v-select
                    :items="colores"
                    v-model="item.color"
                    label="Colores"
                  ></v-select></td>
              </template>

            <template  v-slot:item.fecha="{ item }">
                 <td class="text-xs-center"> <input type="date" v-model="item.fecha"> </td>
            </template>
        
             <template  v-slot:item.tipoMovimiento="{ item }">
                 <td class="text-xs-center"><v-text-field clearable="clearable" v-model="item.tipoMovimiento"></v-text-field></td>
            </template>
            <template  v-slot:item.detalles="{ item }">
                 <td class="text-xs-center"><v-text-field clearable="clearable" v-model="item.detalles"></v-text-field></td>
            </template>
            
         

                 </v-data-table>
               </template>
            </v-flex>
             <v-flex xs12 sm2 md12 lg12 xl12>
            
             <v-btn class="ma-2" @click.native="guardar()" outlined color="indigo">Guardar</v-btn>
             <v-btn class="ma-2" @click.native="ocultarNuevo()" outlined color="red">Cancelar</v-btn>
               
              
             </v-flex>


        </v-layout>
    </v-container>

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
             dialog: false,
                  search: '',
                 monitoreo:[],
                headers: [
               { text: 'Actions', value: 'action', sortable: false},
               { text: 'Estado', value: 'estado', sortable:true},
               { text: 'Muelle', value: 'servicio.muelle', sortable:true},
               { text: 'Programa', value: 'servicio.programa', sortable:true},
             
            ],
            
            editedIndex: -1,
            _id:'',
            embarcacion:'',
            embarcaciones:[],
            fecha:'',
            colores:['cyan','green','pink','amber','orange'],
            color:'',
            servicios:[],
            servicio:'',
            agencias:[],
            nombre:'',
            agencia2:'',
            cabeceraDetalles:[
              { text: 'Borrar', value: 'borrar', sortable: false},
              { text: 'Color', value: 'color' },
              { text: 'Fecha y Hora', value: 'fecha' },
              { text: 'Tipo de Movimiento', value: 'tipoMovimiento' },
              { text: 'Detalles', value: 'detalles' },
           
            ],
            movimientos:[],
            verNuevo:0,
            usuario:'',
            tipoMovimiento:'',
            detalles:'',
            fecha:'',
            folio:'',
            estado:'',
            detalles:'',
            valida:0,
            fecha:null,
            validaMensaje:[],
            adModal:0,
            comprobanteModal:0,
            adAccion:0,
            adNombre:'',
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
            return this.editedIndex === -1 ? 'Nueva Solicitud' : 'Editar Solicitud'
    },
    },
    
  watch: {
    dialog (val) {
      val || this.close()
    },
  },
    created () {
    this.listar();
          this.selectServicios()
    },
   methods:{
 mostrarNuevo(){
            this.verNuevo =1;

          },
          ocultarNuevo(){
            this.verNuevo =0
            this.limpiar()
          },

          eliminarPasajero(arr,item){ 
            let i=arr.indexOf(item);
            if(i!= -1){
              arr.splice(i,1);
            }
          },

        

       


          validar(){
            this.valida=0;
            this.validaMensaje=[];
            if(!this.color){
              this.validaMensaje.push('La embarcación es obligatorio');
            }
            if(!this.tipoMovimiento){
              this.validaMensaje.push('La agencia es obligatoria');
            }
            if(!this.detalles){
              this.validaMensaje.push('El muelle es obligatoria');
            }
            
                   
            if(this.validaMensaje.length){
              this.valida=1;
            }
            return this.valida;
          },

          agregarDetalle(){
            this.movimientos.push(
              {
                color: '',
                fecha: '',
                tipoMovimiento: '',
                detalles:''
              }
            )
          },
          limpiar(){
            this._id=''
           
            this.usuario='',
            this.folio='',
            this.agencia='',
            this.fecha='',
            this.pasajeros=[],
            this.valida=0,
            this.validaMensaje=[],
            this.editedIndex=-1;
          },
          guardar(){
            let me=this;
            let header={"Token":this.$store.state.token};
            let configuracion= {headers: header}
           
           
              if(this.editedIndex >-1 ){
              
                axios.put('monitoreo/update',
                {   
                    '_id':this._id,
                    'servicio':this.servicio,
                    'movimientos':this.movimientos,                 
                   
               },configuracion)
               .then(function(response){
                    me.close();
                    me.ocultarNuevo();
                    me.listar();
                    me.limpiar();
               }).catch(function(error){
                 console.log(error)
               });
              }else{
                axios.post('monitoreo/add',
                {
                    'servicio':this.servicio,
                    'movimientos':this.movimientos,
                  
                    
               },configuracion)
               .then(function(response){
                me.close();
                    me.ocultarNuevo();
                    me.listar();
                     me.limpiar();
               }).catch(function(error){
                 console.log(error)
               });
              }
             
          },
          listar(){
            let header={"Token":this.$store.state.token};
            let configuracion= {headers: header}
            let me=this;
            axios.get('monitoreo/list',configuracion).then(function (response){
            me.monitoreo=response.data;
            }).catch(function(error){
              console.log(error)
            })
          },

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
        
          listarDetalles(id){
            let me=this;
            let header={"Token":this.$store.state.token};
            let configuracion= {headers: header}
            axios.get('monitoreo/query?_id='+id,configuracion).then(function (response){
            me.movimientos=response.data.movimientos;
            }).catch(function(error){
              console.log(error)
            })
          },

      
          verGuardia(item){
            this.limpiar();
            this.fecha = item.fecha
            this.folio = item.folio
            this.muelle = item.muelle
            this.detalles = item.detalles
            this.agencia = item.agencia._id
            this.embarcacion = item.embarcacion._id
            this.listarDetalles(item._id);
            this.verNuevo=1;
          },

          editItem (item) {
            this.limpiar();
            this.color = item.color
            this.fecha = item.fecha
            this.detalles = item.detalles
            this.listarDetalles(item._id);
            this.verNuevo=1;
            this._id=item._id;
            this.folio = item.folio
            this.detalles = item.detalles
            this.editedIndex=1;
            this.dialog = false
            this.verNuevo=1
          },

        activarDesactivarMostrar(accion,item){
          this.adModal=1;
          this.adNombre=item.nombre;
          this.adId=item._id;
          if(accion==1){
            this.adAccion=1
          }else if(accion==2){
            this.adAccion=2
          }else{
            this.adMmodal=0;
          }
        },
        activar(){
          let me=this;
           let header={"Token":this.$store.state.token};
           let configuracion= {headers: header}
           axios.put('usuario/activate',{'_id':this.adId},configuracion)
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
           axios.put('usuario/deactivate',{'_id':this.adId},configuracion)
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
