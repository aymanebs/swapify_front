import { ArrowLeftRight } from "lucide-react"
import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { register } from "../services/authApi";
import { toast } from "react-toastify";


export const Register = ()=>{

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
    
        if (!formData.first_name.trim()) {
          newErrors.first_name = "First name is required";
        } else if (formData.first_name.length < 3) {
          newErrors.first_name = "First name must be at least 3 characters";
        } else if (formData.first_name.length > 20) {
          newErrors.first_name = "First name must be less than 20 characters";
        }
    
        if (!formData.last_name.trim()) {
          newErrors.last_name = "Last name is required";
        } else if (formData.last_name.length < 3) {
          newErrors.last_name = "Last name must be at least 3 characters";
        } else if (formData.last_name.length > 20) {
          newErrors.last_name = "Last name must be less than 20 characters";
        }
    
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Invalid email address";
        }
    
        if (!formData.password.trim()) {
          newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
          newErrors.password = "Password must be at least 8 characters";
        }
    
        if (!formData.confirm_password.trim()) {
          newErrors.confirm_password = "Confirm password is required";
        } else if (formData.confirm_password !== formData.password) {
          newErrors.confirm_password = "Passwords do not match";
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    


    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!validateForm()) {
            return;
          }
        setIsLoading(true);
        try{
            const response= await register(formData);
            if(response.status == 201){
                toast.success('User registred',{theme: "colored"});
                navigate('/')
            }
        }
        catch(error){
            setIsLoading(false);
            toast.error('Failed to register user',{theme: "colored"});
            console.error('Failed to register user',error);
        }
        finally{
            setIsLoading(false);
        }
        
    }

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData({...formData,[name]: value});
    }

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
                <Link to="/" className="flex items-center gap-2 text-sky-600 hover:text-sky-700 transition-all duration-300 transform hover:scale-105">
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

                <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                    First Name
                    </label>

                    <input
                    onChange={handleChange}
                    value={formData.first_name}
                    type="text"
                    id="FirstName"
                    name="first_name"
                    className="mt-1 py-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                    />
                    {errors.first_name && (
                    <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                    </label>

                    <input
                    value={formData.last_name}
                    onChange={handleChange}
                    type="text"
                    id="LastName"
                    name="last_name"
                    className="mt-1 py-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                    />
                    {errors.last_name && (
                    <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
                  )}
                </div>

                <div className="col-span-6">
                    <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

                    <input
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    id="Email"
                    name="email"
                    className="mt-1 py-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                    />
                    {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

                    <input
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    id="Password"
                    name="password"
                    className="mt-1 py-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                    />
                    {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
                    Password Confirmation
                    </label>

                    <input
                    value={formData.confirm_password}
                    onChange={handleChange}
                    type="password"
                    id="PasswordConfirmation"
                    name="confirm_password"
                    className="mt-1 py-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                    />
                    {errors.confirm_password && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirm_password}</p>
                  )}
                </div>



                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                    <button
                    className="inline-block shrink-0 rounded-md border border-sky-600 bg-sky-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-sky-600 focus:ring-3 focus:outline-hidden"
                    disabled={isLoading}
                    >
                        {isLoading ? (
                        <span className="flex items-center justify-center">
                            <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                            </svg>
                            Creating...
                        </span>
                        ) : (
                        'Create an account'
                        )}
                    
                    </button>

                </div>
                </form>
            </div>
            </main>
        </div>
        </section>
    </div>
    )
}