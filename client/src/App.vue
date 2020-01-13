<template>
  <div id="app">
    <div class="container">
      <div class="header">
        <button class="btn-logout" v-if="authenticated()" @click="logout">Sair</button>
        <h1>Emoji Talk</h1>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/')
    },
    authenticated() {
      return !!localStorage.token
    }
  },
}

</script>

<style lang="sass">
* 
  margin: 0
  padding: 0
  box-sizing: border-box

body
  background-color: #cde

#app 
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialised
  -moz-osx-font-smoothing: grayscale

.errorMessage
  background-color: #fdd
  padding: 10px
  border-radius: 3px
  color: red
  font-size: 13px
  margin: 10px

.container
  background-color: #fff
  max-width: 400px
  margin: 0 auto 10px
  min-height: 600px
  border-radius: 5px
  .header
    position: relative
    height: 40px
    background-color: #635AAA
    border-top-left-radius: 5px
    border-top-right-radius: 5px
    h1 
      font-size: 18px
      line-height: 20px
      padding-top: 10px
      color: #eee
      text-align: center
    .btn-logout
      cursor: pointer
      position: absolute
      right: 10px
      top: 5px
      background-color: #150A75
      color: #fff
      border: 0
      border-radius: 3px
      padding: 5px
      margin: 5px

.field-area 
  padding: 5px 10px
  label
    display: none
  input
    display: block
    width: 100%
    border: 1px solid #999
    padding: 10px
    border-radius: 3px
    &.error
      border: 1px solid red 
  .error-message
    font-size: 11px;
    color: red;
  button
    cursor: pointer
    background-color: #66f
    border: none
    border-radius: 3px
    padding: 15px
    width: 100%
    color: #eee
    font-size: 18px
</style>
