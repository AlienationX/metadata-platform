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
            <v-col cols="12" sm="6" md="4">
                <v-btn class="purple darken-1"
                       rounded
                       dark
                       text
                       @click="downFile"
                >
                    模板下载
                </v-btn>
                <v-btn text rounded color="primary">示例数据下载</v-btn>
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
            downFile() {
                if (this.tb === "") {
                    confirm('Please select a table!')
                } else {
                    let params = {
                        tb: this.tb,
                    };
                    this.$axios({
                        method: 'get',
                        url: '/api/v1/resources/metaxlsx',
                        responseType: 'blob',
                        params: params
                    })
                        .then((res) => {
                                // eslint-disable-next-line no-console
                                console.log(res);
                                const blob = new Blob([res.data]);
                                const fileName = this.tb + '.xlsx';
                                const elink = document.createElement('a');
                                elink.download = fileName;
                                elink.style.display = 'none';
                                elink.href = URL.createObjectURL(blob);
                                document.body.appendChild(elink);
                                elink.click();
                                URL.revokeObjectURL(elink.href); // 释放URL 对象
                                document.body.removeChild(elink);
                            }
                        );
                }
            },
        },
        created() {
            this.getTables();
        },
    }
</script>

<style scoped>

</style>