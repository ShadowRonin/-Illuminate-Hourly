<template>
  <div class="application-details">
    <h1>This is an job application page</h1>
    <h2>Id: {{ $route.params.id }}</h2>
    <h3>Name: {{ name }}</h3>
  </div>
</template>

<script>
import JobApplicationData from "../data";
export default {
  data: function() {
    return JobApplicationData.find(
      application => application.id === this.$route.params.id
    );
  },
  mounted: function() {}
};
</script>

<style scoped>
</style>

