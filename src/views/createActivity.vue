<script>
import { createActivity } from "../activity-finder-client.js";

export default {
  data() {
    return {
      id: 0,
      errors: [],
      actName: "",
      actDescription: "",
      actStart: 0,
      actEnd: 0,
      actLat: 0,
      actLong: 0,
      activityCreated: 0,
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
    sendInfo() {
      const activity = {
        accountId: this.user.userId,
        title: this.actName,
        description: this.actDescription,
        startTime: this.actStart * 1000, // Unix timestamp (milliseconds)
        endTime: this.actEnd * 1000, // Unix timestamp (millisecond)
        latitude: this.actLat,
        longitude: this.actLong,
      };
      console.log(activity);
      createActivity(activity, (errors, id) => {
        if (errors.length == 0) {
          this.id = id;
          this.activityCreated = 1;
        } else {
          this.errors = errors;
          // Possible errors codes:
          //  - "networkError": Couldn't connect to the backend.
          //  - "backendError": The backend couldn't execute the request for some reason.
          //  - "invalidActivity": The activity object is wrong.
          //  - "notAuthenticated": The user is not signed in.
          //  - "notAuthorized": The user tries to create an activity for an account the user is not signed in to.
          //  - "accountNotFound": No account with the id 'accountId' exists.
          //  - "titleTooShort": The title is too short.
          //  - "titleTooLong": The title is too long.
          //  - "descriptionTooShort": The description is too short.
          //  - "descriptionTooLong": The description is too long.
          //  - "startTimeTooEarly": The start time has already been.
          //  - "endingBeforeStarting": The end time is before the start time.
        }
      });
    },
  },
};
</script>

<template>
  <div class="page">
    <div v-if="this.user.isSignedIn == false">
      <h1>You cannot access this page because you are not signed in</h1>
    </div>
    <div v-else>
      <div v-if="activityCreated == 1">
        <h1>Activity added</h1>
      </div>
      <div v-else>
        <h1>Create an activity</h1>
        <h2>Activity Name</h2>
        <input type="text" v-model="actName" />

        <h2>Description</h2>
        <input type="text" v-model="actDescription" />

        <h2>Start Time</h2>
        <input type="number" v-model="actStart" />

        <h2>End Time</h2>
        <input type="number" v-model="actEnd" />

        <h2>Latitude</h2>
        <input type="number" step="any" v-model="actLat" />

        <h2>Longitude</h2>
        <input type="number" step="any" v-model="actLong" />
        <br />
        <br />
        <button @click="sendInfo()">Create Activity!</button>
        <h2>{{ errors }}</h2>
      </div>
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
