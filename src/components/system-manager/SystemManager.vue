<template>
  <div class="monitor">
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        style="width: 160px;border: 0;height: 100%;"
        text-color="#8CC7B5"
        active-text-color="#D1BA74">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">用户状态</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">答题状态</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <span slot="title">聊天监控</span>
      </el-menu-item>
      <el-menu-item v-for="i in lists"></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                lists: [1,2,3,4,5,6,7,8,9,10]
            }
        }
    }
</script>

<style scoped>

</style>