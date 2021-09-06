import React, {useEffect, useState} from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

    const [OpenReplyComments,
        setOpenReplyComments] = useState(false)
    const [ChildCommentNumber,
        setChildCommentNumber] = useState(0)

    useEffect(() => {
        let commentNumber = 0;
        props
            .commentLists
            .map((comment) => {
                if (comment.responseTo === props.parentCommentId) {
                    commentNumber++;
                }
            })
        setChildCommentNumber(commentNumber)

    }, [props.commentLists])
    const renderReplyComment = (parentCommentId) => 
        props
            .commentLists
            .map((comment, index) => (

                <React.Fragment>
                    {comment.responseTo === parentCommentId && <div style={{ marginLeft:'40px' }}>
                        <SingleComment
                            refreshFunction={props.refreshFunction}
                            comment={comment}
                            postId={props.videoId}/>
                        <ReplyComment
                         refreshFunction={props.refreshFunction}
                            parentCommentId={comment._id}
                            postId={props.videoId}
                            commentLists={props.commentLists}/>
                    </div>
                    }
                </React.Fragment>
            ))
    

    const onHandleChange = () => {
        console.log(OpenReplyComments)
        setOpenReplyComments(!OpenReplyComments)
    }
    return (

        <div>
            {ChildCommentNumber > 0 && <p
                style={{
                fontSize: '14px',
                margin: 0,
                color: 'gray'
            }}
                onClick={onHandleChange}>
                View {ChildCommentNumber}
                more comment(s)
            </p>
}
            {OpenReplyComments && renderReplyComment(props.parentCommentId)}


        </div>
    )
}

export default ReplyComment
