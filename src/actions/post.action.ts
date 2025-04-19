"use server";

import { revalidatePath } from "next/cache";
import { getDbUserById } from "./user.actions";
import prisma from "@/lib/prisma";

export async function createPost(content: string, imageUrl: string){
    try{
        const userId = await getDbUserById();

        const post = await prisma.post.create({
            data: {
                content,
                image: imageUrl,
                authorId: userId

            }
        })

        revalidatePath("/");
        return {success: true, post};

    }catch(err){

    }
}