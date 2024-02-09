<script>
import { signOut } from "../activity-finder-client.js";

export default {
  data() {},
  props: {
    user: {
      isSignedIn: false,
      username: "",
      userId: 0,
    },
  },
  mounted() {
    signOut(() => {
      this.user.isSignedIn = false;
      this.user.username = "";
      this.user.userId = 0;
    });
  },
};
</script>

<template>
  <div class="page">
    <h1>You have successfully signed out</h1>
    <h1>See you again {{ this.user.username }}</h1>
  </div>
</template>

<style scoped>
.page {
  background-color: rgb(0, 91, 0);
}

ul {
  list-style-type: none;
  text-align: center;
  font-size: 25px;
}

h1 {
  text-align: center;
}

p {
  text-align: center;
}
</style>
