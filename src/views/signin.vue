<script>
import { signIn } from "../activity-finder-client.js";

export default {
  data() {
    return {
      account: [],
      errors: [],
      theUsername: "",
      thePassword: "",
      accountSignedIn: 0,
    };
  },
  props: {
    user: {
      isSignedIn: false,
      username: "",
      userId: 0,
    },
  },
  methods: {
    signInCheck() {
      const username = this.theUsername;
      const password = this.thePassword;
      signIn(username, password, (errors, account) => {
        if (errors.length == 0) {
          this.account = account;
          this.accountSignedIn = 1;
          this.user.isSignedIn = true;
          this.user.username = this.theUsername;
          this.user.userId = account.id;
        } else {
          this.errors = errors;
          // errors = ["errorCode1", "errorCode2", ...]
          // Possible errors codes:
          //  - "networkError": Couldn't connect to the backend.
          //  - "backendError": The backend couldn't execute the request for some reason.
          //  - "wrongCredentials": The username of password is incorrect.
        }
      });
    },
  },
};
</script>

<template>
  <div class="page">
    <div v-if="accountSignedIn == 1">
      <h2>You have succesfully signed in!</h2>
    </div>
    <div v-else>
      <h1>Sign-In</h1>
      <h2>Username</h2>
      <input type="text" v-model="theUsername" />
      <h2>Password</h2>
      <input type="password" v-model="thePassword" />
      <br />
      <br />
      <button @click="signInCheck()">Sign-In</button>
      <h2>{{ errors }}</h2>
    </div>
  </div>
</template>

<style scoped>
.page {
  background-color: rgb(0, 91, 0);
  text-align: center;
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

button {
  font-size: 20px;
}
</style>
