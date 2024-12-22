import React, { Suspense } from 'react'
import DashboardPage from './page'
import {BarLoader} from "react-spinners/BarLoader"

const DashboardLayout = () => {
    return (
        <div className='px-5'>
            <h1 className='text-6xl gradient-title mb-5 font-bold'>Dashboard</h1>

           <Suspense fallback={<BarLoader color="#9333ea" width={100} loading />}>
             <DashboardPage />
           </Suspense>
        </div>
      )
}

export default DashboardLayout