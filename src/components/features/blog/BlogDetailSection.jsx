"use client";

import Image from "next/image";
import BlogCard from "@/components/common/BlogCard";
import { Heading } from "@/components/layout/Heading";
import { formatPostDate, formatPostTime } from "@/lib/utils";
import parse from "html-react-parser";
import { mediaUrl } from "@/lib/constants";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const items = [
  {
    image: "/images/blog_2.webp",
    title: "Lorem ipsum dolor sit amet, consectetur",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa enim, quae prosunt aut quae nocent, aut bona sunt aut mala, quae sint paria necesse est.",
    date: "29.11.2024",
  },
  {
    image: "/images/blog_3.webp",
    title: "Lorem ipsum dolor sit amet, consectetur",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa enim, quae prosunt aut quae nocent, aut bona sunt aut mala, quae sint paria necesse est.",
    date: "29.11.2024",
  },
];

export default function BlogDetailSection({ blog, recentBlogs, slug }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchedComments, setFetchedComments] = useState([]);
  const [fetching, setFetching] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      toast.warning("Please enter both name and comment.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${mediaUrl}/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, content: comment, slug }),
        body: JSON.stringify({ name, content: comment, slug }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success("Your comment has been submitted!");
        setName("");
        setComment("");
        const newComment = {
          id: result.data?.id || Date.now(), // fallback to timestamp
          name,
          content: comment,
          created_at: new Date().toISOString(),
        };

        setFetchedComments((prev) => [newComment, ...prev]);
      } else {
        toast.error(result.message || "Submission failed.");
      }
    } catch (error) {
      console.error("Comment submission error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!slug) return;
    const fetchComments = async () => {
      setFetching(true);
      try {
        const res = await fetch(`${mediaUrl}/api/comments/get-comments?slug=${slug}`);
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
    <section className="w-full h-auto 2xl:py-[50px_130px] lg:py-[30px_85px] sm:py-[30px_50px] py-[20px_40px] block">
      <div className="container">
        <div className="flex flex-wrap">
          {/* Left content */}
          <div className="2xl:w-[calc(100%-525px)] xl:w-[calc(100%-350px)] lg:w-[calc(100%-280px)] w-full 2xl:pr-[30px] lg:p-[20px] max-lg:mb-[30px]">
            {/* Blog content */}
            <div className="typography [&>*]:md:my-[10px] [&>*]:my-[4px] [&>h3]:font-medium [&>h3]:2xl:mb-[30px] [&>h3]:lg:mb-[20px] [&>h3]:mb-[15px] [&>p]:col-span-full [&>p]:grid-cols-1 [&>p]:text-[12px] [&>p]:lg:text-[14px] [&>p]:2xl:text-[18px] [&>p]:3xl:text-[20px] [&>p]:2xl:mb-[25px] [&>img]:w-full [&>img]:h-auto [&>img]:aspect-[1085/530] [&>img]:2xl:mb-[40px] [&>img]:lg:mb-[30px] [&>img]:sm:mb-[20px] [&>img]:mb-[15px]">
              <Image src="/images/blog_detail_section.webp" alt="Image-1" width={1085} height={530} />
              <div className="flex items-center 2xs:pl-[20px] sm:pl-[30px] 2xl:pl-[40px] !mt-[-35px] sm:!mt-[-45px] xl:!mt-[-55px] 2xl:!mt-[-65px]">
                <div className="w-[60px] h-[60px] 2xs:w-[70px] 2xs:h-[70px] sm:w-[85px] sm:h-[85px] 2xl:w-[95px] 2xl:h-[95px] rounded-full bg-[#F3F3F3] flex items-center justify-center">
                  <div className="w-[50px] h-[50px] 2xs:w-[60px] 2xs:h-[60px] sm:w-[70px] sm:h-[70px] 2xl:w-[79px] 2xl:h-[79px] rounded-full bg-white">
                    <Image src="/images/blog.png" alt="Image-1" width={79} height={79} />
                  </div>
                </div>
                <div className="pl-[10px] 2xs:pl-[20px] pt-[25px] 2xs:pt-[30px] 2xl:pt-[25px]">
                  <h5 className="text-[15px] sm:text-[18px] 2xl:text-[20px] font-medium text-[#262626] mb-[2px] 2xl:mb-[5px] mt-0">John George</h5>
                  <h6 className="text-[13px] sm:text-[14px] 2xl:text-[16px] font-normal text-[#8E8585] mt-0">29.11.2024</h6>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between py-[20px] gap-1">
                <h2 className="m-0">LOREM IPSUM DOLOR SIT AMET, CONSECTETUR</h2>
                <div className="2xl:text-[20px] md:text-[14px] font-medium text-[#262626]  relative z-0 ">29.11.2024</div>
              </div>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse enim quam vellet iniquus iustus poterat inpune. Naturales divitias dixit
                parabiles esse, quod parvo esset natura contenta. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Duo Reges:
                constructio interrete. Que Manilium, ab iisque M. Quo studio Aristophanem putamus aetatem in litteris duxisse? Cum autem in quo
                sapienter dicimus, id a primo rectissime dicitur. Conferam tecum, quam cuique verso rem subicias; Sed haec nihil sane ad rem; Tum
                Torquatus: Prorsus, inquit, assentior; Ut id aliis narrare gestiant? Quodcumque in mentem incideret, et quodcumque tamquam occurreret.
              </p>
              <p>
                Unum nescio, quo modo possit, si luxuriosus sit, finitas cupiditates habere. Sed ego in hoc resisto; Satis est tibi in te, satis in
                legibus, satis in mediocribus amicitiis praesidii. Nihilo beatiorem esse Metellum quam Regulum. Animum autem reliquis rebus ita
                perfecit, ut corpus; Itaque eos id agere, ut a se dolores, morbos, debilitates repellant. Quid enim de amicitia statueris utilitatis
                causa expetenda vides. Quod si ita se habeat, non possit beatam praestare vitam sapientia. Oculorum, inquit Plato, est in nobis sensus
                acerrimus, quibus sapientiam non cernimus.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse enim quam vellet iniquus iustus poterat inpune. Naturales divitias dixit
                parabiles esse, quod parvo esset natura contenta. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Duo Reges:
                constructio interrete. Que Manilium, ab iisque M. Quo studio Aristophanem putamus aetatem in litteris duxisse? Cum autem in quo
                sapienter dicimus, id a primo rectissime dicitur. Conferam tecum, quam cuique verso rem subicias; Sed haec nihil sane ad rem; Tum
                Torquatus: Prorsus, inquit, assentior; Ut id aliis narrare gestiant? Quodcumque in mentem incideret, et quodcumque tamquam occurreret.
              </p>
              <p>
                Unum nescio, quo modo possit, si luxuriosus sit, finitas cupiditates habere. Sed ego in hoc resisto; Satis est tibi in te, satis in
                legibus, satis in mediocribus amicitiis praesidii. Nihilo beatiorem esse Metellum quam Regulum. Animum autem reliquis rebus ita
                perfecit, ut corpus; Itaque eos id agere, ut a se dolores, morbos, debilitates repellant. Quid enim de amicitia statueris utilitatis
                causa expetenda vides. Quod si ita se habeat, non possit beatam praestare vitam sapientia. Oculorum, inquit Plato, est in nobis sensus
                acerrimus, quibus sapientiam non cernimus.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse enim quam vellet iniquus iustus poterat inpune. Naturales divitias dixit
                parabiles esse, quod parvo esset natura contenta. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Duo Reges:
                constructio interrete. Que Manilium, ab iisque M. Quo studio Aristophanem putamus aetatem in litteris duxisse? Cum autem in quo
                sapienter dicimus, id a primo rectissime dicitur. Conferam tecum, quam cuique verso rem subicias; Sed haec nihil sane ad rem; Tum
                Torquatus: Prorsus, inquit, assentior; Ut id aliis narrare gestiant? Quodcumque in mentem incideret, et quodcumque tamquam occurreret.
              </p>
              <p>
                Unum nescio, quo modo possit, si luxuriosus sit, finitas cupiditates habere. Sed ego in hoc resisto; Satis est tibi in te, satis in
                legibus, satis in mediocribus amicitiis praesidii. Nihilo beatiorem esse Metellum quam Regulum. Animum autem reliquis rebus ita
                perfecit, ut corpus; Itaque eos id agere, ut a se dolores, morbos, debilitates repellant. Quid enim de amicitia statueris utilitatis
                causa expetenda vides. Quod si ita se habeat, non possit beatam praestare vitam sapientia. Oculorum, inquit Plato, est in nobis sensus
                acerrimus, quibus sapientiam non cernimus.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse enim quam vellet iniquus iustus poterat inpune. Naturales divitias dixit
                parabiles esse, quod parvo esset natura contenta. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Duo Reges:
                constructio interrete. Que Manilium, ab iisque M. Quo studio Aristophanem putamus aetatem in litteris duxisse? Cum autem in quo
                sapienter dicimus, id a primo rectissime dicitur. Conferam tecum, quam cuique verso rem subicias; Sed haec nihil sane ad rem; Tum
                Torquatus: Prorsus, inquit, assentior; Ut id aliis narrare gestiant? Quodcumque in mentem incideret, et quodcumque tamquam occurreret.
              </p>
              <p>
                Unum nescio, quo modo possit, si luxuriosus sit, finitas cupiditates habere. Sed ego in hoc resisto; Satis est tibi in te, satis in
                legibus, satis in mediocribus amicitiis praesidii. Nihilo beatiorem esse Metellum quam Regulum. Animum autem reliquis rebus ita
                perfecit, ut corpus; Itaque eos id agere, ut a se dolores, morbos, debilitates repellant. Quid enim de amicitia statueris utilitatis
                causa expetenda vides. Quod si ita se habeat, non possit beatam praestare vitam sapientia. Oculorum, inquit Plato, est in nobis sensus
                acerrimus, quibus sapientiam non cernimus.
              </p>
            </div>

            {/* Comment Form */}
            <div className="flex flex-wrap mt-10 2xl:pt-[65px] xl:pt-[45px] pt-[25px] 2xl:pb-[50px] pb-[30px] border-t border-b border-[#D0D0D0]">
              <div className="w-full md:w-[45%] xl:w-[37%] 3xl:pr-[55px] xl:pr-[45px] pr-[25px] mb-6 md:mb-0">
                <h3 className="3xl:text-[40px] 2xl:text-[36px] xl:text-[30px] text-[26px] font-medium uppercase text-[#000] mb-[20px] leading-[1.1]">
                  Leave a <span className="block"> Reply </span>
                </h3>
                <p className="3xl:text-[20px] 2xl:text-[18px] xl:text-[16px] text-[14px] text-[#262626] mb-[40px]">
                  Unum nescio, quo modo possit, si luxuriosus sit, finitas cupiditates habere. Sed ego in hoc resisto; Satis est tibi
                </p>
                {/* Comment Count with Conditional Icon */}
                <div className="flex items-center">
                  {fetchedComments.length > 0 && (
                    <div className="w-[17px] h-[17px] mr-2">
                      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    <div className="3xl:text-[20px] 2xl:text-[18px] xl:text-[16px] text-[14px] text-[#262626]">Comments</div>
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
                    className="w-full bg-[#eeeeee] rounded-md px-4 py-3 text-sm outline-none 2xl:h-[60px] h-[50px] 2xl:placeholder:text-[16px] placeholder:text-[14px]"
                  />
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Comment"
                    rows={4}
                    className="w-full bg-[#eeeeee] rounded-md px-4 py-3 text-sm outline-none resize-none 2xl:h-[120px] h-[100px] 2xl:placeholder:text-[16px] placeholder:text-[14px]"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-[#2E4C99] xl:mt-[25px] mt-[15px] 3xl:text-[16px] 2xl:text-[14px] text-[12px] text-white text-xs font-medium px-5 py-2 rounded-[50px] hover:bg-[#1d397e] transition xl:w-[178px] w-[165px] xl:h-[40px] h-[35px] flex items-center justify-center"
                    >
                      POST COMMENT
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Comment List */}
            {fetchedComments.map((comment, idx) => (
              <div key={idx} className="pt-[15px] xl:pt-[25px] 2xl:pt-[35px] pb-[20px] xl:pb-[30px] 2xl:pb-[40px] border-b border-[#D0D0D0] flex">
                {/* <div className="w-[22%] 3xs:w-[20%] 2xs:w-[15%] sm:w-[12%] md:w-[10%] lg:w-[12%] xl:w-[10%] 3xl:w-[6%]">
                  <div className="w-[65px] h-[65px] rounded-full overflow-hidden block">
                    <Image
                      src={comment.image}
                      alt={comment.name}
                      width={65}
                      height={65}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div> */}
                <div className="w-full">
                  <h6 className="text-[16px] md:text-[18px] 3xl:text-[20px] font-medium text-[#262626] mb-[2px] xl:mb-[5px]">
                    {comment.name}{" "}
                    <span className="text-[#7E7E7E] text-[11px] md:text-[12px] 3xl:text-[14px] font-normal">
                      {dayjs(comment.created_at).fromNow()}
                    </span>
                  </h6>
                  <p className="text-[12px] md:text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[20px] text-[#262626] mt-2">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Related Blogs Section */}
          <div className="lg:sticky top-[10px] h-full 2xl:w-[525px] xl:w-[350px] lg:w-[280px] w-full">
            <Heading as="h3" size="heading5" className="font-semibold text-[#262626] 2xl:mb-[25px] md:mb-[15px] mb-[10px]">
              Related Blogs
            </Heading>
            <div className="max-lg:m-[0_-10px] max-lg:flex max-lg:flex-wrap">
              {items.map((item, index) => (
                <div key={index} className="w-full h-auto 2xl:mb-[40px] lg:mb-[25px] max-lg:w-[calc(100%/2)] max-sm:w-full max-lg:p-[10px] block">
                  <BlogCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
