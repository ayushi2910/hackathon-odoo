"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { TagInput } from "./tag-input";
import { getTagSuggestions } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Wand2 } from "lucide-react";
import React from "react";

const formSchema = z.object({
  title: z
    .string()
    .min(15, "Title must be at least 15 characters.")
    .max(130, "Title must not be longer than 130 characters."),
  description: z
    .string()
    .min(30, "Description must be at least 30 characters."),
  tags: z
    .array(z.string())
    .min(1, "Please enter at least one tag.")
    .max(5, "You can add a maximum of 5 tags."),
});

export function AskQuestionForm() {
  const { toast } = useToast();
  const [isSuggesting, setIsSuggesting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: [],
    },
  });

  async function handleSuggestTags() {
    const title = form.getValues("title");
    const description = form.getValues("description");
    
    if (!title || !description) {
        toast({
            variant: "destructive",
            title: "Title and description needed",
            description: "Please provide a title and description before suggesting tags.",
        });
        return;
    }

    setIsSuggesting(true);
    const result = await getTagSuggestions({ title, description });
    setIsSuggesting(false);

    if (result.success && result.tags) {
      const currentTags = form.getValues("tags");
      const newTags = Array.from(new Set([...currentTags, ...result.tags]));
      form.setValue("tags", newTags.slice(0, 5), { shouldValidate: true });
      toast({
        title: "Tags suggested!",
        description: "We've added some AI-powered tag suggestions for your question.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.error,
      });
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
        title: "Question Posted!",
        description: "Your question has been successfully posted to the community.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Title</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Be specific and imagine you’re asking a question to another person.</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. How to center a div in CSS?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                   <FormLabel>Include all the information someone would need to answer your question.</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-[200px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add up to 5 tags to describe what your question is about.</FormLabel>
                  <FormControl>
                    <TagInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="e.g. react, nextjs, typescript"
                    />
                  </FormControl>
                  <FormDescription className="flex items-center justify-between pt-2">
                    <span>Press enter or comma to add a new tag.</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleSuggestTags}
                      disabled={isSuggesting}
                    >
                      <Wand2 className="mr-2 h-4 w-4" />
                      {isSuggesting ? 'Thinking...' : 'Suggest Tags'}
                    </Button>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        
        <Button type="submit">Post Your Question</Button>
      </form>
    </Form>
  );
}
