import axios from 'axios';

// 用户登录
const userLogin = loginForm =>
    axios
        .post('/api/user/login', loginForm)
        .then(res => res.data)
        .catch(error => {
            console.log(error.response);
        });
// 当前用户
const userMe = loginForm => axios.get('/api/user/me', loginForm).then(res => res.data);
// 用户登出
const userLogout = () => axios.delete('/api/user/logout').then(res => res.data);
// 用户创建
const userAdd = addForm => axios.post('/api/user/add', addForm).then(res => res.data);
// 用户列表
const userList = () => axios.get('/api/user/all').then(res => res.data);
// 用户删除
const userDel = id => axios.delete(`/api/user/del/${id}`).then(res => res.data);
// 用户更新
const userUpdate = (id, updateForm) => axios.put(`/api/user/update/${id}`, updateForm).then(res => res.data);
// 修改密码
const changePass = passForm => axios.put(`/api/user/pass`, passForm).then(res => res.data);

export { userLogin, userMe, userLogout, userList, userDel, userUpdate, userAdd, changePass };
