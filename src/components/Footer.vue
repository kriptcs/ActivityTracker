<script>
export default {
  props: {
    copyrightYear: Number,
  },
};
</script>

<template>
  <footer class="footer">Copyright {{ copyrightYear }}</footer>
</template>

<style scoped>
.footer {
  color: #2ecc71;
  font-size: 20px;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
