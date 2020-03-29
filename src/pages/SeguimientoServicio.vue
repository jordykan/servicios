<template>
  <div class="page-header-seguimiento clear-filter" >
      
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
               :items="confirmarServicio"
               :search="search"
                class="elevation-1"
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
                <v-toolbar flat color="indigo lighten-4">
                    <v-toolbar-title>Servicios</v-toolbar-title>
                    <v-divider
                    class="mx-4"
                    inset
                    vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Busqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                 
               
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

              <v-dialog v-model="comprobanteModal" max-width="1000px">
            <v-card id="formato"> 
              <v-card-title class="headline">
                  <v-btn @click="crearPDF()"><v-icon>print </v-icon> </v-btn> Seguimiento de Servicio
              </v-card-title>
              <v-card-text >
                   <div  id="solicitud"> <br><br>
                                  <header>
                            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                          <div id="logo">
                              <img src="data:image/png;base64,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" id="imagen">
                          </div>
                        
                          <div id="datos">
                              <p id="encabezado">
                                
                                  <strong>Seguimiento de Servicio</strong><br>
                                  

                              </p>
                          </div>
                          <br>
                          <div >

                          </div>  
                          <br>
                          <div id="fact">           
                            Carmen, Campeche. a:{{fecha}}<br>
                            Folio: <strong>{{id}}</strong><br><br>
                          </div>
                  </header>
                  
             
                    <div class="row">
                        <div class="col-md-6">
                          <table class="table table-sm">
                            <thead class="thead-dark">
                              <tr>
                                <th colspan="5">Datos de la Agencia</th>
                              
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                              
                                <td>Agencia</td>
                                <td><strong>{{agencia.agencia}}</strong></td>  
                              
                              </tr>
                              <tr>
                                <td>Representante</td>
                                <td><strong>{{agencia.representante}}</strong></td>
                              </tr>
                              <tr> 
                                <td>RFC</td>
                                <td><strong>{{agencia.rfc}}</strong></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                           <div class="col-md-6">
                        <table class="table table-sm">
                            <thead class="thead-dark">
                              <tr>
                                <th colspan="6">Caracteristias de la Embarcación</th>         
                              </tr>
                            </thead>
                            <tbody>
                              <tr>  
                                <td>Embarcacion</td>
                                 <td><strong>{{embarcacion.nombre}}</strong></td>  
                              </tr>
                              <tr>
                                <td>Tipo</td>
                                <td><strong>{{embarcacion.tipo}}</strong></td>  
                              </tr>
                              <tr>
                                <td>Calado</td>
                                <td><strong>{{embarcacion.calado}}</strong></td>  
                              </tr>
                          
                            </tbody>
                          </table>
                         
                      </div>
                    </div>

                   
                   
                  
                        <div class="row">
                      <div class="col-md-12">
                        <table class="table table-sm">
                            <thead class="thead-dark">
                              <tr>
                                <th colspan="6">Caracteristias del Servicio</th>         
                              </tr>
                            </thead>
                            <tbody>
                              <tr>  
                                <td>Muelle</td>
                                <td><strong>{{muelle}}</strong></td>  
                              </tr>
                            
                              <tr>
                                <td>Solicitante</td>
                                <td><strong>{{usuario.nombre}}</strong></td>  
                              </tr>
                               <tr>
                                <td>Programa</td>
                                <td><strong>{{programa}}</strong></td>  
                              </tr>
                               <tr>
                                <td>Detalles</td>
                                <td><strong>{{detalles}}</strong></td>  
                              </tr>
                               <tr>
                                <td>Tipo de Servicio</td>
                                <td><strong>{{tipo_servicio}}</strong></td>  
                              </tr>
                            

                            </tbody>
                          </table>
                         
                      </div>
                     </div>

                       <div class="row" v-if="tipo_servicio=='Terrestre'">
                      <div class="col-md-12">
                        <table class="table table-sm">
                            <thead class="thead-dark">
                              <tr>
                                <th colspan="6">Hoja de Servicio</th>         
                              </tr>
                            </thead>
                            <tbody>
                              <tr>  
                                <td>Servicio</td>
                                <td><strong>{{hojaServicio.tipoServicio}}</strong></td>  
                              </tr>
                            
                              <tr>
                                <td>Solicitante</td>
                                <td><strong>{{usuario.nombre}}</strong></td>  
                              </tr>
                               <tr>
                                <td>Programa</td>
                                <td><strong>{{programa}}</strong></td>  
                              </tr>
                               <tr>
                                <td>Detalles</td>
                                <td><strong>{{detalles}}</strong></td>  
                              </tr>
                               <tr>
                                <td>Tipo de Servicio</td>
                                <td><strong>{{tipo_servicio}}</strong></td>  
                              </tr>
                            

                            </tbody>
                          </table>
                         
                      </div>
                     </div>

                     


                    <div class="row" v-if="tipo_servicio=='Cabotaje'">
                      <div class="col-md-6">
                        <table class="table table-sm" v-if="usuarios_log.nombre" >
                            <thead class="thead-dark">
                              <tr>
                                <th colspan="6">ON-HIRE</th>         
                              </tr>
                            </thead>
                            <tbody>
                              <tr>  
                                <td>Logistico</td>
                                <td><strong>{{usuarios_log.nombre}}</strong></td>  
                              </tr>
                            
                              <tr>
                                <td>Diesel</td>
                                <td><strong>{{onhires.diesel}}</strong></td>  
                              </tr>
                               <tr>
                                <td>Aceite Lubricante</td>
                                <td><strong>{{onhires.aceiteLubricante}}</strong></td>  
                              </tr>
                               <tr v-if="onhires.aceiteLubricante2">
                                <td>Aceite Lubricante 2</td>
                                <td><strong>{{onhires.aceiteLubricante2}}</strong></td>  
                              </tr>
                               <tr>
                                <td>Aceite Hidraulico</td>
                                <td><strong>{{onhires.aceiteHidraulico}}</strong></td>  
                              </tr>
                              <tr v-if="onhires.aceiteEngranes">
                                <td>Aceite de Engranes</td>
                                <td><strong>{{onhires.aceiteEngranes}}</strong></td>  
                              </tr>
                               <tr>
                                <td>Agua Potable</td>
                                <td><strong>{{onhires.aguaPotable}}</strong></td>  
                              </tr>
                                
                                 
                            </tbody>
                          </table>
                         
                      </div>
                        <div class="col-md-6">
                        <table class="table table-sm" v-if="usuarios_log_of.nombre">
                            <thead class="thead-dark">
                              <tr>
                                <th colspan="6">OFF-HIRE</th>         
                              </tr>
                            </thead>
                            <tbody>
                              <tr>  
                                <td>Logistico</td>
                                <td><strong>{{usuarios_log_of.nombre}}</strong></td>  
                              </tr>
                            
                              <tr>
                                <td>Diesel</td>
                                <td><strong>{{ofhires.diesel}}</strong></td>  
                              </tr>
                               <tr>
                                <td>Aceite Lubricante</td>
                                <td><strong>{{ofhires.aceiteLubricante}}</strong></td>  
                              </tr>
                               <tr>
                                <td>Aceite Lubricante 2</td>
                                <td><strong>{{ofhires.aceiteLubricante2}}</strong></td>  
                              </tr>
                               <tr>
                                <td>Aceite Hidraulico</td>
                                <td><strong>{{ofhires.aceiteHidraulico}}</strong></td>  
                              </tr>
                              <tr>
                                <td>Aceite de Engranes</td>
                                <td><strong>{{ofhires.aceiteEngranes}}</strong></td>  
                              </tr>
                               <tr>
                                <td>Agua Potable</td>
                                <td><strong>{{ofhires.aguaPotable}}</strong></td>  
                              </tr>
                              
                                 
                            </tbody>
                          </table>
                         
                      </div>
                     
                     </div>
                        <div class="row">
                      <div class="col-md-6">
                        <table class="table table-sm" v-if="usuarios_log.nombre">
                            <thead class="thead-dark">
                              <tr>
                                <th colspan="12">Soportes de On-Hire y Off-Hire</th>         
                              </tr>
                            </thead>
                            <tbody>
                              <tr>  
                               <td>On-Hire</td>
                               <td><a v-bind:href="url_cotizacion">Soporte Firmado</a></td>  
                               
                              </tr>
                            
                              <tr>
                                <td>Of-Hire</td>
                                <td><a v-bind:href="url_soporte">Soporte Firmado</a></td>  
                              </tr>   
                            </tbody>
                          </table>
                      </div>

                        <div class="col-md-6">
                        <table class="table table-sm">
                            <thead class="thead-dark">
                              <tr>
                                <th colspan="12">Soportes del Servicio</th>         
                              </tr>
                            </thead>
                            <tbody>
                              <tr>  
                               <td>Cotizacion</td>
                               <td><a v-bind:href="onhires.soporteUrl">Soporte</a></td>  
                               
                              </tr>
                            
                              <tr>
                                <td>Soporte</td>
                                <td><a v-bind:href="ofhires.soporteUrl">Soporte</a></td>  
                              </tr>
                          
                                
                                 
                            </tbody>
                          </table>
                         
                      </div>
                        </div>

                          <div class="row">
      
                      <div class="col-md-6">
                        <table class="table table-sm" v-if="usuarios_log.nombre">
                            <thead class="thead-dark">
                              <tr>
                                <th colspan="12">Soportes Administrativos</th>         
                              </tr>
                            </thead>
                            <tbody>
                              <tr>  
                               <td>Estimacion</td>
                               <td><a v-bind:href="url_cotizacion">Soporte Firmado</a></td>  
                               
                              </tr>
                            
                              <tr>
                                <td>Factura</td>
                                <td><a v-bind:href="url_soporte">Soporte Firmado</a></td>  
                              </tr>
                          
                                
                                 
                            </tbody>
                          </table>
                         
                      </div>
     </div>

                  <template v-if="tipo_servicio=='Cabotaje'">
                       <div class="row" >
                         <div class="col-md-4">
                           
                         </div>
                           <div class="col-md-2">
                           <div class="badge badge-primary text-wrap" style="width: 9rem;">
                            {{embarcacion.nombre}}
                            </div>
                         </div>
                          <div class="col-md-4">
                            <div class="badge badge-success text-wrap" style="width: 9rem;">
                            {{programa}}
                            </div>
                         </div>
                       </div> 
                 
  <v-timeline 
   
  >
   
    <v-timeline-item
     
      v-for="(movimiento, i) in movimientos"
      :key="i"
    
      :color="movimiento.color"
      :right="true"
      small
    
    >
      <template v-slot:opposite>
        <span
          :class="`headline font-weight-bold ${movimiento.color}--text`"
          v-text="movimiento.fecha"
         
        ></span>
      </template>
      <div class="py-4">
        <h2 :class="`headline font-weight-light mb-4 ${movimiento.color}--text`">{{movimiento.tipoMovimiento}}</h2>
        <div>
          {{movimiento.detalles}}
        </div>
      </div>
    </v-timeline-item>
  </v-timeline>
  
   
 
