import { useState } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import ForgotPasswordForm from './components/forget-form'
import RegisterForm from './components/register-form'
import LoginForm from './components/login-form'

import { AnimatePresence, motion } from 'framer-motion'
import { useUserToken } from '@/store/user'
import { Navigate } from 'react-router'

export default function LoginPage() {
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [activeTab, setActiveTab] = useState('login')

  const token = useUserToken()

  // 判断用户是否有权限
  if (token.token) {
    // 如果有授权，则跳转到首页
    return <Navigate to="/" replace />
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-[400px] min-h-[500px]">
        <CardHeader>
          <CardTitle>个人项目管理系统</CardTitle>
          <CardDescription>登录或注册以继续</CardDescription>
        </CardHeader>

        <CardContent>
          <AnimatePresence mode="wait">
            {showForgotPassword ? (
              <motion.div
                key="forgot-password"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ForgotPasswordForm onBack={() => setShowForgotPassword(false)} />
              </motion.div>
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">登录</TabsTrigger>
                  <TabsTrigger value="register">注册</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <LoginForm onForgotPassword={() => setShowForgotPassword(true)} />
                </TabsContent>
                <TabsContent value="register">
                  <RegisterForm />
                </TabsContent>
              </Tabs>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </main>
  )
}
