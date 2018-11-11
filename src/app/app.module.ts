import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { UsersService } from './shared/services/users.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
  ],
  providers: [
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
