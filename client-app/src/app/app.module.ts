import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";

// Material Modules

import {MatButtonModule,
        MatCheckboxModule,
        MatSelectModule,
        MatInputModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMenuModule,
        MatIconModule,
        MatListModule
      } from '@angular/material';


import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { PartsComponent } from './components/parts/parts.component';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BlogComponent } from './components/blog/blog.component';
import { CategoryComponent } from './components/category/category.component';
import { UserComponent } from './components/user/user.component';
import { ForumComponent } from './components/forum/forum.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EmailComponent } from './components/email/email.component';
import { CommentComponent } from './components/comment/comment.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AnimationComponent } from './components/animation/animation.component';

// Services
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { DeleteUserComponent } from './components/user/delete-user/delete-user.component';
import { AddBlogComponent } from './components/blog/add-blog/add-blog.component';
import { EditBlogComponent } from './components/blog/edit-blog/edit-blog.component';
import { DeleteBlogComponent } from './components/blog/delete-blog/delete-blog.component';

@NgModule({
  declarations: [
    AppComponent,
    PartsComponent,
    HomeComponent,
    NavigationComponent,
    BlogComponent,
    CategoryComponent,
    UserComponent,
    ForumComponent,
    DashboardComponent,
    ProfileComponent,
    EmailComponent,
    CommentComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AnimationComponent,
    EditUserComponent,
    DeleteUserComponent,
    AddBlogComponent,
    EditBlogComponent,
    DeleteBlogComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,

    // Material Modules
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatIconModule,
    MatListModule
  ],
  providers: [AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
