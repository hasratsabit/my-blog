import { SkillComponent } from './components/profile/skill/skill.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { AngularDraggableModule } from 'angular2-draggable';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
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
        MatListModule,
        MatTableModule
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
import { ProfileService } from './services/profile.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { CommentService } from './services/comment.service';
import { BlogService } from './services/blog.service';
import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './guard/admin.guard';
import { NotAuthGuard } from './guard/notAuth.guard';

import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { DeleteUserComponent } from './components/user/delete-user/delete-user.component';
import { AddBlogComponent } from './components/blog/add-blog/add-blog.component';
import { EditBlogComponent } from './components/blog/edit-blog/edit-blog.component';
import { DeleteBlogComponent } from './components/blog/delete-blog/delete-blog.component';
import { DeleteCategoryComponent } from './components/category/delete-category/delete-category.component';
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { AddForumComponent } from './components/forum/add-forum/add-forum.component';
import { EditForumComponent } from './components/forum/edit-forum/edit-forum.component';
import { DeleteForumComponent } from './components/forum/delete-forum/delete-forum.component';
import { ReadMoreComponent } from './components/blog/read-more/read-more.component';
import { BlogPipe } from './pipes/blog.pipe';
import { ToolComponent } from './components/profile/tool/tool.component';
import { ProjectComponent } from './components/profile/project/project.component';
import { ExperianceComponent } from './components/profile/experiance/experiance.component';
import { EducationComponent } from './components/profile/education/education.component';
import { ObjectiveComponent } from './components/profile/objective/objective.component';
import { PersonalComponent } from './components/profile/personal/personal.component';
import { PublicationComponent } from './components/profile/publication/publication.component';
import { AboutComponent } from './components/profile/about/about.component';
import { BlogListComponent } from './components/blog/blog-list/blog-list.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { DatePipe } from './pipes/date.pipe';




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
    SkillComponent,
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
    DeleteCategoryComponent,
    EditCategoryComponent,
    AddCategoryComponent,

    AddForumComponent,
    EditForumComponent,
    DeleteForumComponent,
    ReadMoreComponent,
    BlogPipe,
    ToolComponent,
    ProjectComponent,
    ExperianceComponent,
    EducationComponent,
    ObjectiveComponent,
    PersonalComponent,
    PublicationComponent,
    AboutComponent,
    BlogListComponent,
    CategoryListComponent,
    DatePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    AngularDraggableModule,

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
    MatListModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
  ],
  providers: [
    AuthService,
    UserService,
    CategoryService,
    ProfileService,
    AuthGuard,
    AdminGuard,
    NotAuthGuard,
    BlogService,
    CommentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
