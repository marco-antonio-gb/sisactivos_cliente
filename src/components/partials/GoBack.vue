<template>
<div class="d-flex align-center ">
    <v-btn text fab small @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <div class="d-flex flex-column ml-1">
        <p class="mb-0   font-weight-bold text-h5">{{$route.meta.title}} </p>
    </div>
</div>
</template>
<script>
export default {
    name: 'goback',
}
</script>
