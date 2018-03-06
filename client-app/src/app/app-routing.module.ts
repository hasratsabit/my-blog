import { NotFoundComponent } from './components/not-found/not-found.component';
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

// Blog
import { ReadMoreComponent } from './components/blog/read-more/read-more.component';


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
		component: BlogComponent,
		canActivate: [AdminGuard]
	},
	{
		path: 'read-more/:id',
		component: ReadMoreComponent
	},
	{
		path: 'comment',
		component: CommentComponent,
		canActivate: [AdminGuard]
	},
	{
		path: 'category',
		component: CategoryComponent,
		canActivate: [AdminGuard]
	},
	{
		path: 'user',
		component: UserComponent,
		canActivate: [AdminGuard]
	},
	{
		path: 'forum',
		component: ForumComponent,
		canActivate: [AdminGuard]
	},
	{
		path: 'email',
		component: EmailComponent,
		canActivate: [AdminGuard]
	},
	{
		path: 'parts',
		component: PartsComponent,
		canActivate: [AdminGuard]
	},
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [AdminGuard]
	},
	{
		path: 'profile/:username',
		component: ProfileComponent
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
		component: AnimationComponent,
		canActivate: [AdminGuard]
	},
	{
		path: "**",
		component: NotFoundComponent
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
