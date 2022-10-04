<template>
<div class="mb-3">
    <span class="font-weight-medium body-2 grey--text   text--darken-1">
        {{title}}
    </span>
    <v-divider class="mt-1"></v-divider>
</div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ""
        },
    }
}
</script>
