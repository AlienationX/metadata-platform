<template>
    <v-container fluid color="white">
        <v-row>
            <v-col cols="12" sm="6">
                <v-autocomplete
                        v-model="tb"
                        :items="items"
                        label="请选择"
                        dense
                        solo
                ></v-autocomplete>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6">
                <v-btn class="primary"
                       dark
                       text
                >
                    Download
                </v-btn>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    export default {
        name: "Download",
        data: () => ({
            tb: "",
            items: [],
        }),
        methods: {
            getTables() {
                this.$axios.get('/api/v1/resources/metadatas')
                    .then((res) => {
                            // eslint-disable-next-line no-console
                            console.log(res);
                            this.items = res.data.data.tables;
                        }
                    );
            },
        },
        mounted() {
            this.getTables();
        },
    }
</script>

<style scoped>

</style>