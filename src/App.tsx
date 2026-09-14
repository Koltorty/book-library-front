import { Routes, Route } from 'react-router'
import { Empty } from 'antd'
import Layout from './pages/Layout'
import BooksPage from './pages/BooksPage'
import BookDetailPage from './pages/BookDetailPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<BooksPage />} />
        <Route path="books/:id" element={<BookDetailPage />} />
        <Route path="*" element={<Empty description="Страница в разработке" />} />
      </Route>
    </Routes>
  )
}
