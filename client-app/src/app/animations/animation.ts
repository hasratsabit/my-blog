import { trigger, state, style, transition, animate, keyframes, query, stagger, animateChild, group } from "@angular/animations";

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


export const rainFall = trigger('rainFall', [
  transition(':enter', [
    query('@fadeIn', stagger(200, animateChild()))
  ])
])
// export const rainFall = trigger('rainFall', [
//   transition(':enter', [
//     group([
//       query('h1', [
//         style({ transform: 'translateY(-20px)'}),
//         animate(1000)
//       ]),
//       query('@fadeIn', stagger(500, animateChild()))
//     ])
//   ])
// ])


export const expandCollapse = trigger('expandCollapse', [
  state('collapsed', style({
    height: 0,
    paddingTop: 0,
    paddingBottom: 0,
    opacity: 0,
    display: 'none'
  })),

  transition('collapsed => expanded', [
    animate('200ms ease-out', style({
      height: '*',
      paddingTop: '*',
      paddingBottom: '*',
      display: '*'
    })),
    animate('1s', style({ opacity: 1 }))
  ]),

  transition('expanded => collapsed', [
    animate('200ms ease-in')
  ])
]);
