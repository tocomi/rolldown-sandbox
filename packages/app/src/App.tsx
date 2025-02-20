import { faker } from '@faker-js/faker'
import {
  AcUnit,
  AccountBox,
  Alarm,
  FormatBold,
  FormatItalic,
  StrikethroughS,
} from '@mui/icons-material'
import { Button } from '@mui/material'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Chart } from 'chart.js/auto'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { atom, useAtom } from 'jotai'
import * as lodash from 'lodash'
import { useEffect, useState } from 'react'
import React from 'react'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { create } from 'zustand'

// Zustand 状態管理
const useStore = create<{
  count: number
  increase: () => void
}>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
}))

// Jotai 状態管理
const jotaiCountAtom = atom(0)

const Home = () => {
  const { count, increase } = useStore()
  const [jotaiCount, setJotaiCount] = useAtom(jotaiCountAtom)
  const [date, setDate] = useState(new Date())

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">React Heavy Load App</h1>

      {/* ローデータ表示 */}
      <p className="mt-4">Lodash Random Number: {lodash.random(1, 1000)}</p>
      <p>Formatted Date: {format(date, 'yyyy-MM-dd HH:mm:ss')}</p>
      <p>Faker Name: {faker.person.fullName()}</p>

      {/* Zustand 状態管理 */}
      <p className="mt-4">Zustand Count: {count}</p>
      <Button variant="contained" onClick={increase}>
        Increase Zustand
      </Button>

      {/* Jotai 状態管理 */}
      <p className="mt-4">Jotai Count: {jotaiCount}</p>
      <Button variant="contained" onClick={() => setJotaiCount(jotaiCount + 1)}>
        Increase Jotai
      </Button>

      {/* アイコン */}
      <div className="mt-4 flex gap-2">
        <Alarm />
        <AcUnit />
        <AccountBox />
      </div>

      {/* フラッシュアニメーション */}
      <motion.div
        className="mt-4 p-4 bg-blue-500 text-white rounded"
        whileHover={{ scale: 1.1 }}
      >
        Hover me!
      </motion.div>

      {/* グラフ描画 */}
      <canvas id="chart" />

      {/* ナビゲーション */}
      <div className="mt-4">
        <Link to="/editor" className="text-blue-500 underline">
          Go to Editor
        </Link>
      </div>
    </div>
  )
}

function EditorPage() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Start editing...</p>',
  })

  if (!editor) {
    return null
  }

  return (
    <div className="p-4 border border-gray-300 rounded">
      <div className="flex gap-2 mb-2">
        <Button
          variant="contained"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <FormatBold />
        </Button>
        <Button
          variant="contained"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <FormatItalic />
        </Button>
        <Button
          variant="contained"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <StrikethroughS />
        </Button>
      </div>
      <EditorContent editor={editor} className="border p-2 min-h-[150px]" />
    </div>
  )
}

// メインアプリ
export default function App() {
  useEffect(() => {
    // @ts-expect-error
    const ctx = document.getElementById('chart')?.getContext('2d')
    let chart: Chart
    if (ctx) {
      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [
            {
              label: 'Random Data',
              data: Array.from({ length: 5 }, () => lodash.random(10, 100)),
              borderColor: 'blue',
              borderWidth: 2,
            },
          ],
        },
      })
    }
    return () => {
      chart?.destroy()
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<EditorPage />} />
      </Routes>
    </Router>
  )
}
