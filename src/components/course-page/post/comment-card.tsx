import { Comment } from '../../../models'

export const CommentCard: React.FC<{ comment: Comment }> = ({ comment }) => {
    return (
        <div className="flex mb-3">
            <div className="w-10 h-10 me-3">
                <img src={comment.writer.profilePicture} alt="profile pic" width="100%" height="100%" className='rounded-full' />
            </div>
            <div className="flex-1">
                <div className="flex items-center mb-2">
                    <p className='text-sm font-semibold text-gray-700 me-2'>{comment.writer.fullname}</p>
                    <p className='text-xs text-gray-600'>{comment.createdAt.toDateString()}</p>
                </div>
                <p className='text-sm text-gray-600'>{comment.body}</p>
            </div>
        </div>
    )
}
