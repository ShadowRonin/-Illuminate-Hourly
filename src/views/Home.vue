<template>
  <div class="w-full flex justify-center">
    <div class="content">
      <div class="sort align-top inline-block mt-3 mr-3 p-2 rounded bg-primary text-primary-text">
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
          <option value="availability">Availability</option>
          <option value="bookmarked">Bookmarked</option>
        </select>
        <button @click="toggleSortDirection()">
          <i
            class="cursor-pointer"
            title="Toggle Sort Direction"
            :class="{'fas fa-sort-amount-up': sortAscending, 'fas fa-sort-amount-down': !sortAscending}"
          ></i>
        </button>
      </div>
      <div class="filter inline-block mt-3 p-2 rounded bg-primary text-primary-text">
        <div class="flex align-top justify-start items-start">
          <button
            @click="showFilter = !showFilter"
            :title="showFilter? 'Hide Filter': 'Show Filter'"
          >
            <i class="fas fa-filter"></i>
          </button>
          <div v-if="showFilter" class="flex flex-col flex-grow mx-2 items-start">
            <button class="self-end" @click="clearFilter()">
              <i class="fas fa-times"></i>
              Clear Filter
            </button>
            <div class="search">
              Search:
              <input
                class="rounded text-secondary-text text-center"
                type="text"
                v-model="filter.search"
                @input="filterApplications()"
              >
            </div>
            <div class="experience my-2">
              Experience range:
              <input
                class="w-5 rounded text-secondary-text text-center"
                type="number"
                v-model="filter.experience.minimum"
                name="minimumExperience"
                @input="filterApplications()"
              >
              -
              <input
                class="w-5 rounded text-secondary-text text-center"
                type="number"
                v-model="filter.experience.maximum"
                name="maximumExperience"
                @input="filterApplications()"
              >
            </div>
            <div class="applied my-2">
              Applied:
              <Datepicker
                class="datepicker text-secondary-text"
                wrapper-class="inline-datepicker"
                input-class="rounded"
                v-model="filter.applied.start"
                placeholder="Start Date"
                @closed="filterApplications()"
              />
              <Datepicker
                class="datepicker text-secondary-text"
                wrapper-class="inline-datepicker"
                input-class="rounded"
                v-model="filter.applied.end"
                placeholder="End Date"
                @closed="filterApplications()"
              />
            </div>
            <div class="availability">
              Availability:
              <DayOfWeekCheckbox
                v-model="filter.availability.Su"
                day="S"
                title="Availability Sunday"
                @change="filterApplications()"
              />
              <DayOfWeekCheckbox
                v-model="filter.availability.M"
                day="M"
                title="Availability Monday"
              />
              <DayOfWeekCheckbox
                v-model="filter.availability.T"
                day="T"
                title="Availability Tuesday"
                @change="filterApplications()"
              />
              <DayOfWeekCheckbox
                v-model="filter.availability.W"
                day="W"
                title="Availability Wednesday"
                @change="filterApplications()"
              />
              <DayOfWeekCheckbox
                v-model="filter.availability.Th"
                day="T"
                title="Availability Thursday"
                @change="filterApplications()"
              />
              <DayOfWeekCheckbox
                v-model="filter.availability.F"
                day="F"
                title="Availability Friday"
                @change="filterApplications()"
              />
              <DayOfWeekCheckbox
                v-model="filter.availability.S"
                day="S"
                title="Availability Saturday"
                @change="filterApplications()"
              />
            </div>
            <div class="bookmarked">
              Bookmark:
              <Checkbox
                class="text-sm mr-2"
                v-model="filter.bookmark.showBookmarked"
                label="Bookmarked"
                @change="filterApplications()"
              />
              <Checkbox
                class="text-sm"
                v-model="filter.bookmark.showUnBookmarked"
                label="Not Bookmarked"
                @change="filterApplications()"
              />
            </div>
          </div>
        </div>
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
import Datepicker from "vuejs-datepicker";
import ApplicationPreview from "@/components/ApplicationPreview.vue";
import Checkbox from "@/components/Checkbox.vue";
import JobApplicationData from "../data";
import DayOfWeekCheckbox from "@/components/DayOfWeekCheckbox.vue";

export default {
  name: "home",
  components: {
    ApplicationPreview,
    Checkbox,
    DayOfWeekCheckbox,
    Datepicker
  },
  data: function() {
    return {
      applications: JobApplicationData.get(),
      filter: this.getStartingFilter(),
      sortKey: "experience",
      sortAscending: true,
      showFilter: false
    };
  },
  mounted: function() {
    JobApplicationData.onChange(() => {
      this.filterApplications();
    });
    this.sortApplications();
  },
  methods: {
    getStartingFilter() {
      return {
        search: "",
        experience: {
          minimum: null,
          maximum: null
        },
        applied: {
          start: null,
          end: null
        },
        bookmark: {
          showBookmarked: true,
          showUnBookmarked: true
        },
        availability: {
          M: false,
          T: false,
          W: false,
          Th: false,
          F: false,
          S: false,
          Su: false
        }
      };
    },
    clearFilter() {
      this.filter = this.getStartingFilter();
      this.filterApplications();
    },
    filterApplications() {
      this.applications = JobApplicationData.get().filter(application => {
        const search = this.filter.search.toLowerCase();
        if (
          !application.name.toLowerCase().includes(search) &&
          !application.position.toLowerCase().includes(search)
        ) {
          return false;
        }

        if (
          this.filter.experience.minimum > 0 &&
          application.experience < this.filter.experience.minimum
        ) {
          return false;
        }
        if (
          this.filter.experience.maximum > 0 &&
          application.experience > this.filter.experience.minimum
        ) {
          return false;
        }

        const applied = new Date(application.applied);
        if (this.filter.applied.start && this.filter.applied.start > applied) {
          return false;
        }
        if (this.filter.applied.end && this.filter.applied.end < applied) {
          return false;
        }

        for (const day in application.availability) {
          if (
            this.filter.availability[day] &&
            application.availability[day] <= 0
          ) {
            return false;
          }
        }

        if (
          !(
            (this.filter.bookmark.showBookmarked && application.bookmarked) ||
            (this.filter.bookmark.showUnBookmarked && !application.bookmarked)
          )
        ) {
          return false;
        }

        return true;
      });

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
.content {
  width: 75%;
}
@media only screen and (max-device-width: 480px) {
  .content {
    width: 100%;
  }
}
@media only screen and (min-device-width: 480px) and (max-device-width: 1024px) {
  .content {
    width: 75%;
  }
}
@media only screen and (min-device-width: 1024px) {
  .content {
    width: 75%;
    max-width: 700px;
  }
}
.sort-select {
  /* Remove select's arrow */
  appearance: none;
}
/* Remove arrows from input */
.experience input[type="number"]::-webkit-outer-spin-button,
.experience input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.experience input[type="number"] {
  -moz-appearance: textfield;
}
</style>
