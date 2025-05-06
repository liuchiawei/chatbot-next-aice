"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react"; // アニメーション用

// props型定義
interface SplitTextProps {
  text: string; // 表示するテキスト
  interval?: number; // アニメーション全体の時間（ミリ秒、デフォルト5000）
  className?: string; // 追加クラス
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  interval = 0.02, // 1文字ごとの表示間隔
  className = "",
}) => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let current = 0;
    // const duration = interval * text.length; 
    const timer = setInterval(() => {
      current++;
      setVisibleCount(current);
      if (current === text.length) {
        clearInterval(timer);
      }
    }, interval);

    // クリーンアップ
    return () => clearInterval(timer);
  }, [text, interval]);

  return (
    <span className={cn("inline-block", className)}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }} // 初期状態：透明＆下にずれる
          animate={
            i < visibleCount
              ? { opacity: 1, y: 0 } // 表示：不透明＆元の位置
              : { opacity: 0, y: 10 } // 非表示：透明＆下にずれる
          }
          transition={{
            type: "spring",
            bounce: 0.3,
            duration: 0.2,
            delay: i * interval, // 各文字の遅延
          }}
          className="inline-block"
          onAnimationComplete={() => {
            if (i === text.length - 1) {
              // 最後の文字のアニメーションが完了したら、アニメーションを停止
              setVisibleCount(text.length);
            }
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

export default SplitText;
