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
          setTimeout(() => {
            // Redirect to another route after 3 seconds
            this.$router.push("/");
          }, 3000);
        } else {
          this.errors = errors[0];
          console.log(errors[0]);
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
  <div v-if="accountSignedIn == 1">
    <h2>
      Welcome {{ this.user.username }}! You have succesfully signed in!
      Redirecting you soon
    </h2>
  </div>
  <div v-else class="page">
    <form>
      <h3>Log In Here</h3>

      <input
        class="input-font"
        type="text"
        placeholder="Username"
        v-model="theUsername"
      />

      <input
        class="input-font"
        type="password"
        placeholder="Password"
        v-model="thePassword"
      />

      <button class="input-font" type="button" @click="signInCheck()">
        Log In
      </button>

      <p class="error-text" v-if="this.errors[0]">Error: {{ errors }}</p>

      <div class="social">
        <div class="go"><i class="fab fa-google"></i></div>
        <div class="fb"><i class="fab fa-facebook"></i></div>
      </div>
    </form>
  </div>
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
