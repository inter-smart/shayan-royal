export default function ContactMapSection() {
    return (
        <section className="w-full h-auto block">
            <div className="w-full h-auto aspect-1920/585 block">
                <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.937350092695!2d-74.12279608459443!3d41.229157779276825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2dff7a6c9b36f%3A0x7bf2a3c6b5f7e5c2!2sHarriman%20State%20Park!5e0!3m2!1sen!2sus!4v1687187554000!5m2!1sen!2sus"
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