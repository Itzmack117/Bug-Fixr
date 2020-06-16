<template>
    <tr class="bugsComponent">
        <router-link :to="{name: 'ActiveBugPage', params:{bugId: bugProp._id}}">
            <td scope="row">{{bugProp.title}}</td>
        </router-link>
        <td>{{bugProp.creatorEmail}}</td>
        <td style="color: royalblue;" v-if="bugProp.closed">Closed</td>
        <td style="color: red;" v-else>Open</td>
        <td>{{bugProp.updatedAt}}</td>
    </tr>
</template>

<script>
    export default {
        name: "bugsComponent",
        props: ["bugProp"],
    }
</script>