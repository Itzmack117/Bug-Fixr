<template>
    <div class="NotesComponent m-3 row">
        <div class="col">
            <h4>{{noteProp.body}}</h4> <span v-if="isCreator"><button class="btn btn-warning float-right"
                    @click="deleteNote">Delete</button></span>
            <h6>{{noteProp.creatorEmail}}</h6>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NotesComponent",
        props: ["noteProp"],
        data() {
            return {

            }
        },
        mounted() {
            console.log('Notes Component loaded')
        },
        methods: {
            deleteNote() {
                let r = window.confirm("Delete the Note?")
                if (r == true) { this.$store.dispatch('deleteNote', this.noteProp) }

            },

        },
        computed: {
            isCreator() {
                return this.$store.state.profile.email == this.noteProp.creatorEmail
            },
        },
    }




</script>