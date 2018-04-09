<template>
  <div>
    <b-alert show> Create</b-alert>
  </div>
</template>

<script>
  export default {
    name: 'home',
    components: { },
    data () {
      return {
        name: 'Arran'
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>