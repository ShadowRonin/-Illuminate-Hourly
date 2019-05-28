<template>
  <div class="bg-primary text-primary-text my-2 p-1 rounded">
    <div class="flex justify-between">
      <div class="flex-grow">
        <h2 title="name">{{name}}</h2>
        <div class="experience">Experience: {{experience}}</div>
      </div>

      <div class="text-left">
        <h1 title="Position">{{position}}</h1>
        <span title="Applied On">{{applied}}</span>
      </div>
      <button
        v-on:click="toggleBookmark()"
        class="bookmark"
        :title="bookmarked? 'Remove Bookmark': 'Bookmark'"
      >
        <i :class="{'fas fa-bookmark': bookmarked, 'far fa-bookmark': !bookmarked}"></i>
      </button>
    </div>
    <div class="flex">
      <div :class="{'mr-2': showDetails}">
        <DayOfWeek :selected="availability.Su > 0" label="S" title="Availability Sunday"/>
        <span v-if="showDetails">: {{availability.Su}}</span>
      </div>
      <div :class="{'mr-2': showDetails}">
        <DayOfWeek :selected="availability.M > 0" label="M" title="Availability Monday"/>
        <span v-if="showDetails">: {{availability.M}}</span>
      </div>
      <div :class="{'mr-2': showDetails}">
        <DayOfWeek :selected="availability.T > 0" label="T" title="Availability Tuesday"/>
        <span v-if="showDetails">: {{availability.T}}</span>
      </div>
      <div :class="{'mr-2': showDetails}">
        <DayOfWeek :selected="availability.W > 0" label="W" title="Availability Wednesday"/>
        <span v-if="showDetails">: {{availability.W}}</span>
      </div>
      <div :class="{'mr-2': showDetails}">
        <DayOfWeek :selected="availability.Th > 0" label="T" title="Availability Thursday"/>
        <span v-if="showDetails">: {{availability.Th}}</span>
      </div>
      <div :class="{'mr-2': showDetails}">
        <DayOfWeek :selected="availability.F > 0" label="F" title="Availability Friday"/>
        <span v-if="showDetails">: {{availability.F}}</span>
      </div>
      <div>
        <DayOfWeek :selected="availability.S > 0" label="S" title="Availability Saturday"/>
        <span v-if="showDetails">: {{availability.S}}</span>
      </div>
    </div>
    <div class="questions" v-if="showDetails">
      Questions:
      <div class="mb-1 ml-1" v-for="question in questions" :key="question.text">
        <div class="italic">{{question.text}}</div>
        <div>{{question.answer}}</div>
      </div>
    </div>
    <div class="toggle-details w-full flex justify-center -mt-4">
      <button title="Show Details" class="px-3" v-on:click="showDetails = !showDetails">
        <i
          class="fas text-l"
          :class="{'fa-angle-double-down': !showDetails, 'fa-angle-double-up': showDetails}"
        ></i>
      </button>
    </div>
  </div>
</template>

<script>
import JobApplicationData from "../data";
import DayOfWeek from "@/components/DayOfWeek.vue";

export default {
  components: { DayOfWeek },
  props: {
    applicationId: Number
  },
  data: function() {
    return {
      ...JobApplicationData.get().find(
        application => application.id === this.$props.applicationId
      ),
      showDetails: false
    };
  },
  methods: {
    toggleBookmark: function() {
      this.bookmarked = !this.bookmarked;
      JobApplicationData.bookmark(this.id, this.bookmarked);
    }
  }
};
</script>

<style scoped>
@media only screen and (max-device-width: 410px) {
  .toggle-details {
    margin-top: 0;
  }
}

.bookmark {
  @apply self-start mx-1;
}
button:focus {
  outline: 0 !important;
}
</style>

