"use server"

import { createPostParams } from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Post from "../database/models/post.model";
import { handleError } from "../utils";

export const createPost = async({post, userId, path} : createPostParams) => {
    try {
        await connectToDatabase();
        
        const creator = await User.findById(userId);

        if(!creator){
            throw new Error("Creator not found!");
        }

        const newPost = await Post.create({
            //... -> spread / rest operator
            //it copies all the key value pairs from post onj to the new obj
            //it is usefull when we want to include all the props of the post and also want to override / add some specific props.
            ...post, 
            creator : userId});

        return JSON.parse(JSON.stringify(newPost));
    } catch (error) {
        handleError(error);
    }
}
