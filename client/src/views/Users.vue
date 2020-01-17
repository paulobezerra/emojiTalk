<template>
  <div class="users">
    <div class="user" v-for="user in users" :key="user.username" @click="goToChat(user)">
      <h3>{{user.emoji}}</h3>
      <h5>{{user.username}}
        <span class="count-messages" v-if="user.countMessages">{{user.countMessages}}</span>
      </h5>
    </div>
  </div>
</template>

<script>
import socket from "../socket";
export default {
  data: () => ({
    users: null
  }),
  methods: {
    goToChat(user) {
      this.$router.push("/chat/" + user.username);
    }
  },
  async mounted() {
    socket.init(localStorage.token);
    socket.addUsersObserver(users => {
      this.users = users;
    });
    socket.addMessagesObserver((username) => {
        const user = this.users.find(user => user.username == username)
        if (!user) return
        if (!user.countMessages) user.countMessages = 0
        user.countMessages++
        this.$forceUpdate()
    })
  }
};
</script>

<style lang="sass">
.users 
    position: relative
    height: 600px
    display: flex
    flex-direction: column
    .user 
        cursos: pointer
        display: flex
        justify-content: end
        margin: 5px 10px
        background-color: #ddd
        border-radius: 4px
        padding: 5px
        h3
            line-height: 35px
            font-size: 25px
            margin-right: 10px
        h5
            line-height: 35px
            color: #666
            flex-grow: 2
            .count-messages
              display: block
              height: 15px
              width: 15px
              font-size: 10px
              line-height: 15px
              background-color: red
              border-radius: 50%
              text-align: center
              margin-top: 10px
              color: #fff
              float: right
</style>