import { JSX } from "react";
import {
 
  HelpCircle,
  MessageCircle,
  BookOpen,
  Award,
  Clock,
} from "lucide-react";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  icon: JSX.Element;
  category: string;
}

export const faqItems: FaqItem[] = [
  {
    id: 1,
    question: "How do I enroll in a course?",
    answer:
      "Enrolling in a course is simple! Browse our course catalog, select the course you're interested in, and click the 'Enroll Now' button. You'll be guided through the payment process, and once completed, you'll have immediate access to all course materials.",
    icon: <BookOpen className="h-5 w-5 text-purple-400" />,
    category: "Courses",
  },
  {
    id: 2,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. For corporate enrollments, we also offer invoice payment options. All payments are processed securely through our encrypted payment gateway.",
    icon: <MessageCircle className="h-5 w-5 text-blue-400" />,
    category: "Payment",
  },
  {
    id: 3,
    question: "Can I get a certificate after completing a course?",
    answer:
      "Yes! Upon successful completion of any course, you'll receive a digital certificate that you can download, print, and share on your social media profiles. Our certificates are recognized by many employers and can be a valuable addition to your resume.",
    icon: <Award className="h-5 w-5 text-amber-400" />,
    category: "Certificates",
  },
  {
    id: 4,
    question: "How long do I have access to course materials?",
    answer:
      "Once enrolled, you have lifetime access to all course materials. This means you can revisit lessons, download resources, and stay updated with any new content added to the course in the future. Learn at your own pace without any time constraints.",
    icon: <Clock className="h-5 w-5 text-green-400" />,
    category: "Access",
  },
  {
    id: 5,
    question: "Do you offer refunds if I'm not satisfied?",
    answer:
      "Yes, we have a 30-day money-back guarantee. If you're not completely satisfied with your course within the first 30 days after enrollment, you can request a full refund. Simply contact our support team, and we'll process your refund promptly.",
    icon: <HelpCircle className="h-5 w-5 text-red-400" />,
    category: "Refunds",
  },
];
