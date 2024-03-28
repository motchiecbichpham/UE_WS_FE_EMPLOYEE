import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterPageComponent } from './component/register-page/register-page.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { JobDetailPageComponent } from './component/job-detail-page/job-detail-page.component';
import { ProfilePageComponent } from './component/profile-page/profile-page.component';
import { ApplicationDetailPageComponent } from './component/application-detail-page/application-detail-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JobCardComponent } from './layout/job-card/job-card.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomePageComponent,
    JobDetailPageComponent,
    ProfilePageComponent,
    ApplicationDetailPageComponent,
    JobCardComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
