<template>
    <div class="monitor">
        <el-container>
            <el-aside width="200px">
                <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo"
                        style="width: 180px;border: 0;height: 100%;"
                        text-color="#8CC7B5"
                        active-text-color="#D1BA74"
                        @select="handleSelect">
                    <el-menu-item index="1">
                        <i class="el-icon-loading"></i>
                        <span slot="title">题目分类</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-loading"></i>
                        <span slot="title">答题状态</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-loading"></i>
                        <span slot="title">题目审核</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            handleSelect(index) {
                switch (index) {
                    case '1':
                        this.$router.push({path: '/Classification'});
                        break;
                    case '2':
                      this.$router.push({path: '/Classification'});
                        break;
                    case '3':
                      this.$router.push({path: '/Classification'});
                        break;
                }
            }
        },
        created() {
            this.$router.push({path: '/Classification'});
        }
    }
</script>

<style scoped>

</style>
