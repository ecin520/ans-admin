<template>
    <div class="classification">
        <el-button type="success" @click="showAddTypeDislog">添加类型</el-button><br><br>
        <el-table :data="classificationData" highlight-current-row style="width: 98%"  border @row-click="rowClick">
            <el-table-column prop="id" label="ID" ></el-table-column>
            <el-table-column prop="type_name" label="类型名" ></el-table-column>
            <el-table-column prop="type_describe" label="类型描述" ></el-table-column>
            <el-table-column prop="hot" label="热度" ></el-table-column>
            <el-table-column prop="difficulty" label="难度" ></el-table-column>
            <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="grantPermission(scope.$index, scope.row)">操作</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
                title="添加类型"
                :visible.sync="addTypeDialog"
                :show-close="false"
                width="550px">
            <el-form label-position="left" label-width="100px" :mode="type">
                <el-form-item label="类型名称">
                    <el-input v-model="type.type_name"></el-input>
                </el-form-item>
                <el-form-item label="类型描述">
                    <el-input v-model="type.type_describe"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmAddType">确认</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "QuestionClassification",
        data() {
            return {
                classificationData: [
                    {
                        id: '',
                        type_name: '',
                        type_describe: '',
                        hos: '',
                        difficulty: ''
                    }
                ],
                type: [
                    {
                        type_name: '',
                        type_describe: '',
                    }
                ],
                addTypeDialog: false
            }
        },
        methods: {
            showAddTypeDislog() {
                this.addTypeDialog = true;
            },
            confirmAddType() {
                this.$axios({
                    url: '/api/client/type/insertType',
                    method: 'post',
                    data: {
                        'type_name': this.type.type_name,
                        'type_describe': this.type.type_describe
                    }
                }).then(response => {
                    this.$message({
                        message: response.data,
                        type: 'success'
                    });
                }).catch(error => {
                    this.$message({
                        message: 'Error',
                        type: 'error'
                    });
                });
            }
        },
        created() {
            this.$axios({
                url: '/api/client/type/listAllType',
                method: 'get'
            }).then(response => {
                this.classificationData = response.data
            }).catch(error => {
                this.$message({
                    message: 'Error',
                    type: 'error'
                });
            });
        }
    }
</script>

<style scoped>

</style>
