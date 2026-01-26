"use client";

import { useState, useEffect } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../../firebase";

export default function PhoneVerificationModal({ onSuccess, onClose }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone"); // phone | otp
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );
    }
  }, []);

  const sendOtp = async () => {
    setError("");
    setLoading(true);

    try {
      const result = await signInWithPhoneNumber(
        auth,
        phone,
        window.recaptchaVerifier
      );
      setConfirmation(result);
      setStep("otp");
    } catch (err) {
      setError("Failed to send OTP");
      console.error(err);
    }

    setLoading(false);
  };

  const verifyOtp = async () => {
    setError("");
    setLoading(true);

    try {
      await confirmation.confirm(otp);
      onSuccess(phone);
      onClose();
    } catch (err) {
      setError("Invalid OTP");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl w-full max-w-sm p-6">
        <h2 className="text-xl mb-4 text-center">
          Verify your phone
        </h2>

        {step === "phone" && (
          <>
            <input
              type="tel"
              placeholder="+8801XXXXXXXXX"
              className="w-full border px-4 py-3 rounded-lg mb-3"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              className="w-full border px-4 py-3 rounded-lg mb-3 text-center tracking-widest"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </>
        )}

        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">
            {error}
          </p>
        )}

        <button
          onClick={onClose}
          className="text-sm underline mt-4 block mx-auto"
        >
          Cancel
        </button>

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
