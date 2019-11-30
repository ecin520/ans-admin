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
            <el-menu-item index="2">实时监控</el-menu-item>
            <el-menu-item index="3">系统管理</el-menu-item>
            <el-menu-item index="4">题目管理</el-menu-item>
            <el-menu-item style="float: right">
                <el-button index="5">注销</el-button>
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
                        this.$router.push({name: 'SystemManager'});
                        break;
                    case '4':
                        this.$router.push({name: 'QuestionManager'});
                        break;

                }
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
