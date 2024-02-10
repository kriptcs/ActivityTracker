<script>
export default {
  props: {
    copyrightYear: Number,
  },
};
</script>

<template>
  <footer>Copyright {{ copyrightYear }}</footer>
</template>

<style scoped>
template {
  position: relative;
}

footer {
  color: #2ecc71;
  font-size: 20px;
}
</style>
