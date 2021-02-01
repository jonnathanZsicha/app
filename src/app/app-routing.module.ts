import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'direcciones', loadChildren: './pages/direcciones/direcciones.module#DireccionesPageModule' },  { path: 'contact', loadChildren: './pages/contact/contact.module#ContactPageModule' },
  { path: 'lista-contactos', loadChildren: './pages/lista-contactos/lista-contactos.module#ListaContactosPageModule' },
  { path: 'localizacion', loadChildren: './pages/localizacion/localizacion.module#LocalizacionPageModule' }


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
