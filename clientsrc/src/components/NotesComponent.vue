<template>
    <div class="NotesComponent">
        <h4>{{noteProp.body}}</h4> <button class="btn btn-warning float-right" v-if="isCreator">Delete</button>
        <h6>{{noteProp.creatorEmail}}</h6>
    </div>
</template>

<script>
    export default {
        name: "NotesComponent",
        props: ["noteProp"],
        computed: {
            isCreator() {
                return this.$store.state.profile.email == this.noteProp.creatorEmail
            },
        }
    }


</script>