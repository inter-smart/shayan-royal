"use client";
import React from "react";



import { motion } from "framer-motion";

const textVariants = {
  offscreen: {
    y: 120,
    opacity: 0,
  },
  onscreen: {
    y: 0, 
    opacity: 1,
    transition: {
      type: "easeOuteaseOut",
      bounce: 0.4,
      duration: 0.8,
    },
  },
}; 

const sizes = {
  heading1:
    "text-[20px] sm:text-[25px] md:text-30px] lg:text-[35px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[60px] font-semibold leading-[1.1] text-black font-base1", 
  heading2:
    "text-[18px] sm:text-[22px] lg:text-[25px] xl:text-[30px] 2xl:text-[45px] 3xl:text-[50px] font-semibold text-black leading-[1.1] font-base1",
  heading3:
    "text-[16px] sm:text-[20px] lg:text-[22px] xl:text-[25px] 2xl:text-[35px] 3xl:text-[46px] font-medium leading-[1.1] font-base1",
  heading4:
    "text-[18px] xl:text-[20px] 2xl:text-[26px] 3xl:text-[30px] font-medium leading-[1.1] font-base1",
  heading5:
    "text-[20px] 2xl:text-[22px] 3xl:text-[25px] font-medium leading-[1.1] font-base1",
  heading6:
    "text-[10px] sm:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[20px] font-medium leading-[1.1] font-base1",
};

const Heading = ({ children, className = "", size, as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <motion.div
      variants={textVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true }}
    >
      <Component className={`${className} ${sizes[size]}`} {...restProps}>
        {children}
      </Component>
    </motion.div>
  );
};

export { Heading };
