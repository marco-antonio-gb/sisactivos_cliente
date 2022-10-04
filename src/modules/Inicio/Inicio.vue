<template>
<v-container>
    <v-card>
        <v-card-text>
            <v-text-field v-model="send_email.subject" label="subject"></v-text-field>
            <v-text-field v-model="send_email.from" label="from"></v-text-field>
            <v-text-field v-model="send_email.to" label="to"></v-text-field>

        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="sendEmail">Enviar</v-btn>
        </v-card-actions>
    </v-card>
</v-container>
</template>
<script>
export default {
    data() {
        return {
            send_email:{
                subject:"",
                from:"",
                to:""
            }
        };
    },
    mounted() {
        
    },
    methods: {
        async sendEmail() {
            let response =  await this.axios.post('/send-email', this.send_email)
            console.log(response.data)
        },
    },
    components: {
        
    },
};
</script>
<style scoped>

</style>
