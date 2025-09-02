"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import CodeBlock from "@/components/ui/code-block";

type PageProps = { params: { id: string } };

const LANGS = [
  "tsx",
  "ts",
  "js",
  "jsx",
  "json",
  "bash",
  "yaml",
  "yml",
  "lua",
  "python",
  "go",
  "rust",
];

export default function SnippetEditPage({ params }: PageProps) {
  const router = useRouter();
  const [title, setTitle] = React.useState("Example: Debounced Search Hook");
  const [language, setLanguage] = React.useState<string>("tsx");
  const [tags, setTags] = React.useState<string>("react, hooks, debounce");
  const [code, setCode] = React.useState<string>(
    `import { useEffect, useState } from 'react'

export function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}`,
  );

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    // TODO: connect to server action / API
    router.push(`/dashboard/snippets/${params.id}`);
  }

  return (
    <main className="min-h-dvh">
      <div className="mx-auto max-w-3xl p-4 md:p-6">
        <motion.form
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          onSubmit={handleSave}
          className="rounded-xl border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/50 border-black/5 dark:border-white/10 p-4 md:p-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-lg md:text-xl font-semibold">Edit Snippet</h1>
            <div className="flex gap-2">
              <Link href={`/dashboard/snippets/${params.id}`}>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </Link>
              <Button type="submit">Save</Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Readable title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={(v) => setLanguage(v)}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGS.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. react, hooks"
            />
            <div className="flex flex-wrap gap-2">
              {tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
                .map((t) => (
                  <Badge key={t} variant="outline" className="capitalize">
                    {t}
                  </Badge>
                ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">Code</Label>
            <Textarea
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono min-h-[220px]"
              placeholder="Paste your code here"
            />
          </div>

          <div className="space-y-2">
            <Label>Preview</Label>
            <CodeBlock code={code} language={language} />
          </div>
        </motion.form>
      </div>
    </main>
  );
}
