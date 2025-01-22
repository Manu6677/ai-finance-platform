import { currentUser } from '@clerk/nextjs/server'
import { db } from './prisma';
export const checkUser = async ()=>{

    const user = await currentUser()
    console.log('user clerk', user);
    console.log(db.user);

    if(!user){
       console.log('User Does not exist')
    }
    
    try{
        const loggedInUser = await db.user.findUnique({
            where :{
                clerkUserId: user.id,
            }
        })
        if(loggedInUser){
            return loggedInUser;
        }

        const name = `${user.firstName} ${user.lastName}`
        const newUser = await db.user.create({
            data:{
                clerkUserId: user?.id,
                name,
                imageUrl: user?.imageUrl, 
                email: user?.emailAddresses[0]?.emailAddress
            }
        })
        return newUser
    }catch(error){
        console.log(error.message);
    }
}

/* simply here we check that user exists or not
  --> we check first the user is there or not in the CLERK

  --> Then we checked out that user is present in the SUPABASE or not.
  |--> In the try and catch block, if the user is there return it.
   |--> Other wise create the user with the credentials. 
*/