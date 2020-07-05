import axios from 'axios';

// 企业招聘列表
const offersList = () => axios.get('/api/offers/all').then(res => res.data);

// 企业招聘创建
const offersAdd = addForm => axios.post('/api/offers/add', addForm).then(res => res.data);

// 企业招聘删除
const offersDel = id => axios.delete(`/api/offers/del/${id}`).then(res => res.data);

// 企业招聘更新
const offersUpdate = (id, updateForm) => axios.put(`/api/offers/update/${id}`, updateForm).then(res => res.data);

export { offersList, offersAdd, offersDel, offersUpdate };
