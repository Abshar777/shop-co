"use client";
import { Breadcrumbs } from "@/components/global/breadcrumb";
import React from "react";
import ProfileQuickLinks from "@/components/page-sections/profileQuickLinks";
import ProfileCard from "@/components/page-sections/profileCard";

const page = () => {
  return (
    <div className="w-full py-5 md:px-10 px-5">
      <Breadcrumbs />
      <h1 className="text-3xl  mt-2">Profile</h1>
      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-4">
        <ProfileQuickLinks />
        <ProfileCard
          name="Alex Johnson"
          email="alex.johnson@example.com"
          memberSince="January 15, 2023"
          orders={12}
          isVerified={true}
          location="New York, NY"
        
        />
      </div>
    </div>
  );
};

export default page;
