import { useContext, useEffect, useState } from 'react'
import { LoggedInUser } from '../../../App'
import { Post, User, UserTypes, Comment } from '../../../models'
import { users as userDataRaw, courses as courseDataRaw, posts as postDataRaw, comments as commentDataRaw } from "../../../data/data.json"
import { CommentCard } from './comment-card'
import { NewComment } from './new-comment'

export const PostCard: React.FC<{ postId: number }> = ({ postId }) => {
    const loggedInUser = useContext(LoggedInUser)
    const [post, setPost] = useState<Post | undefined>()
    const [comments, setComments] = useState<Comment[] | undefined>()

    useEffect(() => {
        const postRaw = postDataRaw.find(item => item.id == postId)!

        const commentIds = postRaw.commentIds
        const postWriterRaw = userDataRaw.find(item => item.id == postRaw.writerId)!

        const commentsRaw = commentDataRaw.filter(item => item.postId == postId)!
        const comments = commentsRaw.map<Comment>((cmnt): Comment => {
            const commentWriterRaw = userDataRaw.find(usr => usr.id == cmnt.writerId)!
            return {
                id: cmnt.id,
                body: cmnt.body,
                writer: new User(
                    commentWriterRaw.id,
                    commentWriterRaw.firstname,
                    commentWriterRaw.lastname,
                    commentWriterRaw.usertype as UserTypes,
                    commentWriterRaw.profilePicture
                ),
                createdAt: new Date(cmnt.createdAt),
                lastUpdated: cmnt.lastUpdated ? new Date(cmnt.lastUpdated) : undefined
            }
        })
        const post: Post = {
            id: postRaw.id,
            body: postRaw.body,
            writer: new User(
                postWriterRaw.id,
                postWriterRaw.firstname,
                postWriterRaw.lastname,
                postWriterRaw.usertype as UserTypes,
                postWriterRaw.profilePicture
            ),
            createdAt: new Date(postRaw.createdAt),
            lastUpdated: postRaw.lastUpdated ? new Date(postRaw.lastUpdated) : undefined
        }

        setPost(() => post)
        setComments(() => comments)
    }, [])

    return (
        <div className='mt-6 border rounded-lg'>
            <div className="flex pe-4 pt-4 ps-6 mb-3 items-center">
                <div className="w-12 h-12 me-4">
                    <img src={post?.writer.profilePicture} alt="Profile Pic" width="100%" height="100%" className='rounded-full' />
                </div>
                <div className='flex-1 h-12'>
                    <p className='text-sm font-semibold text-gray-700'>{post?.writer.fullname}</p>
                    <p className='text-xs text-gray-600'>{post?.createdAt.toDateString()}</p>
                </div>
                <button className='w-10 h-10 flex justify-center items-center rounded-full hover:bg-black hover:bg-opacity-5'>
                    <span className="material-symbols-rounded">more_vert</span>
                </button>
            </div>
            <p className='text-sm pe-4 ps-6 mb-4'>
                {post?.body}
            </p>
            <div className="pe-4 pt-4 ps-6 mb-4 border-t">
                {comments?.map((cmnt, idx) => <CommentCard key={idx} comment={cmnt} />)}
                <NewComment />
            </div>
        </div>
    )
}
