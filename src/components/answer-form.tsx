"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "./ui/card";

const formSchema = z.object({
  answer: z.string().min(20, "Your answer must be at least 20 characters."),
});

export function AnswerForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
        title: "Answer Posted!",
        description: "Thank you for contributing to the community!",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card>
            <CardContent className="p-4">
                <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Textarea
                        className="min-h-[150px] border-0 focus-visible:ring-1"
                        placeholder="Write your answer here. Be helpful and clear."
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </CardContent>
        </Card>
        <Button type="submit">Post Your Answer</Button>
      </form>
    </Form>
  );
}