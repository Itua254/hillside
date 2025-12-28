
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function AcademyPage() {
    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Header */}
            <div className="bg-[#1e3a8a] py-16 text-center text-white">
                <div className="container mx-auto px-4">
                    <span className="block text-secondary font-bold uppercase tracking-widest text-sm mb-2">Youth Development</span>
                    <h1 className="text-5xl font-extrabold uppercase italic tracking-tight">Hillside FC Academy</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                        <GraduationCap className="w-12 h-12 text-[#1e3a8a]" />
                    </div>

                    <h2 className="text-3xl font-extrabold uppercase text-[#1e3a8a] mb-6">Nurturing Tomorrow&apos;s Talent</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                        At the heart of Hillside FC lies a deep commitment to nurturing the next generation of football talent in Turkana County. Our Youth Development Program is more than just training—it&apos;s a pathway to opportunity, discipline, and community pride.
                    </p>

                    <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 inline-block">
                        <h3 className="text-xl font-bold uppercase text-secondary mb-4">Join The Academy</h3>
                        <p className="text-gray-600 mb-6">Want to be part of the future of Hillside FC?</p>
                        <Link href="https://web.whatsapp.com/send?phone=254769752124&text=" target="_blank">
                            <Button size="lg" className="bg-[#1e3a8a] text-white hover:bg-secondary font-bold uppercase tracking-widest px-8">
                                Enroll Your Child Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
