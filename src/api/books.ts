import { http, queryString } from './client'
import type { BookDetailDto, BookFilter, BookSaveDto, BookListItemDto, PageResult } from './types'

export const booksApi = {
  list: (filter: BookFilter, page: number, pageSize: number) =>
    http.get<PageResult<BookListItemDto>>(
      `/books${queryString({
        'filter.type': filter.type,
        'filter.coverType': filter.coverType,
        'filter.hasBeenRead': filter.hasBeenRead,
        page,
        pageSize,
      })}`,
    ),

  get: (id: number) => http.get<BookDetailDto>(`/books/${id}`),
  create: (dto: BookSaveDto) => http.post<{ id: number }>('/books', dto),
  update: (id: number, dto: BookSaveDto) => http.put<void>(`/books/${id}`, dto),
  delete: (id: number) => http.delete<void>(`/books/${id}`),
  restore: (id: number) => http.post<void>(`/books/${id}/restore`),
}
