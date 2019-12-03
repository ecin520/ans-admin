<template>
    <div class="home">
        <el-menu
                class="el-menu-demo"
                default-active="1"
                mode="horizontal"
                @select="handleSelect"
                text-color="#8CC7B5"
                style="border: 0;"
                active-text-color="#D1BA74">
            <el-menu-item index="1">用户管理</el-menu-item>
            <el-menu-item index="2">用户监控</el-menu-item>
            <el-menu-item index="3">题目管理</el-menu-item>
            <el-menu-item index="4">系统管理</el-menu-item>
            <el-menu-item style="float: right">
                <el-button @click="unLogin" index="5">注销</el-button>
            </el-menu-item>
        </el-menu>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {}
        },
        methods: {
            handleSelect(index) {
                switch (index) {
                    case '1':
                        this.$router.push({name: 'User'});
                        break;
                    case '2':
                        this.$router.push({name: 'Monitor'});
                        break;
                    case '3':
                        this.$router.push({name: 'Question'});
                        break;
                    case '4':
                        this.$router.push({name: 'System'});
                        break;

                }
            },
            unLogin() {
                this.$cookies.remove('isLogin');
                this.$message({
                    message: '注销成功！',
                    type: 'success'
                });
                this.$router.push('/');
            }
        },
      created() {
          this.$router.push({name: 'User'});
      }
    }
</script>

<style scoped>
    .home {
        /*color: #f5f7f9;*/
    }
</style>
