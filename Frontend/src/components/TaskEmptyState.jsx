import React from 'react'
import { Card } from './ui/card'
import { Circle } from 'lucide-react'

const TaskEmptyState = ({ fillter }) => {
    return (
        <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
            <div className='space-y-3'>
                <Circle className='size-12 text-muted-foreground mx-auto' />
                <div>
                    <h3 className='text-foreground font-medium'>
                        {fillter === "active"
                            ? "Không có nhiệm vụ đang làm."
                            : fillter === "completed"
                                ? "Chưa có nhiệm vụ nào hoàn thành."
                                : "Chưa có nhiệm vụ nào."
                        }
                    </h3>
                    <p className='text-muted-foreground text-sm'>
                        {fillter === "all"
                            ? "Hãy thêm nhiệm vụ đầu tiên để bắt đầu!"
                            : `Chuyển sang "tất cả" để thấy những nhiệm vụ ${fillter === 'active' ? "đã hoàn thành" : "đang làm."}`
                        }
                    </p>
                </div>
            </div>
        </Card>
    )
}

export default TaskEmptyState