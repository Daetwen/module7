export interface ContentList<T> {
  results: T[];
}

export interface ListResult<T> {
  content: ContentList<T>;
  _links: any;
}
