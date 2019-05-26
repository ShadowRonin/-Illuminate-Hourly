<template>
  <div class="bg-primary text-primary-text application-preview">
    <h1>This is an job application preview</h1>
    <h2>Id: {{ id }}</h2>
    <h3>Name: {{ name }}</h3>
  </div>
</template>

<script>
import JobApplicationData from "../data";
export default {
  props: {
    applicationId: Number
  },
  data: function() {
    return JobApplicationData.find(
      application => application.id === this.$props.applicationId
    );
  },
  mounted: function() {}
};
</script>

<style scoped>
</style>

