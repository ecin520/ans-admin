<template>
    <div class="user">
        <el-container>
            <el-container>
                <el-aside width="200px">
                    <el-menu default-active="1"
                             style="width: 180px;border: 0;height: 800px;"
                             text-color="#8CC7B5"
                             active-text-color="#D1BA74" @select="handleSelect">
                        <el-menu-item index="1">
                            <i class="el-icon-user"></i>
                            <span slot="title">用户管理</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <i class="el-icon-loading"></i>
                            <span slot="title">角色管理</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-key"></i>
                            <span slot="title">权限管理</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                  <router-view/>
                </el-main>
            </el-container>

        </el-container>
    </div>
</template>

<script>
    export default {
        name: "User",
        data() {
            return {
            }
        },
        methods: {
            handleSelect(index) {
                switch (index) {
                    case '1':
                        this.$router.push({path: '/UserManager'});
                        break;
                    case '2':
                        this.$router.push({path: '/RoleManager'});
                        break;
                    case '3':
                        this.$router.push({path: '/PermissionManager'});
                        break;
                }
            }
        },
        created() {
            this.$router.push({path: '/UserManager'});
        }
    }
</script>

<style scoped>

</style>
