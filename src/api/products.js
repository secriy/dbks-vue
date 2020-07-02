import axios from 'axios';

// 产品列表
const productsList = () => axios.get('/api/products/all').then(res => res.data);

// 产品创建
const productsAdd = addForm => axios.post('/api/products/add', addForm).then(res => res.data);

// 产品删除
const productsDel = id => axios.delete(`/api/products/del/${id}`).then(res => res.data);

// 产品更新
const productsUpdate = (id, updateForm) => axios.put(`/api/products/update/${id}`, updateForm).then(res => res.data);

export { productsList, productsAdd, productsDel, productsUpdate };
