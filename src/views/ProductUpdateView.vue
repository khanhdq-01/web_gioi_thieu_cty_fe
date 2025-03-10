<template lang="">
    <NavBar :name=userName :role="roleId" />
    <div class="container mt-5">
        <div class="col-12 col-lg-6">
            <h3> Update Product</h3>
            <form @submit.prevent="updateProduct()">
                <div class="mb-3">
                    <label for="name">Name</label><br>
                    <input type="text" class="form-control" v-model="item.name" id="name" placeholder="Product Name"/>
                </div>
                <div class="mb-3">
                    <label for="price">Price</label><br>
                    <input type="number" class="form-control" v-model="item.price" id="price" placeholder="Product price"/>
                </div>
                <div class="mb-3">
                    <label for="price">Current Image</label><br>
                    <img v-if="item.image" :src="url+item.image" class="object-fit-cover" style="width:100px; height:100px" >
                    <img v-else src="@/assets/images/no-image.png" class="object-fit-cover" style="width:100px; height:100px" >
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
      url:'http://localhost/web_order_food/be_order_food/storage/app/public/items/',
      productId:'',
      item: '',
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
    mounted(){
        this.productId = this.$route.params.productId
        this.userName = localStorage.getItem('name')
        this.roleId = localStorage.getItem('role_id')
        if (!this.userName || this.userName == '' || this.userName ==null){
        router.push({ name: 'login'})
        }
        if(this.roleId != 4) {
        router.push({ name: 'home'})
        }
        this.showItem()
    },
    methods: {
        showItem() {
            axios.get('http://127.0.0.1:8000/api/item/' +this.productId, {
               headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
              }
            })
            .then((response) => {
              this.item= response.data.data


            })
            .catch(function (error) {
                console.log(error);
                console.log('lỗi khi đăng nhập');
            });
        },
        updateProduct(){
            if(this.item.name ==''|| this.item.price == '') {
                alert('vui long dien thong tin')
                return;
            }
            let formData = new FormData();
            formData.append('name', this.item.name)
            formData.append('price', this.item.price)
            formData.append('image_file', this.file)
            formData.append('_method', 'patch')

            axios.post('http://127.0.0.1:8000/api/item/'+this.productId, formData, {
               headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`,
                // 'methods' : 'patch'
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