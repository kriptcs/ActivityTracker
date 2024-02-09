<script>
import { createAccount } from "../activity-finder-client.js";

export default {
  data() {
    return {
      id: 0,
      errors: [],
      confirm: 0,
      newUsername: "",
      newPassword: "",
    };
  },
  methods: {
    transferInfo() {
      const account = {
        username: this.newUsername,
        password: this.newPassword,
      };

      createAccount(account, (errors, id) => {
        if (errors.length == 0) {
          this.id = id;
          this.confirm = 1;
        } else {
          this.errors = errors;

          // Possible errors codes:
          //  - "networkError": Couldn't connect to the backend.
          //  - "backendError": The backend couldn't execute the request for some reason.
          //  - "invalidAccount": The account object is wrong.
          //  - "usernameTooShort": The username is too short.
          //  - "usernameTooLong": The username is too long.
          //  - "passwordTooShort": The password is too short.
          //  - "usernameTaken": The username is already used by another account.
        }
      });
    },
  },
};
</script>

<template>
  <div class="page">
    <div v-if="this.confirm == 1">
      <h1>Account succesfully created!</h1>
    </div>
    <div v-else>
      <h1>Create an account</h1>
      <h2>Username</h2>
      <input v-model="newUsername" />

      <h2>Password</h2>
      <input v-model="newPassword" />
      <br />
      <br />
      <button @click="transferInfo()">Create Account!</button>
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
</style>
