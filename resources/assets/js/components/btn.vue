<template lang='jade'>
  router-link(:to="to") 
    span
      slot
</template>

<script>
    export default {
      props: ['to'],
      mounted() {
          console.log('btn mounted.')
      }
    }
</script>
