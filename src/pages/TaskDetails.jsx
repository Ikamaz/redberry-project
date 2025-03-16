import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useStore from "../store/store";

function TaskDetails() {
  const { id } = useParams();
  const { tasks, fetchComments, addComment } = useStore();
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);

  useEffect(() => {
    const fetchedTask = tasks.find((t) => t.id === parseInt(id));

    if (fetchedTask) {
      setTask(fetchedTask);
      if (fetchedTask.comments) {
        setComments(fetchedTask.comments);
      } else {
        fetchComments(id).then((fetchedComments) => {
          setComments(fetchedComments);
        });
      }
    }
  }, [id, tasks, fetchComments]);

  useEffect(() => {
    if (task && task.comments) {
      setComments(task.comments);
    }
  }, [task]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    const commentData = {
      text: newComment,
      task_id: parseInt(id),
      parent_id: replyingTo ? replyingTo.id : null,
    };

    setIsCommentSubmitting(true);
    try {
      await addComment(id, commentData);
      setComments((prevComments) => [commentData, ...prevComments]);
      setNewComment("");
      setReplyingTo(null);
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsCommentSubmitting(false);
    }
  };

  const handleReply = (comment) => {
    setReplyingTo(comment);
    setNewComment(`@${comment.author_nickname} `);
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{task.name}</h1>
      <p className="text-gray-600">{task.description}</p>

      <div className="mt-4 bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold text-lg">დავალების დეტალები</h3>
        <p><strong>სტატუსი:</strong> {task.status.name}</p>
        <p><strong>დეპარტამენტი:</strong> {task.department.name}</p>
        <p><strong>დამოუკიდებელი პირი:</strong> {task.employee.name} {task.employee.surname}</p>
        <p><strong>დასრულების ვადა:</strong> {new Date(task.due_date).toLocaleDateString()}</p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">კომენტარები</h2>
        <div className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={replyingTo ? `Replying to @${replyingTo.author_nickname}` : "Write a comment..."}
            className="w-full p-2 border rounded"
          ></textarea>
          <button
            onClick={handleCommentSubmit}
            disabled={isCommentSubmitting || !newComment.trim()}
            className="mt-2 bg-purple-600 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            {replyingTo ? "Reply" : "Add Comment"}
          </button>
        </div>

        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start space-x-3">
              <img src={comment.author_avatar} alt={comment.author_nickname} className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold">{comment.author_nickname}</p>
                <p className="text-gray-700">{comment.text}</p>
                {comment.sub_comments && comment.sub_comments.length > 0 && (
                  <div className="ml-6 space-y-2">
                    {comment.sub_comments.map((subComment) => (
                      <div key={subComment.id} className="flex items-start space-x-3">
                        <img src={subComment.author_avatar} alt={subComment.author_nickname} className="w-8 h-8 rounded-full" />
                        <div>
                          <p className="font-semibold">{subComment.author_nickname}</p>
                          <p className="text-gray-600">{subComment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {!comment.sub_comments || comment.sub_comments.length === 0 ? (
                  <button
                    className="text-sm text-blue-500 mt-2"
                    onClick={() => handleReply(comment)}
                  >
                    Reply
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
