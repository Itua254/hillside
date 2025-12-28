import Image from "next/image";

export default function Partners() {
    return (
        <section className="py-12 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-8">Official Partners</h2>
                <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 hover:opacity-100 transition-opacity">
                    <div className="h-12 w-40 relative grayscale hover:grayscale-0 transition-all duration-300">
                        <Image
                            src="https://pndmpusmzgiebvbvpmat.supabase.co/storage/v1/object/public/site-assets/asekosi-logo.png"
                            alt="ASEKOSI Fueling Station"
                            fill
                            className="object-contain"
                        />
                    </div>
                    {/* Future partners can be added here */}
                </div>
            </div>
        </section>
    );
}
