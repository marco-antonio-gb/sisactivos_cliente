<template>
<div class="d-flex align-center ">
    <v-btn  icon @click="$router.go(-1)" v-if="arrow" class="mr-1">
        <v-icon dense> mdi-arrow-left</v-icon>
    </v-btn>
    <div class="d-flex  align-center" v-if="eventdetail">
        <h4 class=" mr-2">{{ $route.meta.title}} </h4>
        <h4 class=" ">
            <v-icon color="link">mdi-calendar-star</v-icon> {{sub_title}}
        </h4>
    </div>
    <div class="d-flex flex-column" v-else>
        <h2  v-if="main_title">{{ $route.meta.title}}</h2>
        <h3 class="title" v-else>{{$route.meta.title}} </h3>
        <small class="grey--text ">{{sub_title}}</small>
    </div>
</div>
</template>
<script>
export default {
    props: {
        sub_title: {
            default: ""
        },
        arrow: {
            default: true
        },
        main_title: {
            default: false
        },
        eventdetail: {
            default: false
        }
    },
    name: 'goback',
}
</script>
