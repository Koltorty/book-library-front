import { useState } from 'react'
import { Link } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { Checkbox, Flex, Select, Table, Tag, type TablePaginationConfig } from 'antd'
import { booksApi } from '../api/books'
import type { BookFilter, BookListItemDto } from '../api/types'

const BOOK_TYPES = [
  { value: 'Paper', label: 'Бумажная' },
  { value: 'Ebook', label: 'Электронная' },
]

const BOOK_COVER_TYPES = [
  { value: 'HardCover', label: 'Твёрдый переплёт' },
  { value: 'SoftCover', label: 'Мягкий переплёт' },
  { value: 'Magazine', label: 'Журнал' },
]

const READ_STATES = [
  { value: 'true', label: 'Прочитана' },
  { value: 'false', label: 'Не прочитана' },
]

export default function BooksPage() {
  const [filter, setFilter] = useState<BookFilter>({})
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(12)

  const { data, isPending, isError } = useQuery({
    queryKey: ['books', filter, page, pageSize],
    queryFn: () => booksApi.list(filter, page, pageSize),
  })

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPage(pagination.current ?? 1)
    setPageSize(pagination.pageSize ?? 12)
  }

  const columns = [
    {
      title: 'Название',
      dataIndex: 'title',
      render: (_: unknown, record: BookListItemDto) => <Link to={`/books/${record.id}`}>{record.title}</Link>,
    },
    {
      title: 'Авторы',
      dataIndex: 'authors',
      render: (authors: string[]) => authors.map((author) => <Tag key={author}>{author}</Tag>),
    },
    {
      title: 'Тип',
      dataIndex: 'type',
      width: 130,
      render: (type: string) => (
        <Tag color={type === 'Paper' ? 'geekblue' : 'purple'}>
          {type === 'Paper' ? 'Бумажная' : 'Электронная'}
        </Tag>
      ),
    },
    {
      title: 'Том',
      dataIndex: 'volumeNumber',
      width: 80,
    },
    {
      title: 'Прочитана',
      dataIndex: 'hasBeenRead',
      width: 120,
      render: (hasBeenRead: boolean) => <Checkbox checked={hasBeenRead} disabled />,
    },
  ]

  if (isError) {
    return <p>Не удалось загрузить книги</p>
  }

  return (
    <Flex vertical gap={16}>
      <Flex gap={12}>
        <Select
          allowClear
          placeholder="Тип"
          style={{ width: 160 }}
          options={BOOK_TYPES}
          value={filter.type}
          onChange={(type) => {
            setFilter({ ...filter, type })
            setPage(1)
          }}
        />
        <Select
          allowClear
          placeholder="Переплёт"
          style={{ width: 180 }}
          options={BOOK_COVER_TYPES}
          value={filter.coverType}
          onChange={(coverType) => {
            setFilter({ ...filter, coverType })
            setPage(1)
          }}
        />
        <Select
          allowClear
          placeholder="Прочитанность"
          style={{ width: 160 }}
          options={READ_STATES}
          value={filter.hasBeenRead}
          onChange={(hasBeenRead) => {
            setFilter({ ...filter, hasBeenRead })
            setPage(1)
          }}
        />
      </Flex>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data?.items}
        loading={isPending}
        onChange={handleTableChange}
        pagination={
          {
            current: page,
            pageSize,
            total: data?.totalCount ?? 0,
            showSizeChanger: true,
            pageSizeOptions: [12, 24, 48],
          } satisfies TablePaginationConfig
        }
      />
    </Flex>
  )
}
