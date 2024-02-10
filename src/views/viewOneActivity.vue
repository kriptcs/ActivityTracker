<script>
import { getActivityById } from "../activity-finder-client.js";

export default {
  data() {
    return {
      errors: [],
      activity: {},
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
    getActivityById(this.$route.params.id, (errors, activity) => {
      if (errors.length == 0) {
        this.activity = activity;
        console.log(1);
      } else {
        this.errors = errors;
        // Possible errors codes:
        //  - "networkError": Couldn't connect to the backend.
        //  - "backendError": The backend couldn't execute the request for some reason.
        //  - "notFound": No activity with the given id exists.
      }
    });
  },
};
</script>

<template>
  <div class="page">
    <div v-if="this.user.isSignedIn == false">
      <h2>Cannot see this. Sign in.</h2>
    </div>
    <div v-else>
      <h1>Here is activity number {{ this.$route.params.id }}</h1>
      <h1>{{ activity.title }}</h1>
    </div>
  </div>
</template>

<style scoped></style>
