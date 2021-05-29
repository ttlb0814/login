<template>
    <div>
        <h1>404</h1>
        <Button @click="_toNext"></Button>


    </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {

      }
    },
    methods: {
      _toNext: function () {
        this.$router.push('/4004')
      }
    }
  }
</script>

<style scoped>

</style>
