import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';


const getPaginatedResult = <T>(url, params, http: HttpClient) => {
  const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
  return http.get<T>(url, { observe: 'response', params }).pipe(
    map(response => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') !== null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    }),
  );
};

const getPaginationHeaders = (pageNumber: number, pageSize: number) => {
  let params = new HttpParams();

  params = params.append('pageNumber', pageNumber.toString());
  params = params.append('pagesize', pageSize.toString());

  return params;
};

export { getPaginatedResult, getPaginationHeaders }