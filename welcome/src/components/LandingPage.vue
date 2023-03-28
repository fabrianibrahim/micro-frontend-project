<template>
  <div>
    <h1>Welcome to the landing page!</h1>
    <router-link to="/signin">Sign In</router-link>
  </div>
</template>
  
<script>
import { getEventNames } from '../bootstrap';
export default {
  name: 'LandingPage',
  mounted() {
    function logMouseClick(event) {
      console.log(`x: ${event.clientX} y: ${event.clientY}`)
    }
    window.document.addEventListener("click", logMouseClick);

    const micrFrontendWillUnmountEvent = getEventNames().MICRO_FRONTEND_WILL_UNMOUNT;
    function removeMouseClickListener() {
      window.document.removeEventListener("click", logMouseClick);
      window.document.removeEventListener(micrFrontendWillUnmountEvent, removeMouseClickListener);
    }
    window.document.addEventListener(micrFrontendWillUnmountEvent, removeMouseClickListener);
  },
};
</script>
  
<style>
/* Add any CSS styles for the component here */
</style>
  