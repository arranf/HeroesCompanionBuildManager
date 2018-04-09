<template>
  <div>
     <b-form-input v-model="keyValue" type="text" placeholder="Secret Key"></b-form-input>
     <b-button @click.prevent="setKey">Update</b-button>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        keyValue: ''
      }
    },
    methods: {
      setKey () {
        this.$http.defaults.headers.common['Authorization'] = this.keyValue
        return this.$key.setKey(this.keyValue)
      }
    },
    created () {
      this.$key.getKey().then(val => {
        this.keyValue = val
      })
    }
  }
</script>