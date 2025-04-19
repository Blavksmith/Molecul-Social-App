"use server";
import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function syncUser(){
    try{
        const {userId} = await auth();
        const user = await currentUser();

        if(!userId || !user) return;


        // check if user exist
        const existiungUser = await prisma.user.findUnique({
            where:{
                clerkId: userId

            }
        })

        if(existiungUser) return existiungUser;

        const dbUser = await prisma.user.create({
            data: {
                clerkId: userId,
                name: `${user.firstName || ""} ${user.lastName || ""}`,
                username: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
                email: user.emailAddresses[0].emailAddress,
                image: user.imageUrl

            }
        })

        return dbUser;

    }catch(err){
        console.log("Error syncing user", err)

    }
}

export async function getUserByClerkId(clerkId: string){
    return prisma.user.findUnique({
        where: {
            clerkId,
        },
        include:{
            _count:{
                select:{
                    followers: true,
                    following: true,
                    posts: true,    
                }
            }
        }
    })
}

export async function getDbUserById(){
    const {userId: clerkId} = await auth();
    if(!clerkId) throw new Error("Unauthorized");

    const user= await getUserByClerkId(clerkId);
    if(!user) throw new Error("User not found");

    return user.id;

}