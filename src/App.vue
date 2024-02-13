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
  <!-- Main Row -->
  <nav class="row-styling">
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
      Display All Accounts
    </RouterLink>

    <!-- Register & Log In -->
    <div v-if="user.isSignedIn === false">
      <RouterLink
        style="
          text-decoration: none;
          color: white;
          float: right;
          padding-left: 20px;
          padding-right: 10px;
        "
        to="/signup"
      >
        Register
      </RouterLink>

      <RouterLink
        style="
          text-decoration: none;
          color: white;
          float: right;
          padding-left: 20px;
        "
        to="/signin"
      >
        Log In
      </RouterLink>
    </div>
    <!-- Signed in row-->

    <div v-if="user.isSignedIn === true">
      <RouterLink
        style="
          text-decoration: none;
          color: inherit;
          float: right;
          padding-left: 20px;
        "
        to="/signout"
      >
        Sign-out
      </RouterLink>
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
    </div>
  </nav>

  <main>
    <RouterView :user="user" />
  </main>
  <Footer :copyrightYear="2022"></Footer>
</template>

<style scoped>
.row-styling {
  overflow: hidden;
  background-color: #3498db;
}

.row-styling a {
  float: left;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.row-styling a:hover {
  background-color: #2ecc71;
  color: black;
}

.row-styling a.active {
  background-color: #04aa6d;
  color: white;
}
</style>
