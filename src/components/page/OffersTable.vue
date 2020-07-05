<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 企业招聘管理 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
                <el-button type="primary" icon="el-icon-edit" @click="handleCreate()">创建企业招聘</el-button>
            </div>
            <el-table
                :data="
                    tableData === null
                        ? tableData
                        : tableData.slice((query.pageIndex - 1) * query.pageSize, query.pageIndex * query.pageSize)
                "
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column label="标题">
                    <template slot-scope="scope">{{ scope.row.title }}</template>
                </el-table-column>
                <el-table-column label="内容">
                    <template slot-scope="scope">{{ scope.row.content }}</template>
                </el-table-column>
                <el-table-column label="创建时间">
                    <template slot-scope="scope"> {{ timestampToTime(scope.row.created_at) }}</template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row, scope.row.id)"
                            >编辑</el-button
                        >
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row, scope.row.id)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    :hide-on-single-page="hideOnSinglePage"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="标题">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input v-model="form.content"></el-input>
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

        <!-- 创建弹出框 -->
        <el-dialog title="创建" :visible.sync="createVisible" width="30%">
            <el-form ref="form" :model="createForm" label-width="70px">
                <el-form-item label="标题">
                    <el-input v-model="createForm.title"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input v-model="createForm.content"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button
                    @click="
                        createVisible = false;
                        getData();
                    "
                    >取 消</el-button
                >
                <el-button type="primary" @click="saveCreate">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import * as API from '@/api/offers.js';

export default {
    data() {
        return {
            query: {
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            editVisible: false,
            createVisible: false,
            pageTotal: 0,
            form: {},
            createForm: {},
            idx: -1,
            id: -1,
            hideOnSinglePage: true
        };
    },
    created() {
        this.getData();
    },
    watch: {
        // 监听分页
        pageTotal() {
            if (this.pageTotal == (this.query.pageIndex - 1) * this.query.pageSize && this.pageTotal != 0) {
                this.query.pageIndex -= 1;
                console.log('监听');
                this.getData(); //获取列表数据
            }
        }
    },
    methods: {
        getData() {
            API.offersList().then(res => {
                this.tableData = res.data;
                this.pageTotal = res.data !== null ? res.data.length : 0;
            });
        },
        // 处理创建
        handleCreate() {
            this.createVisible = true;
        },
        // 保存创建
        saveCreate() {
            this.createVisible = false;
            API.offersAdd(this.createForm).then(res => {
                if (res.code === 0) {
                    this.$message.success(`创建企业招聘成功`);
                } else {
                    this.$message.error(res.msg);
                }
                this.getData();
            });
        },
        // 删除操作
        handleDelete(index, row, id) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    API.offersDel(id).then(res => {
                        if (res.code === 0) {
                            this.$message.success('删除成功');
                            this.getData();
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        async delAllSelection() {
            const length = this.multipleSelection.length;
            if (length !== 0) {
                let str = '';
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].id + ' ';
                    await API.offersDel(this.multipleSelection[i].id).then(res => {
                        if (res.code === 0) {
                            if (i === length - 1) {
                                this.$message.success(`删除了${str}`);
                            }
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
                }
                this.multipleSelection = [];
                this.getData();
            }
        },
        // 编辑操作
        handleEdit(index, row, id) {
            this.idx = index;
            this.form = row;
            this.id = id;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            API.offersUpdate(this.id, this.form).then(res => {
                if (res.code === 0) {
                    this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                    this.$set(this.tableData, this.idx, this.form);
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        // 时间格式化
        timestampToTime(time, format = 'YY-MM-DD hh:mm:ss') {
            var date = new Date(time * 1000);
            var year = date.getFullYear(),
                month = date.getMonth() + 1, //月份是从0开始的
                day = date.getDate(),
                hour = date.getHours(),
                min = date.getMinutes(),
                sec = date.getSeconds();
            var preArr = Array.apply(null, Array(10)).map(function(elem, index) {
                return '0' + index;
            }); //开个长度为10的数组 格式为 ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"]

            var newTime = format
                .replace(/YY/g, year)
                .replace(/MM/g, preArr[month] || month)
                .replace(/DD/g, preArr[day] || day)
                .replace(/hh/g, preArr[hour] || hour)
                .replace(/mm/g, preArr[min] || min)
                .replace(/ss/g, preArr[sec] || sec);

            return newTime;
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
