import { Outlet } from "react-router-dom"
import { Footer } from "../Footer"
import { Navbar } from "../../components/Navbar"

const AppLayout = () =>{
    return(
        <>
        <Navbar/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
        </>
    )
}

export default AppLayout;