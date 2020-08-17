<template>
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #FFEDF5;">
        <router-link class="navbar-brand" to="/"><img src="@/assets/logo.png" width="160"/></router-link>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <router-link class="nav-link" to="/info">企业信息<span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/new">企业新闻</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/product">产品信息</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/offer">招聘信息</router-link>
                </li>
            </ul>
        </div>
        <div class="input-group col-md-2">
            <input type="text" class="form-control" placeholder="搜索框" aria-label="search" aria-describedby="button-addon2" />
            <div class="input-group-append">
                <button class="btn btn-secondary" type="button" id="button-addon2" style="background-color:#7C686A">
                    搜索
                </button>
            </div>
        </div>
        <div class="btn-group" role="group" aria-label="Example">
            <button class="btn btn-primary" type="button" style="background-color:#FFA0B1;border:none" @click="loginPage">
                登录
            </button>
        </div>
    </nav>
</template>

<script>
export default {
    methods: {
        loginPage() {
            this.$router.push('/login');
        }
    }
};
</script>
<style src="@/assets/css/bootstrap.min.css" scoped></style>
