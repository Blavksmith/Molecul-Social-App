"use server";
import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { error } from "console";
import { revalidatePath } from "next/cache";

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

export async function getRandomUser(){
    try{
        const userId = await getDbUserById();

        // get 3 random users exclude ourseleves & users that we already follow
        const randomUsers = await prisma.user.findMany({
            where:{
                AND:[
                    {NOT: {id: userId}},
                    {NOT: {
                        followers:{
                            some:{
                                followerId: userId
                            }
                        }
                    }}
                ]
            },

            select: {
                id: true,
                name: true,
                username: true,
                image: true,
                _count:{
                    select:{
                        followers: true
                    }
                }
            },

            take: 3
        })

        return randomUsers;

    }catch(err){
        console.log("Error fetching random users", err);
        return [];
    }
}


export async function toggleFollow(userId: string){
    try{
        const targetUserId = await getDbUserById();
        if(userId === targetUserId) {
            throw new Error("You cannot follow yourself")

        }

        const existingFollow = await prisma.follows.findUnique({
            where:{
                followerId_followingId:{
                    followerId: userId,
                    followingId: targetUserId
                }
            }
        })

        if(existingFollow){
            // unfollow
            await prisma.follows.delete({
                where: {
                    followerId_followingId:{
                        followerId: userId,
                        followingId: targetUserId

                    }
                }
            })
        }else{
            // follow
            await prisma.$transaction([
                prisma.follows.create({
                    data: {
                        followerId: userId,
                        followingId: targetUserId
                    }    
                }),

                prisma.notification.create({
                    data:{
                        type: "FOLLOW",
                        userId: targetUserId,
                        creatorId: userId,
                    }
                })
            ])


        }

        revalidatePath("/");
        return {success: true}

        
    }catch(err){
        console.log("Error in toggleFollow", err);
        return {success: false, error: "Toggle failed"}
    }
}

