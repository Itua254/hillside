
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ShopPage() {
    const products = [
        {
            id: 1,
            name: "WHITE JERSEY",
            price: "KSh 2,500.00",
            image: "White Jersey",
            link: "https://web.whatsapp.com/send?phone=254769752124&text=Hello%2C+I+want+to+purchase%3A%0D%0A%0D%0A*WHITE+JERSY*%0A*Price:*%20KSh%202,500.00%0D%0A%0D%0AThank+you%21"
        },
        {
            id: 2,
            name: "BLUE JERSEY",
            price: "KSh 2,500.00",
            image: "Blue Jersey",
            link: "https://web.whatsapp.com/send?phone=254769752124&text=Hello%2C+I+want+to+purchase%3A%0D%0A%0D%0A*BLUE+JERSY*%0A*Price:*%20KSh%202,500.00%0D%0A%0D%0AThank+you%21"
        },
        {
            id: 3,
            name: "RED JERSEY",
            price: "KSh 2,500.00",
            image: "Red Jersey",
            link: "https://web.whatsapp.com/send?phone=254769752124&text=Hello%2C+I+want+to+purchase%3A%0D%0A%0D%0A*RED+JERSY*%0A*Price:*%20KSh%202,500.00%0D%0A%0D%0AThank+you%21"
        }
    ];

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Header */}
            <div className="bg-[#1e3a8a] py-16 text-center text-white">
                <div className="container mx-auto px-4">
                    <span className="block text-secondary font-bold uppercase tracking-widest text-sm mb-2">Merchandise</span>
                    <h1 className="text-5xl font-extrabold uppercase italic tracking-tight">Club Shop</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white p-4 group cursor-pointer hover:shadow-xl transition-shadow border border-gray-200">
                            <div className="aspect-square bg-gray-100 mb-4 relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-bold text-2xl group-hover:scale-105 transition-transform uppercase text-center px-4">
                                    {product.image}
                                </div>
                            </div>
                            <h3 className="font-bold text-lg uppercase mb-1">{product.name}</h3>
                            <p className="text-secondary font-bold text-xl">{product.price}</p>
                            <div className="mt-4">
                                <Link href={product.link} target="_blank">
                                    <Button className="w-full bg-[#1e3a8a] hover:bg-secondary text-white font-bold uppercase tracking-widest rounded-none">
                                        Order via WhatsApp
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
