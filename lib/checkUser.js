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