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

<style scoped></style>
