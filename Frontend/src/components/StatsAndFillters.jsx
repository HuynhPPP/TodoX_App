import React from 'react'
import { Badge } from './ui/badge'
import { Fillters } from '@/lib/data'
import { Button } from './ui/button'
import { Filter } from 'lucide-react'

const StatsAndFillters = ({
  completeTasksCount = 0,
  activeTasksCount = 0,
  filter = "all",
  setFilter,
}) => {
  return (
    <div className='flex flex-col item-start justify-between gap-4 sm:flex-row sm:items-center'>

      {/* Thống kê */}
      <div className='flex gap-3'>
        <Badge variant="secondary" className='bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200'>
          {activeTasksCount} {Fillters.active}
        </Badge>
        <Badge variant="secondary" className='bg-green-100 text-green-700 border-green-200 hover:bg-green-200'>
          {completeTasksCount} {Fillters.completed}
        </Badge>
      </div>

      {/* Lọc */}
      <div className='flex flex-col gap-2 sm:flex-row'>
        {
          Object.keys(Fillters).map((type) => (
            <Button
              key={type}
              variant={filter === type ? "gradient" : "ghost"}
              size="sm"
              className='capitalize'
              onClick={() => setFilter(type)}
            >
              <Filter className='size-4' />
              {Fillters[type]}
            </Button>
          ))
        }
      </div>
    </div>
  )
}

export default StatsAndFillters