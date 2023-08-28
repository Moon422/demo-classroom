import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { courses as courseDataRaw, users as userDataRaw } from "../data/data.json"
import mugShot from "../assets/images/mugshot.png"
import { SidebarContext } from '../App'
import { NewPost } from '../components/course-page/new-post'
import { PostCard } from '../components/course-page/post/post-card'
import { Course, User, UserTypes } from '../models'

export const CoursePage: React.FC = () => {
    const { id } = useParams()
    const [data, setData] = useState<Course | null>(null)


    const sidebarContext = useContext(SidebarContext)

    useEffect(() => {
        if (id) {
            const courseRaw = courseDataRaw.find(item => parseInt(id) == item.id)
            if (courseRaw) {
                const { id: courseId, title, subtitle, instructorid, studentids } = courseRaw

                const studentsRaw = userDataRaw.filter(user => studentids.includes(user.id))
                const students = studentsRaw.map(item => new User(item.id, item.firstname, item.lastname, item.usertype as UserTypes, item.profilePicture))

                const instructorRaw = userDataRaw.find(user => user.id == instructorid)

                if (instructorRaw) {
                    const { id: fId, firstname, lastname, usertype, profilePicture } = instructorRaw
                    const instructor = new User(fId, firstname, lastname, usertype as UserTypes, profilePicture)

                    const course: Course = { id: courseId, title, subtitle, instructor }
                    setData(() => course)
                }

            }
        }
    }, [])

    return (
        <>
            {
                data ? (
                    <>
                        <nav className='flex items-center px-3 h-16 border-b'>
                            <div className="flex w-1/3">
                                <button onClick={e => {
                                    e.preventDefault()
                                    sidebarContext?.toggleSidebar()
                                }} className="w-12 h-12 flex justify-center items-center rounded-full me-1 hover:bg-black hover:bg-opacity-5">
                                    <span className="material-symbols-rounded">menu</span>
                                </button>
                                <div className='text-2xl flex flex-col justify-center text-gray-600'>
                                    <h1 className={data.subtitle ? 'text-sm font-semibold' : 'text-2xl font-normal'}>{data.title}</h1>
                                    <h3 className='text-xs'>{data.subtitle}</h3>
                                </div>
                            </div>
                            <div className="flex items-stretch justify-center h-full w-1/3">
                                <a href="#" className='flex justify-center items-center w-28 text-sm text-gray-600 font-medium hover:bg-black hover:bg-opacity-5'>Stream</a>
                                <a href="#" className='flex justify-center items-center w-28 text-sm text-gray-600 font-medium hover:bg-black hover:bg-opacity-5'>Classwork</a>
                                <a href="#" className='flex justify-center items-center w-28 text-sm text-gray-600 font-medium hover:bg-black hover:bg-opacity-5'>People</a>
                            </div>
                            <div className="flex w-1/3">
                                <button className="w-12 h-12 flex justify-center items-center rounded-full ms-auto me-1 hover:bg-black hover:bg-opacity-5">
                                    <span className="material-symbols-rounded">add</span>
                                </button>
                                <button className="w-12 h-12 flex justify-center items-center rounded-full me-1 hover:bg-black hover:bg-opacity-5">
                                    <span className="material-symbols-rounded text-gray-600">
                                        apps
                                    </span>
                                </button>
                                <button className="w-12 h-12 flex justify-center items-center rounded-full p-2 me-1 hover:bg-black hover:bg-opacity-5">
                                    <img src={mugShot} alt="profile picture" width="100%" height="100%" className='rounded-full' />
                                </button>
                            </div>
                        </nav>
                        <div className="max-w-[62.5rem] mx-auto my-6">
                            <div className="h-60 rounded-lg bg-red-500 flex items-end p-6 relative">
                                <h1 className='text-4xl text-white font-semibold'>
                                    {data.title}
                                </h1>
                                <button>
                                    <span className="material-symbols-rounded absolute right-0 bottom-0 p-3 rounded-full text-white hover:bg-black hover:bg-opacity-5">
                                        info
                                    </span>
                                </button>
                            </div>
                            <div className='my-6 flex items-start'>
                                <div className='rounded-lg border me-3 p-3 w-1/5'>
                                    <h3 className='font-medium text-sm'>Upcoming</h3>
                                    <p className='text-xs pt-4 text-slate-700'>Woohoo, no work due soon!</p>
                                    <div className="flex justify-end pt-2">
                                        <a href="#" className='p-2 rounded text-sm text-blue-800 hover:bg-blue-800 hover:bg-opacity-5'>View All</a>
                                    </div>
                                </div>
                                <div className='ms-3 w-4/5'>
                                    <NewPost />
                                    <PostCard postId={1} />
                                </div>
                            </div>
                        </div>
                    </>
                ) : <h1>Data not found</h1>
            }
        </>
    )
}
