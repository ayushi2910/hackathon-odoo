import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { UserNav } from "./user-nav";
import { NotificationsDropdown } from "./notifications-dropdown";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold font-headline text-lg text-primary">
              QStack
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Questions
            </Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <form>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search questions..."
                  className="pl-8 sm:w-64 md:w-80"
                />
              </div>
            </form>
          </div>
          <nav className="flex items-center space-x-2">
            <Button asChild>
              <Link href="/ask">Ask Question</Link>
            </Button>
            <NotificationsDropdown />
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  );
}