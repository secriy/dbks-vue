<template>
    <div>
        <el-row :gutter="20">
            <el-row :gutter="29" class="mgb20">
                <el-col :span="8">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }">
                        <div class="grid-content grid-con-1">
                            <i class="el-icon-setting grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <div class="grid-num">{{ username }}</div>
                                <div>{{ role }}</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8" v-if="auth === 'admin'">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }">
                        <div class="grid-content grid-con-2">
                            <i class="el-icon-lx-people grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <div class="grid-num">{{ user_num }}</div>
                                <div>总用户数</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-row>
    </div>
</template>

<script>
import bus from '../common/bus';
import * as API from '@/api/user.js';

export default {
    name: 'dashboard',
    data() {
        return {
            auth: sessionStorage.getItem('auth'),
            user_num: null
        };
    },
    computed: {
        role() {
            return this.auth === 'admin' ? '管理员' : '普通用户';
        },
        username() {
            let username = sessionStorage.getItem('username');
            return username ? username : this.name;
        }
    },
    created() {
        API.userList().then(res => {
            this.user_num = res.data.length;
        });
    },
    activated() {
        API.userList().then(res => {
            this.user_num = res.data.length;
        });
    },
    methods: {}
};
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}
</style>
