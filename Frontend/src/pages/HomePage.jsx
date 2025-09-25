import React from 'react'
import Headers from '../components/Header'
import AddTask from '@/components/AddTask'
import TaskList from '@/components/TaskList'
import StatsAndFillters from '@/components/StatsAndFillters'
import TaskListPagination from '@/components/TaskListPagination'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import api from '../lib/axios'
import { visibleTasksLimit } from '@/lib/data'


const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTasksCount, setActiveTasksCount] = useState(0);
  const [completeTasksCount, setCompleteTasksCount] = useState(0);
  const [filter, setFilter] = useState('all');
  const [dateQuery, setDateQuery] = useState('all');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);

  // Logic
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveTasksCount(res.data.activeCount);
      setCompleteTasksCount(res.data.completeCount);
    } catch (error) {
      console.log("Lỗi xảy ra khi truy xuất tasks", error);
      toast.error("Lỗi xảy ra khi truy xuất tasks");
    }
  }

  const handleTaskChanged = () => {
    fetchTasks();
  }

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  }

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  }

  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  // Biến
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case 'active':
        return task.status === 'active';
      case 'completed':
        return task.status === 'complete';
      case 'all':
      default:
        return true; // Hiển thị tất cả task khi filter là 'all'
    }
  });

  const visibleTasks = filteredTasks.slice((page - 1) * visibleTasksLimit, page * visibleTasksLimit);

  if (visibleTasks.length === 0) {
    handlePrevious();
  }

  const totalPages = Math.ceil(filteredTasks.length / visibleTasksLimit);

  return (
    <div className="min-h-screen w-full bg-[#fefcff] relative">
      {/* Dreamy Sky Pink Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)
      `
        }}
      />

      {/* Your Content/Components */}
      <div className='container mx-auto pt-8 relative z-10'>
        <h1 className="w-full max-w-2xl p-6 mx-auto space-y-6">
          <Headers />
          <AddTask handleAddNewTask={handleTaskChanged} />
          <StatsAndFillters
            filter={filter}
            setFilter={setFilter}
            activeTasksCount={activeTasksCount}
            completeTasksCount={completeTasksCount}
          />
          <TaskList
            filteredTasks={visibleTasks}
            filter={filter}
            handleTaskChanged={handleTaskChanged}
          />

          <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
            <TaskListPagination
              page={page}
              totalPages={totalPages}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
              handlePageChange={handlePageChange}
            />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>

          <Footer
            activeTasksCount={activeTasksCount}
            completedTasksCount={completeTasksCount}
          />
        </h1>
      </div>
    </div>
  )
}

export default HomePage