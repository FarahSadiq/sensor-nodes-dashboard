import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {HttpClientModule} from '@angular/common/http';
import {ApiCalls} from './shared/api-calls/apiCalls';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    NgxSpinnerModule,
  ],
  providers: [ {provide : APP_INITIALIZER, useFactory : initFunction, deps: [ApiCalls] , multi : true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function initFunction(apiCall: ApiCalls) {
  return () => {
    apiCall.getLocationByNode('UK-GLA-001').subscribe((response: any) => {
      sessionStorage.setItem('co-ord', JSON.stringify(response.body))
    });
  }
}
