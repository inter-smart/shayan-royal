import Image from "next/image";
import BlogCard from "@/components/common/BlogCard";
import { Heading } from "@/components/layout/Heading";
const items = [
    {
        image: "/images/blog_2.webp",
        title: "Lorem ipsum dolor sit amet, consectetur",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa enim, quae prosunt aut quae nocent, aut bona sunt aut mala, quae sint paria necesse est.",
        date: "29.11.2024"
    },
    {
        image: "/images/blog_3.webp",
        title: "Lorem ipsum dolor sit amet, consectetur",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa enim, quae prosunt aut quae nocent, aut bona sunt aut mala, quae sint paria necesse est.",
        date: "29.11.2024"
    }
]

export default function BlogDetailSection() {
    return (
        <section className="w-full h-auto 2xl:py-[50px_130px] lg:py-[30px_85px] sm:py-[30px_50px] py-[20px_40px] block">
            <div className="container">
                <div className="flex flex-wrap">
                    <div className="2xl:w-[calc(100%-525px)] xl:w-[calc(100%-350px)] lg:w-[calc(100%-280px)] w-full 2xl:pr-[30px] lg:p-[20px] max-lg:mb-[30px]">
                        <div className="typography [&>*]:md:my-[10px] [&>*]:my-[4px] [&>h3]:font-medium [&>h3]:2xl:mb-[30px] [&>h3]:lg:mb-[20px] [&>h3]:mb-[15px] [&>p]:col-span-full [&>p]:grid-cols-1 [&>p]:text-[12px] [&>p]:lg:text-[14px] [&>p]:2xl:text-[18px] [&>p]:3xl:text-[20px] [&>p]:2xl:mb-[25px] [&>img]:w-full [&>img]:h-auto [&>img]:aspect-[1085/530] [&>img]:2xl:mb-[40px] [&>img]:lg:mb-[30px] [&>img]:sm:mb-[20px] [&>img]:mb-[15px]">
                            <Image
                                src="/images/blog_detail_section.webp"
                                alt="Image-1"
                                width={1085}
                                height={530} 
                            />
                            <span className="2xl:text-[20px] md:text-[14px] leading-1 font-medium text-[#262626] w-full max-lg:mb-[15px] relative z-0 2xl:top-[30px] lg:top-[20px] lg:flex lg:justify-end">29.11.2024</span>
                            <h3>LOREM IPSUM DOLOR SIT AMET, CONSECTETUR</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse enim quam vellet iniquus iustus poterat inpune. Naturales divitias dixit parabiles esse, quod parvo esset natura contenta. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Duo Reges: constructio interrete. Que Manilium, ab iisque M. Quo studio Aristophanem putamus aetatem in litteris duxisse? Cum autem in quo sapienter dicimus, id a primo rectissime dicitur. Conferam tecum, quam cuique verso rem subicias; Sed haec nihil sane ad rem; Tum Torquatus: Prorsus, inquit, assentior; Ut id aliis narrare gestiant? Quodcumque in mentem incideret, et quodcumque tamquam occurreret.</p>
                            <p>Unum nescio, quo modo possit, si luxuriosus sit, finitas cupiditates habere. Sed ego in hoc resisto; Satis est tibi in te, satis in legibus, satis in mediocribus amicitiis praesidii. Nihilo beatiorem esse Metellum quam Regulum. Animum autem reliquis rebus ita perfecit, ut corpus; Itaque eos id agere, ut a se dolores, morbos, debilitates repellant. Quid enim de amicitia statueris utilitatis causa expetenda vides. Quod si ita se habeat, non possit beatam praestare vitam sapientia. Oculorum, inquit Plato, est in nobis sensus acerrimus, quibus sapientiam non cernimus.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse enim quam vellet iniquus iustus poterat inpune. Naturales divitias dixit parabiles esse, quod parvo esset natura contenta. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Duo Reges: constructio interrete. Que Manilium, ab iisque M. Quo studio Aristophanem putamus aetatem in litteris duxisse? Cum autem in quo sapienter dicimus, id a primo rectissime dicitur. Conferam tecum, quam cuique verso rem subicias; Sed haec nihil sane ad rem; Tum Torquatus: Prorsus, inquit, assentior; Ut id aliis narrare gestiant? Quodcumque in mentem incideret, et quodcumque tamquam occurreret.</p>
                            <p>Unum nescio, quo modo possit, si luxuriosus sit, finitas cupiditates habere. Sed ego in hoc resisto; Satis est tibi in te, satis in legibus, satis in mediocribus amicitiis praesidii. Nihilo beatiorem esse Metellum quam Regulum. Animum autem reliquis rebus ita perfecit, ut corpus; Itaque eos id agere, ut a se dolores, morbos, debilitates repellant. Quid enim de amicitia statueris utilitatis causa expetenda vides. Quod si ita se habeat, non possit beatam praestare vitam sapientia. Oculorum, inquit Plato, est in nobis sensus acerrimus, quibus sapientiam non cernimus.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse enim quam vellet iniquus iustus poterat inpune. Naturales divitias dixit parabiles esse, quod parvo esset natura contenta. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Duo Reges: constructio interrete. Que Manilium, ab iisque M. Quo studio Aristophanem putamus aetatem in litteris duxisse? Cum autem in quo sapienter dicimus, id a primo rectissime dicitur. Conferam tecum, quam cuique verso rem subicias; Sed haec nihil sane ad rem; Tum Torquatus: Prorsus, inquit, assentior; Ut id aliis narrare gestiant? Quodcumque in mentem incideret, et quodcumque tamquam occurreret.</p>
                            <p>Unum nescio, quo modo possit, si luxuriosus sit, finitas cupiditates habere. Sed ego in hoc resisto; Satis est tibi in te, satis in legibus, satis in mediocribus amicitiis praesidii. Nihilo beatiorem esse Metellum quam Regulum. Animum autem reliquis rebus ita perfecit, ut corpus; Itaque eos id agere, ut a se dolores, morbos, debilitates repellant. Quid enim de amicitia statueris utilitatis causa expetenda vides. Quod si ita se habeat, non possit beatam praestare vitam sapientia. Oculorum, inquit Plato, est in nobis sensus acerrimus, quibus sapientiam non cernimus.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse enim quam vellet iniquus iustus poterat inpune. Naturales divitias dixit parabiles esse, quod parvo esset natura contenta. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Duo Reges: constructio interrete. Que Manilium, ab iisque M. Quo studio Aristophanem putamus aetatem in litteris duxisse? Cum autem in quo sapienter dicimus, id a primo rectissime dicitur. Conferam tecum, quam cuique verso rem subicias; Sed haec nihil sane ad rem; Tum Torquatus: Prorsus, inquit, assentior; Ut id aliis narrare gestiant? Quodcumque in mentem incideret, et quodcumque tamquam occurreret.</p>
                            <p>Unum nescio, quo modo possit, si luxuriosus sit, finitas cupiditates habere. Sed ego in hoc resisto; Satis est tibi in te, satis in legibus, satis in mediocribus amicitiis praesidii. Nihilo beatiorem esse Metellum quam Regulum. Animum autem reliquis rebus ita perfecit, ut corpus; Itaque eos id agere, ut a se dolores, morbos, debilitates repellant. Quid enim de amicitia statueris utilitatis causa expetenda vides. Quod si ita se habeat, non possit beatam praestare vitam sapientia. Oculorum, inquit Plato, est in nobis sensus acerrimus, quibus sapientiam non cernimus.</p>
                        </div>
                    </div>
                    <div className="lg:sticky top-[10px] h-full 2xl:w-[525px] xl:w-[350px] lg:w-[280px] w-full">
                        <Heading
                            as="h3"
                            size="heading5"
                            className="font-semibold text-[#262626] 2xl:mb-[25px] md:mb-[15px] mb-[10px]"
                        >
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