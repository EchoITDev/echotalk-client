import { FormCard } from "./FormCard";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Submit } from "./Submit";
import { AuthLayout } from "./layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/apis/auth";

export function LoginForm() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 폼 제출 시 자동 새로고침을 막아줌
    // 자동 새로고침이 되면 아래 signup 비동기 함수로 인자값들이 제대로 안넘어갈 수 있음
    e.preventDefault();

    try {
      const response = await login(email, password);
      console.log("로그인 성공:", response.data);
      navigate("/chat");
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <AuthLayout>
      <FormCard title="로그인" footer={{ label: "아직 계정이 없으신가요?", href: "/signup" }}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 이메일 */}
          <div className="space-y-1">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  
            />
          </div>
          {/* 비밀번호 */}
          <div className="space-y-1">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  
            />
          </div>
          <Submit className="w-full">로그인</Submit>
        </form>
      </FormCard>
    </AuthLayout>
  );
}