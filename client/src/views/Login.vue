<template>
  <div class="home">
    <img alt="Emoji Talk" src="../assets/logo.png" class="logo" />
    <div id="formLogin">
      <form @submit.prevent="onSubmit">
        <div class="errorMessage" v-if="errorMessage">{{errorMessage}}</div>
        <div class="field-area">
          <label for="input-username">Nome do usuário:</label>
          <input
            type="text"
            :class="{'error':rules.username}"
            id="input-username"
            v-model="form.username"
            placeholder="Seu nome de usuario..."
          />
          <span class="error-message" v-show="rules.username">{{rules.username}}</span>
        </div>
        <div class="field-area">
          <label for="input-password">Senha:</label>
          <input
            type="password"
            :class="{'error':rules.password}"
            id="input-password"
            v-model="form.password"
            placeholder="Sua senha..."
          />
          <span class="error-message" v-show="rules.password">{{rules.password}}</span>
        </div>

        <div class="field-area">
          <button type="submit">Entrar</button>
        </div>
      </form>
      <p class="link-cadastro">
        <router-link to="/">Ainda não tenho cadastro.</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { apiPublic } from "../services/api";
export default {
  name: "home",
  components: {},
  data: () => ({
   
    errorMessage: null,
    form: {
      username: null,
      password: null
    },
    rules: {
      username: null,
      password: null
    }
  }),
  methods: {
    validate() {
      this.rules = {
        username: !this.form.username
          ? "Nome do usuário deve ser informado."
          : false,
        password: !this.form.password ? "Senha deve ser informada." : false
      };
      return !this.rules.username && !this.rules.password
    },
    async onSubmit() {
      try {
        if (!this.validate()) return;
        const response = await apiPublic.post("/users/authenticate", this.form);
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', response.data.username)
        localStorage.setItem('emoji', response.data.emoji)
        this.$router.push("/users");
      } catch (error) {
        console.error(error);
        this.errorMessage =
          "Não foi possível concluir a autenticação, você tem certeza que já é cadastrado?";
      }
    }
  }
};
</script>


<style lang="sass">
.logo
  width: 60%
  margin: 10px 20%
.emoji-list
  border: 1px solid #999
  border-radius: 3px
  font-size: 20px
  line-height: 35px
  display: grid
  grid-template-columns: 10% 10% 10% 10% 10% 10% 10%
  justify-content: space-between
  padding: 5px
  &.error
    border: 1px solid red
  .label-emoji
    color: #999
    padding-bottom: 5px
  .emoji
    text-align: center
    width: 40px
    height: 40px
    padding: 2px
    cursor: pointer
    &.selected
      border: 2px solid cyan
      border-radius: 50%
      background-color: cyan
.link-cadastro
  text-align: center
  a
    display: block
    text-decoration: none
    padding: 10px
</style>