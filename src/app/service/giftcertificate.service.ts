import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {ContentList, ListResult} from "./model/interface";

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  url = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getData(path: string) {
    return this.http.get(this.url + path);
  }

  getOne(path: string) {
    return this.http.get<ListResult<any>>
    (this.url + path).pipe(map(response => response.content));
  }

  getAll(path: string): Observable<ContentList<unknown>> {
    return this.http.get<ListResult<any>>
    (this.url + path).pipe(map(response => response.content));
  }

  postData(path: string, body: any) {
    return this.http.post(this.url + path, body);
  }

  patchData(path: string, body: any) {
    return this.http.patch(this.url + path, body);
  }

  deleteData(path: string) {
    return this.http.delete(this.url + path);
  }
}
