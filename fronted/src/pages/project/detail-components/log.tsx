import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getVercelLogs } from '@/api/actions/vercel'

const mockLogs = [
  {
    id: '1',
    type: 'deployment',
    createdAt: Date.now() - 1000 * 60 * 60 * 24, // 1天前
    message: 'Deployment successful for project XYZ.',
  },
  {
    id: '2',
    type: 'error',
    createdAt: Date.now() - 1000 * 60 * 60 * 12, // 12小时前
    message: 'Error occurred while building the project.',
  },
  {
    id: '3',
    type: 'info',
    createdAt: Date.now() - 1000 * 60 * 60 * 6, // 6小时前
    message: 'New version of the project has been deployed.',
  },
  {
    id: '4',
    type: 'warning',
    createdAt: Date.now() - 1000 * 60 * 60 * 2, // 2小时前
    message: 'Warning: High memory usage detected.',
  },
  {
    id: '5',
    type: 'info',
    createdAt: Date.now() - 1000 * 60 * 30, // 30分钟前
    message: 'User John Doe accessed the admin panel.',
  },
]

interface LogEvent {
  id: string
  type: string
  createdAt: number
  message: string
}

const LOG_TYPES = [
  { id: 'deployment', label: 'Deployment' },
  { id: 'error', label: 'Error' },
  { id: 'info', label: 'Info' },
  { id: 'warning', label: 'Warning' },
]

export function Logs({ project }: any) {
  const [startDate, setStartDate] = useState<Date>(new Date(Date.now() - 24 * 60 * 60 * 1000))
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [logs, setLogs] = useState<LogEvent[]>(mockLogs)
  const [loading, setLoading] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<string[]>(LOG_TYPES.map(type => type.id))

  // useEffect(() => {
  //   const fetchLogs = async () => {
  //     const now = new Date()
  //     const since = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString() // 过去24小时
  //     const until = now.toISOString()

  //     const logData = await getVercelLogs(project.vercelProject.id, since, until)
  //     if (logData) {
  //       setLogs(logData)
  //     }
  //     setLoading(false)
  //   }

  //   fetchLogs()
  // }, [project.vercelProject.id])

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes(prev => (prev.includes(typeId) ? prev.filter(id => id !== typeId) : [...prev, typeId]))
  }

  const getLogTypeColor = (type: LogEvent['type']) => {
    switch (type) {
      case 'deployment':
        return 'bg-blue-500'
      case 'error':
        return 'bg-red-500'
      case 'info':
        return 'bg-green-500'
      case 'warning':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Logs</h2>
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn('w-[240px] justify-start text-left font-normal', !startDate && 'text-muted-foreground')}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, 'PPP') : <span>Pick a start date</span>}
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
                {endDate ? format(endDate, 'PPP') : <span>Pick an end date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={endDate} onSelect={data => setEndDate(data!)} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter by Log Type</CardTitle>
          <CardDescription>Select the types of logs you want to see</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            {LOG_TYPES.map(type => (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox
                  id={type.id}
                  checked={selectedTypes.includes(type.id)}
                  onCheckedChange={() => handleTypeToggle(type.id)}
                />
                <label htmlFor={type.id}>{type.label}</label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Log Events</CardTitle>
          <CardDescription>Recent log events for your project</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logs.map(log => (
              <div key={log.id} className="flex items-start space-x-2 p-2 rounded-md bg-muted">
                <Badge className={cn('capitalize', getLogTypeColor(log.type))}>{log.type}</Badge>
                <div>
                  <p className="text-sm font-medium">{log.message}</p>
                  <p className="text-xs text-muted-foreground">{new Date(log.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
