import { useContext, useEffect, useRef, useState } from 'react'
import { LoggedInUser } from '../../../App'
import mugShot from "../../../assets/images/mugshot.png"

export const NewComment: React.FC = () => {
    const loggedinUser = useContext(LoggedInUser)
    const [commentText, setCommentText] = useState<string>("")
    const [commentInputFocused, setCommentInputFocused] = useState<boolean>(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }, [commentText])

    return (
        <div className="flex">
            <div className="w-10 h-10 me-4">
                <img src={loggedinUser?.profilePicture ?? mugShot} alt="Profile Pic" width="100%" height="100%" className='rounded-full' />
            </div>
            {
                (commentInputFocused || commentText.length > 0) ? <form className="flex-1 flex items-end">
                    <div className={`flex-1 p-4 rounded-3xl
                    ${commentInputFocused ? 'outline outline-2 -outline-offset-2 outline-gray-500' : 'outline outline-1 outline-gray-200'}`}>
                        <textarea ref={textareaRef} rows={1} name="comment-body" id="comment-body"
                            className="w-full bg-transparent resize-none text-xs py-2 mb-2 focus:outline-none"
                            onFocus={e => setCommentInputFocused(() => true)}
                            onBlur={e => setCommentInputFocused(() => false)}
                            onChange={e => setCommentText(() => e.target?.value)}
                            autoFocus={commentInputFocused}
                            placeholder='Add class comment...' >
                        </textarea>
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
                            <button className='me-2 flex justify-center items-center rounded-full text-gray-600 hover:text-black'>
                                <span className="material-symbols-rounded">
                                    close
                                </span>
                            </button>
                            {/* <button className='ms-auto px-5 py-2 rounded-full text-sm  bg-blue-700 text-white
                            disabled:bg-gray-600 disabled:bg-opacity-10 disabled:text-gray-600'
                                disabled={commentText.length == 0} >
                                Post
                            </button> */}
                        </div>
                    </div>
                    <button className='ms-auto w-10 h-10 rounded-full text-sm flex justify-center items-center disabled:text-gray-500'
                        disabled={commentText.length == 0} >
                        <span className="material-symbols-rounded">
                            send
                        </span>
                    </button>
                </form > : <div className="flex items-center flex-1">
                    <div className='text-xs flex items-center border rounded-3xl text-gray-600 px-4 py-2 flex-1 hover:cursor-pointer' onClick={e => setCommentInputFocused(() => true)}>
                        Add class comment...
                    </div>
                    <button className='ms-auto w-10 h-10 rounded-full text-sm flex justify-center items-center disabled:text-gray-500'
                        disabled >
                        <span className="material-symbols-rounded">
                            send
                        </span>
                    </button>
                </div>
            }
        </div>
    )
}
