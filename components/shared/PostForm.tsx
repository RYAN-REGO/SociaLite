// "use client"
// import { TextField } from '@mui/material'
// import React, { useState } from 'react'
// import { FileUploader } from './FileUploader'
// import { useUploadThing } from '@/lib/uploadthing'


"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
import { PostFormSchema } from "@/lib/validator";
import { Textarea } from "@/components/ui/textarea";
import { PostDefaultValues } from "@/constants";
// import Dropdown from "./Dropdown";
import { useState } from "react";
import { FileUploader } from "./FileUploader";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { createPost } from "@/lib/actions/post.actions";

type PostFormProps = {
  userId : string | null
}

const PostForm = ({userId} : PostFormProps) => {
  
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("imageUploader");
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof PostFormSchema>>({
    resolver: zodResolver(PostFormSchema),
  });

  // 2. Define a submit handler.

  // very very very very important
  async function onSubmit(values: z.infer<typeof PostFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }
    // console.log(values);


      try {
        const newPost = await createPost({
          post: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: "/profile",
        });

        if (newPost) {
          form.reset();
          router.push(`/`);
        }
      } catch (error) {
        console.log(error);
      }

  }

  //.............................-----------------------------------------////////////////////

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-10"
      >
        {/* description of the post */}
        <div className="w-[800px] max-sm:w-full">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="max-sm:w-full">
                <FormControl>
                  <Textarea
                    placeholder="Description"
                    className="tracking-wider font-[16px] h-[50vh] rounded-2xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* description of the post */}

        {/* upload the file */}
        <div className="w-[800px] max-sm:w-full">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="max-sm:w-full">
                <FormControl>
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* upload the file */}
        <div className="w-[800px] max-sm:w-full">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="button col-span-2 w-full rounded-none "
          >
            {form.formState.isSubmitting ? "Submitting.." : "Creating a Post"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;





















