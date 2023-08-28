import { Link } from 'react-router-dom'
import { Course } from '../../models'

type CourseCardPropType = Course

export const CourseCard: React.FC<CourseCardPropType> = ({ id, title, subtitle, instructor }) => {
    return (
        <div className='h-80 w-72 flex flex-col rounded-lg me-6 mb-6 border hover:shadow'>
            {/* Card Header */}
            <div className="bg-blue-500 h-1/3 rounded-t-lg relative text-white">
                <Link to={`course/${id}`} className='w-full h-full p-4 flex flex-col rounded-t-lg'>
                    <div className='grow hover:underline'>
                        <p className='text-xl'>{title.length < 16 ? title : title.slice(0, 16) + '...'}</p>
                        {subtitle && <p className='text-xs'>{subtitle.length < 20 ? subtitle : subtitle.slice(0, 20) + '...'}</p>}
                    </div>
                    <div>
                        <span className='text-xs hover:underline'>{instructor.fullname.length < 20 ? instructor.fullname : instructor.fullname.slice(0, 20) + '...'}</span>
                    </div>
                </Link>
                <button className="absolute w-10 h-10 top-2 right-2 flex justify-center items-center rounded-full hover:bg-black hover:bg-opacity-10">
                    <span className="material-symbols-rounded">more_vert</span>
                </button>
                <div className="absolute w-20 h-20 -bottom-10 right-4 flex justify-center items-center rounded-full">
                    <img src={instructor.profilePicture} alt="profile picture" width="100%" height="100%" className='rounded-full' />
                </div>
            </div>
            {/* Card Body */}
            <div className="flex-grow border-b">

            </div>
            {/* Card Footer */}
            <div className='flex justify-end p-2'>
                <button className=" w-10 h-10 flex justify-center items-center rounded-full hover:bg-black hover:bg-opacity-10">
                    <span className="material-symbols-rounded">assignment_ind</span>
                </button>
                <button className="w-10 h-10 flex justify-center items-center rounded-full hover:bg-black hover:bg-opacity-10">
                    <span className="material-symbols-rounded">folder</span>
                </button>
            </div>
        </div>
    )
}
