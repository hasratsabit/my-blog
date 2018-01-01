import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { HomeComponent } from "./components/home/home.component";
import { PartsComponent } from "./components/parts/parts.component";
import { BlogComponent } from "./components/blog/blog.component";
import { CommentComponent } from "./components/comment/comment.component";
import { CategoryComponent } from "./components/category/category.component";
import { UserComponent } from "./components/user/user.component";
import { ForumComponent } from "./components/forum/forum.component";
import { EmailComponent } from "./components/email/email.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { AnimationComponent } from "./components/animation/animation.component";

import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { DeleteUserComponent } from './components/user/delete-user/delete-user.component';

import { AddBlogComponent } from './components/blog/add-blog/add-blog.component';
import { EditBlogComponent } from './components/blog/edit-blog/edit-blog.component';
import { DeleteBlogComponent } from './components/blog/delete-blog/delete-blog.component';

// Categories
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { DeleteCategoryComponent } from './components/category/delete-category/delete-category.component';


const appRoutes: Routes = [

	{
		path: '*',
		component: HomeComponent
	},
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'blog',
		component: BlogComponent
	},
	{
		path: 'add-blog',
		component: AddBlogComponent
	},
	{
		path: 'edit-blog',
		component: EditBlogComponent
	},
	{
		path: 'delete-blog',
		component: DeleteBlogComponent
	},
	{
		path: 'comment',
		component: CommentComponent
	},
	{
		path: 'category',
		component: CategoryComponent
	},
	{
		path: 'add-category',
		component: AddCategoryComponent
	},
	{
		path: 'edit-category',
		component: EditCategoryComponent
	},
	{
		path: 'delete-category',
		component: DeleteCategoryComponent
	},
	{
		path: 'user',
		component: UserComponent
	},
	{
		path: 'user/:id',
		component: UserComponent
	},
	{
		path: 'edit-user/:id',
		component: EditUserComponent
	},
	{
		path: 'delete-user/:id',
		component: DeleteUserComponent
	},
	{
		path: 'forum',
		component: ForumComponent
	},
	{
		path: 'email',
		component: EmailComponent
	},
	{
		path: 'parts',
		component: PartsComponent
	},
	{
		path: 'dashboard',
		component: DashboardComponent
	},
	{
		path: 'profile',
		component: ProfileComponent
	},
	{
		path: 'register',
		component: RegisterComponent
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'logout',
		component: LogoutComponent
	},
	{
		path: 'animation',
		component: AnimationComponent
	}

]


@NgModule({
	declarations: [],
	imports: [ RouterModule.forRoot(appRoutes)],
	providers:[],
	bootstrap: [],
	exports: [RouterModule]

})

export class AppRoutingModule {}
