import { Injectable } from '@angular/core';
import { ICategory } from '../interfaces/category.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  // formDatas: NewCategory
  private urlCategory: string;
  constructor(private http: HttpClient) {
    this.urlCategory = 'http://localhost:3000/categories'    
  }

  public getCategories(): Observable<Array<ICategory>> {
    return this.http.get<Array<ICategory>>(this.urlCategory)
  }

  public setCategories(category: ICategory): Observable<Array<ICategory>> {
    return this.http.post<Array<ICategory>>(this.urlCategory, category);
  }

  public delCategories(idCategory: number): Observable<Array<ICategory>> {
    return this.http.delete<Array<ICategory>>(`${this.urlCategory}/${idCategory}`);
  }

  public editCategories(category: ICategory): Observable<Array<ICategory>> {
    return this.http.put<Array<ICategory>>(`${this.urlCategory}/${category.id}`, category);
  }

  // public chooseCategory(name: string): Observable<Array<ICategory>> {
  //   return this.http.get<Array<ICategory>>(this.urlCategory)
  // }
}
