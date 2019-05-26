<template>
  <div>
    <div v-for="application in applications" v-bind:key="application.id" class="bg-purple">
      <ApplicationPreview class="preview" :applicationId="application.id"/>
    </div>
  </div>
</template>

<script>
import ApplicationPreview from "@/components/ApplicationPreview.vue";
import JobApplicationData from "../data";

export default {
  name: "home",
  components: {
    ApplicationPreview
  },
  data: function() {
    return {
      applications: JobApplicationData
    };
  }
};
</script>
