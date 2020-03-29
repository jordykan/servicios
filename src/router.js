import Vue from 'vue';
import Router from 'vue-router';
import Index from './pages/Index.vue';
import Landing from './pages/Landing.vue';
import Login from './pages/Login.vue';
import Agencias from './pages/Agencias.vue';
import Embarcaciones from './pages/Embarcaciones.vue'
import ConfirmarServicio from './pages/ConfirmarServicio.vue'
import Companias from './pages/Companias.vue'
import Servicios from './pages/Servicios.vue'
import Seguimiento from './pages/SeguimientoServicio.vue'
import OnHire from './pages/Onhire.vue'
import Ofhire from './pages/Ofhire.vue'
import servicioTerrestre from './pages/ServicioTerrestre.vue'
import HojaServicio from './pages/HojaServicio.vue'
import Monitoreo from './pages/Monitoreo.vue'
import Profile from './pages/Profile.vue';
import MainNavbar from './layout/MainNavbar.vue';
import MainFooter from './layout/MainFooter.vue';
import store from './store'

Vue.use(Router);


  const routes = [
    {
      path: '/',
      name: 'index',
      components: { default: Index, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta:{
        libre:true
       }
    }, 
    {
      path: '/agencias',
      name: 'agencias',
      components: { default: Agencias, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta:{
        libre:true
       }
    }, 

    {
      path: '/companias',
      name: 'companias',
      components: { default: Companias, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta:{
        libre:true
       }
    }, 

    {
      path: '/embarcaciones',
      name: 'embarcaciones',
      components: { default: Embarcaciones, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta:{
        libre:true
       }
    }, 

    {
      path: '/confirmarServicio',
      name: 'confirmarServicio',
      components: { default: ConfirmarServicio, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta:{
        libre:true
       }
    }, 
    {
      path: '/servicios',
      name: 'servicios',
      components: { default: Servicios, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta:{
        libre:true
       }
    }, 

    {
      path: '/onhire',
      name: 'onhire',
      components: { default: OnHire, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta:{
        libre:true
       }
    }, 

    {
      path: '/ofhire',
      name: 'ofhire',
      components: { default: Ofhire, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta:{
        libre:true
       }
    }, 

    {
      path: '/servicioTerrestre',
      name: 'servicioTerrestre',
      components: { default: servicioTerrestre, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta:{
        libre:true
       }
    }, 
    {
      path: '/monitoreo',
      name: 'monitoreo',
      components: { default: Monitoreo, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta:{
        libre:true
       }
    }, 

    {
      path: '/hojaServicio',
      name: 'hojaServicio',
      components: { default: HojaServicio, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta:{
        libre:true
       }
    }, 

    {
      path: '/seguimientoServicio',
      name: 'seguimientoServicio',
      components: { default: Seguimiento, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta:{
        libre:true
       }
    }, 


    {
      path: '/landing',
      name: 'landing',
      components: { default: Landing, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta:{
        libre:true
       }
    },
    {
      path: '/login',
      name: 'login',
      components: { default: Login, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 }
      },
      meta:{
        libre:true
       }
    },
    {
      path: '/profile',
      name: 'profile',
      components: { default: Profile, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta:{
        libre:true
       }
    }
  ]

 const rut = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,

  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
  linkExactActiveClass: 'active'


})
rut.beforeEach((to,from,next)=>{
  if(to.matched.some(record=> record.meta.libre)){
    next();
  }else if(store.state.usuario && store.state.usuario.rol == 'administrador'){
    if(to.matched.some(record=> record.meta.administrador)){
      next()
    } 
  }else if(store.state.usuario && store.state.usuario.rol == 'comercial'){
    if(to.matched.some(record=> record.meta.comercial)){
      next()
    }   
  }else if(store.state.usuario && store.state.usuario.rol == 'logistico'){
    if(to.matched.some(record=> record.meta.logistico)){
      next()
    }
   
  } else if(store.state.usuario && store.state.usuario.rol == 'terrestre'){
    if(to.matched.some(record=> record.meta.terrestre)){
      next()
    }
  }else{
    next({name:''})
  }
})

  export default rut

 