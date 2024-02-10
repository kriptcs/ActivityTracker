<script>
import { getActivitiesByAccountId } from "../activity-finder-client.js";

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
    getActivitiesByAccountId(this.user.userId, (errors, activities) => {
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
      <h2>CANNOT ACCESS! Not logged in</h2>
    </div>
    <div v-else>
      <h1>Here are all your activites</h1>
      <ul v-for="activity in activities">
        <li>
          {{ activity.title }}
          <p>
            <RouterLink :to="`/deleteActivity/${activity.id}`">
              Delete ^
            </RouterLink>
          </p>
          <p>
            <RouterLink :to="`/updateActivity/${activity.id}`">
              Update ^
            </RouterLink>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
