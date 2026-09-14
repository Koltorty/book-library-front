import { Flex, List, Tag, Typography, type FlexProps } from 'antd'
import type { BookDetailDto } from '../api/types'

interface BookWorksListProps extends FlexProps {
  book: BookDetailDto
}

export default function BookWorksList({ book, ...flexProps }: BookWorksListProps) {
  return (
    <Flex {...flexProps}>
      <List
        header={<Typography.Text strong>Произведения</Typography.Text>}
        bordered
        style={{ width: '100%' }}
        dataSource={[...book.works].sort((a, b) => a.order - b.order)}
        renderItem={(work) => (
          <List.Item>
            <Flex gap={8} align="center" wrap>
              <Typography.Text type="secondary">{work.order}.</Typography.Text>
              <Typography.Text>{work.title}</Typography.Text>
              {work.authors.map((author) => (
                <Tag key={author}>{author}</Tag>
              ))}
            </Flex>
          </List.Item>
        )}
      />
    </Flex>
  )
}
