import * as z from "zod";

export const courseFormSchema = z.object({
  name: z.string().min(3, "Course name is required"),
  description: z.string().min(2, "Description is required"),
  category: z.string().min(1, "Category is required"),
  price: z.string().min(1, "Price is required"),
  estimatedPrice: z.string().optional(),
  tags: z
    .string()
    .min(1, "Tags are required")
    .transform((val) =>
      val
        .split(/[,\s]+/) // 🔥 split by comma or space
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean)
    ),

  level: z.string(),
  demoUrl: z.string().min(1, "Demo URL is Required"),
  thumbnail: z
    .any()
    .refine(
      (file) => file instanceof File && file.size > 0,
      "Thumbnail is required"
    ),

  courseContentData: z.array(
    z.object({
      videoUrl: z.string().min(1, "Video URL required"),
      title: z.string().min(1, "Title required"),
      description: z.string().min(1, "Description required"),
      videoSection: z.string(),
      suggestion: z.string().optional(),
      links: z.array(
        z.object({
          title: z.string(),
          url: z.string().min(1, "Link is required"),
        })
      ),
    })
  ),

  benefits: z
    .array(z.object({ title: z.string().min(1, "Benefit is required") }))
    .min(1),
  prerequisites: z
    .array(z.object({ title: z.string().min(1, "Prerequisite is required") }))
    .min(1),
});

// schema/courseStepSchemas.ts

export const step1Schema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
});

export const step2Schema = z.object({
  benefits: z
    .array(z.object({ title: z.string().min(1, "Benefit is required") }))
    .min(1),
  prerequisites: z
    .array(z.object({ title: z.string().min(1, "Prerequisite is required") }))
    .min(1),
});

export const step3Schema = z.object({
  courseContentData: z
    .array(
      z.object({
        videoUrl: z.string().min(1, "Video URL required"),
        title: z.string().min(1, "Video title required"),
      })
    )
    .min(1),
});
