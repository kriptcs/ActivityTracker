<script>
import { getAllActivities } from "../activity-finder-client.js";

export default {
  data() {
    return {
      errors: [],
      activities: [],
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
    getAllActivities((errors, activities) => {
      if (errors.length == 0) {
        this.activities = activities;
      } else {
        this.errors = errors;
        // Possible errors codes:
        //  - "networkError": Couldn't connect to the backend.
        //  - "backendError": The backend couldn't execute the request for some reason.
      }
    });
  },
};
</script>

<template>
  <div class="page">
    <div v-if="this.user.isSignedIn == false">
      <h1>Access Denied! Not Signed in.</h1>
    </div>
    <div v-else>
      <h1>Here are all the activities!</h1>
      <ul v-for="activity in activities">
        <li>
          <RouterLink :to="`/viewOneActivity/${activity.id}`">
            {{ activity.title }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
