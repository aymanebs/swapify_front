import { Route, Routes } from "react-router-dom"
import AppLayout from "../components/layouts/AppLayout";
import Home from "../pages/Home";
import ItemDetails from "../pages/ItemDetails";
import { Items } from "../pages/Items";


const AppRouter = () =>{

    return(
        <Routes>
            <Route element={<AppLayout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/items" element={<Items/>}/>
                <Route path="/itemDetails" element={<ItemDetails/>}/>
            </Route>
        </Routes>
    )
}

export default AppRouter;