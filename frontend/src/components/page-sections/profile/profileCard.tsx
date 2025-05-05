"use client";
import React, { useEffect, useState } from "react";
import {
  User,
  ShoppingBag,
  Calendar,
  ChevronRight,
  Mail,
  MapPin,
  Settings,
  Shield,
  Edit2,
  LogOut,
} from "lucide-react";
import { User as TUser } from "next-auth";
import { useSession, signOut } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";
interface ProfileCardProps {
  name: string;
  email: string;
  memberSince: string;
  orders: number;
  isVerified: boolean;
  location?: string;
  profileImageUrl?: string;
}

const profileCard = ({
  name,
  email,
  memberSince,
  orders,
  isVerified,
  location,
  profileImageUrl,
}: ProfileCardProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<TUser | null>(null);
  useEffect(() => {
    if (session?.user?.id) {
      setUser(session.user);
    }
  }, [session]);
  return (
    <div className="w-full md:col-span-3  bg-gray-300/10 rounded-lg border-input border-1 py-4 mt-4 flex flex-col gap-4 md:px-4 px-2">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-white shadow-md overflow-hidden flex items-center justify-center border-2 border-white">
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt={`${name}'s profile`}
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={40} className="text-gray-400" />
            )}
          </div>
          {/* <button
            className="absolute bottom-0 right-0 bg-white text-blue-600 p-1.5 rounded-full shadow-md hover:bg-blue-50 transition-all duration-300"
            aria-label="Edit profile picture"
          >
            <Edit2 size={14} />
          </button> */}
          {isVerified && (
            <div
              className="absolute top-0 right-0 bg-blue-600 text-white p-1 rounded-full shadow-md"
              title="Verified Account"
            >
              <Shield size={12} />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                {user?.name}
                {isVerified && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-100">
                    Verified
                  </span>
                )}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1 text-gray-600 dark:text-gray-300 text-sm">
                <div className="flex items-center gap-1">
                  <Mail size={14} />
                  <span>{user?.email}</span>
                </div>
                {location && (
                  <div className="flex items-center gap-1">
                    <span className="hidden sm:inline">•</span>
                    <MapPin size={14} />
                    <span>{location}</span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() =>
                signOut().then(() => {
                  toast.success("Logged out successfully");
                  router.push("/");
                })
              }
              className="bg-red-100 active:scale-95 border-red-200 border hover:bg-red-200/90 cursor-pointer text-gray-800 px-4 py-2 rounded-lg shadow-sm transition-all duration-300 text-sm font-medium flex items-center gap-1.5 self-start"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-blue-600" />
                <span className="text-sm text-gray-700 dark:text-gray-700">
                  Member since
                </span>
              </div>
              <p className="font-semibold text-gray-900 mt-1">{memberSince}</p>
            </div>

        
          </div>
        </div>
      </div>
    </div>
  );
};

export default profileCard;
