"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Coins,
  Crown,
  Download,
  FileText,
  Flame,
  GraduationCap,
  Layers,
  List,
  Lock,
  Bookmark,
  MessageSquare,
  Play,
  Search,
  ShieldAlert,
  Send,
  Star,
  Trophy,
  User,
  Users,
  Volume2,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";

type Category = "Forex" | "Crypto" | "Stocks" | "SMC" | "ICT";
type CourseFilter =
  "All" | "Forex" | "Crypto" | "Stock" | "SMC" | "ICT" | "Free" | "Premium" | "Completed";
type LessonStage = "overview" | "video" | "quiz" | "lessonComplete" | "courseComplete";
type LessonTab = "notes" | "resources" | "chapters" | "instructor" | "transcript" | "bookmarks";

interface Lesson {
  title: string;
  duration: number;
  videoId: string;
  objective: string;
  requiredKnowledge?: string;
  concepts?: string[];
  riskWarning?: string;
  resources?: { label: string; type: string }[];
  chapters?: { time: string; label: string }[];
  transcriptExcerpt?: string;
  question: string;
  answers: string[];
  correctAnswer: number;
}

interface Course {
  id: string;
  category: Category;
  title: string;
  subtitle: string;
  instructor: string;
  instructorTitle?: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  students: number;
  rating: number;
  certificate: boolean;
  access: "Free" | "Premium";
  color: "blue" | "gold" | "green";
  lessons: Lesson[];
}

