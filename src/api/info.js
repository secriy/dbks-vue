import axios from 'axios';

// 企业信息列表
const infoList = () => axios.get('/api/info/all').then(res => res.data);

// 企业信息删除
const infoDel = option => axios.delete(`/api/info/del/${option}`).then(res => res.data);

// 企业信息更新
const infoUpdate = upData => axios.put(`/api/info/update`, upData).then(res => res.data);

export { infoList, infoDel, infoUpdate };
