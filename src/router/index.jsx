import { Route, Routes } from "react-router-dom"
import AppLayout from "../components/layouts/AppLayout";
import Home from "../pages/Home";
import ItemDetails from "../pages/ItemDetails";
import { Items } from "../pages/Items";
import { Register } from "../pages/Register";
import Contact from "../pages/Contact";


const AppRouter = () =>{

    return(
        <Routes>

            <Route path="/register" element={<Register/>}/>
            <Route element={<AppLayout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/items" element={<Items/>}/>
                <Route path="/itemDetails" element={<ItemDetails/>}/>
                <Route path="contact" element={<Contact/>}/>
            </Route>

        </Routes>
    )
}

export default AppRouter;