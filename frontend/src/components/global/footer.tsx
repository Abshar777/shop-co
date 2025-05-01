"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Twitter, Facebook, Instagram, Github } from "lucide-react";

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
    </Link>
  );
};

const SocialIcon = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <p className="flex items-center justify-center w-8 h-8 rounded-full bg-muted hover:bg-muted/80 transition-colors">
      {children}
    </p>
  );
};

export function Footer() {
  return (
    <footer className="w-full rounded-t-lg bg-gray-300 border-t">
      <div className="container mt-5 px-4 md:px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-3 space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter">SHOP.CO</h2>
            <p className="text-sm text-muted-foreground">
              We have clothes that suits your style and which you&apos;re proud
              to wear. From women to men.
            </p>
            <div className="flex space-x-2">
              <SocialIcon href="https://twitter.com">
                <Twitter className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="https://facebook.com">
                <Facebook className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="https://instagram.com">
                <Instagram className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="https://github.com">
                <Github className="h-4 w-4" />
              </SocialIcon>
            </div>
          </div>

          <div className="md:col-span-9">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  Company
                </h3>
                <ul className="space-y-2">
                  <li>
                    <FooterLink href="/about">About</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/features">Features</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/works">Works</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/career">Career</FooterLink>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  Help
                </h3>
                <ul className="space-y-2">
                  <li>
                    <FooterLink href="/support">Customer Support</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/delivery">Delivery Details</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/terms">Terms & Conditions</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/privacy">Privacy Policy</FooterLink>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  FAQ
                </h3>
                <ul className="space-y-2">
                  <li>
                    <FooterLink href="/account">Account</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/deliveries">
                      Manage Deliveries
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/orders">Orders</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/payments">Payments</FooterLink>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  Resources
                </h3>
                <ul className="space-y-2">
                  <li>
                    <FooterLink href="/ebooks">Free eBooks</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/tutorial">
                      Development Tutorial
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/blog">How to - Blog</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/playlist">YouTube Playlist</FooterLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t">
          <p className="text-xs text-muted-foreground mb-4 md:mb-0">
            Abshar777 © 2025, All Rights Reserved
          </p>
          <div className="flex items-center space-x-4">
            <img
              src="https://cdn-icons-png.flaticon.com/128/349/349221.png"
              alt="Visa"
              className="h-8 w-auto"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/128/196/196578.png"
              alt="Mastercard"
              className="h-8 w-auto"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/128/174/174861.png"
              alt="PayPal"
              className="h-8 w-auto"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/128/888/888871.png"
              alt="Apple Pay"
              className="h-8 w-auto"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/128/6124/6124998.png"
              alt="Google Pay"
              className="h-8 w-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
