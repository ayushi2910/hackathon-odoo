import { questions, users, answers as allAnswers } from "@/lib/data";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowDown,
  ArrowUp,
  Check,
  MessageCircle,
  ThumbsUp,
} from "lucide-react";
import { AnswerForm } from "@/components/answer-form";

export default function QuestionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const question = questions.find((q) => q.id === params.id);

  if (!question) {
    notFound();
  }

  const author = users.find((u) => u.id === question.authorId);
  const answers = question.answers;

  return (
    <div className="container mx-auto max-w-4xl py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full">
          {/* Question Header */}
          <div className="mb-4">
            <h1 className="text-3xl font-bold font-headline mb-2">
              {question.title}
            </h1>
            <div className="text-sm text-muted-foreground flex space-x-4">
              <span>
                Asked{" "}
                {formatDistanceToNow(new Date(question.createdAt), {
                  addSuffix: true,
                })}
              </span>
              <span>Viewed 123 times</span>
            </div>
          </div>

          <Separator />

          {/* Question Body */}
          <div className="flex gap-4 py-6">
            <div className="flex flex-col items-center space-y-2 text-muted-foreground">
              <Button variant="outline" size="icon" aria-label="Upvote">
                <ArrowUp className="h-5 w-5" />
              </Button>
              <span className="text-xl font-bold">{question.votes}</span>
              <Button variant="outline" size="icon" aria-label="Downvote">
                <ArrowDown className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 space-y-6">
              <p className="text-base leading-relaxed">{question.description}</p>
              <div className="flex gap-2">
                {question.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-end">
                <div className="bg-secondary p-3 rounded-md text-sm">
                  <div className="text-muted-foreground mb-2">
                    asked by
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={author?.avatarUrl}
                        alt={author?.name}
                      />
                      <AvatarFallback>{author?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-primary">
                      {author?.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Answers Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold font-headline mb-4">
              {answers.length} Answer{answers.length !== 1 && "s"}
            </h2>

            <div className="space-y-8">
              {answers
                .sort((a) => (a.isAccepted ? -1 : 1))
                .map((answer) => {
                  const answerAuthor = users.find(
                    (u) => u.id === answer.authorId
                  )!;
                  return (
                    <div key={answer.id} className="flex gap-4">
                      <div className="flex flex-col items-center space-y-2 text-muted-foreground">
                        <Button
                          variant="outline"
                          size="icon"
                          aria-label="Upvote"
                        >
                          <ArrowUp className="h-5 w-5" />
                        </Button>
                        <span className="text-xl font-bold">
                          {answer.votes}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          aria-label="Downvote"
                        >
                          <ArrowDown className="h-5 w-5" />
                        </Button>
                        {answer.isAccepted && (
                          <div className="text-green-600" title="Accepted Answer">
                            <Check className="h-8 w-8" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-4">
                        <p className="text-base leading-relaxed">{answer.content}</p>
                        <div className="flex justify-end">
                            <div className="bg-secondary p-3 rounded-md text-sm w-48">
                                <div className="text-muted-foreground mb-2">
                                    answered {formatDistanceToNow(new Date(answer.createdAt), { addSuffix: true })}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={answerAuthor.avatarUrl} alt={answerAuthor.name} />
                                        <AvatarFallback>{answerAuthor.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-semibold text-primary">{answerAuthor.name}</span>
                                </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Your Answer Form */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold font-headline mb-4">
              Your Answer
            </h2>
            <AnswerForm />
          </div>
        </div>
      </div>
    </div>
  );
}