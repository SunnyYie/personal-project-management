'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { GitCommit, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'

export function GitOperation({ commits }: any) {
  const [since, setSince] = useState<Date | undefined>(undefined)
  const [until, setUntil] = useState<Date | undefined>(undefined)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Git Commits</CardTitle>
        <CardDescription>Recent commits for {commits.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <Label>Since</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <Calendar className="mr-2 h-4 w-4" />
                  {since ? format(since, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent mode="single" selected={since} onSelect={setSince} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label>Until</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <Calendar className="mr-2 h-4 w-4" />
                  {until ? format(until, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent mode="single" selected={until} onSelect={setUntil} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-4">
          {commits.githubCommits.slice(0, 10).map((commit: any) => (
            <div key={commit.sha} className="flex items-start space-x-4 p-4 rounded-md bg-muted">
              <Avatar>
                <AvatarImage src="" alt={commit.commit.author.name} />
                <AvatarFallback>{commit.commit.author.name.slice(0, 3).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{commit.commit.message}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <GitCommit className="mr-1 h-3 w-3" />
                  <span>{commit.sha.substring(0, 7)}</span>
                  <span className="mx-1">•</span>
                  <span>{commit.commit.author.name}</span>
                  <span className="mx-1">•</span>
                  <span>{new Date(commit.commit.author.date).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
