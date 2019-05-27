<template>
  <div class="w-full flex justify-center">
    <div class="w-3/4">
      <div class="sort inline-block mt-3 p-2 rounded bg-primary text-primary-text">
        Sort By:
        <select
          class="sort-select cursor-pointer bg-primary text-primary-text font-semibold mr-1"
          title="Sort By"
          v-model="sortKey"
          @change="sortApplications()"
        >
          <option value="name">Name</option>
          <option value="position">Position</option>
          <option value="applied">Applied</option>
          <option value="experience">Experience</option>
          <option value="availability">Total Availability</option>
          <option value="bookmarked">Bookmarked</option>
        </select>
        <i
          class="cursor-pointer"
          title="Toggle Sort Direction"
          :class="{'fas fa-sort-amount-up': sortAscending, 'fas fa-sort-amount-down': !sortAscending}"
          @click="toggleSortDirection()"
        ></i>
      </div>

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
      sortKey: "experience",
      sortAscending: true
    };
  },
  mounted: function() {
    JobApplicationData.onChange(() => {
      this.applications = JobApplicationData.get();
      this.filterApplications();
    });
    this.sortApplications();
  },
  methods: {
    filterApplications() {
      // preform filtering
      this.sortApplications();
    },
    sortApplications() {
      const sortKey = this.sortKey;
      switch (sortKey) {
        case "bookmarked":
          this.applications = this.applications.sort(
            (a, b) => 1 * b[sortKey] - 1 * a[sortKey]
          );
          break;
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
            a[sortKey].localeCompare(b[sortKey])
          );
      }

      if (!this.sortAscending) {
        this.applications.reverse();
      }
    },
    toggleSortDirection() {
      this.sortAscending = !this.sortAscending;
      this.applications = this.applications.reverse();
    }
  }
};
</script>

<style scoped>
.sort-select {
  /* Remove select's arrow */
  appearance: none;
}
</style>
