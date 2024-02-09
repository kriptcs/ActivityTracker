<script>
import { getAccountById } from "../activity-finder-client.js";

export default {
  data() {
    return {
      account: [],
      errors: [],
    };
  },
  mounted() {
    getAccountById(this.$route.params.id, (errors, account) => {
      if (errors.length == 0) {
        this.account = account;
      } else {
        this.errors = errors;

        // Possible errors codes:
        //  - "networkError": Couldn't connect to the backend.
        //  - "backendError": The backend couldn't execute the request for some reason.
        //  - "notFound": No account with the given id exists.
      }
    });
  },
};
</script>

<template>
  <div class="page">
    <h1>Here is account id: {{ $route.params.id }}</h1>
    <h2>{{ account.username }}</h2>
  </div>
</template>

<style scoped>
.page {
  background-color: rgb(0, 91, 0);
}

ul {
  list-style-type: none;
  text-align: center;
  font-size: 25px;
}

h1,
h2 {
  text-align: center;
}

p {
  text-align: center;
  font-size: 25px;
}
</style>
