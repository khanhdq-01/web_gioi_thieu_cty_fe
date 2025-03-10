<template>

    <div>
        <NavBar :name=userName :role="roleId" />
        <div class="container mt-5">
            <div class="table-response">
                <table class="table table-responsive table-bordered">
                    <tbody>
                        <tr>
                        <td>{{ order.customer_name }}</td>
                        <td>{{ order.table_no }}</td>
                        <td>{{ order.order_date }}</td>
                        <td>{{ order.status }}</td>
                    </tr>
                    <tr>
                        <td>waitress : {{ order.waitress ? order.waitress.name : '-' }} </td>
                        <td>cashier :  {{ order.cashier ? order.cashier.name : '-' }} </td>
                        <td>Order Time :  {{ order.order_time }}</td>
                        <td>Grand Total :  {{ order.total }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <hr class="my-5">
            <table class ="table table-striped">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Item Name</td>
                        <td>Price</td>
                        <td>Qty</td>
                        <td>Total</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in order.order_detail" :key="index">
                        <td>{{ index+1 }}</td>
                        <td>{{ item.item ? item.item.name : '-' }}</td>
                        <td>Rp {{ item.price }}</td>
                        <td>{{ item.qty }}</td>
                        <td>Rp {{ item.price * item.qty }}</td>

                    </tr>
                </tbody>
            </table>

            <!-- done if user is chef and order.status == ordered -->
            <!-- done if user is cashier or manager and order.status == done -->
             <div class="mt-3">
                <button v-if="(order.status == 'ordered') && (roleId ==2)" class="btn btn-primary" @click="setAsDone(order.id)">Done</button>
                <button v-if="(order.status == 'done') && (roleId == 3 ||roleId==4)" class="btn btn-primary" @click="setAsPaid(order.id)">Paid</button>

             </div>

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
        order:''
        }
    },
    mounted(){
        this.userName = localStorage.getItem('name')
        this.roleId = localStorage.getItem('role_id')

        if (!this.userName || this.userName == '' || this.userName ==null){
        router.push({ name: 'login'})
        }
        this.getOrder()
    },
    methods: {
        
        getOrder() {
            axios.get('http://127.0.0.1:8000/api/order/' +this.$route.params.orderId, {
               headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`,
              }
            })
            .then((response) => {
                // console.log(response.data)
                this.order = response.data.data
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
        setAsDone(orderId) {
            axios.get('http://127.0.0.1:8000/api/order/' + orderId + '/set-as-done' , {
               headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`,
              }
            })
            .then((response) => {
                if(response.status == 200){
                    alert('thay đổi trạng thái đơn hàng thành thực hiện thành công')
                }
                this.order = response.data.data
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
        setAsPaid(orderId) {
            axios.get('http://127.0.0.1:8000/api/order/' + orderId + '/payment' , {
               headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`,
              }
            })
            .then((response) => {
                if(response.status == 200){
                    alert('thay đổi đơn đặt hàng đã thanh toán thành thực hiện thành công')
                }
                this.order = response.data.data
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
        }
            
    }
}
</script>
<style lang="">
    
</style>