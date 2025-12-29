"use client";
import { mediaUrl } from "@/lib/constants";
import dayjs from "dayjs";
import React, { useEffect, useState, useCallback } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "sonner";

function BlogComments({ slug }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchedComments, setFetchedComments] = useState([]);
  const [fetching, setFetching] = useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  // Use useCallback to memoize handleSubmit and prevent unnecessary re-renders
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault(); // Prevent default form submission behavior

      if (loading) return; // Prevent multiple submissions

      if (!name.trim()) {
        toast.warning("Please enter name.");
        return;
      }

      if (!comment.trim()) {
        toast.warning("Please enter comment.");
        return;
      }

      if (name.trim().length > 100) {
        toast.warning("Name must be less than 100 characters.");
        return;
      }

      if (!executeRecaptcha) {
        toast.error("reCAPTCHA not loaded. Please try again.");
        return;
      }

      setLoading(true); // Set loading immediately to block further submissions

      try {
        const recaptchaToken = await executeRecaptcha("comments");
        if (!recaptchaToken) {
          toast.error("Failed to get reCAPTCHA token. Please try again.");
          return;
        }

        const response = await fetch(`${mediaUrl}/api/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            content: comment,
            status: "active",
            slug,
            recaptchaToken,
          }),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          toast.success(result?.message || "Your comment has been submitted!");
          setName("");
          setComment("");
          // Optionally refetch comments to update the list
          const res = await fetch(
            `${mediaUrl}/api/comments/get-comments?slug=${slug}`
          );
          const data = await res.json();
          if (data.success) {
            setFetchedComments(Array.isArray(data.data) ? data.data : []);
          }
        } else {
          toast.error(result.message || "Submission failed.");
        }
      } catch (error) {
        console.error("Comment submission error:", error);
        toast.error("Something went wrong. Please try again.");
      } finally {
        setLoading(false); // Reset loading state
      }
    },
    [loading, name, comment, slug, executeRecaptcha]
  );

  useEffect(() => {
    if (!slug) return;
    const fetchComments = async () => {
      setFetching(true);
      try {
        const res = await fetch(
          `${mediaUrl}/api/comments/get-comments?slug=${slug}`
        );
        const data = await res.json();
        if (data.success) {
          setFetchedComments(Array.isArray(data.data) ? data.data : []);
        } else {
          toast.error(data.message || "Failed to load comments.");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        toast.error("Something went wrong while loading comments.");
      } finally {
        setFetching(false);
      }
    };

    fetchComments();
  }, [slug]);

  return (
    <>
      <div className="flex flex-wrap mt-10 2xl:pt-[65px] xl:pt-[45px] pt-[25px] 2xl:pb-[50px] pb-[30px] border-t border-b border-[#D0D0D0]">
        <div className="w-full md:w-[45%] xl:w-[37%] 3xl:pr-[55px] xl:pr-[45px] pr-[25px] mb-6 md:mb-0">
          <h3 className="3xl:text-[40px] 2xl:text-[36px] xl:text-[30px] text-[26px] font-medium uppercase text-[#000] mb-[20px] leading-[1.1]">
            Leave a <span className="block"> Reply </span>
          </h3>
          <p className="3xl:text-[20px] 2xl:text-[18px] xl:text-[16px] text-[14px] text-[#262626] mb-[40px]">
            Share your feedback, questions, or insights in the comments below.
          </p>
          <div className="flex items-center">
            {fetchedComments.length > 0 && (
              <div className="w-[17px] h-[17px] mr-2">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.57617 4.25237C1.57617 3.17656 2.44829 2.30444 3.52409 2.30444H13.4749C14.5507 2.30444 15.4228 3.17656 15.4228 4.25236V11.3408C15.4228 12.4166 14.5507 13.2887 13.4749 13.2887H5.11105L2.42436 15.2859C2.2632 15.4057 2.04825 15.4244 1.86883 15.3342C1.68941 15.2441 1.57617 15.0604 1.57617 14.8596V4.25237ZM3.52409 3.36694C3.03509 3.36694 2.63867 3.76336 2.63867 4.25237V13.8027L4.61829 12.3311C4.70992 12.263 4.82105 12.2262 4.93522 12.2262H13.4749C13.9639 12.2262 14.3603 11.8298 14.3603 11.3408V4.25236C14.3603 3.76336 13.9639 3.36694 13.4749 3.36694H3.52409Z"
                    fill="black"
                  />
                </svg>
              </div>
            )}
            <div className="flex items-center">
              <span className="3xl:text-[20px] 2xl:text-[18px] xl:text-[16px] text-[14px] text-[#262626] pr-[2px]">
                {fetchedComments.length}
              </span>
              <div className="3xl:text-[20px] 2xl:text-[18px] xl:text-[16px] text-[14px] text-[#262626]">
                Comments
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[55%] xl:w-[63%]">
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name*"
              required
              disabled={loading} // Disable input during submission
              className="w-full bg-[#eeeeee] rounded-md px-4 py-3 text-sm outline-none 2xl:h-[60px] h-[50px] 2xl:placeholder:text-[16px] placeholder:text-[14px] disabled:opacity-50"
            />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comment*"
              rows={4}
              required
              disabled={loading} // Disable textarea during submission
              className="w-full bg-[#eeeeee] rounded-md px-4 py-3 text-sm outline-none resize-none 2xl:h-[120px] h-[100px] 2xl:placeholder:text-[16px] placeholder:text-[14px] disabled:opacity-50"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading} // Disable button during submission
                className={`bg-[#2E4C99] xl:mt-[25px] mt-[15px] 3xl:text-[16px] 2xl:text-[14px] text-[12px] text-white text-xs font-medium px-5 py-2 rounded-[50px] hover:bg-[#1d397e] transition xl:w-[178px] w-[165px] xl:h-[40px] h-[35px] flex items-center justify-center ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Submitting..." : "POST COMMENT"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Comment List */}
      {fetching ? (
        <p>Loading comments...</p>
      ) : fetchedComments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        fetchedComments.map((comment, idx) => (
          <div
            key={idx}
            className="pt-[15px] xl:pt-[25px] 2xl:pt-[35px] pb-[20px] xl:pb-[30px] 2xl:pb-[40px] border-b border-[#D0D0D0] flex"
          >
            <div className="w-full">
              <h6 className="text-[16px] md:text-[18px] 3xl:text-[20px] font-medium text-[#262626] mb-[2px] xl:mb-[5px]">
                {comment.name}{" "}
                <span className="text-[#7E7E7E] text-[11px] md:text-[12px] 3xl:text-[14px] font-normal">
                  {dayjs(comment.created_at).fromNow()}
                </span>
              </h6>
              <p className="text-[12px] md:text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[20px] text-[#262626] mt-2">
                {comment.content}
              </p>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default BlogComments;