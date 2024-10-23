'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

// 模拟的学校数据
const schoolsData = [
  {
    name: "Nanyang Primary School",
    vacancies: 10,
    location: "Bukit Timah",
    neighborhoodSchools: "Raffles Girls' Primary School",
    sap: true,
    hokkienHuayKuan: false,
    neighborhoodElite: true
  },
  {
    name: "Tao Nan School",
    vacancies: 5,
    location: "Marine Parade",
    neighborhoodSchools: "Kong Hwa School",
    sap: true,
    hokkienHuayKuan: true,
    neighborhoodElite: true
  },
  {
    name: "Ai Tong School",
    vacancies: 8,
    location: "Bishan",
    neighborhoodSchools: "Catholic High School (Primary)",
    sap: true,
    hokkienHuayKuan: true,
    neighborhoodElite: false
  },
  // 可以继续添加更多学校数据...
]

export function SchoolSelectorComponent() {
  const [input, setInput] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const [schools, setSchools] = useState(schoolsData)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() === '') return

    // 这里应该是调用AI API的地方，现在我们只是模拟一个响应
    const aiResponse = "根据您的需求，我建议您考虑以下学校：Nanyang Primary School 和 Tao Nan School。这两所学校都是特选学校，位于不错的地段，并且有一些空余学额。"

    setChatHistory([...chatHistory, { user: input, ai: aiResponse }])
    setInput('')

    // 模拟根据AI响应过滤学校列表
    setSchools(schools.filter(school => 
      school.name === "Nanyang Primary School" || school.name === "Tao Nan School"
    ))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">新加坡公立小学选择助手</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>AI 聊天助手</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              {chatHistory.map((chat, index) => (
                <div key={index} className="mb-4">
                  <p className="font-semibold">你: {chat.user}</p>
                  <p className="text-muted-foreground">AI: {chat.ai}</p>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSubmit} className="flex w-full space-x-2">
              <Input
                type="text"
                placeholder="输入你的问题..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit">发送</Button>
            </form>
          </CardFooter>
        </Card>

        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>学校列表</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>学校名称</TableHead>
                  <TableHead>第三阶段空余学额</TableHead>
                  <TableHead>学校所在地</TableHead>
                  <TableHead>好一些的邻里学校</TableHead>
                  <TableHead>特选学校</TableHead>
                  <TableHead>福建会馆</TableHead>
                  <TableHead>邻里名校</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schools.map((school) => (
                  <TableRow key={school.name}>
                    <TableCell>{school.name}</TableCell>
                    <TableCell>{school.vacancies}</TableCell>
                    <TableCell>{school.location}</TableCell>
                    <TableCell>{school.neighborhoodSchools}</TableCell>
                    <TableCell>{school.sap ? '是' : '否'}</TableCell>
                    <TableCell>{school.hokkienHuayKuan ? '是' : '否'}</TableCell>
                    <TableCell>{school.neighborhoodElite ? '是' : '否'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}