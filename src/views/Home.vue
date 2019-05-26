<template>
  <div class="w-full flex justify-center">
    <div class="w-3/4">
      <ApplicationPreview
        v-for="application in applications"
        v-bind:key="application.id"
        :applicationId="application.id"
      />
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
      applications: JobApplicationData.get(),
      filterString: "",
      filterApplications() {
        this.applications = JobApplicationData.get().sort;
      },
      sortKey: "experience",
      sortAscending: true,
      sortApplications() {
        const sortKey = this.sortKey;
        switch (sortKey) {
          case "availability":
            this.applications = this.applications.sort((a, b) => {
              const totalA = Object.values(a[sortKey]).reduce(
                (sum, el) => sum + Math.min(1, el)
              );
              const totalB = Object.values(b[sortKey]).reduce(
                (sum, el) => sum + Math.min(1, el)
              );
              return totalA - totalB;
            });
            break;
          case "applied":
            this.applications = this.applications.sort(
              (a, b) => new Date(a[sortKey]) - new Date(b[sortKey])
            );
            break;
          case "id":
          case "experience":
            this.applications = this.applications.sort(
              (a, b) => a[sortKey] - b[sortKey]
            );
            break;
          case "name":
          case "position":
          default:
            this.applications = this.applications.sort((a, b) =>
              a[sortKey].localCompare(b[sortKey])
            );
        }

        if (!this.sortAscending) {
          this.applications.reverse();
        }
      }
    };
  },
  mounted: function() {
    this.$data.sortApplications();
  }
};
</script>
