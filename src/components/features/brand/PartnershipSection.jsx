
import Image from "next/image";

export default function PartnershipSection() {
    return (
        <section className="w-full h-auto xl:pt-[80px] lg:pt-[40px] pt-[20px] lg:pb-[90px] pb-[20px]">
            <div className="container">
                <div className="relative w-full">
                    <div className="md:w-[50%] w-full md:float-left xl:mb-[20px] mb-[15px] 3xl:mr-[70px] xl:mr-[50px] mr-[30px]">
                        <div className="w-full relative rounded-[10px] overflow-hidden">
                            <Image
                                src="/images/brand.webp"
                                alt="brand"
                                width={810}
                                height={466}
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute bottom-0 right-0 3xl:pt-[30px] 2xl:pt-[20px] xl:pt-[15px] pt-[10px] 3xl:pr-[35px] 2xl:pr-[25px] xl:pr-[20px] pr-[15px] 3xl:pb-[40px] 2xl:pb-[30px] xl:pb-[20px] pb-[15px] 3xl:pl-[50px] 2xl:pl-[40px] xl:pl-[30px] pl-[20px] rounded-tl-[10px] rounded-br-[10px]" style={{
                                background: 'linear-gradient(180deg, #2E4C99 0%, #0E1D44 100%)'
                            }}>
                                <div className="3xl:text-[100px] 2xl:text-[80px] xl:text-[60px] 2xs:text-[35px] text-[25px] text-white font-bold mb-[10px] leading-none">
                                    30<span className="text-[#BE1E2D]">+</span>
                                </div>
                                <div className="3xl:text-[40px] 2xl:text-[30px] xl:text-[22px] 2xs:text-[16px] text-[14px] text-white leading-none">
                                    Brands
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="3xl:text-[50px] 2xl:text-[40px] xl:text-[30px] lg:text-[25px] 3xs:text-[20px] text-[18px] 3xl:mb-[30px] 2xl:mb-[20px] 3xs:mb-[15px] mb-[10px] uppercase font-semibold font-barlow">
                            Trusted Brand Partnership
                        </h2>
                        <p className="3xl:text-[20px] 2xl:text-[18px] lg:text-[16px] text-[14px] text-[#4B4B4B] lg:mb-[30px] mb-[20px]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse enim quam vellet iniquus iustus poterat inpune. Naturales divitias dixit parabiles esse, quod parvo esset natura contenta. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Duo Reges: constructio interrete. Que Manilium, ab iisque M. Quo studio Aristophanem putamus aetatem in litteris duxisse Cum autem in quo sapienter dicimus, id a primo rectissime dicitur. Conferam tecum, quam cuique verso rem subicias; Sed haec nihil sane ad rem.
                        </p>
                        <p className="3xl:text-[20px] 2xl:text-[18px] lg:text-[16px] text-[14px] text-[#4B4B4B] lg:mb-[30px] mb-[20px]">

                            Unum nescio, quo modo possit, si luxuriosus sit, finitas cupiditates habere. Sed ego in hoc resisto; Satis est tibi in te, satis in legibus, satis in mediocribus amicitiis praesidii. Nihilo beatiorem esse Metellum quam Regulum. Animum autem reliquis rebus ita perfecit, ut corpus; Itaque causa expetenda vides. Quod si ita se habeat, non possit beatam praestare vitam sapientia. Oculorum, inquit Plato, est in nobis sensus acerrimus, quibus
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}