</template>


                  </div>
                  
              </v-card-text>
              <v-card-actions>
                <v-btn @click="ocultarComprobante()" small>Cancelar</v-btn>
              </v-card-actions>
            </v-card>

          </v-dialog>

                </v-toolbar>
                </template>
                <template v-slot:item.action="{ item }">
            
                   <v-icon
                       
                        class="mr-2"
                        @click="mostrarComprobante(item)"
                        >
                        print
                    </v-icon>
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
            usuarios:[],
            usuarios_log:[],
            usuarios_log_of:[],
            onhires:[],
            confirmarServicio:[],
            tipoServicios:['Terrestre','Cabotaje'],
            headers: [
                { text: 'Detalles', value: 'action', sortable: false },
                { text: 'Compañia', value: 'cia.cia' },
                { text: 'Embarcacion', value: 'embarcacion.nombre' },
                { text: 'Agencia', value: 'agencia.agencia' },
                { text: 'Tipo Servicio', value: 'tipo_servicio' },
                { text: 'Estado', value: 'estado' },
            ],
          
            editedIndex: -1,
            id:'',
            ofhires:[],
            cia:'',
            movimientos:[],
            hojaServicio:[],
            usuario_log:'',
            embarcacion:'',
            muelle:'',
            url_soporte:'',
            onhire:'',
            tipo_servicio:'',
            usuario:'',
            diesel:'',
            url_cotizacion:'',
            programa:'',
            detalles:'',
            tipoServicio:'',
            fecha:'',
            agencia:'',
            urlSoporte:'',
            nombre:'',
            urlCotizacion:'',
            adAccion:0,
            adNombre:'',
            adModal:'',
            adId:'',
            comprobanteModal:0
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

      listarOnhire(idServicio){
          let header={"Token":this.$store.state.token};
          let configuracion= {headers: header}
          let me=this
          axios.get('onhire/query?servicio='+idServicio,configuracion).then(function (response){
              me.onhires=response.data
              me.usuarios_log=me.onhires.usuario
          }).catch(function(error){
              console.log(error)
          })
      },

        listarHojaServicio(idServicio){
          let header={"Token":this.$store.state.token};
          let configuracion= {headers: header}
          let me=this
          axios.get('hojaServicio/query?servicio='+idServicio,configuracion).then(function (response){
              me.hojaServicio=response.data
          }).catch(function(error){
              console.log(error)
          })
      },

        listarOfhire(idServicio){
          let header={"Token":this.$store.state.token};
          let configuracion= {headers: header}
          let me=this
          axios.get('ofhire/query?servicio='+idServicio,configuracion).then(function (response){
              me.ofhires=response.data
              me.usuarios_log_of=me.ofhires.usuario
          }).catch(function(error){
              console.log(error)
          })
      },


       listarUsuarios(){
          let header={"Token":this.$store.state.token};
          let configuracion= {headers: header}
          let me=this
          axios.get('usuario/query?_id='+this.onhires.usuario,configuracion).then(function (response){
              me.usuarios=response.data
          }).catch(function(error){
              console.log(error)
          })
      },

        listarDetalles(id){
            let me=this;
            let header={"Token":this.$store.state.token};
            let configuracion= {headers: header}
            axios.get('monitoreo/queryDetalles?servicio='+id,configuracion).then(function (response){
            me.movimientos=response.data.movimientos;
            
            
            }).catch(function(error){
              console.log(error)
            })
          },

      limpiar(){
          this._id='';
          this.nombre='',
          this.tipo='',
          this.armador='',
          this.onhires=[],
          this.ofhires=[],
          this.usuarios_log=[],
          this.usuarios_log_of=[],
          this.eslora='',
          this.manga='',
          this.tbr='',
          this.trb='',
          this.calado=''
          this.editedIndex=-1
      },
     
    initialize () {
     
    },

      crearPDF(){
            var quotes = document.getElementById('servicio')
             html2canvas(quotes).then(function (canvas) {
                    var imgData = canvas.toDataURL('image/png');
                    var imgWidth = 210;
                    var pageHeight = 295;

                    var imgHeight = canvas.height * imgWidth / canvas.width;
                    var heightLeft = imgHeight;
                    
                    var doc = new jsPDF('p', 'mm', 'a4');
                    var position = 0;

                    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;

                    while (heightLeft >= 0) {
                        position = heightLeft - imgHeight;
                        doc.addPage();
                        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                        heightLeft -= pageHeight;
                    }
                    doc.save('solicitudUA.pdf');
            })
          },

            mostrarComprobante(item){
          
            var options = { year: 'numeric', month: 'long', day: 'numeric' };
            var fec = new Date();   
            this.fecha = fec.toLocaleString(); 
            this.agencia = item.agencia
            this.embarcacion = item.embarcacion
            this.programa = item.programa
            this.url_soporte = item.url_soporte
            
            this.url_cotizacion = item.url_cotizacion
            this.detalles = item.detalles
            this.nombre = this.onhires.nombre
            this.tipo_servicio=item.tipo_servicio
            this.onhire=item.onhire
            this.diesel = this.onhires.diesel
            this.muelle=item.muelle
            this.usuario=item.usuario
            this.id= item._id
            this.listarOnhire(item._id)
            this.listarOfhire(item._id)
            this.listarDetalles(item._id)
            this.listarHojaServicio(item._id)
            this.limpiar();
            this.comprobanteModal=1          
          },
           ocultarComprobante(item){
            this.comprobanteModal=0
          },


   

    
    editItem (item) {
        this._id=item._id
        this.cia=item.cia._id
        this.embarcacion=item.embarcacion._id
        this.agencia=item.agencia._id
        this.onhire=item.onhire
        this.programa=item.programa
        this.detalles=item.detalles
        this.tipoServicio=item.tipo_servicio
        this.urlSoporte=item.url_soporte
        this.urlCotizacion=item.url_cotizacion
        this.editedIndex=1;
        this.dialog=true
    },

   activarDesactivarMostrar(accion,item){
          cxzthis.adModal=1;
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
