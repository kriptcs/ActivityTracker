<script>
import { createActivity } from "../activity-finder-client.js";
import "@mobiscroll/vue/dist/css/mobiscroll.min.css";
import { MbscDatepicker, setOptions } from "@mobiscroll/vue";

export default {
  components: {
    MbscDatepicker,
  },
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
      setOptions({
        theme: "ios",
        themeVariant: "dark",
      });

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
      <div v-else class="page">
        <form>
          <h1>Create an activity</h1>
          <input
            class="input-font"
            type="text"
            placeholder="Activity Name"
            v-model="actName"
          />

          <input
            class="input-font"
            type="text"
            placeholder="Description"
            v-model="actDescription"
          />
          <div class="component-styling">
            <MbscDatepicker :controls="['calendar', 'time']" :touchUi="false" />
          </div>
          <button class="input-font" type="button" @click="sendInfo()">
            Create Activity!
          </button>
          <p class="error-text" v-if="this.errors[0]">Error: {{ errors }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.component-styling {
  padding-top: 10px;
  color: red;
  border-radius: 10px;
}
.input-font {
  font-family: "Lato", sans-serif;
  color: #ecf0f1;
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
