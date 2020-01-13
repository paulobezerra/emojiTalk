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
          <p class="label-emoji">Selecione seu Emoji: {{form.emoji}}</p>
          <div class="emoji-list" :class="{'error':rules.emoji}">
            <span
              class="emoji"
              :class="{'selected': emoji == form.emoji}"
              v-for="emoji in emojis"
              :key="emoji"
              @click="form.emoji = emoji"
            >{{emoji}}</span>
          </div>
          <span class="error-message" v-show="rules.emoji">{{rules.emoji}}</span>
        </div>

        <div class="field-area">
          <button type="submit">Cadastrar</button>
        </div>
      </form>
      <p class="link-cadastro">
        <router-link to="/login">Já tenho cadastro.</router-link>
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
    emojis: [
      "😃",
      "😂",
      "😍",
      "😘",
      "😝",
      "😭",
      "😊",
      "😔",
      "😚",
      "😤",
      "😨",
      "🙈",
      "🙉",
      "🙊",
      "🙏",
      "👊",
      "👏",
      "👱",
      "👸",
      "💊"
    ],
    errorMessage: null,
    form: {
      username: null,
      password: null,
      emoji: null
    },
    rules: {
      username: null,
      password: null,
      emoji: null
    }
  }),
  methods: {
    validate() {
      this.rules = {
        username: !this.form.username
          ? "Nome do usuário deve ser informado."
          : false,
        password: !this.form.password ? "Senha deve ser informada." : false,
        emoji: !this.form.emoji ? "Um emoji deve ser selecionado." : false
      };
      return !this.rules.username && !this.rules.password && !this.rules.emoji;
    },
    async onSubmit() {
      try {
        if (!this.validate()) return;
        await apiPublic.post("/users", this.form);
        this.$router.push("/login");
      } catch (error) {
        console.error(error);
        this.errorMessage =
          "Não foi possível concluir o cadastro, você tem certeza que ainda não é cadastrado?";
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