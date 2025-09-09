"use client";
import React, { useState, useEffect } from "react";
import { Facebook, Twitter, Instagram, Share2, Copy, Check, X, WheatIcon } from "lucide-react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

const ShareModal = ({ isOpen, onClose }) => {
    const [pageUrl, setPageUrl] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setPageUrl(window.location.href);
        }
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(pageUrl);
        setCopied(true);

        // Reset after 1.5 sec
        setTimeout(() => setCopied(false), 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            {/* Modal container */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md relative animate-scaleIn">
                {/* Close button */}
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
                    onClick={onClose}
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-blue-600" />
                    Share this page
                </h2>

                {/* Social icons */}
                <div className="flex gap-4 mb-6 justify-center">
                    <Link
                        href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-blue-50 hover:bg-blue-100 transition shadow-sm"
                    >
                        <Facebook className="w-5 h-5 text-blue-600" />
                    </Link>
                    <Link
                        href={`https://twitter.com/intent/tweet?url=${pageUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-blue-50 hover:bg-blue-100 transition shadow-sm"
                    >
                        <Twitter className="w-5 h-5 text-sky-500" />
                    </Link>
                    <Link
                        href={`https://www.instagram.com/?url=${pageUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-pink-50 hover:bg-pink-100 transition shadow-sm"
                    >
                        <Instagram className="w-5 h-5 text-pink-500" />
                    </Link>

                    <Link
                        href={`https://api.whatsapp.com/send?text=${pageUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-green-50 hover:bg-green-100 transition shadow-sm"
                    >
                        <FaWhatsapp className="w-5 h-5 text-green-500" />
                    </Link>

                </div>

                {/* Copy link section */}
                <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-2">
                    <input
                        type="text"
                        value={pageUrl}
                        readOnly
                        className="flex-1 bg-transparent text-gray-700 px-2 outline-none"
                    />
                    <button
                        onClick={copyToClipboard}
                        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition ${copied
                                ? "bg-green-500 text-white"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4 animate-pop" />
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


        </div>
    );
};

export default ShareModal;
