import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import About from './pages/About'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Shop from './pages/Shop'
import Login from './pages/Login'
import Policy from './pages/Policy'
import Profile from './pages/Profile'
import AdminDashboard from './admin/AdminDashboard'
import AdminRegister from './admin/AdminRegister'
import AdminUsers from './admin/AdminUsers'
import AdminUserManage from './admin/AdminUserManage'
import AdminMessages from './admin/AdminMessages'
import FarmerDashboard from './farmer/FarmerDashboard'
import FarmerReviews from './farmer/FarmerReviews'
import FarmerProducts from './farmer/FarmerProducts'
import FarmerAddProduct from './farmer/FarmerAddProduct'
import FarmerManageProducts from './farmer/FarmerManageProducts'
import AdminProducts from './admin/AdminProducts'
import AdminManageProducts from './admin/AdminManageProducts'
import EditProfile from './pages/EditProfile'
import FarmerEditProduct from './farmer/FarmerEditProduct'
import ForgotPassword from './pages/ForgotPassword'
import Product from './pages/Product'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={<Register />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/edit-profile/:id' element={<EditProfile />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/register' element={<AdminRegister />} />
        <Route path='/admin/users' element={<AdminUsers />} />
        <Route path='/admin/products' element={<AdminProducts />} />
        <Route path='/admin/manage-products' element={<AdminManageProducts />} />
        <Route path='/admin/users/manage' element={<AdminUserManage />} />
        <Route path='/admin/messages' element={<AdminMessages />} />
        <Route path='/farmer/dashboard' element={<FarmerDashboard />} />
        <Route path='/farmer/products' element={<FarmerProducts />} />
        <Route path='/farmer/add-product' element={<FarmerAddProduct />} />
        <Route path='/farmer/edit-product/:id' element={<FarmerEditProduct />} />
        <Route path='/farmer/manage-product' element={<FarmerManageProducts />} />
        <Route path='/farmer/review/:id' element={<FarmerReviews />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
