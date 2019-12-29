<template>
    <v-container fluid color="white">
        <v-row align="center">
            <v-col cols="12" sm="1" md="1">
                <v-btn color="primary" fab x-small dark class="mr-2">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn color="primary" fab x-small dark>
                    <v-icon>mdi-minus</v-icon>
                </v-btn>
            </v-col>

            <v-col cols="12" sm="4" md="3">
                        <v-autocomplete
                                v-model="tb2"
                                :items="tables"
                                label="请选择"
                                dense
                                solo
                        ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="4" md="3">
                <v-autocomplete
                        v-model="tb2"
                        :items="tables"
                        label="请选择"
                        dense
                        solo
                ></v-autocomplete>
            </v-col>
            <v-spacer></v-spacer>
            <v-btn text color="primary">SAVE</v-btn>
        </v-row>
        <v-row align="center">
            <v-col cols="12" sm="1" md="1">
                <v-btn color="primary" fab x-small dark class="mr-2">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn color="primary" fab x-small dark>
                    <v-icon>mdi-minus</v-icon>
                </v-btn>
            </v-col>

            <v-col cols="12" sm="4" md="3">
                <v-autocomplete
                        v-model="tb2"
                        :items="tables"
                        label="请选择"
                        dense
                        solo
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="4" md="3">
                <v-autocomplete
                        v-model="tb2"
                        :items="tables"
                        label="请选择"
                        dense
                        solo
                ></v-autocomplete>
            </v-col>
            <v-spacer></v-spacer>
            <v-btn text color="primary">SAVE</v-btn>
        </v-row>
        <v-divider></v-divider>
        <v-card
                v-for="item in columns"
                :key="item.title"
                width="800"
                text

        >
            <v-row>
                <v-col>
                    <v-list-item-title>Top 10 Australian beaches</v-list-item-title>
                    <v-list-item-subtitle>中文字段</v-list-item-subtitle>
                </v-col>
                <v-col>
                    <v-autocomplete
                            v-model="tb2"
                            :items="tables"
                            label="请选择"
                            dense
                            solo
                    ></v-autocomplete>
                </v-col>
                <v-col>
                    <v-autocomplete
                            v-model="tb2"
                            :items="tables"
                            label="请选择"
                            dense
                            solo
                    ></v-autocomplete>
                </v-col>
            </v-row>
        </v-card>

        <v-row>
            <v-col
                    v-for="(item, i) in itemsTest"
                    :key="i"
                    cols="12"
            >
                <v-card
                        :color="item.color"
                        dark
                >
                    <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                            <v-card-title
                                    class="headline"
                                    v-text="item.title"
                            ></v-card-title>

                            <v-card-subtitle v-text="item.artist"></v-card-subtitle>
                        </div>

                        <v-avatar
                                class="ma-3"
                                size="125"
                                tile
                        >
                            <v-img :src="item.src"></v-img>
                        </v-avatar>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
    export default {
        data: () => ({
            columns: [
                {title: '左表字段序号', subtitle: 'tb1_column_order', width: "100px"},
                {title: '左表字段英文名称', subtitle: 'tb1_column_name', width: "200px"},
                {title: '左表字段中文名称', subtitle: 'tb1_column_name_cn', width: "200px"},
                {title: '右表字段序号', subtitle: 'tb2_column_order', width: "100px"},
                {title: '右表字段英文名称', subtitle: 'tb2_column_name', width: "200px"},
                {title: '右表字段中文名称', subtitle: 'tb2_column_name_cn', width: "200px"}
            ],
            tb1: "",
            tb2: "",
            tables: [],
            headers: [
                {text: '左表字段序号', value: 'tb1_column_order', width: "100px"},
                {text: '左表字段英文名称', value: 'tb1_column_name', width: "200px"},
                {text: '左表字段中文名称', value: 'tb1_column_name_cn', width: "200px"},
                {text: '右表字段序号', value: 'tb2_column_order', width: "100px"},
                {text: '右表字段英文名称', value: 'tb2_column_name', width: "200px"},
                {text: '右表字段中文名称', value: 'tb2_column_name_cn', width: "200px"},
            ],
            items: [],
            itemsTest: [
                {
                    color: '#1F7087',
                    src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
                    title: 'Supermodel',
                    artist: 'Foster the People',
                },
                {
                    color: '#952175',
                    src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
                    title: 'Halcyon Days',
                    artist: 'Ellie Goulding',
                },
            ],
        }),
        computed: {
            two_values: function () {
                return [this.tb1, this.tb2];
            }
        },
        methods: {
            getTables() {
                this.$axios.get('/api/v1/resources/metadatas')
                    .then((res) => {
                            // eslint-disable-next-line no-console
                            console.log(res);
                            this.tables = res.data.data.tables;
                        }
                    );
            },
            getCompareResult() {
                let params = {
                    tb1: this.tb1,
                    tb2: this.tb2,
                };
                this.$axios.get('/api/v1/resources/compare', {
                    params: params
                })
                    .then((res) => {
                            // eslint-disable-next-line no-console
                            console.log(res.data.data.items);
                            this.items = res.data.data.items;
                        }
                    )
            }
        },
        mounted() {
            this.getTables();
        },
        watch: {
            two_values: function (val) {
                if (val[0] !== "" && val[1] !== "") {
                    this.getCompareResult();
                }
            }
        }
    }
</script>