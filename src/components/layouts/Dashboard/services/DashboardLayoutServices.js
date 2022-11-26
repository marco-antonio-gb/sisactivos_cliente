import {
    mapActions
} from "vuex";
export default {
	methods: {
        ...mapActions({
            signOutAction: "auth/signOut",
        }),
        signOut() {
            this.signOutAction()
        },
    },
}