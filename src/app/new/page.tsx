"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Home, Users, Calendar, Settings } from "lucide-react";

export default function NewPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white border-b shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto flex items-center justify-between py-4 px-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary-green">
              NIIRIC
            </span>
          </div>
          <ul className="flex gap-6 text-muted-foreground font-medium">
            <li>
              <a
                href="#"
                className="hover:text-primary-green transition-colors"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-primary-green transition-colors"
              >
                Community
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-primary-green transition-colors"
              >
                Events
              </a>
            </li>
          </ul>
          <Button>Sign In</Button>
        </nav>
      </header>
      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className="hidden md:flex flex-col w-64 bg-white border-r h-full py-8 px-4 gap-2"
          aria-label="Sidebar"
        >
          <nav>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary-green/10 text-muted-foreground hover:text-primary-green transition"
                >
                  <Home />
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary-green/10 text-muted-foreground hover:text-primary-green transition"
                >
                  <Users />
                  <span>Community</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary-green/10 text-muted-foreground hover:text-primary-green transition"
                >
                  <Calendar />
                  <span>Events</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary-green/10 text-muted-foreground hover:text-primary-green transition"
                >
                  <Settings />
                  <span>Settings</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        {/* Content */}
        <main className="flex-1 p-6 md:p-10">
          <section className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-primary-green mb-2">
              Welcome to NIIRIC
            </h2>
            <p className="text-muted-foreground mb-4">
              Your hub for innovation, research, and impact.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow flex flex-col overflow-hidden">
                <img
                  src="https://source.unsplash.com/random/400x200?sig=1"
                  alt="Community Impact"
                  className="w-full h-40 object-cover object-center"
                />
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg mb-2">Community Impact</h3>
                  <p className="text-muted-foreground flex-1">
                    See how NIIRIC members are making a difference.
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button>View</Button>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow flex flex-col overflow-hidden">
                <img
                  src="https://source.unsplash.com/random/400x200?sig=2"
                  alt="Upcoming Event"
                  className="w-full h-40 object-cover object-center"
                />
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg mb-2">Upcoming Event</h3>
                  <p className="text-muted-foreground flex-1">
                    Join our next innovation workshop.
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline">Register</Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-primary-green mb-2">
              Members Table
            </h2>
            <div className="overflow-x-auto rounded-lg border">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-primary-green bg-primary-green/5">
                      Name
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-primary-green bg-primary-green/5">
                      Role
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-primary-green bg-primary-green/5">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-2">Jane Doe</td>
                    <td className="px-4 py-2">Researcher</td>
                    <td className="px-4 py-2">Active</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2">John Smith</td>
                    <td className="px-4 py-2">Innovator</td>
                    <td className="px-4 py-2">Pending</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section className="bg-primary-green/5 rounded-2xl shadow p-8 mb-10">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-primary-green mb-2 tracking-tight">
                What We Do
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                NIIRIC connects innovators, researchers, and implementers to
                drive impactful change. We organize events, foster
                collaboration, and support projects that make a difference in
                our communities.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow flex flex-col items-center text-center px-6 py-8 transition hover:shadow-lg">
                <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-primary-green/10">
                  <Users className="w-8 h-8 text-primary-green" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-primary-green">
                  Collaboration
                </h3>
                <p className="text-muted-foreground">
                  Connect with a diverse network of professionals and
                  organizations.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow flex flex-col items-center text-center px-6 py-8 transition hover:shadow-lg">
                <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-primary-green/10">
                  <Calendar className="w-8 h-8 text-primary-green" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-primary-green">
                  Events
                </h3>
                <p className="text-muted-foreground">
                  Participate in workshops, webinars, and conferences to learn
                  and grow.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow flex flex-col items-center text-center px-6 py-8 transition hover:shadow-lg">
                <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-primary-green/10">
                  <span className="text-2xl text-primary-green">🚀</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-primary-green">
                  Impact
                </h3>
                <p className="text-muted-foreground">
                  Drive real-world change through research and implementation
                  projects.
                </p>
              </div>
            </div>
          </section>
          <section className="bg-white rounded-xl shadow p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-primary-green mb-2">
                  Messages
                </h2>
                <p className="text-muted-foreground mb-4">
                  View and manage your recent messages and notifications.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-primary-green/5 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary-green/10 flex items-center justify-center font-bold text-primary-green">
                      A
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-primary-green">
                          Alex Johnson
                        </span>
                        <span className="text-xs text-muted-foreground">
                          2 min ago
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">
                        Hi, can you share the latest project update?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-primary-green/5 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary-green/10 flex items-center justify-center font-bold text-primary-green">
                      J
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-primary-green">
                          Jane Doe
                        </span>
                        <span className="text-xs text-muted-foreground">
                          10 min ago
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">
                        Don't forget the team meeting at 3pm.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-primary-green/5 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary-green/10 flex items-center justify-center font-bold text-primary-green">
                      S
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-primary-green">
                          Samuel Lee
                        </span>
                        <span className="text-xs text-muted-foreground">
                          1 hr ago
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">
                        Great job on the last presentation!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-80 bg-primary-green/5 rounded-xl p-6 flex flex-col gap-4">
                <h3 className="font-semibold text-primary-green mb-2">
                  Send a Message
                </h3>
                <input
                  type="text"
                  placeholder="Recipient"
                  className="rounded-lg border border-primary-green px-4 py-2 focus:outline-none"
                />
                <textarea
                  placeholder="Type your message..."
                  className="rounded-lg border border-primary-green px-4 py-2 focus:outline-none min-h-[80px] resize-none"
                />
                <Button className="w-full">Send</Button>
              </div>
            </div>
          </section>
          <section className="bg-white rounded-xl shadow p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-primary-green mb-2">
                  Inbox
                </h2>
                <p className="text-muted-foreground mb-4">
                  Check your latest messages and notifications.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 border border-primary-green/20 rounded-lg bg-white hover:bg-primary-green/5 transition">
                    <div className="w-10 h-10 rounded-full bg-primary-green/10 flex items-center justify-center font-bold text-primary-green">
                      M
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-primary-green">
                          Mariam Bello
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Now
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">
                        Welcome to ExcelMind! Let us know if you need any help
                        getting started.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 border border-primary-green/20 rounded-lg bg-white hover:bg-primary-green/5 transition">
                    <div className="w-10 h-10 rounded-full bg-primary-green/10 flex items-center justify-center font-bold text-primary-green">
                      T
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-primary-green">
                          Team ExcelMind
                        </span>
                        <span className="text-xs text-muted-foreground">
                          5 min ago
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">
                        Your weekly progress report is ready to view.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 border border-primary-green/20 rounded-lg bg-white hover:bg-primary-green/5 transition">
                    <div className="w-10 h-10 rounded-full bg-primary-green/10 flex items-center justify-center font-bold text-primary-green">
                      A
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-primary-green">
                          Admin
                        </span>
                        <span className="text-xs text-muted-foreground">
                          1 hr ago
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">
                        Don&apos;t forget to update your profile for better
                        recommendations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-80 bg-primary-green/5 rounded-xl p-6 flex flex-col gap-4">
                <h3 className="font-semibold text-primary-green mb-2">
                  New Message
                </h3>
                <input
                  type="text"
                  placeholder="Recipient"
                  className="rounded-lg border border-primary-green px-4 py-2 focus:outline-none"
                />
                <textarea
                  placeholder="Type your message..."
                  className="rounded-lg border border-primary-green px-4 py-2 focus:outline-none min-h-[80px] resize-none"
                />
                <Button className="w-full">Send</Button>
              </div>
            </div>
          </section>
          <section className="bg-white rounded-xl shadow p-6 mb-8">
            <button
              className="text-primary-green underline"
              onClick={() => alert("Modal Example")}
            >
              Open Modal Example
            </button>
          </section>
          {/* Footer */}
          <footer className="w-full bg-primary-green text-white py-8 mt-10 rounded-t-2xl shadow-inner">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4">
              <span className="font-bold text-lg tracking-tight">
                NIIRIC &copy; {new Date().getFullYear()}
              </span>
              <nav className="flex gap-6 mt-4 md:mt-0 text-white/80 text-sm">
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </nav>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
