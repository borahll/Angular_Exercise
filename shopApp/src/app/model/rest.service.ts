import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from './product.model';
import { Category } from './category.model';
import { Order } from './order.model';

@Injectable()
export class RestService{
  baseUrl: string = "http://localhost:3000/";
  token: string = "";
  constructor(private http: HttpClient){

  }
  getProducts(): Observable<Product[]>{
      return this.http.get<Product[]>(this.baseUrl + 'products');
  }
  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.baseUrl + 'products');
  }
  saveOrder(order: Order): Observable<Order>{
    return this.http.post<Order>(this.baseUrl + 'orders', order);
  }
  authentication(name: string, password: string): Observable<boolean>{
    return this.http.post<any>(this.baseUrl + 'login', {username:name, password:password}).pipe(map(response =>{
      this.token = response.success ? response.token : "";
      return response.success; 
    }));
  }
  addProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(this.baseUrl + 'products/', product, {
      headers: new HttpHeaders({
        'Authorization': `Bearer<${this.token}>`
      })
    });
  }
  addCategory(category: Category): Observable<Category>{
    return this.http.post<Category>(this.baseUrl + 'categories/', category.id, {
      headers: new HttpHeaders({
        'Authorization': `Bearer<${this.token}>`
      })
    });
  }
  deleteCategory(category: Category): Observable<Category>{
    return this.http.delete<Category>(this.baseUrl + 'categories/' + category.id, {
      headers: new HttpHeaders({
        'Authorization': `Bearer<${this.token}>`
      })
    });
  }
  updateProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(this.baseUrl + 'products/' + product.id, product, {
      headers: new HttpHeaders({
        'Authorization': `Bearer<${this.token}>`
      })
    });
  }
  deleteProduct(p: Product): Observable<Product>{
    return this.http.delete<Product>(this.baseUrl + 'products/' + p.id, {
      headers: new HttpHeaders({
        'Authorization': `Bearer<${this.token}>`
      })
    });
  }
  updateCategory(category: Category): Observable<Category>{
    return this.http.post<Category>(this.baseUrl + 'products/' + category.id, category, {
      headers: new HttpHeaders({
        'Authorization': `Bearer<${this.token}>`
      })
    });
  }
}