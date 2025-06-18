
import Image from "next/image";

export default function PartnershipSection() {
    return (
        <section className="w-full h-auto pt-[80px] pb-[90px]">
            <div className="container">
                <div className="relative w-full">
                    <div className="w-[50%] float-left mb-[20px] mr-[70px]">
                        <div className="w-full relative rounded-[10px] overflow-hidden">
                            <Image
                                src="/images/brand.webp"
                                alt="brand"
                                width={810}
                                height={466}
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute bottom-0 right-0 pt-[30px] pr-[35px] pb-[40px] pl-[50px] rounded-tl-[10px] rounded-br-[10px]" style={{
                                background: 'linear-gradient(180deg, #2E4C99 0%, #0E1D44 100%)'
                            }}>
                                <div className="text-[100px] text-white font-bold mb-[10px] leading-none">
                                    30<span className="text-[#BE1E2D]">+</span>
                                </div>
                                <div className="text-[40px] text-white leading-none">
                                    Brands
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-[50px] mb-[30px] uppercase font-semibold font-barlow">
                            Trusted Brand Partnership
                        </div>
                        <p className="text-[20px] text-[#4B4B4B] mb-[30px]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse enim quam vellet iniquus iustus poterat inpune. Naturales divitias dixit parabiles esse, quod parvo esset natura contenta. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Duo Reges: constructio interrete. Que Manilium, ab iisque M. Quo studio Aristophanem putamus aetatem in litteris duxisse Cum autem in quo sapienter dicimus, id a primo rectissime dicitur. Conferam tecum, quam cuique verso rem subicias; Sed haec nihil sane ad rem.
                        </p>
                        <p className="text-[20px] text-[#4B4B4B] mb-[30px]">

                            Unum nescio, quo modo possit, si luxuriosus sit, finitas cupiditates habere. Sed ego in hoc resisto; Satis est tibi in te, satis in legibus, satis in mediocribus amicitiis praesidii. Nihilo beatiorem esse Metellum quam Regulum. Animum autem reliquis rebus ita perfecit, ut corpus; Itaque causa expetenda vides. Quod si ita se habeat, non possit beatam praestare vitam sapientia. Oculorum, inquit Plato, est in nobis sensus acerrimus, quibus
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}