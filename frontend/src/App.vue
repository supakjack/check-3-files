<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>
<script>
import Navbar from '@/components/Navbar'
export default {
  components: {
    Navbar
  }
}
</script>
<style>
@import url('./assets/fonts.css');
#app {
  font-family: 'Sarabun', sans-serif;
}
</style>
