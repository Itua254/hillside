
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Header */}
            <div className="bg-[#1e3a8a] py-16 text-center text-white">
                <div className="container mx-auto px-4">
                    <span className="block text-secondary font-bold uppercase tracking-widest text-sm mb-2">Get in Touch</span>
                    <h1 className="text-5xl font-extrabold uppercase italic tracking-tight">Contact Us</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-[#1e3a8a] mb-6 uppercase">Contact Information</h2>
                            <p className="text-gray-600 mb-8">
                                Have questions about the academy, fixtures, or merchandise? Reach out to us using the details below.
                            </p>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-blue-50 p-3 rounded-full">
                                <Phone className="w-6 h-6 text-[#1e3a8a]" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Phone</h3>
                                <p className="text-gray-600">+254 769 752 124</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-blue-50 p-3 rounded-full">
                                <Mail className="w-6 h-6 text-[#1e3a8a]" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Email</h3>
                                <p className="text-gray-600">tunchiwork@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-blue-50 p-3 rounded-full">
                                <MapPin className="w-6 h-6 text-[#1e3a8a]" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Location</h3>
                                <p className="text-gray-600">Turkana County, Kenya</p>
                            </div>
                        </div>
                    </div>

                    {/* Map or Decor */}
                    <div className="bg-gray-100 rounded-lg min-h-[300px] flex items-center justify-center">
                        <span className="text-gray-400 font-bold uppercase tracking-widest">Map Placeholder</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
