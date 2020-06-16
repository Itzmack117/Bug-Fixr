<template>
    <div class="NotesComponent m-3">
        <h4>{{noteProp.body}}</h4> <button class="btn btn-warning float-right" v-if="isCreator"
            @click="deleteNote">Delete</button>
        <h6>{{noteProp.creatorEmail}}</h6>
    </div>
</template>

<script>
    export default {
        name: "NotesComponent",
        props: ["noteProp"],
        mounted() {
            console.log('Notes Component loaded')
        },
        methods: {
            deleteNote() {
                this.$store.dispatch('deleteNote', noteProp)
            }
        },
        computed: {
            isCreator() {
                return this.$store.state.profile.email == this.noteProp.creatorEmail
            },
        },
    }




</script>