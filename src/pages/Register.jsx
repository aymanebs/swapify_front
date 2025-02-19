import { ArrowLeftRight } from "lucide-react"
import { Link } from "react-router-dom"


export const Register = ()=>{
    return(
    <div className="min-h-screen ">
        <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
            <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
                alt=""
                src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                className="absolute inset-0 h-full w-full object-cover"
            />
            </aside>

            <main
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
            >
            <div className="max-w-xl lg:max-w-3xl">
                <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-all duration-300 transform hover:scale-105">
                    <ArrowLeftRight className="h-8 w-8" />
                    <span className="text-xl font-bold">Swapify</span>
                </Link>

                <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Swapify  
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
                quibusdam aperiam voluptatum.
                </p>

                <form action="#" className="mt-8 grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                    First Name
                    </label>

                    <input
                    type="text"
                    id="FirstName"
                    name="first_name"
                    className="mt-1 py-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                    />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                    </label>

                    <input
                    type="text"
                    id="LastName"
                    name="last_name"
                    className="mt-1 py-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                    />
                </div>

                <div className="col-span-6">
                    <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

                    <input
                    type="email"
                    id="Email"
                    name="email"
                    className="mt-1 py-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                    />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

                    <input
                    type="password"
                    id="Password"
                    name="password"
                    className="mt-1 py-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                    />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
                    Password Confirmation
                    </label>

                    <input
                    type="password"
                    id="PasswordConfirmation"
                    name="password_confirmation"
                    className="mt-1 py-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                    />
                </div>

                <div className="col-span-6">
                    <label htmlFor="MarketingAccept" className="flex gap-4">
                    <input
                        type="checkbox"
                        id="MarketingAccept"
                        name="marketing_accept"
                        className="size-5 rounded-md border border-gray-200 bg-white shadow-xs"
                    />

                    <span className="text-sm text-gray-700">
                        I want to receive emails about events, product updates and company announcements.
                    </span>
                    </label>
                </div>

                <div className="col-span-6">
                    <p className="text-sm text-gray-500">
                    By creating an account, you agree to our
                    <a href="#" className="text-gray-700 underline"> terms and conditions </a>
                    and
                    <a href="#" className="text-gray-700 underline">privacy policy</a>.
                    </p>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                    <button
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden"
                    >
                    Create an account
                    </button>

                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Already have an account?
                    <a href="#" className="text-gray-700 underline">Log in</a>.
                    </p>
                </div>
                </form>
            </div>
            </main>
        </div>
        </section>
    </div>
    )
}