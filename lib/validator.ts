import * as z from "zod";

export const PostFormSchema = z.object({
    description : z.string().min(10, "Description must be atleast 10 characters").max(3000, "Description must be less than 3000 characters"),
    imageUrl : z.string(),
    //description : z.string(),
  });
  