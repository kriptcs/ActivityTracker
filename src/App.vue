<script>
import Footer from "./components/Footer.vue";

export default {
  components: {
    Footer,
  },
  data() {
    return {
      user: {
        isSignedIn: false,
        username: "",
        userId: 0,
      },
    };
  },
};
</script>

<template>
  <nav>
    <RouterLink
      style="text-decoration: none; color: inherit; padding-right: 20px"
      to="/"
    >
      Home
    </RouterLink>
    <RouterLink
      style="text-decoration: none; color: inherit; padding-right: 20px"
      to="/viewAllAccs"
    >
      Account Display
    </RouterLink>

    <RouterLink
      style="text-decoration: none; color: inherit; padding-left: 20px"
      to="/signup"
    >
      Sign-up
    </RouterLink>

    <RouterLink
      style="text-decoration: none; color: inherit; padding-left: 20px"
      to="/signin"
    >
      Sign-in
    </RouterLink>
    <RouterLink
      style="text-decoration: none; color: inherit; padding-left: 20px"
      to="/signout"
    >
      Sign-out
    </RouterLink>
  </nav>
  <nav>
    <RouterLink
      style="text-decoration: none; color: inherit; padding-left: 20px"
      to="/createActivity"
    >
      Create Activity
    </RouterLink>
    <RouterLink
      style="text-decoration: none; color: inherit; padding-left: 20px"
      to="/viewAllActivities"
    >
      View all activities
    </RouterLink>

    <RouterLink
      style="text-decoration: none; color: inherit; padding-left: 20px"
      to="/viewOwnActivities"
    >
      View own activities
    </RouterLink>
  </nav>
  <div class="sign">
    <div v-if="user.isSignedIn">Welcome {{ this.user.username }}</div>
    <div v-else>You are not signed in :(</div>
  </div>
  <main>
    <RouterView :user="user" />
  </main>
  <Footer :copyrightYear="2022"></Footer>
</template>

<style scoped>
nav {
  background-color: rgb(46, 0, 91);
  color: white;
}

.sign {
  color: white;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
}
.Header {
  color: rgb(8, 8, 158);
  text-align: center;
  font-size: 50px;
}
nav {
  text-align: center;
  font-size: 30px;
}
</style>
