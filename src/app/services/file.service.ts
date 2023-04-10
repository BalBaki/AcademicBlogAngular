import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Pdf } from '../blog/pdf';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private http: HttpClient
  ) { }

  path = "http://localhost:3000/"

  headers : HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  



  getFiles(): Observable<HttpResponse<Pdf[]>> {
    return this.http.get<Pdf[]>(this.path + 'articles',{observe: 'response'})
  }
      
  deleteFile(fileId: string):Observable<string> {
    return this.http.delete<string>(this.path + 'deleteArcticle/' + fileId)
  }


  uploadArticle(file:any):Observable<any>{
    return this.http.post<any>(this.path + 'article',file)
  }

  updateArticle(newFile : Pdf) : Observable<any>{
    return this.http.put<any>(this.path+'changeArticle/'+newFile.id,newFile)
  }

  changeFile(fileId : string , file : any):Observable<any>{
    return this.http.post<any>(this.path + 'changeFile/'+fileId,file);
  }

}
