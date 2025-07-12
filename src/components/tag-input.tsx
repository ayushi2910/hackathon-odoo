"use client";

import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface TagInputProps extends React.ComponentPropsWithoutRef<"input"> {
  value: string[];
  onChange: (tags: string[]) => void;
}

export function TagInput({ value: tags, onChange, ...props }: TagInputProps) {
  const [inputValue, setInputValue] = React.useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const newTag = inputValue.trim().toLowerCase();
    if (newTag && !tags.includes(newTag)) {
      onChange([...tags, newTag]);
    }
    setInputValue("");
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <div
        className={cn(
          "flex w-full flex-wrap gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm",
          { "border-ring ring-2 ring-offset-2": tags.length > 0 }
        )}
      >
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
            <button
              type="button"
              className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onClick={() => removeTag(tag)}
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          </Badge>
        ))}
        <Input
          {...props}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
          disabled={tags.length >= 5}
        />
      </div>
    </div>
  );
}