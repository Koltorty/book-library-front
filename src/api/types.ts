export type BookType = 'Paper' | 'Ebook'
export type BookCoverType = 'HardCover' | 'SoftCover' | 'Magazine'

export interface WorkDto {
  id: number
  title: string
  order: number
  authors: string[]
}

export interface CategoryDto {
  id: number
  name: string
}

export interface BookListItemDto {
  id: number
  title: string
  volumeNumber?: number
  type: BookType
  authors: string[]
  hasBeenRead: boolean
  coverImage?: string
}

export interface BookDetailDto {
  id: number
  title: string
  volumeNumber?: number
  pagesCount: number
  type: BookType
  coverType?: BookCoverType
  hasBeenRead: boolean
  dateRead?: string
  coverImage?: string
  isbn?: string
  seriesId?: number
  seriesTitle?: string
  publisherId: number
  publisherName: string
  works: WorkDto[]
  categories: CategoryDto[]
}

export interface BookFilter {
  type?: BookType
  coverType?: BookCoverType
  hasBeenRead?: boolean
}

export interface PageResult<T> {
  items: T[]
  page: number
  pageSize: number
  totalCount: number
}

export interface SaveWorkDto {
  id?: number
  title: string
  order: number
  authorIds: number[]
}

export interface BookSaveDto {
  title: string
  volumeNumber?: number
  pagesCount: number
  type: BookType
  coverType?: BookCoverType
  hasBeenRead: boolean
  dateRead?: string
  coverImage?: string
  isbn?: string
  seriesId?: number
  publisherId: number
  categoryIds: number[]
  works: SaveWorkDto[]
}

export interface AuthorListItemDto {
  id: number
  name: string
}

export interface AuthorDetailDto {
  id: number
  name: string
  bookCount: number
  books: BookListItemDto[]
}

export interface PublisherListItemDto {
  id: number
  name: string
}

export interface PublisherDetailDto {
  id: number
  name: string
  books: BookListItemDto[]
}

export interface SeriesListItemDto {
  id: number
  title: string
  subSeries?: SeriesListItemDto[]
}

export interface SeriesDetailDto {
  id: number
  title: string
  parentSeriesId?: number
  parentSeriesTitle?: string
  subSeries?: SeriesListItemDto[]
  books: BookListItemDto[]
}

export interface SeriesSaveDto {
  title: string
  parentSeriesId?: number
}
