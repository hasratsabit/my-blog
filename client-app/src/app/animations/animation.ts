import { trigger, state, style, transition, animate, keyframes, query, stagger, animateChild } from "@angular/animations";

export const fade = trigger('fade', [
  state('void', style({ opacity: 0 })),
  transition(':enter, :leave', [
    animate('500ms 0.5s cubic-bezier(.96,.12,.44,.56)')
  ])
])

// Fade In Down
export const fadeInDown = trigger('fadeInDown', [
	state('void', style({
		opacity: 0
	})),
	transition(':enter', [
		animate('0.5s ease-in-out', keyframes([
			style({
				offset: 0,
				opacity: 0,
	    	transform: 'translate3d(0, -100%, 0)'
			}),
			style({
				offset: 1,
				opacity: 1,
	    	transform: 'none'
			})
		]))
	])
])


// Fade In Left and Right
export const fadeInLeft = trigger('fadeInLeft', [
	state('void', style({
		opacity: 0
	})),
	transition(':enter', [
		animate('0.5s ease-in-out', keyframes([
			style({
				offset: 0,
				opacity: 0,
	    	transform: 'translate3d(-100%, 0, 0)'
			}),
			style({
				offset: 1,
				opacity: 1,
	    	transform: 'none'
			})
		]))
	]),
	transition(':leave', [
		animate('0.5s ease-in-out', keyframes([
			style({
				offset: 0,
				opacity: 1
			}),
			style({
				offset: 1,
				opacity: 0,
				transform: 'translate3d(100%, 0, 0)'
			})
		]))
	])
])


// Fade In
export const fadeIn = trigger('fadeIn', [
	state('void', style({
		opacity: 0
	})),
	transition(':enter', [
		animate('0.5s ease-in-out', keyframes([
			style({
				offset: 0,
				opacity: 0
			}),
			style({
				offset: 1,
				opacity: 1
			})
		]))
	]),
	transition(':leave', [
		animate('0.5s ease-in-out', keyframes([
			style({
				offset: 0,
				opacity: 1
			}),
			style({
				offset: 1,
				opacity: 0
			})
		]))
	])
])
