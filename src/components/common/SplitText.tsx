"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react"; // アニメーション用

// props型定義
interface SplitTextProps {
  text: string; // 表示するテキスト
  duration?: number; // アニメーション全体の時間（ミリ秒、デフォルト5000）
  className?: string; // 追加クラス
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  duration = 3000,
  className = "",
}) => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = duration / text.length; // 1文字ごとの表示間隔
    const timer = setInterval(() => {
      current++;
      setVisibleCount(current);
      if (current === text.length) {
        clearInterval(timer);
      }
    }, interval);

    // クリーンアップ
    return () => clearInterval(timer);
  }, [text, duration]);

  return (
    <span className={className} style={{ display: "inline-block" }}>
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
            duration: 0.2,
            delay: i * (duration / text.length) / 1000, // 各文字の遅延
          }}
          style={{ display: "inline-block" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

export default SplitText;
