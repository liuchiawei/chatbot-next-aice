"use client";

import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ScrollDownAndSend() {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollDown = () => {
    if (window.visualViewport) {  
      window.scrollTo({ top: window.visualViewport?.height + scrollTop, behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight + scrollTop, behavior: "smooth" });
    }
  };
  
  return (
    <Button type="submit" onClick={scrollDown} size="icon" className={`rounded-full cursor-pointer`}>
      <Send className="size-4" />
    </Button>
  );
}
