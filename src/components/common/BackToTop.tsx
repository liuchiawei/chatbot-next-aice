"use client";

import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // height of the Button to show: 720px
      if (window.scrollY > 120) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div
      className={`flex items-center justify-center gap-2 fixed bottom-8 right-8 transition-all *:cursor-pointer ${
        isVisible ? "translate-y-0" : "translate-y-50"
      }`}
    >
      <Button onClick={scrollToTop}>
        <ArrowUp className="w-4 h-4" />
      </Button>
      <Button onClick={scrollToBottom}>
        <ArrowDown className="w-4 h-4" />
      </Button>
    </div>
  );
}
