import { MouseEvent as ReactMouseEvent, useContext, useEffect, useRef, useState } from 'react'
import { LoggedInUser } from '../../App'

export const NewPost: React.FC = () => {
    const loggedInUser = useContext(LoggedInUser)
    const [showPostEditor, setShowPostEditor] = useState<boolean>(false)
    const [postBody, setPostBody] = useState<string>("")
    const [postBodyFocused, setPostBodyFocused] = useState<boolean>(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }, [postBody])

    const togglePostEditor = () => setShowPostEditor((value) => !value)

    const reset = (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>): void => {
        setPostBody(() => "")
        setPostBodyFocused(() => false)
        setShowPostEditor(() => false)
    }

    return (
        <>
            {showPostEditor ?
                <form className='p-6 rounded-lg border shadow-md'>
                    <div id='post-body-container' className={`relative px-3 pb-3 bg-black border-b-2 z-20 ${postBodyFocused ? 'border-blue-500' : 'border-gray-500'} bg-opacity-5 rounded-t-md hover:bg-opacity-10 transition-all duration-200 ease-out`}>
                        <p className={`absolute left-3 ${postBodyFocused ? 'text-xs top-2 text-blue-700' : 'text-base top-5 text-gray-600'} -z-10 transition-all duration-200 ease-out`}>Announce something to your class</p>
                        <textarea ref={textareaRef} rows={5} name="post-body" id="post-body" className='mt-6 text-xs w-full bg-transparent resize-none focus:outline-none z-10' value={postBody} onChange={e => {
                            setPostBody(() => e.target?.value)
                        }} onFocus={() => {
                            setPostBodyFocused(() => true)
                        }} onBlur={() => {
                            setPostBodyFocused(() => false)
                        }}></textarea>
                        <div className="flex">
                            <button className='me-2 flex justify-center items-center rounded-full text-gray-600 hover:text-black'>
                                <span className="material-symbols-rounded">
                                    format_bold
                                </span>
                            </button>
                            <button className='me-2 flex justify-center items-center rounded-full text-gray-600 hover:text-black'>
                                <span className="material-symbols-rounded">
                                    format_italic
                                </span>
                            </button>
                            <button className='me-2 flex justify-center items-center rounded-full text-gray-600 hover:text-black'>
                                <span className="material-symbols-rounded">
                                    format_underlined
                                </span>
                            </button>
                            <button className='me-2 flex justify-center items-center rounded-full text-gray-600 hover:text-black'>
                                <span className="material-symbols-rounded">
                                    format_list_bulleted
                                </span>
                            </button>
                            <button className='me-2 flex justify-center items-center rounded-full text-gray-600 hover:text-black'>
                                <span className="material-symbols-rounded">
                                    format_clear
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center mt-6">
                        <button className='border me-4 text-blue-800 w-12 h-12 flex justify-center items-center rounded-full hover:bg-blue-800 hover:bg-opacity-5'>
                            <span className="material-symbols-rounded">
                                video_library
                            </span>
                        </button>
                        <button className='border me-4 text-blue-800 w-12 h-12 flex justify-center items-center rounded-full hover:bg-blue-800 hover:bg-opacity-5'>
                            <span className="material-symbols-rounded">
                                upload
                            </span>
                        </button>
                        <button className='border text-blue-800 w-12 h-12 flex justify-center items-center rounded-full hover:bg-blue-800 hover:bg-opacity-5'>
                            <span className="material-symbols-rounded">
                                link
                            </span>
                        </button>
                        <div className='flex-1'></div>
                        <button className='px-3 py-2 rounded text-sm text-gray-600 hover:bg-black hover:bg-opacity-5 me-5' onClick={reset}>Cancel</button>
                        <button className='px-5 py-2 rounded text-sm  bg-blue-700 text-white disabled:bg-gray-600 disabled:bg-opacity-10 disabled:text-gray-600' disabled={postBody.length == 0} onClick={togglePostEditor}>Post</button>
                    </div>
                </form> :
                <div className='min-h-[5rem] rounded-lg border shadow-md flex items-center hover:cursor-pointer' onClick={togglePostEditor}>
                    <div className='w-12 h-12 rounded-full ms-6 me-4'>
                        <img src={loggedInUser?.profilePicture} alt="profile picture" width="100%" height="100%" className='rounded-full' />
                    </div>
                    <p className='text-xs text-slate-700'>Announce something to your class</p>
                </div>}
        </>
    )
}
