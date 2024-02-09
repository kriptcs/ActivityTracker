<script>
import {
  getActivityById,
  updateActivityById,
} from "../activity-finder-client.js";

export default {
  data() {
    return {
      id: 0,
      errors: [],
      currentId: 0,
      currentActName: "",
      currentActDescription: "",
      currentActStart: 0,
      currentActEnd: 0,
      currentActLat: 0,
      currentActLong: 0,
      currentActivityCreated: 0,
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
      const updatedActivity = {
        id: this.currentId,
        accountId: this.user.userId,
        title: this.currentActName,
        description: this.currentActDescription,
        startTime: this.currentActStart * 1000, // Unix timestamp (milliseconds)
        endTime: this.currentActEnd * 1000, // Unix timestamp (millisecond)
        latitude: this.currentActLat,
        longitude: this.currentActLong,
      };
      updateActivityById(this.$route.params.id, updatedActivity, (errors) => {
        if (errors.length == 0) {
          this.currentActivityCreated = 1;
        } else {
          this.errors = errors;
          // Possible errors codes:
          //  - "networkError": Couldn't connect to the backend.
          //  - "backendError": The backend couldn't execute the request for some reason.
          //  - "notFound": No activity with the given id exists.
          //  - "invalidActivity": The activity object is wrong.
          //  - "notAuthenticated": The user is not signed in.
          //  - "notAuthorized": The user tries to update an activity for an account the user is not signed in to.
          //  - "idChanged": The id changed (not allowed).
          //  - "started": The activity has already started.
          //  - "titleTooShort": The title is too short.
          //  - "titleTooLong": The title is too long.
          //  - "descriptionTooShort": The description is too short.
          //  - "descriptionTooLong": The description is too long.
          //  - "startTimeTooEarly": The start time is changed to a time that has already been.
          //  - "endingBeforeStarting": The end time is before the start time.
        }
      });
    },
  },
  mounted() {
    getActivityById(this.$route.params.id, (errors, activity) => {
      if (errors.length == 0) {
        console.log(this.$route.params.id);
        this.currentId = activity.id;
        this.currentActName = activity.title;
        this.currentActDescription = activity.description;
        this.currentActStart = activity.startTime;
        this.currentActEnd = activity.endTime;
        this.currentActLat = activity.latitude;
        this.currentActLong = activity.longitude;
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
      <h1>You cannot access this page because you are not signed in</h1>
    </div>
    <div v-else>
      <div v-if="currentActivityCreated == 1">
        <h1>Activity updated</h1>
      </div>
      <div v-else>
        <h1>Create an activity</h1>

        <h2>Activity ID</h2>
        <input type="text" v-model="currentId" />

        <h2>Activity Name</h2>
        <input type="text" v-model="currentActName" />

        <h2>Description</h2>
        <input type="text" v-model="currentActDescription" />

        <h2>Start Time</h2>
        <input type="number" v-model="currentActStart" />

        <h2>End Time</h2>
        <input type="number" v-model="currentActEnd" />

        <h2>Latitude</h2>
        <input type="number" step="any" v-model="currentActLat" />

        <h2>Longitude</h2>
        <input type="number" step="any" v-model="currentActLong" />
        <br />
        <br />
        <button @click="sendInfo()">Update Activity!</button>
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
