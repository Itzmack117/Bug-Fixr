<template>
    <div class="card m-4">
        <div class="container-fluid">
            <div class="row">
                <div class="col">
                    <form class="form-group m-3" @submit.prevent="editBody" v-if="editForm">
                        <input type="text" placeholder="Update Bug Desciption" v-model="bugEdit.body"
                            style="width: 100%" @click:>
                        <span class="float-right"><button type="submit" class="btn btn-primary">CONFIRM
                                EDIT</button></span>
                    </form>
                </div>
            </div>
            <div class="card-body ">
                <h1>{{bug.title}}</h1><span v-if="isCreator"><button class="btn btn-warning float-right"
                        @click="editForm=true" v-if="!bug.closed">EDIT</button><span v-if="!bug.closed">
                        <button class="btn btn-danger float-right" @click="confirmBtn = true" v-if="!confirmBtn">CLOSE
                            REPORT</button><button class="btn btn-danger float-right" v-if="confirmBtn"
                            @click="closeReport">Confirm?</button></span></span>
            </div>
            <h6 class="justify-content-end">{{bug.creatorEmail}}</h6>

            <p>{{bug.body}}</p>
        </div>
        <div class="row">
            <div class="col">
                <h3 class="m-3">Notes:</h3>
                <NotesComponent v-for="note in notes" :key="note.id" :noteProp="note" />
            </div>
        </div>

        <form class="form-group m-3" @submit.prevent="addNote">
            <input type="text" placeholder="Add Note" v-model="newNote.body" style="width: 100%">
            <span class="float-right"><button type="submit" class="btn btn-primary">Attach
                    Note</button></span>
        </form>
    </div>
    </div>
</template>

<script>
    import NotesComponent from "../components/NotesComponent"
    export default {
        name: "ActiveBugsPage",
        mounted() {
            this.$store.dispatch("getBugById", this.$route.params.bugId);
            this.$store.dispatch("getNotesbyBugId", this.$route.params.bugId)
        },
        data() {
            return {
                newNote: {
                    body: "",
                    bugId: this.$route.params.bugId,
                },
                bugEdit: {
                    body: "",
                },

                editForm: false,
                confirmBtn: false
            }
        },
        methods: {
            editBody() {
                this.$store.state.activeBug.body = this.bugEdit.body
                this.$store.dispatch('editBug', this.$store.state.activeBug)
                this.editForm = false
            },
            addNote() {
                this.$store.dispatch("createNote", this.newNote)
            },
            closeReport() {
                this.$store.state.activeBug.closed = true
                this.$store.dispatch('editBug', this.$store.state.activeBug)
            }
        },
        computed: {
            bug() {
                return this.$store.state.activeBug
            },
            notes() {
                return this.$store.state.notes
            },
            isCreator() {
                return this.$store.state.profile.email == this.bug.creatorEmail
            },
            notes() {
                this.$store.state.notes
            },
        },
        components: {
            NotesComponent
        }
    }
</script>