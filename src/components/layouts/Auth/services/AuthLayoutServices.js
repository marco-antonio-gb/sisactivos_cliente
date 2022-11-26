import {
    mapActions
} from "vuex";
export default {
	methods: {
        clearError(){
            this.error=""
        },
        onResize() {
            this.windowHeight = window.innerWidth;
        },
        ...mapActions({
            signIn: "auth/signIn",
            attemp: "auth/attempt",

            setroute: "auth/set_route",
        }),
        handleSubmit() {

            if (navigator.onLine) {
                if (this.$refs.form.validate()) {
                    this.submitted = true;
                    this.clearError()
                    this.signIn(this.form)
                        .then((response) => {
                            if (response.data.success) {
                                this.attemp(response.data.access_token)
                                    .then(() => {
                                        this.setroute();
                                    })
                                    .catch((error) => {
                                        this.error = error;
                                    });
                            } else {
                                this.error = response.data.message;
                            }
                            this.submitted = false;
                        })
                        .catch((err) => {
                            this.submitted = false;
                            if (err.response) {
                                this.error = err.response.data.error;
                            } else {
                                this.error = "No se puede conectar al servidor";
                            }
                        });
                } else {
                    this.error = "Complete los datos requeridos";
                }
            } else {
                this.error = "No se puede conectar a Internet.";
            }
        },
    },
}