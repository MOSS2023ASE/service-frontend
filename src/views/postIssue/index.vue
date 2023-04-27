<template>
<div class="app-container">
    <div>
        <PostIssue
            v-show="dialogVisible"
            :dialogVisible="dialogVisible"
            :editMode="false"
            @closeDialogEvent="closeDialog" />
    </div>
</div>
</template>

<script>
import PostIssue from "./components/postIssue.vue";

export default {
name: "Post",
components: {
    PostIssue
},
props: {
},
data() {
    return {
        dialogVisible: true,
    };
},
methods: {
    closeDialog() {
        this.dialogVisible = false;
        this.$router.push({name: 'search'})
    },
},
}
</script>
