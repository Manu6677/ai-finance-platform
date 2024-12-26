import CreareAccountDrawer from '@/components/create-account-drawer'
import { Card, CardContent } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import React from 'react'

function DashboardPage (){
  return (
    <div className='px-5'>
        {/* budget progress */}

        {/* overview */}

        {/* accounts */}
       <div className='grid gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-3'>
       <CreareAccountDrawer>
          <Card className='hover:shadow-lg transition-shadow cursor-pointer border-dashed'>
            <CardContent className='flex flex-col items-center justify-center text-muted-foreground h-full pt-5'>
              <Plus className='h-10 w-10 mb-2'/>
              <p className='text-sm font-medium'>Add new account</p> 
            </CardContent>
          </Card>
        </CreareAccountDrawer>
       </div>
    </div>
  )
}

export default DashboardPage