import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;

  productos: any[] = [];



  constructor( private http: HttpClient) 
  {
    this.cargarProductos();
  }


private cargarProductos()
{
  this.http.get('https://angular-html-cd34f-default-rtdb.firebaseio.com/productos_idx.json')
  .subscribe( (resp: any) => 
  {
    console.log(resp); 
    this.productos = resp;
    this.cargando = false;
   
  });

}

}
