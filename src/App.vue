<template>
  <div id="app">
    <Navbar />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Nav.vue'; // Navbar komponenti
import Footer from './components/Footer.vue'; // Footer komponenti

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  }
};
</script>

<style>
/* Global stil */
</style>
