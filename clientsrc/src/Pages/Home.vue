<template>
  <div class="home">
    <span class="d-flex justify-content-center"><button class="btn btn-success sticky-top m-2"
        @click="bugForm=true">Report
        Bug</button></span>
    <div class="card m-4">
      <div class="container">
        <div class="card-body" v-if="bugForm">
          <form class="form-group" @submit.prevent="reportBug" v-if="bugForm">
            <input type="text" placeholder="Title" v-model="newBug.title" style="width: 100%">
            <input type="text" placeholder="Description" v-model="newBug.body" style="height: 15vh; width: 100%">
            <span class="d-flex justify-content-center"><button type="submit" class="btn btn-primary">Submit
                Bug</button></span>
          </form>
        </div>
      </div>
    </div>
    <div class="card m-4">
      <div class="container">
        <div class="card-body">
          <h5 class="card-title">Reported Bugs:</h5>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col ">Reported by</th>
                <th scope="col">Status</th>
                <th scope="col">Last Update</th>
              </tr>
            </thead>
            <tbody>
              <BugsComponent v-for="bug in bugs" :key="bug.id" :bugProp="bug" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BugsComponent from "../components/BugsComponent";
  export default {
    name: "home",
    mounted() {
      this.$store.dispatch("getBugs")
    },
    data() {
      return {
        newBug: {
          title: "",
          body: "",
          closed: false,
          creatorEmail: this.$store.state.profile.email
        },
        bugForm: false
      }
    },

    methods: {
      reportBug() {
        this.$store.dispatch("reportBug", this.newBug)
        this.bugForm = false
      }
    },

    computed: {
      bugs() {
        return this.$store.state.bugs
      },
    },
    components: {
      BugsComponent
    }
  }
    ;
</script>