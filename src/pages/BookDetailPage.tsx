import { useNavigate, useParams } from 'react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  App,
  Button,
  Descriptions,
  Flex,
  Image,
  Popconfirm,
  Skeleton,
  Space,
  Tag,
  Typography,
} from 'antd'
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { booksApi } from '../api/books'
import type { BookDetailDto } from '../api/types'
import BookWorksList from '../components/BookWorksList'

const coverTypeLabels: Record<string, string> = {
  HardCover: 'Твёрдый переплёт',
  SoftCover: 'Мягкий переплёт',
  Magazine: 'Журнал',
}

export default function BookDetailPage() {
  const { id } = useParams<string>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { message } = App.useApp()

  const bookId = Number(id)
  const { data: book, isLoading } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => booksApi.get(bookId),
    enabled: !Number.isNaN(bookId),
  })

  const deleteMutation = useMutation({
    mutationFn: () => booksApi.delete(bookId),
    onSuccess: () => {
      message.success('Книга удалена')
      queryClient.invalidateQueries({ queryKey: ['books'] })
      navigate('/')
    },
    onError: () => {
      message.error('Не удалось удалить книгу')
    },
  })

  if (isLoading) {
    return <Skeleton active />
  }

  if (!book) {
    return <p>Книга не найдена</p>
  }

  return (
    <Flex vertical gap={16}>
      <Flex justify="space-between">
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/')}>
          Назад
        </Button>
        <Space>
          <Button icon={<EditOutlined />} onClick={() => navigate(`/books/${book.id}/edit`)}>
            Редактировать
          </Button>
          <Popconfirm
            title="Удалить книгу?"
            description={`«${book.title}» можно будет восстановить.`}
            okText="Удалить"
            cancelText="Отмена"
            okButtonProps={{ danger: true }}
            onConfirm={() => deleteMutation.mutate()}
          >
            <Button danger icon={<DeleteOutlined />}>
              Удалить
            </Button>
          </Popconfirm>
        </Space>
      </Flex>

      <Flex gap={24}>
        {book.coverImage && (
          <Image width={150} src={book.coverImage} style={{ flexShrink: 0 }} />
        )}

        <Flex vertical gap={8} style={{ minWidth: 0, flexGrow: 1 }}>
          <Typography.Title level={3} style={{ margin: 0 }}>
            {book.title}
          </Typography.Title>
          <BookMeta book={book} />
        </Flex>
      </Flex>

      <BookWorksList book={book} />
    </Flex>
  )
}

function BookMeta({ book }: { book: BookDetailDto }) {
  return (
    <Descriptions
      bordered
      size="small"
      column={2}
      items={[
        { key: 'volume', label: 'Том', children: book.volumeNumber ?? '—' },
        { key: 'pages', label: 'Страниц', children: book.pagesCount },
        { key: 'type', label: 'Тип', children: book.type === 'Paper' ? 'Бумажная' : 'Электронная' },
        { key: 'coverType', label: 'Переплёт', children: book.coverType ? coverTypeLabels[book.coverType] : '—' },
        {
          key: 'read',
          label: 'Прочитана',
          children: book.hasBeenRead
            ? `Да (${book.dateRead ?? 'дата неизвестна'})`
            : 'Нет',
        },
        { key: 'isbn', label: 'ISBN', children: book.isbn ?? '—' },
        {
          key: 'series',
          label: 'Серия',
          children: book.seriesTitle
            ? <Tag color="cyan">{book.seriesTitle}</Tag>
            : '—',
        },
        { key: 'publisher', label: 'Издатель', children: book.publisherName },
        {
          key: 'categories',
          label: 'Категории',
          span: 2,
          children: book.categories.length
            ? book.categories.map((c) => <Tag key={c.id} color="blue">{c.name}</Tag>)
            : '—',
        },
      ]}
    />
  )
}
