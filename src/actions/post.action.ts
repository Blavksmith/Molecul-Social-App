"use server";

import { revalidatePath } from "next/cache";
import { getDbUserById } from "./user.actions";
import prisma from "@/lib/prisma";

export async function createPost(content: string, imageUrl: string) {
  try {
    const userId = await getDbUserById();
    if (!userId) return;
    const post = await prisma.post.create({
      data: {
        content,
        image: imageUrl,
        authorId: userId,
      },
    });

    revalidatePath("/");
    return { success: true, post };
  } catch (err) {}
}

export async function getPosts() {
    try{
        const posts = await prisma.post.findMany({
            orderBy:{
                createdAt: "desc"
            },
            include:{
                author: {
                    select:{
                        name: true,
                        image: true,
                        username: true,

                    }
                },

                comments:{
                    include:{
                        author:{
                            select:{
                                id: true,
                                name: true,
                                image: true,
                                username: true,
                                
                            }
                        }
                    },

                    orderBy:{
                        createdAt: "desc"
                    }
                },

                likes:{
                    select:{
                        userId:true
                    }
                },

                _count:{
                    select:{
                        likes: true,
                        comments: true
                    }
                }

            }
        })
        return posts;

    }catch(err){
        console.log("Error in get post",err)
        throw new Error("Error in get post")
    }
}
