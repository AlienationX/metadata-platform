<template>
    <v-container fluid color="white">

        <v-row style="background-color:white;height:auto" class="elevation-1 mx-0">
            <v-col cols="12" sm="6" md="4">
                <v-autocomplete
                        label="请选择"
                        v-model="tb"
                        :items="tables"
                        dense
                        outlined
                ></v-autocomplete>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="6" md="4">
                <v-btn class="float-right" outlined color="indigo" dark @click="openDialog">
                    Add Column
                    <v-icon right>mdi-plus-outline</v-icon>
                </v-btn>
                <v-dialog v-model="editDialog" scrollable persistent max-width="1000px">
                    <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                    >
                        <v-card>
                            <v-card-title class="headline">
                                <span class="headline font-weight-black red--text">{{ formTitle }}</span>
                                <v-spacer></v-spacer>
                                <v-btn text icon small color="green" @click="close">
                                    <v-icon>mdi-close-outline</v-icon>
                                </v-btn>
                            </v-card-title>
                            <v-divider></v-divider>

                            <v-card-text>
                                <v-container>
                                    <!--<v-row>-->
                                    <!--    <v-col cols="12" sm="6" md="4" v-for="item in editedItem"-->
                                    <!--           :key="item.value">-->
                                    <!--        <v-text-field-->
                                    <!--                v-model="item.text"-->
                                    <!--                :label="item.text"-->
                                    <!--                persistent-hint-->
                                    <!--                required-->
                                    <!--        ></v-text-field>-->
                                    <!--    </v-col>-->
                                    <!--</v-row>-->
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.table_type" label="表类型"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.table_name" label="表英文名称" :rules="[rules.required, rules.min]" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.table_name_cn" label="表中文名称"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.column_order" label="字段序号" type="number"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.column_name" label="字段英文名称" :rules="[rules.required, rules.min]" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.column_name_cn" label="字段中文名称"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.column_type" label="字段类型"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.column_length" label="字段长度"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-checkbox v-model="editedItem.is_primary" label="是否主键" color="primary" dense></v-checkbox>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-checkbox v-model="editedItem.is_required" label="是否必填" color="primary" dense></v-checkbox>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-textarea v-model="editedItem.remark" label="备注" rows="2" hint="Hint text"></v-textarea>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-select v-model="editedItem.status" :items="statusItem" label="完成状态" dense></v-select>
                                        </v-col>
                                        <v-col cols="4" v-show="finishDateShow">
                                            <!--<v-date-picker v-model="editedItem.finish_date" label="完成时间" dense></v-date-picker>-->
                                            <v-menu
                                                    v-model="dateMenu"
                                                    :close-on-content-click="false"
                                                    :nudge-right="40"
                                                    transition="scale-transition"
                                                    offset-y
                                                    min-width="200px"
                                            >
                                                <template v-slot:activator="{ on }">
                                                    <v-text-field
                                                            v-model="editedItem.finish_date"
                                                            label="完成时间"
                                                            prepend-icon="mdi-calendar-edit"
                                                            dense
                                                            v-on="on"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker
                                                        v-model="editedItem.finish_date"
                                                        :max="new Date().toISOString().substr(0, 10)"
                                                        min="2010-01-01"
                                                        @input="dateMenu = false"
                                                        color="primary"
                                                ></v-date-picker>
                                            </v-menu>
                                        </v-col>
                                    </v-row>
                                </v-container>
                                <small class="red--text">*indicates required field</small>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <!--<v-btn color="green darken-1" text @click="resetValidation"><span class="font-weight-black">Va</span></v-btn>-->
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" text @click="close"><span class="font-weight-black">Close</span></v-btn>
                                <v-btn color="green darken-1" text @click="save"><span class="font-weight-black">Save</span></v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-dialog>
            </v-col>

        </v-row>

        <v-data-table
                :headers="headers"
                :items="items"
                :search="search"
                :sort-by="[]"
                :sort-desc="[]"
                :loading="loading"
                loading-text="Loading... Please wait"
                multi-sort
                calculate-widths
                fixed-header
                class="elevation-1"
        >
            <template v-slot:item.status="{ item }">
                <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
            </template>
            <template v-slot:item.is_primary="{ item }">
                <v-simple-checkbox v-model="item.is_primary" disabled></v-simple-checkbox>
            </template>
            <template v-slot:item.is_required="{ item }">
                <v-simple-checkbox v-model="item.is_required" disabled></v-simple-checkbox>
            </template>
            <template v-slot:item.action="{ item }">
                <v-icon small color="primary" @click="editItem(item)">
                    mdi-square-edit-outline
                </v-icon>
                <v-icon small color="primary" @click="openDeleteDialog(item)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>

        <v-dialog v-model="confirmDialog" max-width="380">
            <v-card>
                <v-card-title class="headline">CONFIRM</v-card-title>
                <v-card-text>
                    Are you sure you want to delete this item?
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="confirmDialog = false"><span class="font-weight-black">NO</span></v-btn>
                    <v-btn color="green darken-1" text @click="deleteItem"><span class="font-weight-black">YES</span></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar
                v-model="snackbar"
                right
                dark
                color="red darken-2"
                :multi-line="true"
                :timeout="timeout"
        >
            {{ message }}
            <v-btn dark text @click="snackbar = false">Close</v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
    export default {
        name: "ViewMetadata",
        data() {
            return {
                windowSize: {
                    x: 0,
                    y: 0,
                },
                tb: '',
                tables: [],
                loading: false,
                search: '',
                headers: [
                    {text: 'Actions', value: 'action', sortable: false},
                    {
                        text: '表类型',
                        align: 'left',
                        sortable: false,
                        width: "120",
                        value: 'table_type',
                        fixed: true
                    },
                    {text: '表英文名称', value: 'table_name', width: "120px", fixed: true},
                    {text: '表中文名称', value: 'table_name_cn', width: "200px", fixed: true},
                    {text: '字段序号', value: 'column_order', width: "100px"},
                    {text: '字段英文名称', value: 'column_name', width: "200px", sortable: false},
                    {text: '字段中文名称', value: 'column_name_cn', width: "200px", sortable: false},
                    {text: '字段类型', value: 'column_type', width: "100px", sortable: false},
                    {text: '字段长度', value: 'column_length', width: "100px", sortable: false},
                    {text: '是否主键', value: 'is_primary', width: "100px", sortable: false},
                    {text: '是否必填', value: 'is_required', width: "100px", sortable: false},
                    {text: '映射字段（医保）', value: 'column_map_yb', width: "100px", sortable: false},
                    {text: '映射字段（农合）', value: 'column_map_nh', width: "100px", sortable: false},
                    {text: '映射字段（HIS）', value: 'column_map_his', width: "100px", sortable: false},
                    {text: '备注', value: 'remark', width: "100px", sortable: false},
                    {text: '状态', value: 'status', width: "100px"},
                    {text: '完成日期', value: 'finish_date', width: "200px"},
                    {text: '操作人', value: 'operator', width: "100px"},
                    {text: '操作时间', value: 'operate_dt', width: "200px"},
                ],
                items: [],

                editDialog: false,
                confirmDialog: false,
                snackbar: false,
                message: '',
                timeout: 3000,
                editedIndex: -1,
                statusItem: ['未完成', '已完成', '...'],
                editedItem: {
                    id: NaN,
                    table_type: '',
                    table_name: '',
                    table_name_cn: '',
                    column_order: 0,
                    column_name: '',
                    column_name_cn: '',
                    column_type: '',
                    column_length: '',
                    column_map_yb: '',
                    column_map_nh: '',
                    column_map_his: '',
                    is_primary: false,
                    is_required: false,
                    remark: '',
                    status: '未完成',
                    finish_date: '',
                    operator: '',
                    operate_dt: ''
                },
                defaultItem: {
                    id: NaN,
                    table_type: '',
                    table_name: '',
                    table_name_cn: '',
                    column_order: 0,
                    column_name: '',
                    column_name_cn: '',
                    column_type: '',
                    column_length: '',
                    column_map_yb: '',
                    column_map_nh: '',
                    column_map_his: '',
                    is_primary: false,
                    is_required: false,
                    remark: '',
                    status: '未完成',
                    finish_date: '',
                    operator: '',
                    operate_dt: ''
                },

                // 日期选择器数据
                dateMenu: false,

                valid: true,
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 2 || 'Min 2 characters',
                },
            }
        },
        computed: {
            editableItems: function () {
                let editCol = Object.assign([], this.headers);
                const hideCol = ["Actions", "添加时间", "添加人", "更新时间", "更新人", "删除时间", "删除人"];
                for (let i = editCol.length; i >= 0; i--) {
                    const tmpClass = Object.assign({}, editCol[i]);
                    if (hideCol.includes(tmpClass.text)) {
                        editCol.splice(i, 1);
                    }
                }
                return editCol;
            },

            formTitle() {
                return this.editedIndex === -1 ? 'NEW COLUMN' : 'EDIT COLUMN'
            },
            finishDateShow: function () {
                // return this.editedItem.status === '未完成' ? false : true
                return this.editedItem.status !== '未完成'
            },
            finishDateDefault: function () {
                return this.editedItem.finish_date === '' ? new Date().toISOString().substr(0, 10) : this.editedItem.finish_date
            },
        },
        mounted() {
            this.onResize();
            this.getTables();
        },
        watch: {
            tb: function (val) {
                if (val !== "") {
                    this.loading = true;
                    this.getMetaData();
                }
            }
        },
        methods: {
            onResize() {
                this.windowSize = {x: window.innerWidth, y: window.innerHeight};
                // eslint-disable-next-line no-console
                console.log(this.windowSize);
            },
            getTables() {
                this.$axios.get('/api/v1/resources/metadatas')
                    .then((response) => {
                            // eslint-disable-next-line no-console
                            console.log(response);
                            this.tables = response.data.data.tables;
                        }
                    );
            },
            getMetaData() {
                this.$axios.get('/api/v1/resources/metadatas/' + this.tb)
                    .then((response) => {
                        // eslint-disable-next-line no-console
                        console.log(response);
                        this.items = response.data.data[this.tb];
                        this.loading = false;
                    });
            },
            addColumnData() {
                this.$axios.post('/api/v1/resources/metadatas', this.editedItem)
                    .then((response) => {
                        if (response.data.code === 200) {
                            this.editedItem.id = response.data.data.add.id;
                            this.items.push(this.editedItem);
                            this.message = "add success";
                        } else {
                            this.message = response.data.message;
                        }
                        this.snackbar = true;
                    })
                // .catch((error) => {
                //     // eslint-disable-next-line no-console
                //     console.log("===>", error);
                // })
                // .then(() => {
                //     // always executed, 需要开启上面的捕获异常
                //     this.snackbar = true;
                // });
            },
            updateColumnData() {
                this.$axios.put('/api/v1/resources/metadatas/' + this.tb, this.editedItem)
                    .then((response) => {
                        if (response.data.code === 200) {
                            Object.assign(this.items[this.editedIndex], this.editedItem);
                            this.message = "update success";
                        }
                        this.snackbar = true;
                    })
            },
            deleteColumnData() {
                this.$axios.delete('/api/v1/resources/metadatas/' + this.tb, {
                    data: {id: this.editedItem.id}
                })
                    .then((response) => {
                        if (response.data.code === 200) {
                            const index = this.items.indexOf(this.editedItem);
                            this.items.splice(index, 1);
                            this.message = "delete success";
                            // eslint-disable-next-line no-console
                            console.log(response.data.data)
                        }
                        this.snackbar = true;
                    })
            },
            getColor(status) {
                if (status === '已完成') return 'green';
                else if (status === '未完成') return 'red';
                else return 'white'
            },
            openDialog() {
                this.editedIndex = -1;
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editDialog = true;
            },
            editItem(item) {
                // eslint-disable-next-line no-console
                console.log(item);
                this.editedIndex = this.items.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.editDialog = true;
            },
            openDeleteDialog(item) {
                this.editedItem = item;
                this.confirmDialog = true;
            },
            deleteItem() {
                this.confirmDialog = false;
                this.deleteColumnData();
                // setTimeout(() => {
                //     const index = this.items.indexOf(this.editedItem);
                //     this.items.splice(index, 1);
                // }, 300)
            },
            close() {
                this.$refs.form.resetValidation();
                this.editDialog = false;
                // setTimeout(() => {
                //     this.editedItem = Object.assign({}, this.defaultItem);
                //     this.editedIndex = -1;
                // }, 300)
            },
            save() {
                if (this.$refs.form.validate()) {
                    if (this.editedIndex > -1) {
                        this.updateColumnData();
                    } else {
                        this.addColumnData();
                    }
                    this.close();
                }
            },

            // validate () {
            //     if (this.$refs.form.validate()) {
            //         this.snackbar = true
            //     }
            // },
            // reset () {
            //     this.$refs.form.reset()
            // },
            // resetValidation () {
            //     this.$refs.form.resetValidation();
            // },
        },
    }
</script>

<style scoped>

</style>