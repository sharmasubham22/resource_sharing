import React, { useEffect, useState } from 'react'
import { useFirebase } from '../../context/Firebase';
import Swal from 'sweetalert2';

export default function CommentsTab() {
    const [commentsData, setCommentsData] = useState([]);
    const firebase = useFirebase();

    useEffect(()=>{
        firebase.getAllComments().then((comments)=>{
            setCommentsData(comments);
        })
    },[])

    const deleteComment = async (resourceId, commentId) => {
        const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#6d466b",
                cancelButtonColor: "#cbd5e1",
                confirmButtonText: "Yes, delete it!",
              });

        if (!result.isConfirmed) return;

        const deleteResult = await firebase.deleteCommentAndRating(resourceId, commentId);

        if (deleteResult.success) {
          setCommentsData((prev) => prev.filter((c) => c.id !== commentId));
          Swal.fire({
            title: "Deleted!",
            text: "The comment has been deleted.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          console.error("Failed to delete comment:", deleteResult.error);
          Swal.fire({
            title: "Error",
            text: "Could not delete the comment. Please try again.",
            icon: "error",
          });
        }
      }
  return (
    <div>
      <div className="relative overflow-x-auto bg-background shadow-xs rounded-base border border-border ">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-card border-b border-t border-border">
            <tr>
              <th scope="col" className="px-6 py-3 font-body">
                Comment
              </th>
              <th scope="col" className="px-6 py-3 font-body">
                Resource
              </th>
              <th scope="col" className="px-6 py-3 font-body">
                Added by
              </th>
              <th scope="col" className="px-6 py-3 font-body">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {commentsData.map((comment) => (
                <tr
                  key={comment.id}
                  className="bg-background border-b border-border hover:bg-card"
                >
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-heading whitespace-nowrap"
                  >
                    <p className='text-text-primary'>{comment.comment}</p>
                  </th>
                  <td className="px-6 py-4">
                    {comment.resourceTitle}
                  </td>
                  <td className="px-6 py-4">{comment.userName}</td>
                  <td className="px-6 py-4 space-x-3">
                    <button
                      type="button"
                      className="font-medium text-brand hover:underline cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="font-medium text-danger hover:underline cursor-pointer"
                      onClick={() => deleteComment(comment.resourceId, comment.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
