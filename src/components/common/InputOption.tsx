'use client'

import { useRef, useState } from "react";
import axios from "axios"; // axiosはHTTPリクエストを簡単に送信できるライブラリで、PromiseベースのAPIを提供します
import { Button } from "../ui/button";
import { Globe, Image, File, Mic } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Progress } from "../ui/progress";

export default function InputOption() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // 画像アップロード処理
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploadProgress(0);
      // 画像アップロードAPI呼び出し
      await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(progress);
        },
      });
      alert("画像のアップロードに成功しました！");
    } catch (error) {
      alert("画像のアップロードに失敗しました！");
    } finally {
      setUploadProgress(0);
    }
  };

  // ボタンクリックでinputをトリガー
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 *:size-8 *:cursor-pointer *:rounded-full **:hover:bg-zinc-200 dark:**:hover:bg-zinc-700">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost">
                <Globe />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Search</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" onClick={handleButtonClick}>
                <Image />
                <input
                  title="image"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Upload Image</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost">
                <File />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Upload File</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost">
                <Mic />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Voice</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {uploadProgress > 0 && (
        <Progress value={uploadProgress} className="w-full" />
      )}
    </div>
  );
}
