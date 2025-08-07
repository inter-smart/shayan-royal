import { Heading } from "@/components/layout/Heading";
import { Text } from "@/components/layout/Text";

export default function FabricationSection({ title, description }) {
  return (
    <section className="relative py-[10px] xl:py-[60px] 2xl:py-[80px] 3xl:py-[80px_120px]">
      <div className="container">
        <div className="relative text-white">
          <Heading size="heading2" as="h2" className="text-black uppercase font-normal mb-[10px]">
            {title ? title : "Fabrication Services"}
          </Heading>

          <Text size="text2" as="p" className="text-[#4B4B4B]">
            {description
              ? description
              : "We provide top-notch fabrication services tailored to meet your specific needs. Our team of experts ensures quality and precision in every project."}
          </Text>
        </div>
      </div>
    </section>
  );
}
