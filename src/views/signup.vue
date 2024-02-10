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
          this.errors = errors[0];

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
  <div v-if="this.confirm == 1" class="page">
    <h1>Account succesfully created!</h1>
  </div>
  <div v-else class="page">
    <form>
      <h3>Create an account</h3>

      <input
        class="input-font"
        type="text"
        placeholder="Username"
        v-model="newUsername"
      />

      <input
        class="input-font"
        type="password"
        placeholder="Password"
        v-model="newPassword"
      />

      <button class="input-font" type="button" @click="transferInfo()">
        Register
      </button>

      <p class="error-text" v-if="this.errors[0]">Error: {{ errors }}</p>

      <div class="social">
        <div class="go"><i class="fab fa-google"></i></div>
        <div class="fb"><i class="fab fa-facebook"></i></div>
      </div>
    </form>
  </div>

  <!--
    <h1>Create an account</h1>
    <h2>Username</h2>
    <input v-model="newUsername" />

    <h2>Password</h2>
    <input v-model="newPassword" />
    <br />
    <br />
    <button @click="transferInfo()">Create Account!</button>
    <h2 v-if="this.errors[0]">{{ errors }}</h2>
  -->
</template>

<style scoped>
.input-font {
  font-family: "Lato", sans-serif;
}
.error-text {
  padding: 10px 0px 0px 0px;
}
*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

form {
  height: 520px;
  width: 400px;
  background-color: #2c3e50;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 50px 35px;
}
form * {
  letter-spacing: 0.5px;
  outline: none;
  border: none;
}
form h3 {
  font-size: 32px;
  line-height: 42px;
  text-align: center;
}

label {
  display: block;
  margin-top: 30px;
  font-size: 16px;
}
input {
  display: block;
  height: 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
}
::placeholder {
  color: #ecf0f1;
}
button {
  margin-top: 30px;
  width: 100%;
  background-color: #3498db;
  padding: 15px 0;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
}
.social {
  margin-top: 30px;
  display: flex;
}
.social div {
  width: 150px;
  border-radius: 3px;
  padding: 5px 10px 10px 5px;
  background-color: #3498db;
  text-align: center;
}
.social div:hover {
  background-color: #2ecc71;
}
/* button:hover {
  background-color: #2ecc71;
} */

.social .fb {
  margin-left: 25px;
}
.social i {
  margin-right: 4px;
}
</style>
