<template>
    <div class="NotesComponent m-3 row">
        <div class="col">
            <h4>{{noteProp.body}}</h4> <span v-if="isCreator"><button class="btn btn-warning float-right"
                    v-if="deleteBtn" @click="deleteBtn=false">Delete</button><button class="btn btn-warning float-right"
                    v-if="deleteBtn" @click="deleteNote">
                    ARE YOU
                    SURE?</button></span>
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
                deleteBtn: true,
                conDelete: false
            }
        },
        mounted() {
            console.log('Notes Component loaded')
        },
        methods: {
            deleteNote() {
                this.$store.dispatch('deleteNote', noteProp)
            },

        },
        computed: {
            isCreator() {
                return this.$store.state.profile.email == this.noteProp.creatorEmail
            },
        },
    }




</script>