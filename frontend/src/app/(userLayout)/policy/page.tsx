"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Shield,
  Lock,
  Eye,
  FileText,
  Clock,
  Users,
} from "lucide-react";

export default function PolicyPage() {
  const [activeTab, setActiveTab] = useState("privacy");

  return (
    <div className="min-h-screen font-poppins">
      <div className="bg-whit transition-colors duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#151f38] to-[#1a2342] py-16 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-[rgb(37,150,190)]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="bg-[rgb(37,150,190)]/20 text-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/30 px-4 py-1 text-sm mb-4">
                Our Policies
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Privacy & Terms
              </h1>
              <p className="text-gray-300 text-lg">
                We're committed to protecting your data and providing a
                transparent learning experience.
              </p>
            </div>
          </div>
        </div>

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Policy Tabs */}
            <Tabs
              defaultValue={activeTab}
              onValueChange={setActiveTab}
              className="mb-8"
            >
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger
                  value="privacy"
                  className="data-[state=active]:bg-[rgb(37,150,190)] data-[state=active]:text-white"
                >
                  Privacy Policy
                </TabsTrigger>
                <TabsTrigger
                  value="terms"
                  className="data-[state=active]:bg-[rgb(37,150,190)] data-[state=active]:text-white"
                >
                  Terms of Service
                </TabsTrigger>
                <TabsTrigger
                  value="cookies"
                  className="data-[state=active]:bg-[rgb(37,150,190)] data-[state=active]:text-white"
                >
                  Cookie Policy
                </TabsTrigger>
              </TabsList>

              {/* Privacy Policy Content */}
              <TabsContent
                value="privacy"
                className="bg-white dark:bg-[#1a2342] p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-center mb-6">
                  <Shield className="h-6 w-6 text-[rgb(37,150,190)] mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Privacy Policy
                  </h2>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300">
                    Last updated: April 4, 2025
                  </p>

                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
                    1. Introduction
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    ELearning ("we", "our", or "us") is committed to protecting
                    your privacy. This Privacy Policy explains how we collect,
                    use, disclose, and safeguard your information when you visit
                    our website and use our services.
                  </p>

                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
                    2. Information We Collect
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    We collect information that you provide directly to us when
                    you register for an account, create or modify your profile,
                    sign up for our newsletter, or communicate with us. This
                    information may include your name, email address, phone
                    number, billing information, and educational background.
                  </p>

                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
                    3. How We Use Your Information
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and send related information</li>
                    <li>
                      Send you technical notices, updates, security alerts, and
                      support messages
                    </li>
                    <li>Respond to your comments, questions, and requests</li>
                    <li>
                      Personalize your experience and deliver content relevant
                      to your interests
                    </li>
                  </ul>

                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
                    4. Data Security
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    We implement appropriate technical and organizational
                    measures to protect the security of your personal
                    information. However, please note that no method of
                    transmission over the Internet or electronic storage is 100%
                    secure.
                  </p>

                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
                    5. Your Rights
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    You have the right to access, correct, or delete your
                    personal information. You may also have the right to
                    restrict or object to certain processing of your
                    information. To exercise these rights, please contact us at
                    privacy@elearning.com.
                  </p>

                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
                    6. Contact Us
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    If you have any questions about this Privacy Policy, please
                    contact us at:
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Email: privacy@elearning.com
                    <br />
                    Address: 7011 Vermont Ave, Los Angeles, CA 90044
                  </p>
                </div>
              </TabsContent>

              {/* Terms of Service Content */}
              <TabsContent
                value="terms"
                className="bg-white dark:bg-[#1a2342] p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-center mb-6">
                  <FileText className="h-6 w-6 text-[rgb(37,150,190)] mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Terms of Service
                  </h2>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300">
                    Last updated: April 4, 2025
                  </p>

                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
                    1. Acceptance of Terms
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    By accessing or using ELearning, you agree to be bound by
                    these Terms of Service. If you do not agree to these Terms,
                    you may not access or use our services.
                  </p>

                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
                    2. User Accounts
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    When you create an account with us, you must provide
                    accurate and complete information. You are responsible for
                    safeguarding your account and for all activities that occur
                    under your account.
                  </p>

                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
                    3. Course Content and Licensing
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    All content provided through our platform is owned by
                    ELearning or our content partners. You are granted a
                    limited, non-exclusive license to access and use the content
                    for personal, non-commercial purposes.
                  </p>

                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
                    4. Payments and Refunds
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Course fees are due in full at the time of enrollment. We
                    offer a 30-day money-back guarantee for most courses. To
                    request a refund, please contact our support team within 30
                    days of your purchase.
                  </p>

                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
                    5. Prohibited Conduct
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    You agree not to:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                    <li>Use our services for any illegal purpose</li>
                    <li>Share your account credentials with others</li>
                    <li>
                      Copy, distribute, or disclose any part of our platform
                    </li>
                    <li>
                      Attempt to decompile or reverse engineer any software
                      contained on our platform
                    </li>
                    <li>Harass, abuse, or harm another person</li>
                  </ul>

                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
                    6. Termination
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    We may terminate or suspend your account and access to our
                    services at our sole discretion, without notice, for conduct
                    that we believe violates these Terms or is harmful to other
                    users, us, or third parties.
                  </p>
                </div>
              </TabsContent>

              {/* Cookie Policy Content */}
              <TabsContent
                value="cookies"
                className="bg-white dark:bg-[#1a2342] p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-center mb-6">
                  <Lock className="h-6 w-6 text-[rgb(37,150,190)] mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Cookie Policy
                  </h2>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300">
                    Last updated: April 4, 2025
                  </p>

                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
                    1. What Are Cookies
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Cookies are small text files that are placed on your
                    computer or mobile device when you visit a website. They are
                    widely used to make websites work more efficiently and
                    provide information to the website owners.
                  </p>

                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
                    2. How We Use Cookies
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    We use cookies for the following purposes:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                    <li>To enable certain functions of the website</li>
                    <li>To provide analytics</li>
                    <li>To store your preferences</li>
                    <li>To enable ad delivery and behavioral targeting</li>
                  </ul>

                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
                    3. Types of Cookies We Use
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <strong>Essential cookies:</strong> These cookies are
                    necessary for the website to function and cannot be switched
                    off in our systems.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <strong>Performance cookies:</strong> These cookies allow us
                    to count visits and traffic sources so we can measure and
                    improve the performance of our site.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <strong>Functional cookies:</strong> These cookies enable
                    the website to provide enhanced functionality and
                    personalization.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <strong>Targeting cookies:</strong> These cookies may be set
                    through our site by our advertising partners to build a
                    profile of your interests.
                  </p>

                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
                    4. Managing Cookies
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Most web browsers allow you to control cookies through their
                    settings preferences. However, if you limit the ability of
                    websites to set cookies, you may worsen your overall user
                    experience.
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Policy Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white dark:bg-[#1a2342] p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="bg-[rgb(37,150,190)]/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-[rgb(37,150,190)]" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Data Protection
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We use industry-standard encryption and security measures to
                  protect your personal information.
                </p>
              </div>

              <div className="bg-white dark:bg-[#1a2342] p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="bg-[rgb(37,150,190)]/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-[rgb(37,150,190)]" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Transparency
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We're committed to being transparent about what data we
                  collect and how we use it.
                </p>
              </div>

              <div className="bg-white dark:bg-[#1a2342] p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="bg-[rgb(37,150,190)]/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-[rgb(37,150,190)]" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Regular Updates
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We regularly review and update our policies to ensure
                  compliance with regulations and best practices.
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mt-12 bg-gradient-to-r from-[#151f38] to-[#1a2342] p-6 rounded-lg">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Have Questions About Our Policies?
                  </h3>
                  <p className="text-gray-300">
                    Our team is here to help you understand how we protect your
                    data.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 bg-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/80 text-white rounded-lg transition-colors"
                >
                  Contact Support
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
