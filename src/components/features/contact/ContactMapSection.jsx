export default function ContactMapSection() {
    return (
        <section className="w-full h-auto block">
            <div className="w-full h-auto aspect-1920/585 block">
                <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14463.766334889!2d55.32882280646749!3d25.254244484833137!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE1JzE1LjMiTiA1NcKwMTknNDMuOCJF!5e0!3m2!1sen!2s!4v1640000000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: "300px" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </section>
    );
}