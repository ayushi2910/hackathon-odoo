import { AskQuestionForm } from "@/components/ask-question-form";

export default function AskQuestionPage() {
  return (
    <div className="container mx-auto max-w-4xl py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">
            Ask a Public Question
          </h1>
          <p className="text-muted-foreground mt-2">
            Get help from the community by asking a question. Be specific and imagine you’re asking a question to another person.
          </p>
        </div>
        <AskQuestionForm />
      </div>
    </div>
  );
}