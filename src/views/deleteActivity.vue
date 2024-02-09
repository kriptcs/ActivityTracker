<script>
import { deleteActivityById } from "../activity-finder-client.js";

export default {
  data() {
    return {
      errors: [],
    };
  },
  props: {
    user: {
      isSignedIn: false,
      username: "",
      userId: 0,
    },
  },
  mounted() {
    deleteActivityById(this.$route.params.id, (errors) => {
      if (errors.length == 0) {
      } else {
        this.errors = errors;
        // Possible errors codes:
        //  - "networkError": Couldn't connect to the backend.
        //  - "backendError": The backend couldn't execute the request for some reason.
        //  - "notAuthenticated": The user is not signed in.
        //  - "notAuthorized": The user tries to delete an activity that doesn't belong to the account the user is signed into.
      }
    });
  },
};
</script>

<template>
  <div class="page">
    <div v-if="this.user.isSignedIn == false">
      <h2>CANNOT ACCESS! Not logged in</h2>
    </div>
    <div v-else>
      <h1>You have deleted your activity</h1>
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
