"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";


export default function ChooseServicesSection() {
    const { ref, inView } = useInView({ threshold: 0.4 });
    return (
        <section className="w-full h-auto block">
            <div>
                <motion.div
                    initial={{ x: "-10%", opacity: 1 }}
                    animate={inView ? { x: "0%", opacity: 1 } : { x: "-10%", opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-full h-full max-xl:flex max-xl:items-center"
                >
                    <Image
                        src={item.image}
                        alt="Business Car"
                        width={1250}
                        height={550}
                        priority
                    />
                </motion.div>
            </div>
            <div className="container">

            </div>
        </section>
    );
}
