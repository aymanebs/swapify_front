import { Route, Routes } from "react-router-dom"
import AppLayout from "../components/layouts/AppLayout";
import Home from "../pages/Home";


const AppRouter = () =>{

    return(
        <Routes>
            <Route element={<AppLayout/>}>
                <Route path="/" element={<Home/>}/>
            </Route>
        </Routes>
    )
}

export default AppRouter;