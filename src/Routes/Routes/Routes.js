import { createBrowserRouter } from "react-router-dom"
import DashboardLayout from "../../Layout/DashboardLayout"
import Main from "../../Layout/Main"
import About from "../../Pages/About/About"
import Appointment from "../../Pages/Appointment/Appointment/Appointment"
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers"
import AddDoctor from "../../Pages/Dashboard/Dashboard/AddDoctor/AddDoctor"
import ManageDoctors from "../../Pages/Dashboard/Dashboard/ManageDoctors/ManageDoctors"
import Payment from "../../Pages/Dashboard/Dashboard/Payment/Payment"
import Myappointment from "../../Pages/Dashboard/MyAppointment/Myappointment"
import Home from "../../Pages/Home/Home/Home"
import Login from "../../Pages/Login/Login"
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError"
import SignUp from "../../Pages/signUp/SignUp"
import AdminRoute from "../AdminRoute/AdminRoute"
import PrivateRoute from "../PrivateRoute/PrivateRoute"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/',
                element: <Home></Home>

            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: 'signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/appointment',
                element: <PrivateRoute><Appointment></Appointment></PrivateRoute>
            },
            {
                path: '/about',
                element: <About></About>
            }

        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard',
                element: <Myappointment></Myappointment>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: '/dashboard/adddoctor',
                element: <AdminRoute><AddDoctor></AddDoctor></AdminRoute>
            },
            {
                path: '/dashboard/managedoctors',
                element: <AdminRoute><ManageDoctors></ManageDoctors></AdminRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`https://doctors-portal-server-side-nine.vercel.app/bookings/${params.id}`)
            }
        ]
    }
])