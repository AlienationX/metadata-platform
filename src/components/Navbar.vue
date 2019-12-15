<template>
    <nav>
        <!-- hide-on-scroll flat class="grey" -->
        <v-app-bar app>
            <v-app-bar-nav-icon class="grey--text" @click="drawer = ! drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>
                <span class="font-weight-light grey--text">AlienationX</span>
                <span>Todo</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text class="white" @click="toAbout">about</v-btn>
            <v-btn text class="white">
                <span>Sign Out</span>
                <v-icon right>mdi-export</v-icon>
            </v-btn>
        </v-app-bar>
        v-list-tile-title
        <v-navigation-drawer v-model="drawer" app>
            <v-list>
                <v-row align="center" justify="center">
                    <v-avatar size="80">
                        <img src="/avatar-2.jpg" alt="avatar">
                    </v-avatar>
                </v-row>
                <v-row align="center" justify="center" class="py-3">
                    <div class=".headline .font-weight-light text-center">Roger</div>
                </v-row>
                <v-divider></v-divider>

                <v-subheader>REPORTS</v-subheader>


                <v-list-item router to="/" class="primary--text">
                    <v-list-item-icon>
                        <v-icon>mdi-clipboard-list-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-tile-title class="text-uppercase">Todo</v-list-tile-title>
                </v-list-item>

                <v-list-group prepend-icon="mdi-file-table-box-multiple-outline">
                    <template v-slot:activator>
                        <v-list-tile-title>Metadata</v-list-tile-title>
                    </template>


                    <v-list-item v-for="link in links" :key="link.text" router :to="link.route"
                                 class="primary--text">
                        <v-list-item-icon>
                            <v-icon>{{ link.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-tile-title class="text-uppercase">{{ link.text }}</v-list-tile-title>
                    </v-list-item>
                </v-list-group>


                <!--                <v-list-item v-for="link in links" :key="link.text" router :to="link.route" class="primary&#45;&#45;text">-->
                <!--                    <v-list-item-icon>-->
                <!--                        <v-icon>{{ link.icon }}</v-icon>-->
                <!--                    </v-list-item-icon>-->
                <!--                    <v-list-tile-title class="text-uppercase">{{ link.text }}</v-list-tile-title>-->
                <!--                </v-list-item>-->


                <!--                <v-list-group prepend-icon="mdi-account">-->
                <!--                    <template v-slot:activator>-->
                <!--                        <v-list-tile-title>Users</v-list-tile-title>-->
                <!--                    </template>-->

                <!--                    <v-list-group no-action sub-group value="true">-->
                <!--                        <template v-slot:activator>-->
                <!--                            <v-list-tile-title>-->
                <!--                                <v-list-tile-title>Admin</v-list-tile-title>-->
                <!--                            </v-list-tile-title>-->
                <!--                        </template>-->

                <!--                        <v-list-item v-for="(admin, i) in admins" :key="i" link>-->
                <!--                            <v-list-tile-title v-text="admin[0]"></v-list-tile-title>-->
                <!--                            <v-list-item-icon>-->
                <!--                                <v-icon v-text="admin[1]"></v-icon>-->
                <!--                            </v-list-item-icon>-->
                <!--                        </v-list-item>-->
                <!--                    </v-list-group>-->

                <!--                    <v-list-group sub-group no-action>-->
                <!--                        <template v-slot:activator>-->
                <!--                            <v-list-tile-title>-->
                <!--                                <v-list-tile-title>Actions</v-list-tile-title>-->
                <!--                            </v-list-tile-title>-->
                <!--                        </template>-->
                <!--                        <v-list-item v-for="(crud, i) in cruds" :key="i">-->
                <!--                            <v-list-tile-title v-text="crud[0]"></v-list-tile-title>-->
                <!--                            <v-list-item-action>-->
                <!--                                <v-icon v-text="crud[1]"></v-icon>-->
                <!--                            </v-list-item-action>-->
                <!--                        </v-list-item>-->
                <!--                    </v-list-group>-->
                <!--                </v-list-group>-->
            </v-list>
        </v-navigation-drawer>

    </nav>
</template>

<script>
    export default {
        data() {
            return {
                drawer: false,
                links: [
                    // {icon: "mdi-clipboard-list-outline", text: "Todo", route: "/"},
                    {icon: "mdi-playlist-check", text: "查询", route: "/metadata"},
                    {icon: "mdi-alpha-m-box-outline", text: "映射", route: "/mapping"},
                    {icon: "mdi-file-edit-outline", text: "单表操作", route: "/edit"},
                    {icon: "mdi-tumblr-reblog", text: "表结构对比", route: "/compare"},
                    {icon: "mdi-cloud-upload-outline", text: "上传", route: "/upload"},
                    {icon: "mdi-math-log", text: "操作日志", route: "/log"},

                ],
                admins: [["Management", "people_outline"], ["Settings", "settings"]],
                cruds: [
                    ["Create", "add"],
                    ["Read", "insert_drive_file"],
                    ["Update", "update"],
                    ["Delete", "delete"]
                ]
            };
        },
        methods: {
            toAbout() {
                this.$router.push("/about");
            }
        }
    };
</script>