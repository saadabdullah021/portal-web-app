"use client";
import React, { useState, useEffect } from "react";
import { Facebook, Instagram, Share2, Copy, Check, X, Linkedin, QrCode } from "lucide-react";
import { FaWhatsapp, FaTelegram, FaXTwitter } from "react-icons/fa6";
import { usePathname, useSearchParams } from "next/navigation";

// QR Code component
const QRCodeGenerator = ({ url, size = 120 }) => {
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`;
    return (
        <div className="flex justify-center">
            <img
                src={qrCodeUrl}
                alt="QR Code"
                width={size}
                height={size}
                className="rounded-lg border-2 border-gray-200"
            />
        </div>
    );
};

const ShareModal = ({ isOpen, onClose, host_share_code, title }) => {
    const [pageUrl, setPageUrl] = useState("");
    const [copied, setCopied] = useState(false);
 const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
  if (typeof window === "undefined") return;

  const domain = window.location.origin;

  if (host_share_code) {
    // ✅ Updated: Use short link pattern `/s/{shortcode}`
    setPageUrl(`${domain}/s/${host_share_code}`);
  } else {
    const query = searchParams.toString();
    setPageUrl(`${domain}${pathname}${query ? `?${query}` : ""}`);
  }
}, [host_share_code, pathname, searchParams]);


    const copyToClipboard = () => {
        navigator.clipboard.writeText(pageUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isOpen) return null;

    const socialPlatforms = [
        {
            icon: <Facebook className="w-5 h-5" />,
            url: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
            bgColor: "bg-[#1877F2] hover:bg-[#166FE5]",
            shadowColor: "shadow-blue-500/25"
        },
        {
            icon: <FaXTwitter className="w-5 h-5" />,
            url: `https://twitter.com/intent/tweet?url=${pageUrl}`,
            bgColor: "bg-[#000000] hover:bg-[#1a1a1a]",
            shadowColor: "shadow-gray-900/25"
        },
        {
            icon: <Linkedin className="w-5 h-5" />,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
            bgColor: "bg-[#0A66C2] hover:bg-[#0958A5]",
            shadowColor: "shadow-blue-600/25"
        },
        {
            icon: <FaWhatsapp className="w-5 h-5" />,
            url: `https://api.whatsapp.com/send?text=${pageUrl}`,
            bgColor: "bg-[#25D366] hover:bg-[#22C55E]",
            shadowColor: "shadow-green-500/25"
        },
        {
            icon: <FaTelegram className="w-5 h-5" />,
            url: `https://t.me/share/url?url=${pageUrl}`,
            bgColor: "bg-[#0088CC] hover:bg-[#0077B5]",
            shadowColor: "shadow-sky-500/25"
        },
        {
            icon: <Instagram className="w-5 h-5" />,
            url: `https://www.instagram.com/?url=${pageUrl}`,
            bgColor: "bg-gradient-to-tr from-[#405DE6] via-[#5851DB] via-[#833AB4] via-[#C13584] via-[#E1306C] to-[#FD1D1D] hover:from-[#405DE6]/90 hover:to-[#FD1D1D]/90",
            shadowColor: "shadow-pink-500/25"
        }
    ];

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-50 transition-all duration-300"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
                <div
                    className="bg-white rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] 
                             border border-gray-100 w-full max-w-2xl pointer-events-auto
                             transform transition-all duration-300 ease-out scale-100 opacity-100
                             animate-in fade-in zoom-in-95 slide-in-from-bottom-4"
                >
                    {/* Header */}
                    <div className="relative p-6 pb-4">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 
                                     flex items-center justify-center transition-colors duration-200 group"
                        >
                            <X className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                                <Share2 className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {title || "Share"}
                                </h2>
                                <p className="text-sm text-gray-500">Share this content with others</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center w-full lg:gap-4">



                        <div className="flex flex-col w-full  lg:w-[70%]">



                            {/* Copy link */}
                            <div className="p-6 pt-4 w-full">
                                <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3 border border-gray-100">
                                    <div className="flex-1 min-w-0">
                                        <input
                                            type="text"
                                            value={pageUrl}
                                            readOnly
                                            className="w-full bg-transparent text-sm text-gray-600 outline-none truncate font-mono"
                                        />
                                    </div>
                                    <button
                                        onClick={copyToClipboard}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium 
                                         transition-all duration-200 ${copied
                                                ? "bg-green-500 text-white"
                                                : "bg-gray-900 text-white hover:bg-gray-800 active:scale-95"
                                            }`}
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="w-4 h-4" />
                                                Copied
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4" />
                                                Copy
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                            {/* Social platforms */}
                            <div className="px-3 pb-4">
                                <div className="flex items-center justify-center gap-6 flex-wrap">
                                    {socialPlatforms.map((platform, index) => (
                                        <a
                                            key={index}
                                            href={platform.url}
                                            target="_blank"
                                            rel="noopener noreferrer"

                                        >
                                            <div className={`w-12 h-12 rounded-full ${platform.bgColor} ${platform.shadowColor}
                                                   flex items-center justify-center shadow-lg mb-0 
                                                   transition-all duration-200 group-hover:shadow-xl group-hover:-translate-y-0.5`}>
                                                <div className="text-white">
                                                    {platform.icon}
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                        </div>



                        {/* QR Code Section */}
                        <div className="px-6 py-4 w-full  lg:w-[30%]">

                            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                                <QRCodeGenerator url={pageUrl} size={150} />
                                <p className="text-xs text-gray-500 text-center mt-3">Scan to open link</p>
                            </div>

                        </div>


                    </div>
                </div>



            </div>

            {/* Toast notification */}
            {copied && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[60] 
                               animate-in slide-in-from-top-4 duration-300">
                    <div className="bg-gray-900 text-white text-sm whitespace-nowrap px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-400" />
                        Link copied to clipboard
                    </div>
                </div>
            )}
        </>
    );
};
export default ShareModal;