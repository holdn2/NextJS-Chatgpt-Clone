import { Header } from "@/components/chat/Header";
import { Sidebar } from "@/components/chat/Sidebar";
import { UserProvider } from "@/components/chat/UserProvider";
import React from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // md prefix는 반응형 ui를 적용할 때 사용함.
  // md 같은 경우 브레이크 포인트가 768px이고 이 이상일 때 뒤에 정의한 스타일을 적용시킨다.
  return (
    <UserProvider>
      <div className="md:flex h-full">
        {/* 사이드바 영역 */}
        {/* 모바일일 때는 hidden, 768px 이상일 때는 block */}
        <div className="hidden md:block w-[300px]">
          <Sidebar />
        </div>
        {/* Header + chat 영역 */}
        <div className="flex flex-col flex-1 h-full overflow-y-auto">
          <Header />
          {children}
        </div>
      </div>
    </UserProvider>
  );
}
