import { Route, Routes } from "react-router-dom"
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


const AppRouter = () =>{

    return(
        <Routes>

            <Route path="/register" element={<Register/>}/>
            <Route element={<AppLayout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/items" element={<Items/>}/>
                <Route path="/itemDetails" element={<ItemDetails/>}/>
                <Route path="swap" element={<Swap/>}/>
                <Route path="contact" element={<Contact/>}/>
                <Route path="profile" element={<Profile/>}/>            
            </Route>
            <Route element={<DashLayout/>}>
                <Route path="/dashboard" element={<HomeDash/>}/>
            </Route>

        </Routes>
    )
}

export default AppRouter;