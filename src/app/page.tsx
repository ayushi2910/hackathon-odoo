import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { questions, users } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold font-headline">All Questions</h1>
        <Button asChild>
          <Link href="/ask">Ask Question</Link>
        </Button>
      </div>

      <Tabs defaultValue="newest" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="newest">Newest</TabsTrigger>
          <TabsTrigger value="top">Top</TabsTrigger>
          <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
        </TabsList>
        <TabsContent value="newest">
          <div className="space-y-4">
            {questions.map((question) => {
              const author = users.find((u) => u.id === question.authorId);
              return (
                <Card key={question.id} className="w-full">
                  <CardHeader>
                    <CardTitle className="font-headline">
                      <Link
                        href={`/questions/${question.id}`}
                        className="hover:text-primary transition-colors"
                      >
                        {question.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-4">
                      <div className="flex flex-col items-center space-y-1 text-sm text-muted-foreground w-20">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{question.votes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{question.answers.length}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                        {question.description.substring(0, 180)}...
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex gap-2">
                      {question.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={author?.avatarUrl} alt={author?.name} />
                        <AvatarFallback>
                          {author?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{author?.name}</span>
                      <span>
                        asked{" "}
                        {formatDistanceToNow(new Date(question.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="top">
          <p className="text-muted-foreground">Top questions will be shown here.</p>
        </TabsContent>
        <TabsContent value="unanswered">
          <p className="text-muted-foreground">Unanswered questions will be shown here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
