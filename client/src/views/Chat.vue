<template>
  <div class="chat">
    <div class="user">
      <button @click="$router.push('/users')" class="btn-back">❮ Voltar</button>
      <span v-if="user">
        <span class="emoji">{{user.emoji}}</span>
        <span class="username">{{user.username}}</span>
      </span>
      <span v-else class="error-message">Este usuário não está mais online.</span>
    </div>
    <div class="messages" ref="messages">
      <div
        class="message"
        v-for="(msg, index) in messages"
        :key="index"
        :class="{'my-message': msg.isSend}"
      >{{msg.message}}</div>
    </div>
    <form class="sendbox" v-if="user" @submit.prevent="sendMessage()">
      <div class="input-area">
        <div class="sandbod-input">{{message.join("")}}</div>
        <button class="btn-backspace" type="button" @click="backspace">⟵</button>
      </div>
      <div class="emoji-list">
        <div
          class="emoji"
          v-for="emoji in emojis"
          :key="emoji"
          @click="message.push(emoji)"
        >{{emoji}}</div>
      </div>
      <button class="btn-send" type="submit">Enviar</button>
    </form>
  </div>
</template>

<script>
import socket from "../socket";
import emojis from "../utils/emojis";
export default {
  data: () => ({
    user: null,
    message: [],
    messages: [],
    emojis: emojis
  }),
  methods: {
    backspace() {
      if (this.message == null || this.message.length == 0) return;
      this.message.pop();
    },
    sendMessage() {
      if (this.message && this.message.length > 0) {
        socket.sendMessage(this.user.username, this.message.join(""));
        this.message = [];
      }
    }
  },
  beforeMount() {
    socket.init(localStorage.token);
    socket.addUsersObserver(users => {
      this.user = users.find(
        user => user.username == this.$route.params.username
      );
    });
    socket.addMessagesObserver((username, message, isSend) => {
        if(username == this.$route.params.username) {
            this.messages.push({message, isSend})
        }
    })
    this.messages = socket.getMessages(this.$route.params.username)
  },
  mounted () {
      this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
  },
  updated () {
      this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
  }
};
</script>

<style lang="sass">
.chat 
    position: relative
    max-height: 600px
    display: flex
    flex-direction: column
    justify-content: space-between
    .user 
        text-align: center
        margin: 0 
        background-color: #ddd
        padding: 10px
        .emoji
            line-height: 35px
            font-weight: bold
            font-size: 24px
            margin-right: 10px
        .username
            font-weight: bold
            line-height: 35px
            color: #666
        .btn-back
            position: absolute
            cursor: pointer
            left: 10px
            top: 5px
            background-color: #150A75
            color: #fff
            border: none
            border-radius: 3px
            padding: 5px
            margin: 5px
        .error-message
            line-height: 35px
            color: red
            font-weight: bold
            text-align: center
    .messages
        overflow: hidden
        overflow-y: scroll
        height: 325px
        .message
            margin: 10px 5px
            padding: 5px 10px
            width: 80%
            border-radius: 25px
            background-color: #9999ff
            border-top-left-radius: 0
            &.my-message
                margin-left: calc(20% - 10px)
                background-color: #99ffff
                border-top-left-radius: 25px
                border-top-right-radius: 0
            &::last-child
                margin-bottom: 10px
    .sendbox
        .input-area
            border: 1px solid #999
            padding: 5px 
            display: flex
            background-color: #f2fff2
            justify-content: space-between
            .sendbox-input
                height: 30px
                border: none
                background: none
                padding: 2px
                width: 90%
            .btn-backspace
                cursor:pointer
                background-color: #150A75
                color: #fff
                border: none
                border-radius: 3px
                padding: 5px
                width: 10%
        .btn-send
            cursos: pointer
            background-color: #150A75
            color: #fff
            border: none
            padding: 15px
            width: 100%
</style>