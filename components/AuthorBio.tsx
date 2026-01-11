import React from 'react';
import Link from 'next/link';

interface AuthorBioProps {
    name: string;
    role: string;
    bio: string;
    twitter?: string;
    linkedin?: string;
}

export default function AuthorBio({ name, role, bio, twitter, linkedin }: AuthorBioProps) {
    return (
        <div className="bg-gray-50 rounded-xl p-8 mt-12 border border-gray-100 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold flex-shrink-0">
                {(name || "U").charAt(0)}
            </div>
            <div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">{name}</h4>
                <p className="text-blue-600 text-sm font-medium mb-3 uppercase tracking-wider">{role}</p>
                <p className="text-gray-600 leading-relaxed mb-4">
                    {bio}
                </p>
                <div className="flex gap-4 justify-center md:justify-start">
                    {twitter && (
                        <Link href={twitter} className="text-gray-400 hover:text-blue-400 transition">
                            Twitter
                        </Link>
                    )}
                    {linkedin && (
                        <Link href={linkedin} className="text-gray-400 hover:text-blue-700 transition">
                            LinkedIn
                        </Link>
                    )}
                    <Link href="/about" className="text-gray-400 hover:text-gray-900 transition underline underline-offset-4">
                        Full Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}
