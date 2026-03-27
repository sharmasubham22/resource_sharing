import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useFirebase } from '../../context/Firebase';
import StarReview from '../../components/StarReview';
import Button from '../../components/Button';
import { Rat, TriangleAlert } from 'lucide-react';
import Rating from '../../components/Rating';
import Comment from '../../components/Comment';
import CodeMirror from "@uiw/react-codemirror";

export default function ViewResource(props) {
    const params = useParams();
    const firebase = useFirebase();
    const resourceId = props.resourceId || params.id;
    const [resourceData, setResourceData] = useState(null);
    const [imgUrl, setImgUrl] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [commentsData, setCommentsData] = useState([]);
    const [user, setUser] = useState(null);
    const [showReportModal, setShowReportModal] = useState(false);
    const [selectedResource, setSelectedResource] = useState(null);
    const [selectedReason, setSelectedReason] = useState(null);
    
    useEffect(() => {
        if (resourceData) {
            const imgURL = resourceData.coverPhoto;
            firebase.getResourceImg(imgURL).then(url => setImgUrl(url));
        }
    }, [resourceData]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const [resource, reviews] = await Promise.all([
            firebase.viewResource(resourceId),
            firebase.getReviews(resourceId),
          ]);

          setResourceData(resource);
          setCommentsData(reviews);
        } catch (err) {
          console.error("Error fetching data:", err);

          setCommentsData({ comments: [], ratings: [] });
        }
      };

      fetchData();
    }, [resourceId]);

    

    useEffect(() => {
      const userId = resourceData?.user_id;
      if (!userId) return;

      let isMounted = true;

      const fetchUser = async () => {
        try {
          const data = await firebase.getUserById(userId);
          if (isMounted) {
            setUser(data);
          }
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      };

      fetchUser();

      return () => {
        isMounted = false; // prevents memory leak
      };
    }, [resourceData?.user_id, firebase]);

    if(resourceData == null) {
        return (
          <div className="text-center mt-50">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 text-brand-softer animate-spin fill-brand"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        );
    }

    const handleCommentChange = (e) => {
      setComment(e.target.value);
    }

    const handleSubmitReport = async () => {
      try {
        await firebase.reportResource(resourceData, selectedReason);

        setShowReportModal(false);
        setSelectedReason(null);

        console.log("Report submitted");
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <div className="max-w-5xl w-full mx-auto px-5 md:px-10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading text-center text-text-primary mt-5">
          {resourceData.title}
        </h1>
        <div className="flex items-center justify-center mt-5 gap-2">
          <img
            src={user?.userPhoto}
            className="rounded-full w-10 h-10 border border-brand-medium"
          />
          <p className="text-text-secondary font-body text-lg capitalize">
            {user?.name}
          </p>
        </div>
        {Array.isArray(resourceData.tags) && resourceData.tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 my-5">
            {resourceData.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center bg-brand-softer border border-brand-soft text-text-secondary text-md font-body px-2 py-0.5 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <img
          className="rounded-base mb-10 h-full mx-auto"
          src={imgUrl}
          alt=""
        />

        <div
          className="text-text-secondary font-body text-lg mb-5"
          dangerouslySetInnerHTML={{ __html: resourceData.description }}
        />
        <a
          href={resourceData.link}
          className="text-brand-medium font-semibold underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {resourceData.link}
        </a>
        {resourceData.codeSnippet == "" ? ( <></> ) : (
          <CodeMirror value={resourceData.codeSnippet} editable={false} theme="dark" className='mb-10' />
        )}
        
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setSelectedResource(resourceData);
            setShowReportModal(true);
          }}
          className="flex gap-2 float-end"
        >
          <TriangleAlert />
          Report
        </Button>
        {showReportModal && (
          <div className="fixed inset-0 bg-background/50 flex items-center justify-center z-50">
            <div className="bg-card text-text-primary p-6 rounded-lg w-96">
              <h2 className="text-lg font-semibold mb-4">Report Resource</h2>

              {/* Radio options */}
              <div className="flex flex-col gap-2">
                {[
                  "Spam",
                  "Inappropriate Content",
                  "Copyright Violation",
                  "Misleading Information",
                ].map((reason) => (
                  <label key={reason} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="reportReason"
                      value={reason}
                      onChange={(e) => setSelectedReason(e.target.value)}
                    />
                    {reason}
                  </label>
                ))}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 mt-5">
                <Button
                  variant="secondary"
                  onClick={() => setShowReportModal(false)}
                >
                  Cancel
                </Button>

                <Button
                  variant="primary"
                  onClick={handleSubmitReport}
                  disabled={!selectedReason}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className="my-10 font-body">
          <h1 className="text-4xl text-text-primary">Ratings & Reviews</h1>

          <p className="text-text-primary text-xl mt-5">
            <span className="text-2xl">{resourceData.ratingAverage}</span> out
            of 5
          </p>
          <p className="text-text-secondary">
            ({resourceData.ratingCount} reviews)
          </p>
        </div>
        {!props.isAdmin && (
          <div>
            <StarReview rating={rating} setRating={setRating} />
            <textarea
              className="block font-body text-lg w-full px-3 py-2.5 bg-input-bg border border-input-border text-input-text rounded-base focus:input-focus focus:border-brand shadow-xs placeholder:text-input-placeholder"
              rows={5}
              onChange={handleCommentChange}
              placeholder="Enter your comment"
            />
            {firebase.user === null ? (
              <Button
                variant="primary"
                size="md"
                className="mt-5"
                disabled="disabled"
              >
                Post Your Review
              </Button>
            ) : (
              <Button
                onClick={(e) => {
                  firebase.addReviews(
                    resourceId,
                    resourceData.title,
                    comment,
                    rating,
                  );
                  firebase.addRatingAvg(resourceId, rating);
                }}
                variant="primary"
                size="md"
                className="mt-5"
              >
                Post Your Review
              </Button>
            )}
          </div>
        )}

        <div className="mb-30 font-body">
          {commentsData.comments.map((comment, idx) => (
            <Comment
              key={comment.id || idx}
              comment={comment}
              ratings={commentsData.ratings}
            />
          ))}
        </div>
        {/* <iframe src={""} title="shared link" width="100%" height="300px" /> */}
      </div>
    );
}
