interface PagingResponse<T> {
  page?: number;
  per_page?: number;
  total?: number;
  total_pages?: number;
  data?: T[];
}

export default PagingResponse;
