<template>
    <v-container fluid class="white elevation-1">
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-file-input
                        v-model="files"
                        prepend-icon="mdi-file-excel"
                        placeholder="Upload your documents"
                        label="File input"
                        accept=".xlsx, .xls"
                        show-size
                >
                    <template v-slot:selection="{ text }">
                        <v-chip
                                small
                                label
                                color="primary"
                        >
                            {{ text }}
                        </v-chip>
                    </template>
                </v-file-input>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-btn class="purple darken-1" rounded dark>上传数据</v-btn>
                <v-btn text rounded color="primary">模板下载</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
    export default {
        data: () => ({
            files: [],
        }),
    }
</script>