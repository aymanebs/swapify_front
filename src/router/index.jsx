import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import AppLayout from "../components/layouts/AppLayout";
import Home from "../pages/Home";
import ItemDetails from "../pages/ItemDetails";
import { Items } from "../pages/Items";
import { Register } from "../pages/Register";
import Contact from "../pages/Contact";
import Swap from "../pages/Swap";
import Profile from "../pages/Profile";
import DashLayout from "../components/layouts/DashLayout";
import HomeDash from "../pages/Dashboard";
import UsersTable from "../pages/Dashboard/UsersTable";
import CategoriesTable from "../pages/Dashboard/CategoriesTable";
import ItemsTable from "../pages/Dashboard/ItemsTable";
import { useSelector } from "react-redux";


const AppRouter = () =>{

    const ProtectedRoutes = ()=>{
        const isLoggedIn = useSelector((state)=> state.users.isLoggedIn);
        return isLoggedIn ? <Outlet/> : <Navigate to="/" replace/>;
    }

    return(
        <Routes>
            {/* Main routes */}
            <Route path="/register" element={<Register/>}/>
            <Route element={<AppLayout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/items" element={<Items/>}/>
                <Route path="/itemDetails/:itemId" element={<ItemDetails/>}/>
                <Route path="contact" element={<Contact/>}/>
                <Route element={<ProtectedRoutes/>}>
                    <Route path="swap" element={<Swap/>}/>
                    <Route path="profile" element={<Profile/>}/>    
                </Route>        
            </Route>

            {/* Dashboard Routes */}

            <Route element={<ProtectedRoutes/>}>
            <Route path="/dashboard" element={<DashLayout/>}>
                <Route path="" element={<HomeDash/>}/>
                <Route path="users" element={<UsersTable/>}/>
                <Route path="categories" element={<CategoriesTable/>}/>
                <Route path="items" element={<ItemsTable/>} />
            </Route>
            </Route>

        </Routes>
    )
}

export default AppRouter;