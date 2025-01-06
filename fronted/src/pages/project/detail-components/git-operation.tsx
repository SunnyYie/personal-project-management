"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GitCommit, Calendar } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { toast } from "sonner";

interface GitCommitsProps {
  owner: string;
  repo: string;
}

interface Commit {
  sha: string;
  commit: {
    author: {
      name: string;
      date: string;
    };
    message: string;
  };
  author: {
    avatar_url: string;
    login: string;
  };
}

export function GitOperation({ owner, repo }: GitCommitsProps) {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [author, setAuthor] = useState("");
  const [path, setPath] = useState("");
  const [since, setSince] = useState<Date | undefined>(undefined);
  const [until, setUntil] = useState<Date | undefined>(undefined);
  const [authors, setAuthors] = useState<string[]>([]);

  const fetchCommits = async (reset: boolean = false) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        owner,
        repo,
        page: reset ? "1" : page.toString(),
        per_page: "30",
      });
      if (author) queryParams.append("author", author);
      if (path) queryParams.append("path", path);
      if (since) queryParams.append("since", since.toISOString());
      if (until) queryParams.append("until", until.toISOString());

      const response = await fetch(`/api/github/commits?${queryParams}`);
      if (!response.ok) {
        throw new Error("Failed to fetch commits");
      }
      const data = await response.json();
      if (reset) {
        setCommits(data);
        setPage(1);
      } else {
        setCommits((prevCommits) => [...prevCommits, ...data]);
        setPage((prevPage) => prevPage + 1);
      }

      // Update authors list
      const newAuthors = data.map(
        (commit: Commit) => commit.commit.author.name
      );
      setAuthors((prevAuthors) =>
        Array.from(new Set([...prevAuthors, ...newAuthors]))
      );
    } catch (error) {
      console.error("Error fetching commits:", error);
      toast.error("Failed to fetch commits. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //   useEffect(() => {
  //     fetchCommits(true);
  //   }, [owner, repo, author, path, since, until]);

  const handleFilterChange = () => {
    fetchCommits(true);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Git Commits</CardTitle>
        <CardDescription>
          Recent commits for {owner}/{repo}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <Label htmlFor="author">Author</Label>
            <Select value={author} onValueChange={setAuthor}>
              <SelectTrigger id="author">
                <SelectValue placeholder="Select an author" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Authors</SelectItem>
                {authors.map((author) => (
                  <SelectItem key={author} value={author}>
                    {author}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="path">File Path</Label>
            <Input
              id="path"
              placeholder="Enter file path"
              value={path}
              onChange={(e) => setPath(e.target.value)}
            />
          </div>
          <div>
            <Label>Since</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {since ? format(since, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={since}
                  onSelect={setSince}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label>Until</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {until ? format(until, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={until}
                  onSelect={setUntil}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <Button onClick={handleFilterChange} className="mb-4">
          Apply Filters
        </Button>
        <div className="space-y-4">
          {commits.map((commit) => (
            <div
              key={commit.sha}
              className="flex items-start space-x-4 p-4 rounded-md bg-muted"
            >
              <Avatar>
                <AvatarImage
                  src={commit.author.avatar_url}
                  alt={commit.author.login}
                />
                <AvatarFallback>
                  {commit.author.login.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{commit.commit.message}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <GitCommit className="mr-1 h-3 w-3" />
                  <span>{commit.sha.substring(0, 7)}</span>
                  <span className="mx-1">•</span>
                  <span>{commit.commit.author.name}</span>
                  <span className="mx-1">•</span>
                  <span>
                    {new Date(commit.commit.author.date).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {commits.length > 0 && (
          <Button
            onClick={() => fetchCommits()}
            disabled={loading}
            className="mt-4 w-full"
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
