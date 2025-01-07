import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getVercelAnalytics } from '@/api/actions/vercel'

interface AnalyticsData {
  visitors: {
    value: number
  }
  pageviews: {
    value: number
  }
  dailyPageviews: {
    date: string
    value: number
  }[]
}

export function Analytics({ project }: any) {
  const [startDate, setStartDate] = useState<Date>(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>({
    visitors: {
      value: 1500, // 示例总访客数
    },
    pageviews: {
      value: 3000, // 示例总页面浏览量
    },
    dailyPageviews: [
      { date: '2023-10-01', value: 100 },
      { date: '2023-10-02', value: 200 },
      { date: '2023-10-03', value: 150 },
      { date: '2023-10-04', value: 300 },
      { date: '2023-10-05', value: 250 },
      { date: '2023-10-06', value: 400 },
      { date: '2023-10-07', value: 600 },
    ],
  })

  // useEffect(() => {
  //   const fetchVercelAnalyticsData = async () => {
  //     const res = await getVercelAnalytics(project.vercelProject.id, startDate.toString(), endDate.toString())
  //     console.log(res)
  //   }
  //   fetchVercelAnalyticsData()
  // }, [project.vercelProject.id])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics</h2>
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn('w-[240px] justify-start text-left font-normal', !startDate && 'text-muted-foreground')}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={startDate} onSelect={data => setStartDate(data!)} initialFocus />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn('w-[240px] justify-start text-left font-normal', !endDate && 'text-muted-foreground')}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={endDate} onSelect={data => setEndDate(data!)} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {analyticsData && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.visitors.value}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pageviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.pageviews.value}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {analyticsData && analyticsData.dailyPageviews && (
        <Card>
          <CardHeader>
            <CardTitle>Daily Pageviews</CardTitle>
            <CardDescription>Pageview trends over the selected date range</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData.dailyPageviews}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" name="Pageviews" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
