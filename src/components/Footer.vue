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
  color: blue;
  font-size: 20px;
}
</style>
