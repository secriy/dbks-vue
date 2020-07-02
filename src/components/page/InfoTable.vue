<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 企业信息管理 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table :data="infoData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column label="栏目" prop="name"> </el-table-column>
                <el-table-column label="信息" prop="value"> </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item :label="infoData[index].name">
                    <el-input v-model="infoData[index].value"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button
                    @click="
                        editVisible = false;
                        getData();
                    "
                    >取 消</el-button
                >
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import * as API from '@/api/info.js';

export default {
    name: 'basetable',
    data() {
        return {
            query: {
                pageIndex: 1,
                pageSize: 10
            },
            infoData: [
                {
                    name: '企业名称',
                    option: 'name',
                    value: ''
                },
                {
                    name: '企业地址',
                    option: 'address',
                    value: ''
                },
                {
                    name: '部门',
                    option: 'department',
                    value: ''
                },
                {
                    name: '电话',
                    option: 'phone',
                    value: ''
                },
                {
                    name: '邮箱',
                    option: 'email',
                    value: ''
                },
                {
                    name: '网站',
                    option: 'url',
                    value: ''
                }
            ],
            delList: [],
            upData: {
                name: '',
                address: '',
                department: '',
                phone: '',
                email: '',
                url: ''
            },
            editVisible: false,
            createVisible: false,
            pageTotal: 0,
            form: {},
            createForm: {},
            index: 0
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            API.infoList().then(res => {
                this.infoData[0].value = res.data.name;
                this.infoData[1].value = res.data.address;
                this.infoData[2].value = res.data.department;
                this.infoData[3].value = res.data.phone;
                this.infoData[4].value = res.data.email;
                this.infoData[5].value = res.data.url;
            });
        },
        // 删除操作
        handleDelete(index) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    API.infoDel(this.infoData[index].option).then(res => {
                        if (res.code === 0) {
                            this.$message.success('删除成功');
                        }
                        this.getData();
                    });
                })
                .catch(() => {});
        },
        // 编辑操作
        handleEdit(index) {
            this.index = index;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;

            this.upData.name = this.infoData[0].value;
            this.upData.address = this.infoData[1].value;
            this.upData.department = this.infoData[2].value;
            this.upData.phone = this.infoData[3].value;
            this.upData.email = this.infoData[4].value;
            this.upData.url = this.infoData[5].value;
            // 修改
            API.infoUpdate(this.upData).then(res => {
                if (res.code === 0) {
                    this.$message.success(`修改成功`);
                } else {
                    this.$message.error(res.msg);
                }
                this.getData();
            });
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
