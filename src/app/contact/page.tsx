"use client";
import React from "react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-16 px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Contact Us</h1>
        <p className="text-gray-600 mb-8">
          We&apos;d love to hear from you! Fill out the form below and our team
          will get back to you as soon as possible.
        </p>
        <form className="flex flex-col gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="you@email.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              placeholder="Type your message here..."
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition-colors"
          >
            Send Message
          </button>
        </form>
        <div className="mt-10 border-t pt-8 text-center">
          <p className="text-gray-500 text-sm">
            Or reach us directly at{" "}
            <a
              href="mailto:info@nrec.org.ng"
              className="text-green-700 font-medium hover:underline"
            >
              info@nrec.org.ng
            </a>
          </p>
          <p className="text-gray-500 text-sm mt-1">Lagos, Nigeria</p>
        </div>
      </div>
    </div>
  );
}
