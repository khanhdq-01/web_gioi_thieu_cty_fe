<template lang="">
    <NavBar :name=userName :role="roleId" />
    <div class="container mt-5">
        <div class="col-12 col-lg-6">
            <h3> Add New Product</h3>
            <form @submit.prevent="createProduct()">
                <div class="mb-3">
                    <label for="name">Name</label><br>
                    <input type="text" class="form-control" v-model="name" id="name" placeholder="Product Name"/>
                </div>
                <div class="mb-3">
                    <label for="price">Price</label><br>
                    <input type="number" class="form-control" v-model="price" id="price" placeholder="Product price"/>
                </div>
                <div class="mb-3">
                    <label for="image">Image</label><br>
                    <input type="file" class="form-control" @change="imageChanged($event)" id="image"/>
                </div>
                <div class="mb-3">
                  <button class="btn btn-success form-control" type="submit">Save</button>
                </div>
            </form>
        </div>
       
    </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'
import router from '@/router'
import axios from 'axios'

export default {
    components:{
         NavBar
        },
        data() {
    return {
      userName: '',
      roleId :'',
      items: [],
      url:'http://localhost/web_order_food/be_order_food/storage/app/public/items/',
      name:'',
      price:'',
      file:''
        }
    },
    mounted(){
        this.userName = localStorage.getItem('name')
        this.roleId = localStorage.getItem('role_id')
        if (!this.userName || this.userName == '' || this.userName ==null){
        router.push({ name: 'login'})
        }
        if(this.roleId != 4) {
        router.push({ name: 'home'})
        }
    },
    methods: {
        createProduct() {
            if(this.name ==''|| this.price == '') {
                alert('vui long dien thong tin')
                return;
            }

            let formData = new FormData();
            formData.append('name', this.name)
            formData.append('price', this.price)
            formData.append('image_file', this.file)

            axios.post('http://127.0.0.1:8000/api/item', formData, {
               headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`,
                'content-type' : 'multipart/form-data'
              }
            })
            .then((response) => {
                router.push({ name: 'product'})
            })
            .catch(function (error) {
                if(error.response.status == 401){
                    localStorage.removeItem('token')
                    localStorage.removeItem('email')
                    localStorage.removeItem('name')
                    localStorage.removeItem('role_id')
                    
                    router.push({ name: 'login'})
                }
                console.log(error);
                console.log('lỗi khi đăng nhập');
            });
        },
        imageChanged(e){
        let file = e.target.files[0];
        this.file = file
   
        }
    }
}
</script>
<style lang="">
    
</style>