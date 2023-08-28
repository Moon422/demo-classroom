import { CourseCard } from '../components/home-page/course-card'
import { Course, User, UserTypes } from '../models'
import { useContext, useEffect, useState } from 'react'
import { courses as courseDataRaw, users as userDataRaw } from "../data/data.json"
import { LoggedInUser, SidebarContext } from '../App'

export const HomePage: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([])
    const sidebarContext = useContext(SidebarContext)
    const loggedinUser = useContext(LoggedInUser)

    useEffect(() => {
        const courseData = courseDataRaw.map<Course>((course, index): Course => {
            const { id, title, subtitle, instructorid, studentids } = course

            const instructor = userDataRaw.find((user, idx) => user.id == instructorid)

            return {
                id, title, subtitle, instructor: new User(instructor!.id, instructor!.firstname, instructor!.lastname, instructor!.usertype as UserTypes, instructor!.profilePicture)
            }
        })

        setCourses(() => courseData)
    }, [])

    return (
        <>
            <nav className='flex items-center px-3 h-16 border-b'>
                <button onClick={e => {
                    e.preventDefault()
                    sidebarContext?.toggleSidebar()
                }} className="w-12 h-12 flex justify-center items-center rounded-full me-1 hover:bg-black hover:bg-opacity-5">
                    <span className="material-symbols-rounded">menu</span>
                </button>
                <div className='text-2xl text-gray-600'>
                    <span className='text-orange-500'>Google</span> Classroom
                </div>
                <button className="w-12 h-12 flex justify-center items-center rounded-full ms-auto me-1 hover:bg-black hover:bg-opacity-5">
                    <span className="material-symbols-rounded">add</span>
                </button>
                <button className="w-12 h-12 flex justify-center items-center rounded-full me-1 hover:bg-black hover:bg-opacity-5">
                    <span className="material-symbols-rounded text-gray-600">
                        apps
                    </span>
                </button>
                <button className="w-12 h-12 flex justify-center items-center rounded-full p-2 me-1 hover:bg-black hover:bg-opacity-5">
                    <img src={loggedinUser?.profilePicture} alt="profile picture" width="100%" height="100%" className='rounded-full' />
                </button>
            </nav>
            <div className='p-6'>
                <div className='flex mb-6'>
                    <button className='flex items-center text-sm px-2 py-1 rounded text-blue-500 font-medium hover:bg-blue-50 hover:bg-opacity-50'>
                        <span className="material-symbols-rounded text-lg font-medium me-2">
                            fact_check
                        </span>To-do
                    </button>
                    <button className='flex items-center text-sm px-2 py-1 rounded text-blue-500 font-medium hover:bg-blue-50 hover:bg-opacity-50'>
                        <span className="material-symbols-rounded text-lg font-medium me-2">
                            topic
                        </span>Review
                    </button>
                    <button className='flex items-center text-sm px-2 py-1 rounded text-blue-500 font-medium hover:bg-blue-50 hover:bg-opacity-50'>
                        <span className="material-symbols-rounded text-lg font-medium me-2">
                            calendar_today
                        </span>Review
                    </button>
                </div>
                <div className="flex justify-stretch flex-wrap mx-10">
                    {
                        courses.map((course, idx) => <CourseCard key={idx} {...course} />)
                    }
                </div>
            </div>
        </>
    )
}
