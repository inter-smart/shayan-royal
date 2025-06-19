import { Heading } from "@/components/layout/Heading";
import Image from "next/image";
export default function InnerBanner({ title, image, alt = "InnerBanner" }) {
    return (
        <section className="w-full 3xl:h-[650px] 2xl:h-[550px] xl:h-[440px] md:h-[380px] h-[340px] 2xl:pb-[100px] xl:pb-[70px] md:pb-[50px] pb-[30px] block relative z-0 before:content-[''] before:absolute before:-z-1 before:bottom-0 before:left-0 before:w-full before:h-[50%] before:bg-gradient-to-b before:from-rgba(0,0,0,0) before:to-black before:opacity-75 before:pointer-events-none">
            <Image
                src={image}
                alt={alt}
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
                className="-z-2"
                priority
            />
            <div className="container w-full h-full">
                <div className="w-full h-full flex items-end">
                    <Heading
                        size="heading2"
                        as="h1"
                        className="uppercase text-white font-semibold"
                    >
                        {title}
                    </Heading>
                </div>
            </div>
        </section>
    );
}
