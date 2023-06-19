import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: any[] = [];
  productosFiltrado: Producto[] = [];



  constructor( private http: HttpClient) 
  {
    this.cargarProductos();
  }


private cargarProductos()
{
  return new Promise ( (resolve, reject) => {

    this.http.get('https://angular-html-cd34f-default-rtdb.firebaseio.com/productos_idx.json')
    .subscribe( (resp: any) => 
    {
      this.productos = resp;
      this.cargando = false;
      resolve(resp);
    });

  });
 
}

getProducto( id: string)
{
  return this.http.get(`https://angular-html-cd34f-default-rtdb.firebaseio.com/productos/${ id }.json`);
}

buscarProducto( txtBuscar: string)
{
  if( this. productos.length === 0)
  {
    //Cargar Productos
    this.cargarProductos().then( ()=> {
      //ejecutar después de tener los productos.
      //Aplicar filtro.
      this.filtrarProductos(txtBuscar);
    });
  }
  else
  {
    //Aplicar filtro.
    this.filtrarProductos(txtBuscar);
  }
}

private filtrarProductos( txtBuscar: string )
{
  //console.log( this.productos);
  this.productosFiltrado = [];
  txtBuscar = txtBuscar.toLocaleLowerCase();

  this.productos.forEach( prod => {

    const tituloLower = prod.titulo.toLocaleLowerCase();

    if(prod.categoria.indexOf( txtBuscar ) >= 0 || tituloLower.indexOf( txtBuscar ) >= 0)
    {
      this.productosFiltrado.push( prod );
    }

  });
}

}
