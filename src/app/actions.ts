
"use server";

import { suggestTags, type SuggestTagsInput } from "@/ai/flows/suggest-tags";
import { z } from "zod";

const resultSchema = z.object({
  success: z.boolean(),
  tags: z.array(z.string()).optional(),
  error: z.string().optional(),
});

export async function getTagSuggestions(
  input: SuggestTagsInput
): Promise<{ success: boolean; tags?: string[]; error?: string }> {
  try {
    const { tags } = await suggestTags(input);
    return { success: true, tags };
  } catch (error) {
    console.error("Error suggesting tags:", error);
    return {
      success: false,
      error: "Failed to generate tag suggestions. Please try again.",
    };
  }
}