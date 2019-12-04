<template>
    <div class="classification">
        <el-button type="success" @click="showAddTypeDislog">添加类型</el-button>
        <el-button type="success" @click="showAddQuestionDislog">添加题目</el-button>
        <br><br>
        <el-table
            v-loading="loading"
            :data="classificationData"
            highlight-current-row
            style="width: 98%"
            border @row-click="rowClick">
            <el-table-column prop="id" label="ID" ></el-table-column>
            <el-table-column prop="type_name" label="类型名" ></el-table-column>
            <el-table-column prop="type_describe" label="类型描述" ></el-table-column>
            <el-table-column prop="hot" label="热度" ></el-table-column>
            <el-table-column prop="difficulty" label="难度" ></el-table-column>
            <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="doit(scope.$index, scope.row)">操作</el-button>
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

        <el-dialog
            title="添加题目"
            :visible.sync="addQuestionDialog"
            :show-close="false"
            top="1vh"
            width="650px">
            <el-form
                label-position="left"
                label-width="100px"
                :mode="question">
                <el-form-item label="">
                    <el-link style="font-size: 1.5em" type="success" disabled>{{question.type_name}}</el-link>&nbsp;&nbsp;
                    <el-button @click="addRadioBtnDialog = true">添加类型(必选)</el-button>
                </el-form-item>
                <el-form-item label="题目描述">
                    <el-input v-model="question.question_describe"></el-input>
                </el-form-item>
                <el-form-item label="题目解释">
                    <el-input type="textarea" v-model="question.question_explain"></el-input>
                </el-form-item>
                <el-form-item label="选项A">
                    <el-input v-model="question.item_a"></el-input>
                </el-form-item>
                <el-form-item label="选项B">
                    <el-input v-model="question.item_b"></el-input>
                </el-form-item>
                <el-form-item label="选项C">
                    <el-input v-model="question.item_c"></el-input>
                </el-form-item>
                <el-form-item label="选项D">
                    <el-input v-model="question.item_d"></el-input>
                </el-form-item>
                <el-form-item label="正确选项">
                    <el-radio-group v-model="question.item_ans">
                        <el-radio-button label="A"></el-radio-button>
                        <el-radio-button label="B"></el-radio-button>
                        <el-radio-button label="C"></el-radio-button>
                        <el-radio-button label="D"></el-radio-button>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addQuestionClick">Submit</el-button>
            </span>
        </el-dialog>

        <el-dialog
            :visible.sync="addRadioBtnDialog"
            :show-close="false"
            width="450px">
            <div style="display: inline;" v-for="(item, index) in classificationData">
                <el-radio
                    style="margin: 10px;"
                    border
                    v-model="question.type_name"
                    :label="item.type_name">{{item.type_name}}
                </el-radio>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmAddType">确认</el-button>
            </span>
        </el-dialog>

        <el-dialog
            :visible.sync="typeQuestionDialog"
            :show-close="false"
            top="1vh"
            width="990px">
            <el-table
                :resizable="false"
                show-overflow-tooltip
                :data="question"
                highlight-current-row
                :border="true"
                @row-click="">
                <el-table-column align="center" width="60" prop="id" label="ID" ></el-table-column>
                <el-table-column align="center" prop="type_name" label="类型" ></el-table-column>
                <el-table-column align="center" prop="question_owner" label="作者" ></el-table-column>
                <el-table-column align="center" prop="question_describe" label="问题描述" ></el-table-column>
                <el-table-column align="center" prop="question_explain" label="问题解释" ></el-table-column>
                <el-table-column align="center" prop="item_a" label="A" ></el-table-column>
                <el-table-column align="center" prop="item_b" label="B" ></el-table-column>
                <el-table-column align="center" prop="item_c" label="C" ></el-table-column>
                <el-table-column align="center" prop="item_d" label="D" ></el-table-column>
                <el-table-column align="center" prop="item_ans" label="正确选项" ></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="">确认</el-button>
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
                question: [
                    {
                        'id': '',
                        'type_name': '',
                        'question_owner': '',
                        'question_describe': '',
                        'question_explain': '',
                        'item_a': '',
                        'item_b': '',
                        'item_c': '',
                        'item_d': '',
                        'item_ans': ''
                    }
                ],
                addTypeDialog: false,
                addQuestionDialog: false,
                addRadioBtnDialog: false,
                typeQuestionDialog: false,
                owner: ''

            }
        },
        methods: {
            showAddTypeDislog() {
                this.addTypeDialog = true;
            },
            showAddQuestionDislog() {
                this.addQuestionDialog = true;
            },
            confirmAddType() {
                this.$axios({
                    url: '/api/client/type/insertType',
                    method: 'get',
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
                        message: error,
                        type: 'error'
                    });
                });
            },
            addQuestionClick() {

                this.$axios({
                    url: '/api/client/user/getUserByUsername',
                    method: 'post',
                    params: {
                        'username': this.$cookies.get('user')
                    }
                }).then(response => {
                    this.owner = response.data.id;
                }).catch(error => {
                    this.$message({
                        message: error,
                        type: 'error'
                    });
                });


                this.$axios({
                    url: '/api/client/question/insertQuestion',
                    method: 'post',
                    data: {
                        'type_name': this.question.type_name,
                        'question_owner': this.owner,
                        'question_describe': this.question.question_describe,
                        'question_explain': this.question.question_explain,
                        'item_a': this.question.item_a,
                        'item_b': this.question.item_b,
                        'item_c': this.question.item_c,
                        'item_d': this.question.item_d,
                        'item_ans': this.question.item_ans
                    }
                }).then(response => {
                    this.$message({
                        message: response.data,
                        type: 'success'
                    });
                }).catch(error => {
                    this.$message({
                        message: '前端错误',
                        type: 'error'
                    });
                });
            },
            rowClick(row) {
                this.typeQuestionDialog = true;
                this.$axios({
                    url: '/api/client/question/getQuestionsByTypeName',
                    method: 'post',
                    params: {
                        'typeName': row.type_name
                    }
                }).then(response => {
                    this.question = response.data;
                }).catch(error => {
                    this.$message({
                        message: error,
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

<style scoped lang="less">
    .classification {

    }

</style>
