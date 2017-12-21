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
		path: 'comment',
		component: CommentComponent
	},
	{
		path: 'category',
		component: CategoryComponent
	},
	{
		path: 'user',
		component: UserComponent
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
