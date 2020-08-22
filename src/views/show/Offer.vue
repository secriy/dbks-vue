<template>
    <div class="login">
        <NavBar />
        <div class="top-banner">
            <img src="@/assets/images/rl_top.png" class="img-fluid" alt="" />
        </div>
        <div class="title-line"><span class="tit">企业招聘</span></div>
        <br />
        <div class="container">
            <el-row>
                <el-col :span="8" v-for="(item, index) in listData" :key="item.id">
                    <el-card :body-style="{ padding: '0px' }">
                        <div style="padding: 14px;">
                            <span>{{ item.title }}</span>
                            <div class="bottom clearfix">
                                <time class="time">{{ timestampToTime(item.created_at) }}</time>
                                <el-button type="text" class="button" @click="dialog(index)">查看全文</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <!-- 弹出框 -->
        <el-dialog :title="text.title" :visible.sync="dialogVisible" width="50%" center>
            <span>{{ text.content }}</span>
        </el-dialog>
    </div>
</template>
<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue';
import * as API from '@/api/offers.js';

export default {
    components: {
        NavBar
    },
    data() {
        return {
            dialogVisible: false,
            listData: [],
            text: {
                title: '',
                content: ''
            },
            visible: false,
            idx: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            API.offersList().then(res => {
                this.listData = res.data;
            });
        },
        dialog(index) {
            this.idx = index;
            this.text.title = this.listData[index].title;
            this.text.content = this.listData[index].content;
            this.dialogVisible = true;
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
.top-banner {
    background: #fac8cd;
    height: 86px;
    text-align: center;
    margin-bottom: 20px;
}
.title-line {
    width: 980px;
    height: 28px;
    border-bottom: 1px solid #ddd;
    margin: 0 auto 28px;
    text-align: center;
}
.title-line .tit {
    font-size: 38px;
    height: 56px;
    line-height: 56px;
    margin: 0 auto;
    padding: 0 20px;
    background: #fff;
    text-align: center;
}
.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: '';
}

.clearfix:after {
    clear: both;
}
</style>