const courses: Course[] = [
  {
    id: "forex-free-intro",
    category: "Forex",
    title: "Forex Trading — Free Starter",
    subtitle: "A no-cost taste of the full Masterclass",
    instructor: "Rohan Kapoor",
    level: "Beginner",
    duration: "45m",
    students: 41200,
    rating: 4.6,
    certificate: false,
    access: "Free",
    color: "blue",
    lessons: [
      {
        title: "What Is Forex, Really?",
        duration: 12,
        videoId: "5iEHsRja8u0",
        objective: "Get oriented before anything else.",
        requiredKnowledge: "None",
        concepts: ["Currency Pair", "Base & Quote"],
        chapters: [
          { time: "0:00", label: "Welcome & course map" },
          { time: "3:20", label: "What moves currency prices" },
          { time: "8:45", label: "Reading a quote: EUR/USD" },
        ],
        resources: [
          { label: "Currency Pair Cheat Sheet", type: "PDF" },
          { label: "Forex Basics Workbook", type: "XLSX" },
        ],
        transcriptExcerpt:
          "In this lesson, get oriented to the forex market and learn how currency pairs are quoted, including the base and quote currencies in EUR/USD.",
        question: "In EUR/USD, EUR is the...",
        answers: ["Quote currency", "Base currency", "Broker fee", "Lot size"],
        correctAnswer: 1,
      },
      {
        title: "How Currency Pairs Work",
        duration: 16,
        videoId: "VkUkLEkPVDQ",
        objective: "Learn how base and quote currencies work together in a forex pair.",
        requiredKnowledge: "What Is Forex, Really?",
        concepts: ["Base Currency", "Quote Currency", "Exchange Rate"],
        question: "In GBP/USD, which currency is the quote currency?",
        answers: ["GBP", "USD", "Both currencies", "Neither currency"],
        correctAnswer: 1,
      },
      {
        title: "Your First Market Session",
        duration: 17,
        videoId: "tkWXU-uxzoY",
        objective: "Get familiar with the major forex sessions and their trading hours.",
        requiredKnowledge: "How Currency Pairs Work",
        concepts: ["London Session", "New York Session", "Market Hours"],
        question: "Which forex market session opens first in a typical trading day?",
        answers: ["New York", "London", "Sydney", "Chicago"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "forex-beginner-masterclass",
    category: "Forex",
    title: "Forex Beginner Masterclass",
    subtitle: "Everything you need to place your first structured trade",
    instructor: "Rohan Kapoor",
    level: "Beginner",
    duration: "6h 10m",
    students: 18420,
    rating: 4.9,
    certificate: true,
    access: "Premium",
    color: "blue",
    lessons: [
      {
        title: "Introduction to Forex Market",
        duration: 18,
        videoId: "3q1NeXTGgzs",
        objective:
          "Understand currency pairs, how prices are quoted, and the mechanics behind an order.",
        requiredKnowledge: "None",
        concepts: ["Currency Pairs", "Bid & Ask", "Spread", "Pips"],
        riskWarning:
          "Forex trading involves significant risk of loss. Learn the mechanics and risk controls before trading.",
        question: "What does the spread represent?",
        answers: [
          "The difference between bid and ask",
          "The size of a trading position",
          "A market opening time",
        ],
        correctAnswer: 0,
      },
      {
        title: "Market Structure",
        duration: 22,
        videoId: "8ZJqUb-R38I",
        objective: "Recognize trends, ranges, and the swing points that shape market structure.",
        question: "A sequence of higher highs and higher lows most often describes what?",
        answers: ["A downtrend", "An uptrend", "A ranging market"],
        correctAnswer: 1,
      },
      {
        title: "Pips, Lots & Position Sizing",
        duration: 20,
        videoId: "wisld3FY2L8",
        objective: "Connect pip value and position size to a consistent risk amount.",
        question: "What should determine your position size?",
        answers: [
          "Your planned risk and stop distance",
          "The latest candle color",
          "The maximum leverage available",
        ],
        correctAnswer: 0,
      },
      {
        title: "Trading Sessions",
        duration: 16,
        videoId: "H3Qr1txRrWY",
        objective: "Compare major trading sessions and understand when liquidity tends to change.",
        question: "Which sessions commonly overlap to create a highly active forex period?",
        answers: ["Sydney and Tokyo", "London and New York", "Tokyo and Sydney"],
        correctAnswer: 1,
      },
      {
        title: "Building a Trading Plan",
        duration: 19,
        videoId: "0PEWECxBN2M",
        objective: "Turn a repeatable setup, risk limit, and review routine into a trading plan.",
        question: "What is the main purpose of a written trading plan?",
        answers: [
          "To remove all market risk",
          "To make decisions consistent and reviewable",
          "To guarantee profitable trades",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "crypto-price-action-mastery",
    category: "Crypto",
    title: "Crypto Price Action Mastery",
    subtitle: "Read structure and manage risk across digital asset markets",
    instructor: "Aarav Mehta",
    level: "Intermediate",
    duration: "4h 25m",
    students: 12600,
    rating: 4.8,
    certificate: true,
    access: "Premium",
    color: "gold",
    lessons: [
      {
        title: "Crypto Market Foundations",
        duration: 20,
        videoId: "S3uTR-P0ycA",
        objective: "Explore spot markets, liquidity, and the key risks unique to crypto assets.",
        requiredKnowledge: "None",
        concepts: ["Spot Markets", "Liquidity", "Volatility"],
        riskWarning:
          "Crypto assets can be highly volatile. Only trade with a clear understanding of the risks.",
        question: "Why can liquidity matter when entering a trade?",
        answers: [
          "It can affect execution and slippage",
          "It fixes the asset's price",
          "It guarantees a trade will close",
        ],
        correctAnswer: 0,
      },
      {
        title: "Reading Candlestick Structure",
        duration: 24,
        videoId: "JVMGHMhdkD4",
        objective: "Use candle context instead of treating individual candles as signals.",
        question: "A candlestick should be interpreted primarily in what context?",
        answers: ["Its color only", "The surrounding price structure", "The asset's ticker symbol"],
        correctAnswer: 1,
      },
      {
        title: "Planning Risk",
        duration: 21,
        videoId: "Rw_AV1nOTRE",
        objective: "Define invalidation and manage exposure before entering a volatile market.",
        question: "When should a trade's risk be planned?",
        answers: [
          "Before placing the trade",
          "After the trade is profitable",
          "Only after closing it",
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "stock-market-investing",
    category: "Stocks",
    title: "Stock Market Investing",
    subtitle: "Build a foundation in equities, portfolios, and long-term decisions",
    instructor: "Maya Sharma",
    level: "Beginner",
    duration: "3h 40m",
    students: 9800,
    rating: 4.7,
    certificate: true,
    access: "Free",
    color: "green",
    lessons: [
      {
        title: "How the Stock Market Works",
        duration: 17,
        videoId: "p7HKvqRI_Bo",
        objective: "Learn how shares, exchanges, and market participants fit together.",
        requiredKnowledge: "None",
        concepts: ["Shares", "Exchanges", "Order Books"],
        riskWarning:
          "Equity values can rise or fall. This lesson is educational and does not guarantee returns.",
        question: "What does owning a share generally represent?",
        answers: [
          "A small ownership interest in a company",
          "A guaranteed fixed return",
          "A loan from the exchange",
        ],
        correctAnswer: 0,
      },
      {
        title: "Risk and Diversification",
        duration: 19,
        videoId: "XGH9J5cKC70",
        objective: "Understand how diversification can help manage portfolio-specific risk.",
        question: "What is one purpose of diversification?",
        answers: [
          "To eliminate every kind of risk",
          "To avoid concentrating exposure in one asset",
          "To ensure short-term gains",
        ],
        correctAnswer: 1,
      },
      {
        title: "Creating an Investment Plan",
        duration: 21,
        videoId: "XBXa8HKFyaE",
        objective: "Match investment decisions to a time horizon and personal risk tolerance.",
        question: "A sound investment plan should account for your...",
        answers: [
          "Time horizon and risk tolerance",
          "Favorite company logo",
          "Daily price changes only",
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "ict-concepts",
    category: "ICT",
    title: "ICT Concepts",
    subtitle: "Explore order blocks, liquidity, and market structure",
    instructor: "Rohan Kapoor",
    level: "Advanced",
    duration: "5h 05m",
    students: 7400,
    rating: 4.8,
    certificate: true,
    access: "Premium",
    color: "blue",
    lessons: [
      {
        title: "Understanding Market Structure",
        duration: 24,
        videoId: "8ZJqUb-R38I",
        objective: "Identify meaningful swing points and use them to frame a market bias.",
        requiredKnowledge: "Market structure basics",
        concepts: ["Swing Highs", "Swing Lows", "Market Bias"],
        riskWarning:
          "Advanced trading concepts carry market risk. Always define position size and invalidation.",
        question: "What is a useful first step when reviewing market structure?",
        answers: [
          "Mark relevant swing highs and lows",
          "Choose a trade direction at random",
          "Ignore the higher timeframe",
        ],
        correctAnswer: 0,
      },
      {
        title: "Liquidity Concepts",
        duration: 26,
        videoId: "TcmNQJYGdp0",
        objective: "Learn how areas of resting orders can influence price movement.",
        question: "Why do traders pay attention to obvious swing levels?",
        answers: [
          "They can be areas where orders gather",
          "They guarantee a reversal",
          "They prevent volatility",
        ],
        correctAnswer: 0,
      },
      {
        title: "Order Blocks in Context",
        duration: 23,
        videoId: "NGenf0zaBoQ",
        objective: "Study order blocks as part of a broader market narrative, not in isolation.",
        question: "How should an order block be evaluated?",
        answers: [
          "As a guaranteed entry signal",
          "Alongside structure and risk context",
          "Without considering price action",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "smc-bootcamp",
    category: "SMC",
    title: "Smart Money Concept Bootcamp",
    subtitle: "A structured introduction to liquidity and institutional flow",
    instructor: "Aarav Mehta",
    level: "Intermediate",
    duration: "4h 50m",
    students: 6100,
    rating: 4.6,
    certificate: true,
    access: "Free",
    color: "gold",
    lessons: [
      {
        title: "A Framework for Price Action",
        duration: 21,
        videoId: "cP6xvs2I02s",
        objective: "Build a repeatable framework for observing price action and market context.",
        requiredKnowledge: "None",
        concepts: ["Price Action", "Market Context", "Trading Framework"],
        riskWarning:
          "Trading involves risk of loss. A framework can support decisions but cannot guarantee outcomes.",
        question: "What makes a trading framework useful?",
        answers: [
          "It supports consistent, reviewable decisions",
          "It removes uncertainty from markets",
          "It predicts every next candle",
        ],
        correctAnswer: 0,
      },
      {
        title: "Liquidity and Price",
        duration: 25,
        videoId: "dnno8rBBs8U",
        objective: "Connect liquidity concepts to potential price delivery areas.",
        question: "Can a liquidity level guarantee a price reversal?",
        answers: [
          "Yes, every time",
          "No, it is a context clue rather than a guarantee",
          "Only on a one-minute chart",
        ],
        correctAnswer: 1,
      },
      {
        title: "Risk-First Trade Planning",
        duration: 22,
        videoId: "8BvwWKSWwMo",
        objective: "Apply risk controls to a trade idea before considering execution.",
        question: "What should be defined before entering a trade?",
        answers: ["Risk and invalidation", "A target return only", "The result of the trade"],
        correctAnswer: 0,
      },
    ],
  },
];

const filters: CourseFilter[] = [
  "All",
  "Forex",
  "Crypto",
  "Stock",
  "SMC",
  "ICT",
  "Free",
  "Premium",
  "Completed",
];
const initialCompleted = new Set(["forex-beginner-masterclass:0", "forex-beginner-masterclass:1"]);

const categoryColors: Record<Course["color"], string> = {
  blue: "from-blue-950 via-blue-900 to-slate-950",
  gold: "from-cyan-950 via-blue-900/70 to-slate-950",
  green: "from-emerald-950 via-green-900/70 to-slate-950",
};

const courseImages: Record<Category, string> = {
  Forex: "/images/courses/forex.svg",
  Crypto: "/images/courses/crypto.svg",
  Stocks: "/images/courses/stocks.svg",
  SMC: "/images/courses/smc.svg",
  ICT: "/images/courses/ict.svg",
};

const membershipBenefits = [
  "Unlimited Courses",
  "Verified Certificates",
  "Community Access",
  "1:1 Mentor Support",
];

const downloadableResources = [
  { label: "Trading Checklist", type: "PDF", size: "220 KB" },
  { label: "Trading Journal Template", type: "XLSX", size: "480 KB" },
  { label: "Risk Calculator", type: "XLSX", size: "160 KB" },
  { label: "Session Overlap Indicators", type: "ZIP", size: "1.2 MB" },
];

const communityThreads = [
  {
    user: "Priya S.",
    question: "How tight should my stop be on a London-session EUR/USD entry?",
    replies: 14,
    mentorAnswered: true,
  },
  {
    user: "Karan V.",
    question: "Is a fair value gap still valid after price returns to it twice?",
    replies: 9,
    mentorAnswered: true,
  },
  {
    user: "Neha T.",
    question: "Best way to journal losing trades without it becoming discouraging?",
    replies: 21,
    mentorAnswered: false,
  },
];

const leaderboard = [
  { rank: 1, name: "Yash P.", xp: 18420 },
  { rank: 2, name: "Meera D.", xp: 17110 },
  { rank: 3, name: "Arjun Mehta", xp: 4280, isYou: true },
  { rank: 4, name: "Sana K.", xp: 15990 },
];

function getCourseProgress(course: Course, completedLessons: Set<string>) {
  return Math.round(
    (course.lessons.filter((_, index) => completedLessons.has(`${course.id}:${index}`)).length /
      course.lessons.length) *
      100,
  );
}

function isStringRecord(value: unknown): value is Record<string, string> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every((entry) => typeof entry === "string")
  );
}

export default function LMSPage() {
  const { user } = useAuthStore();
  const [filter, setFilter] = useState<CourseFilter>("All");
  const [query, setQuery] = useState("");
  const [completedLessons, setCompletedLessons] = useState(initialCompleted);
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [lessonStage, setLessonStage] = useState<LessonStage>("overview");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [activeLessonTab, setActiveLessonTab] = useState<LessonTab>("chapters");
  const [lessonNotesByKey, setLessonNotesByKey] = useState<Record<string, string>>({});
  const [notesLoadedFor, setNotesLoadedFor] = useState<string | null>(null);
  const [lessonBookmarks, setLessonBookmarks] = useState<string[]>([]);
  const [videoWatched, setVideoWatched] = useState(false);
  const [videoStartAt, setVideoStartAt] = useState(0);

  const activeCourse = courses.find((course) => course.id === activeCourseId);
  const activeLesson = activeCourse?.lessons[lessonIndex];
  const notesStorageKey = `academy-notes:${user?.id ?? user?.email ?? "guest"}`;
  const activeLessonKey =
    activeCourse && activeLesson ? `${activeCourse.id}:${lessonIndex}` : "";
  const lessonNotes = lessonNotesByKey[activeLessonKey] ?? "";

  useEffect(() => {
    setNotesLoadedFor(null);
    try {
      const savedNotes = window.localStorage.getItem(notesStorageKey);
      if (savedNotes) {
        const parsed: unknown = JSON.parse(savedNotes);
        if (isStringRecord(parsed)) {
          setLessonNotesByKey(parsed);
        } else {
          setLessonNotesByKey({});
        }
      } else {
        setLessonNotesByKey({});
      }
    } catch (error) {
      console.error("Could not load academy lesson notes:", error);
      setLessonNotesByKey({});
    }
    setNotesLoadedFor(notesStorageKey);
  }, [notesStorageKey]);

  useEffect(() => {
    if (notesLoadedFor !== notesStorageKey) return;
    try {
      window.localStorage.setItem(notesStorageKey, JSON.stringify(lessonNotesByKey));
    } catch (error) {
      console.error("Could not save academy lesson notes:", error);
    }
  }, [lessonNotesByKey, notesLoadedFor, notesStorageKey]);

  useEffect(() => {
    if (activeCourseId) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [activeCourseId]);

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesFilter =
        filter === "All" ||
        (filter === "Stock" ? course.category === "Stocks" : course.category === filter) ||
        (filter === "Free" && course.access === "Free") ||
        (filter === "Premium" && course.access === "Premium") ||
        (filter === "Completed" && getCourseProgress(course, completedLessons) === 100);
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${course.title} ${course.subtitle} ${course.category} ${course.instructor}`
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesFilter && matchesQuery;
    });
  }, [completedLessons, filter, query]);

  function openCourse(course: Course) {
    setActiveCourseId(course.id);
    const firstUncompleted = course.lessons.findIndex(
      (_, index) => !completedLessons.has(`${course.id}:${index}`),
    );
    setLessonIndex(firstUncompleted === -1 ? course.lessons.length - 1 : firstUncompleted);
    setSelectedAnswer(null);
    setActiveLessonTab("chapters");
    setVideoWatched(false);
    setVideoStartAt(0);
    setLessonStage("overview");
  }

  function completeLesson() {
    if (!activeCourse || selectedAnswer !== activeLesson?.correctAnswer) return;

    setCompletedLessons((previous) => new Set(previous).add(`${activeCourse.id}:${lessonIndex}`));
    setSelectedAnswer(null);
    setLessonStage("lessonComplete");
  }

  function continueToNextLesson() {
    if (!activeCourse) return;
    if (lessonIndex === activeCourse.lessons.length - 1) {
      setLessonStage("courseComplete");
      return;
    }

    setLessonIndex((current) => current + 1);
    setSelectedAnswer(null);
    setActiveLessonTab("chapters");
    setVideoWatched(false);
    setVideoStartAt(0);
    setLessonStage("overview");
  }

  function backToCatalog() {
    setActiveCourseId(null);
    setFilter("All");
    setQuery("");
    setLessonIndex(0);
    setLessonStage("overview");
    setSelectedAnswer(null);
    setActiveLessonTab("chapters");
    setVideoWatched(false);
    setVideoStartAt(0);
    setLessonBookmarks([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function seekToChapter(time: string) {
    const [minutes = "0", seconds = "0"] = time.split(":");
    const startAt = Number(minutes) * 60 + Number(seconds);
    if (!Number.isFinite(startAt)) return;
    setVideoStartAt(startAt);
    setLessonStage("video");
  }

  function downloadLessonResource(resource: NonNullable<Lesson["resources"]>[number]) {
    if (!activeCourse || !activeLesson) return;

    const resourceText = [
      resource.label,
      `${activeCourse.title} — ${activeLesson.title}`,
      "",
      `Category: ${activeCourse.category}`,
      `Level: ${activeCourse.level}`,
      `Objective: ${activeLesson.objective}`,
      activeLesson.requiredKnowledge
        ? `Required knowledge: ${activeLesson.requiredKnowledge}`
        : "",
      activeLesson.concepts?.length
        ? `Key concepts: ${activeLesson.concepts.join(", ")}`
        : "",
      activeLesson.chapters?.length
        ? `Chapters:\n${activeLesson.chapters.map((chapter) => `${chapter.time} ${chapter.label}`).join("\n")}`
        : "",
      `Lesson video: https://www.youtube.com/watch?v=${activeLesson.videoId}`,
      "",
      "Study resource generated from the lesson information.",
    ]
      .filter(Boolean)
      .join("\n");
    const blob = new Blob([resourceText], { type: "text/plain;charset=utf-8" });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${resource.label.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
  }

  const totalCompleted = completedLessons.size;

  return (
    <div className="mx-auto max-w-[1380px] space-y-6 px-1 py-3 sm:px-2">
      {activeCourse && activeLesson ? (
        <section className="space-y-5">
          <button
            type="button"
            onClick={backToCatalog}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-300"
          >
            <ArrowLeft size={16} /> Back to courses
          </button>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="space-y-5">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0B1021] sm:p-7">
                <p className="text-sm font-bold uppercase tracking-wide text-cyan-600 dark:text-[#19C8EE]">
                  {activeCourse.title}
                </p>
                <div className="mt-4 h-2.5 max-w-[440px] overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-[#19C8EE] transition-all"
                    style={{ width: `${getCourseProgress(activeCourse, completedLessons)}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-white/55">
                  {getCourseProgress(activeCourse, completedLessons)}% of course complete
                </p>
              </div>

              {lessonStage === "overview" && (
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0B1021] sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-[#19C8EE]">
                    Lesson {lessonIndex + 1}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                    {activeLesson.title}
                  </h2>
                  <p className="mt-1 text-xs text-gray-400">
                    Lesson {lessonIndex + 1} of {activeCourse.lessons.length}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-white/60">
                    {activeLesson.objective}
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      { label: "Difficulty", value: activeCourse.level },
                      { label: "Duration", value: `${activeLesson.duration} min` },
                      {
                        label: "Required knowledge",
                        value:
                          activeLesson.requiredKnowledge ??
                          (lessonIndex === 0
                            ? "None"
                            : (activeCourse.lessons[lessonIndex - 1]?.title ?? "Previous lesson")),
                      },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-white/10 dark:bg-white/[0.03]"
                      >
                        <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                          {label}
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white/80">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                  {activeLesson.concepts && activeLesson.concepts.length > 0 && (
                    <div className="mt-5">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                        In this lesson you will understand
                      </h3>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {activeLesson.concepts.map((concept) => (
                          <div
                            key={concept}
                            className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/80"
                          >
                            <CheckCircle2 size={15} className="shrink-0 text-emerald-500" />
                            {concept}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {activeLesson.riskWarning && (
                    <div className="mt-4 flex items-start gap-3 rounded-xl border border-cyan-300/40 bg-cyan-50 p-4 text-sm leading-5 text-cyan-900 dark:border-[#19C8EE]/20 dark:bg-[#19C8EE]/[0.07] dark:text-cyan-100/80">
                      <ShieldAlert
                        size={18}
                        className="mt-0.5 shrink-0 text-cyan-600 dark:text-[#19C8EE]"
                      />
                      <p>{activeLesson.riskWarning}</p>
                    </div>
                  )}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-sm text-gray-500 dark:text-white/50">
                      <Clock3 size={15} className="mr-1 inline" />
                      Estimated time: {activeLesson.duration} minutes
                    </span>
                    <button
                      type="button"
                      onClick={() => setLessonStage("video")}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-[#19C8EE] px-6 py-3 text-sm font-semibold text-[#0B1021] shadow-sm transition hover:brightness-105"
                    >
                      <Play size={16} fill="currentColor" /> Start Lesson
                    </button>
                  </div>
                </div>
              )}

              {lessonStage === "video" && (
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0B1021] sm:p-7">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {activeLesson.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-500 dark:text-white/55">
                    Lesson {lessonIndex + 1} of {activeCourse.lessons.length} ·{" "}
                    {activeLesson.duration} min
                  </p>
                  <div className="mt-5 aspect-video overflow-hidden rounded-xl bg-black">
                    <iframe
                      key={`${activeCourse.id}:${lessonIndex}:${videoStartAt}`}
                      title={`${activeLesson.title} video lesson`}
                      src={`https://www.youtube-nocookie.com/embed/${activeLesson.videoId}?controls=1&rel=0&start=${videoStartAt}`}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]">
                    <span className="text-xs text-gray-500 dark:text-white/50">
                      {videoWatched
                        ? "Playback completed"
                        : `Lesson duration: ${activeLesson.duration} min`}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between px-1 text-xs text-gray-400 dark:text-white/40">
                    <span className="inline-flex items-center gap-1.5">
                      <Volume2 size={13} /> Playback quality: Auto
                    </span>
                    {!videoWatched && (
                      <button
                        type="button"
                        onClick={() => setVideoWatched(true)}
                        className="font-medium text-cyan-700 hover:underline dark:text-[#19C8EE]"
                      >
                        Mark video as watched
                      </button>
                    )}
                  </div>

                  <div className="mt-5 flex gap-1 overflow-x-auto border-b border-gray-200 dark:border-white/10">
                    {(
                      [
                        ["notes", "Notes", FileText],
                        ["resources", "Resources", Download],
                        ["chapters", "Chapters", List],
                        ["instructor", "Instructor", User],
                        ["transcript", "Transcript", FileText],
                        ["bookmarks", "Bookmarks", Bookmark],
                      ] as const
                    ).map(([tab, label, Icon]) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveLessonTab(tab)}
                        aria-pressed={activeLessonTab === tab}
                        className={`inline-flex shrink-0 items-center gap-2 rounded-t-lg border-b-2 px-3 py-3 text-xs font-semibold transition ${
                          activeLessonTab === tab
                            ? "border-cyan-400 bg-cyan-50 text-cyan-800 dark:bg-[#19C8EE]/10 dark:text-[#19C8EE]"
                            : "border-transparent text-gray-500 hover:text-gray-900 dark:text-white/45 dark:hover:text-white"
                        }`}
                      >
                        <Icon size={14} /> {label}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 min-h-28 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                    {activeLessonTab === "notes" && (
                      <div>
                        <textarea
                          value={lessonNotes}
                          onChange={(event) =>
                            setLessonNotesByKey((previous) => ({
                              ...previous,
                              [activeLessonKey]: event.target.value,
                            }))
                          }
                          placeholder="Jot down key takeaways from this lesson..."
                          aria-label="Lesson notes"
                          className="min-h-24 w-full resize-y border-0 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 dark:text-white/80"
                        />
                        <p className="mt-2 text-xs text-gray-400" aria-live="polite">
                          Notes save automatically for this lesson on this device.
                        </p>
                      </div>
                    )}
                    {activeLessonTab === "resources" &&
                      (activeLesson.resources?.length ? (
                        <div className="space-y-2">
                          {activeLesson.resources.map((resource) => (
                            <div
                              key={resource.label}
                              className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white p-3 text-sm dark:border-white/10 dark:bg-[#0B1021]"
                            >
                              <div>
                                <span className="inline-flex items-center gap-2 text-gray-700 dark:text-white/80">
                                  <FileText size={14} className="text-cyan-500" />
                                  {resource.label}
                                </span>
                                <p className="ml-6 text-xs text-gray-400">
                                  Generated lesson study guide · TXT
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => downloadLessonResource(resource)}
                                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-cyan-200 px-3 py-2 text-xs font-semibold text-cyan-700 transition hover:bg-cyan-50 dark:border-cyan-500/30 dark:text-cyan-300 dark:hover:bg-cyan-500/10"
                              >
                                <Download size={14} /> Download
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600 dark:text-white/65">
                            Download a study guide generated from this lesson.
                          </p>
                          <button
                            type="button"
                            onClick={() =>
                              downloadLessonResource({
                                label: `${activeLesson.title} study guide`,
                                type: "TXT",
                              })
                            }
                            className="inline-flex items-center gap-2 rounded-lg border border-cyan-200 bg-white px-3 py-2 text-xs font-semibold text-cyan-700 transition hover:bg-cyan-50 dark:border-cyan-500/30 dark:bg-[#0B1021] dark:text-cyan-300 dark:hover:bg-cyan-500/10"
                          >
                            <Download size={14} /> Download study guide
                          </button>
                        </div>
                      ))}
                    {activeLessonTab === "chapters" &&
                      (activeLesson.chapters?.length ? (
                        <div className="space-y-2">
                          {activeLesson.chapters.map((chapter) => (
                            <button
                              key={chapter.time}
                              type="button"
                              onClick={() => seekToChapter(chapter.time)}
                              className="flex w-full items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 text-left text-sm transition hover:border-cyan-400 dark:border-white/10 dark:bg-[#0B1021]"
                            >
                              <span className="font-semibold text-cyan-600 dark:text-[#19C8EE]">
                                {chapter.time}
                              </span>
                              <span className="text-gray-700 dark:text-white/80">
                                {chapter.label}
                              </span>
                              <Play size={14} className="ml-auto shrink-0 text-cyan-500" />
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-gray-600 dark:text-white/65">
                            No chapter markers are available for this video. You can restart it from here.
                          </p>
                          <button
                            type="button"
                            onClick={() => seekToChapter("0:00")}
                            className="mt-3 inline-flex items-center gap-2 rounded-lg border border-cyan-200 bg-white px-3 py-2 text-xs font-semibold text-cyan-700 transition hover:bg-cyan-50 dark:border-cyan-500/30 dark:bg-[#0B1021] dark:text-cyan-300 dark:hover:bg-cyan-500/10"
                          >
                            <Play size={14} /> Start video
                          </button>
                        </div>
                      ))}
                    {activeLessonTab === "instructor" && (
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-[#19C8EE] font-semibold text-[#0B1021]">
                          {activeCourse.instructor.split(" ").map((name) => name[0]).join("")}
                        </span>
                        <div className="min-w-0">
                          <p className="text-base font-semibold text-gray-900 dark:text-white">
                            {activeCourse.instructor}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-white/55">
                            {activeCourse.instructorTitle ?? `${activeCourse.level} ${activeCourse.category} instructor`}
                          </p>
                          <p className="mt-2 text-sm text-gray-600 dark:text-white/70">
                            Teaching <span className="font-medium">{activeCourse.title}</span>
                          </p>
                          <p className="mt-1 text-xs text-gray-500 dark:text-white/50">
                            {activeCourse.rating.toFixed(1)} course rating · {activeCourse.lessons.length} lessons
                          </p>
                        </div>
                      </div>
                    )}
                    {activeLessonTab === "transcript" && (
                      activeLesson.transcriptExcerpt ? (
                        <div>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">
                            Lesson transcript excerpt
                          </p>
                          <p className="text-sm leading-6 text-gray-600 dark:text-white/70">
                            {activeLesson.transcriptExcerpt}
                          </p>
                          <a
                            href={`https://www.youtube.com/watch?v=${activeLesson.videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-cyan-700 hover:underline dark:text-cyan-300"
                          >
                            Open video transcript on YouTube <ChevronRight size={14} />
                          </a>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-gray-600 dark:text-white/70">
                            An in-page transcript has not been added for this video. Open the video on YouTube and use its transcript or captions if available.
                          </p>
                          <a
                            href={`https://www.youtube.com/watch?v=${activeLesson.videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-2 rounded-lg border border-cyan-200 bg-white px-3 py-2 text-xs font-semibold text-cyan-700 transition hover:bg-cyan-50 dark:border-cyan-500/30 dark:bg-[#0B1021] dark:text-cyan-300 dark:hover:bg-cyan-500/10"
                          >
                            <Play size={14} /> Open video &amp; captions on YouTube
                          </a>
                        </div>
                      )
                    )}
                    {activeLessonTab === "bookmarks" && (
                      <div>
                        <button
                          type="button"
                          onClick={() =>
                            setLessonBookmarks((previous) => [
                              ...previous,
                              `Bookmarked: ${activeLesson.title}`,
                            ])
                          }
                          className="mb-3 rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-cyan-400 dark:border-white/15 dark:text-white/75"
                        >
                          + Add bookmark at current point
                        </button>
                        {lessonBookmarks.length > 0 ? (
                          <ul className="space-y-2">
                            {lessonBookmarks.map((bookmark, index) => (
                              <li
                                key={`${bookmark}-${index}`}
                                className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/70"
                              >
                                <Bookmark size={13} className="text-cyan-500" />
                                {bookmark}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-gray-500 dark:text-white/50">
                            No bookmarks yet.
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 p-4 dark:border-white/10">
                    <p className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-white/50">
                      {videoWatched ? (
                        <CheckCircle2 size={15} className="text-emerald-500" />
                      ) : (
                        <Clock3 size={15} />
                      )}
                      {videoWatched
                        ? "Playback completed — knowledge check unlocked"
                        : "Watch the full lesson to unlock the quiz"}
                    </p>
                    <button
                      type="button"
                      disabled={!videoWatched}
                      onClick={() => {
                        setSelectedAnswer(null);
                        setLessonStage("quiz");
                      }}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#19C8EE] px-5 py-3 text-sm font-semibold text-[#0B1021] transition hover:brightness-105 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-white disabled:hover:brightness-100"
                    >
                      {videoWatched ? "Start Knowledge Check" : "Locked"}
                      {!videoWatched && <Lock size={14} />}
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {lessonStage === "quiz" && (
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0B1021] sm:p-7">
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-[#19C8EE]">
                    <GraduationCap size={19} />
                    <h2 className="font-semibold text-gray-900 dark:text-white">Knowledge Check</h2>
                  </div>
                  <p className="mt-4 font-medium text-gray-800 dark:text-white">
                    {activeLesson.question}
                  </p>
                  <div className="mt-4 grid gap-2">
                    {activeLesson.answers.map((answer, index) => {
                      const isSelected = selectedAnswer === index;
                      const isCorrectAnswer =
                        selectedAnswer !== null && index === activeLesson.correctAnswer;
                      const isIncorrectSelection =
                        isSelected && index !== activeLesson.correctAnswer;

                      return (
                        <button
                          key={answer}
                          type="button"
                          onClick={() => setSelectedAnswer(index)}
                          className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
                            isCorrectAnswer
                              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                              : isIncorrectSelection
                                ? "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300"
                                : isSelected
                                  ? "border-cyan-500/60 bg-cyan-500/10 text-gray-900 dark:text-white"
                                  : "border-gray-200 text-gray-700 hover:border-cyan-400 dark:border-white/10 dark:text-white/70 dark:hover:border-cyan-400/60"
                          }`}
                        >
                          <span>{answer}</span>
                          {isCorrectAnswer && <CheckCircle2 size={16} />}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-gray-500 dark:text-white/50" aria-live="polite">
                      {selectedAnswer === activeLesson.correctAnswer
                        ? "Correct — complete this lesson to continue."
                        : selectedAnswer !== null
                          ? "Not quite. Try another answer."
                          : "Choose an answer to complete this lesson and unlock the next one."}
                    </p>
                    <button
                      type="button"
                      disabled={selectedAnswer !== activeLesson.correctAnswer}
                      onClick={completeLesson}
                      className="inline-flex items-center gap-2 rounded-full bg-[#19C8EE] px-5 py-2.5 text-sm font-semibold text-[#0B1021] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Complete Lesson <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {lessonStage === "lessonComplete" && (
                <div className="rounded-2xl border border-emerald-500/20 bg-white p-6 text-center dark:bg-[#0B1021] sm:p-9">
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-500">
                    <CheckCircle2 size={32} />
                  </span>
                  <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                    Lesson Completed
                  </h2>
                  <p className="mt-2 text-sm text-gray-500 dark:text-white/55">
                    {activeLesson.title} is now marked complete.
                  </p>
                  <p className="mt-3 text-sm font-semibold text-cyan-600 dark:text-[#19C8EE]">
                    +50 XP Earned
                  </p>
                  <button
                    type="button"
                    onClick={continueToNextLesson}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#19C8EE] px-5 py-3 text-sm font-semibold text-[#0B1021] transition hover:brightness-105"
                  >
                    {lessonIndex + 1 < activeCourse.lessons.length
                      ? `Continue to Lesson ${lessonIndex + 2}`
                      : "Finish Course"}
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {lessonStage === "courseComplete" && (
                <div className="rounded-2xl border border-cyan-300/50 bg-white p-6 text-center dark:border-[#19C8EE]/20 dark:bg-[#0B1021] sm:p-9">
                  <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#19C8EE] text-[#0B1021]">
                    <Award size={38} />
                  </span>
                  <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
                    Congratulations!
                  </h2>
                  <p className="mt-2 text-sm text-gray-500 dark:text-white/55">
                    You&apos;ve completed {activeCourse.title}. Your certificate is ready.
                  </p>
                  <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/50 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 dark:border-[#19C8EE]/20 dark:bg-[#19C8EE]/10 dark:text-[#19C8EE]">
                    <Award size={16} /> Certificate of Completion
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={backToCatalog}
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#19C8EE] px-5 py-3 text-sm font-semibold text-[#0B1021] transition hover:brightness-105"
                    >
                      Back to Course Catalog <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4 self-start xl:sticky xl:top-6">
              <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0B1021]">
                <div>
                  <h2 className="font-semibold text-gray-900 dark:text-white">Course Outline</h2>
                  <p className="mt-1 text-xs text-gray-500 dark:text-white/50">
                    {
                      activeCourse.lessons.filter((_, index) =>
                        completedLessons.has(`${activeCourse.id}:${index}`),
                      ).length
                    }
                    /{activeCourse.lessons.length} lessons · {activeCourse.duration}
                  </p>
                </div>
                <div className="mt-4 space-y-2">
                  {activeCourse.lessons.map((lesson, index) => {
                    const isComplete = completedLessons.has(`${activeCourse.id}:${index}`);

                    return (
                      <button
                        key={lesson.title}
                        type="button"
                        onClick={() => {
                          setLessonIndex(index);
                          setSelectedAnswer(null);
                          setVideoWatched(false);
                          setLessonStage("video");
                        }}
                        className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition ${
                          lessonIndex === index
                            ? "border-cyan-500/50 bg-cyan-500/10"
                            : "border-gray-200 hover:border-cyan-400/60 dark:border-white/10 dark:hover:border-cyan-400/40"
                        }`}
                      >
                        <span className="mt-0.5 text-gray-400">
                          {isComplete ? (
                            <CheckCircle2 size={16} className="text-emerald-500" />
                          ) : (
                            <Play size={15} />
                          )}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium text-gray-800 dark:text-white">
                            Lesson {index + 1}: {lesson.title}
                          </span>
                          <span className="mt-1 block text-xs text-gray-400">
                            {lesson.duration} min
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </aside>

              <aside className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0B1021]">
                <h2 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                  <MessageSquare size={16} className="text-cyan-500" /> Ask a Mentor
                </h2>
                <div className="mt-4 space-y-2">
                  {communityThreads.slice(0, 2).map((thread) => (
                    <div
                      key={thread.user}
                      className="rounded-xl border border-gray-100 bg-gray-50 p-3 dark:border-white/5 dark:bg-white/[0.03]"
                    >
                      <p className="text-sm leading-5 text-gray-700 dark:text-white/80">
                        {thread.question}
                      </p>
                      <p className="mt-2 text-xs text-gray-400">
                        {thread.user} · {thread.replies} replies
                        {thread.mentorAnswered && " · Mentor answered"}
                      </p>
                    </div>
                  ))}
                </div>
                <a
                  href="/support"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-300 bg-cyan-50 px-4 py-2.5 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-100 dark:border-[#19C8EE]/25 dark:bg-[#19C8EE]/10 dark:text-[#19C8EE] dark:hover:bg-[#19C8EE]/15"
                >
                  <Send size={14} /> Ask a question
                </a>
              </aside>
            </div>
          </div>
        </section>
      ) : (
        <>
          <header className="grid gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.8fr)]">
            <section className="relative overflow-hidden rounded-2xl border border-blue-500/10 bg-gradient-to-br from-blue-500/10 via-emerald-500/5 to-transparent p-5 dark:border-white/10 dark:from-blue-500/15 dark:via-emerald-500/10 sm:p-7">
              <div className="absolute -right-12 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                  NEXORAX Academy
                </p>
                <h1 className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white sm:text-3xl">
                  Keep building your trading skills
                  {user?.name ? `, ${user.name.split(" ")[0]}` : ""}
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-6 text-gray-600 dark:text-white/60">
                  Learn at your own pace with structured courses, lesson videos, and short knowledge
                  checks.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    {
                      label: "Today's learning",
                      value: "42m",
                      icon: Clock3,
                      color: "text-blue-500",
                    },
                    { label: "Certificates", value: "3", icon: Award, color: "text-cyan-500" },
                    {
                      label: "Lessons done",
                      value: String(58 + totalCompleted - initialCompleted.size),
                      icon: CheckCircle2,
                      color: "text-emerald-500",
                    },
                    { label: "Day streak", value: "12d", icon: Flame, color: "text-orange-500" },
                  ].map(({ label, value, icon: Icon, color }) => (
                    <div
                      key={label}
                      className="rounded-xl border border-gray-200/80 bg-white/70 p-3 dark:border-white/10 dark:bg-white/[0.04]"
                    >
                      <Icon size={17} className={color} />
                      <p className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                        {value}
                      </p>
                      <p className="mt-0.5 text-[11px] text-gray-500 dark:text-white/45">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 border-t border-gray-200/80 pt-5 dark:border-white/10">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative grid h-[76px] w-[76px] shrink-0 place-items-center rounded-full bg-[conic-gradient(#22c55e_0_64%,rgba(148,163,184,.2)_64%_100%)]">
                        <div className="grid h-[60px] w-[60px] place-items-center rounded-full bg-white text-sm font-bold text-gray-900 dark:bg-[#0B1021] dark:text-white">
                          64%
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                          Your progress
                        </p>
                        <h2 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                          Learning path
                        </h2>
                        <p className="mt-1 max-w-sm text-sm text-gray-500 dark:text-white/55">
                          Pick up where you left off or explore a new topic.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => openCourse(courses[0]!)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#19C8EE] px-4 py-3 text-sm font-semibold text-[#0B1021] transition hover:brightness-105"
                    >
                      Continue learning <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <div className="space-y-5">
              <section className="rounded-2xl border border-cyan-300/60 bg-cyan-50 p-5 dark:border-[#19C8EE]/25 dark:bg-[#19C8EE]/[0.07] sm:p-6">
                <div className="flex items-center gap-2">
                  <Crown size={20} className="text-cyan-500" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Premium Member
                  </h2>
                </div>
                <p className="mt-2 text-sm leading-5 text-gray-600 dark:text-white/60">
                  Unlock all courses, live signals &amp; certified completion
                </p>
                <ul className="mt-4 space-y-2.5">
                  {membershipBenefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-white/80"
                    >
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-cyan-200/70 text-cyan-700 dark:bg-[#19C8EE]/15 dark:text-[#19C8EE]">
                        <CheckCircle2 size={13} />
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => {
                    setFilter("Premium");
                    document
                      .getElementById("course-catalog")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-5 w-full rounded-xl bg-[#19C8EE] px-4 py-3 text-sm font-semibold text-[#0B1021] transition hover:bg-[#10C7F4]"
                >
                  Explore Premium Courses
                </button>
              </section>
            </div>
          </header>

          <section id="course-catalog" className="space-y-4">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-[#19C8EE]">
                  Explore and learn
                </p>
                <h2 className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
                  Course catalog
                </h2>
              </div>
              <label className="relative block w-full sm:max-w-xs">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search courses"
                  className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-cyan-400 dark:border-white/10 dark:bg-[#0B1021] dark:text-white"
                />
              </label>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {filters.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                    filter === item
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:border-emerald-400 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/60"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {filteredCourses.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredCourses.map((course) => {
                  const progress = getCourseProgress(course, completedLessons);

                  return (
                    <article
                      key={course.id}
                      className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#0B1021]"
                    >
                      <div
                        className={`relative h-36 overflow-hidden bg-gradient-to-br ${categoryColors[course.color]}`}
                      >
                        <Image
                          src={courseImages[course.category]}
                          alt={`${course.category} trading course`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover"
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"
                          style={{
                            backgroundImage:
                              "linear-gradient(to top, rgba(0,0,0,.5), transparent 75%), radial-gradient(circle at 1px 1px, rgba(255,255,255,.28) 1px, transparent 0)",
                            backgroundSize: "100% 100%, 20px 20px",
                          }}
                        />
                        <div className="relative flex h-full items-start justify-between p-4">
                          <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs font-medium text-white">
                            {course.level}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white">
                            {course.access === "Premium" && <Lock size={11} />} {course.access}
                          </span>
                        </div>
                        {progress > 0 && (
                          <div className="absolute inset-x-0 bottom-0 h-1 bg-black/20">
                            <div
                              className="h-full bg-emerald-400 transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                            {course.category}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-cyan-500">
                            <Star size={13} fill="currentColor" /> {course.rating}
                          </span>
                        </div>
                        <h3 className="mt-2 text-base font-semibold text-gray-900 dark:text-white">
                          {course.title}
                        </h3>
                        <p className="mt-1 min-h-10 text-sm leading-5 text-gray-500 dark:text-white/50">
                          {course.subtitle}
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 dark:text-white/45">
                          <span className="inline-flex items-center gap-1">
                            <BookOpen size={13} /> {course.lessons.length} lessons
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock3 size={13} /> {course.duration}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Users size={13} /> {(course.students / 1000).toFixed(1)}k
                          </span>
                          {course.certificate && (
                            <span className="inline-flex items-center gap-1 font-medium text-cyan-700 dark:text-[#19C8EE]">
                              <Award size={13} /> Certificate
                            </span>
                          )}
                        </div>
                        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-white/10">
                          <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-white/45">
                            <GraduationCap size={14} /> {course.instructor}
                          </span>
                          <button
                            type="button"
                            onClick={() => openCourse(course)}
                            className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-semibold transition ${
                              course.access === "Premium" && progress === 0
                                ? "border border-cyan-400 bg-cyan-50 text-cyan-800 hover:bg-cyan-100 dark:border-[#19C8EE]/40 dark:bg-[#19C8EE]/10 dark:text-[#19C8EE] dark:hover:bg-[#19C8EE]/20"
                                : course.access === "Free"
                                  ? "border border-emerald-500/50 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-400/40 dark:bg-emerald-500/10 dark:text-emerald-300 dark:hover:bg-emerald-500/20"
                                  : "bg-[#19C8EE] text-[#0B1021] hover:bg-[#10C7F4]"
                            }`}
                          >
                            {progress > 0 ? (
                              "Continue Learning"
                            ) : course.access === "Free" ? (
                              <>
                                <Play size={13} fill="currentColor" /> Start Free
                              </>
                            ) : (
                              <>
                                <Lock size={13} /> Included in Membership
                              </>
                            )}
                            <ChevronRight size={14} />
                          </button>
                        </div>
                        {progress > 0 && (
                          <p className="mt-3 text-xs text-gray-400">{progress}% complete</p>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-300 px-6 py-12 text-center dark:border-white/15">
                <BookOpen size={24} className="mx-auto text-gray-400" />
                <p className="mt-3 font-medium text-gray-700 dark:text-white/80">
                  No courses found
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-white/45">
                  Try a different search or course filter.
                </p>
              </div>
            )}
          </section>

          <section className="grid gap-5 lg:grid-cols-3">
            <article className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0B1021] sm:p-6">
              <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
                <Download size={18} className="text-cyan-500" /> Downloadable Resources
              </h2>
              <div className="mt-4 space-y-2">
                {downloadableResources.map((resource) => (
                  <div
                    key={resource.label}
                    className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3 dark:border-white/5 dark:bg-white/[0.03]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-cyan-100 text-cyan-600 dark:bg-[#19C8EE]/10 dark:text-[#19C8EE]">
                        <FileText size={17} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-gray-800 dark:text-white/85">
                          {resource.label}
                        </p>
                        <p className="mt-0.5 text-[11px] uppercase text-gray-400">
                          {resource.type} · {resource.size}
                        </p>
                      </div>
                    </div>
                    <Download size={15} className="shrink-0 text-gray-400" />
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0B1021] sm:p-6">
              <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
                <MessageSquare size={18} className="text-cyan-500" /> Community &amp; Mentor
                Q&amp;A
              </h2>
              <div className="mt-4 space-y-2">
                {communityThreads.map((thread) => (
                  <div
                    key={thread.user}
                    className="rounded-xl border border-gray-100 bg-gray-50 p-3 dark:border-white/5 dark:bg-white/[0.03]"
                  >
                    <p className="text-sm leading-5 text-gray-700 dark:text-white/80">
                      {thread.question}
                    </p>
                    <p className="mt-2 text-xs text-gray-400">
                      {thread.user} · {thread.replies} replies
                      {thread.mentorAnswered && (
                        <span className="text-emerald-600 dark:text-emerald-400">
                          {" "}
                          · Mentor answered
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
              <a
                href="/support"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-300 bg-cyan-50 px-4 py-2.5 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-100 dark:border-[#19C8EE]/25 dark:bg-[#19C8EE]/10 dark:text-[#19C8EE] dark:hover:bg-[#19C8EE]/15"
              >
                <Send size={14} /> Ask the Mentor Desk
              </a>
            </article>

            <article className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0B1021] sm:p-6">
              <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
                <Trophy size={18} className="text-cyan-500" /> Leaderboard
              </h2>
              <div className="mt-4 space-y-2">
                {leaderboard.map((member) => (
                  <div
                    key={member.rank}
                    className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 ${
                      member.isYou
                        ? "border-cyan-300 bg-cyan-50 dark:border-[#19C8EE]/30 dark:bg-[#19C8EE]/10"
                        : "border-gray-100 bg-gray-50 dark:border-white/5 dark:bg-white/[0.03]"
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-2 text-sm">
                      <span className="text-xs text-gray-400">#{member.rank}</span>
                      <span
                        className={`truncate font-medium ${
                          member.isYou
                            ? "text-cyan-700 dark:text-[#19C8EE]"
                            : "text-gray-700 dark:text-white/80"
                        }`}
                      >
                        {member.isYou ? user?.name || member.name : member.name}
                      </span>
                      {member.isYou && (
                        <span className="text-[10px] font-semibold uppercase text-cyan-600 dark:text-[#19C8EE]">
                          You
                        </span>
                      )}
                    </span>
                    <span className="shrink-0 text-xs text-gray-500 dark:text-white/50">
                      {member.xp.toLocaleString()} XP
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-3 border-t border-gray-100 pt-4 dark:border-white/10">
                <div className="text-center">
                  <Flame size={16} className="mx-auto text-cyan-500" />
                  <p className="mt-2 text-xs text-gray-600 dark:text-white/70">12d streak</p>
                </div>
                <div className="text-center">
                  <Coins size={16} className="mx-auto text-cyan-500" />
                  <p className="mt-2 text-xs text-gray-600 dark:text-white/70">1,240 coins</p>
                </div>
                <div className="text-center">
                  <Award size={16} className="mx-auto text-cyan-500" />
                  <p className="mt-2 text-xs text-gray-600 dark:text-white/70">Level 7</p>
                </div>
              </div>
            </article>
          </section>
        </>
      )}
    </div>
  );
}
