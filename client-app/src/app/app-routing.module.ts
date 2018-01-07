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

// Forum
import { AddForumComponent } from './components/forum/add-forum/add-forum.component';
import { EditForumComponent } from './components/forum/edit-forum/edit-forum.component';
import { DeleteForumComponent } from './components/forum/delete-forum/delete-forum.component';

// User Access
import { AuthGuard } from './guard/auth.guard';
import { NotAuthGuard } from './guard/notAuth.guard';
import { AdminGuard } from './guard/admin.guard';


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
		path: 'edit-category/:id',
		component: EditCategoryComponent
	},
	{
		path: 'delete-category/:id',
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
		path: 'add-forum',
		component: AddForumComponent
	},
	{
		path: 'edit-forum',
		component: EditForumComponent
	},
	{
		path: 'delete-forum',
		component: DeleteForumComponent
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
		component: DashboardComponent,
		canActivate: [AdminGuard]
	},
	{
		path: 'profile',
		component: ProfileComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'register',
		component: RegisterComponent,
		canActivate: [NotAuthGuard]
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [NotAuthGuard]
	},
	{
		path: 'logout',
		component: LogoutComponent,
		canActivate: [AuthGuard]
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
