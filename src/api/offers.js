import axios from 'axios';

// 招聘信息列表
const offersList = () => axios.get('/api/offers/all').then(res => res.data);

// 招聘信息创建
const offersAdd = addForm => axios.post('/api/offers/add', addForm).then(res => res.data);

// 招聘信息删除
const offersDel = id => axios.delete(`/api/offers/del/${id}`).then(res => res.data);

// 招聘信息更新
const offersUpdate = (id, updateForm) => axios.put(`/api/offers/update/${id}`, updateForm).then(res => res.data);

export { offersList, offersAdd, offersDel, offersUpdate };
