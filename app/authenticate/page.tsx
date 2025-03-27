"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStytch, useStytchUser } from "@stytch/nextjs";
import { LoginOrSignupForm } from '../../components/LoginOrSignupForm';

export default function Authenticate() {
  const { user, isInitialized } = useStytchUser();
  const stytch = useStytch();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (stytch && !user && isInitialized) {
      const tokenType = searchParams.get('stytch_token_type');
      const token = searchParams.get('token');
      if (token && tokenType === 'magic_links') {
        stytch.magicLinks.authenticate(token, {
          session_duration_minutes: 60,
        });
      }
    }
  }, [isInitialized, searchParams, stytch, user]);

  useEffect(() => {
    if (isInitialized && user) {
      // Redirect the user to an authenticated page if they are already logged in
      router.replace("/");
    }
  }, [user, isInitialized, router]);

  return <div 
    className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <LoginOrSignupForm />
    </div>
  ;
}