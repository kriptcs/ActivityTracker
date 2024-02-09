<script>
import { getAllAccounts } from "../activity-finder-client.js";

export default {
  data() {
    return {
      accounts: [],
      errors: [],
    };
  },
  mounted() {
    getAllAccounts((errors, accounts) => {
      if (errors.length == 0) {
        this.accounts = accounts;
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
    <h1>Here are all the accounts</h1>
    <ul>
      <template v-for="item in accounts">
        <RouterLink :to="`/viewOneAcc/${item.id}`">
          <li>{{ item.username }}</li></RouterLink
        >

        <br />
      </template>
    </ul>
    <p>{{ errors }}</p>
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

h1 {
  text-align: center;
}

p {
  text-align: center;
}
a,
a:hover,
a:focus,
a:active {
  color: inherit;
  text-decoration: none;
}
</style>
