<template>
    <div class="login">
        <NavBar />
        <div class="top-banner">
            <img src="@/assets/images/rl_top.png" class="img-fluid" alt="" />
        </div>
        <div class="title-line"><span class="tit">资料</span></div>
        <br />
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-4">
                    <div class="alert alert-primary">企业名称：{{ infoData[0].value }}</div>
                    <div class="alert alert-primary">地址：{{ infoData[1].value }}</div>
                    <div class="alert alert-primary">部门：{{ infoData[2].value }}</div>
                    <div class="alert alert-primary">电话：{{ infoData[3].value }}</div>
                    <div class="alert alert-primary">邮箱：{{ infoData[4].value }}</div>
                    <div class="alert alert-primary">网站：{{ infoData[5].value }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue';
import * as API from '@/api/info.js';

export default {
    name: 'Info',
    components: {
        NavBar
    },
    data() {
        return {
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
            ]
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
</style>
<style src="@/assets/css/bootstrap.min.css" scoped></style>
