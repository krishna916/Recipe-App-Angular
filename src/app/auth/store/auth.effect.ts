import { Effect, Actions, ofType} from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActions from './auth.actions';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.TRY_SIGNUP),
        map((action: AuthActions.TrySignup) => {
            return action.payload
        }),
        switchMap((authDate: {username:string, password: string}) => {
            return from(firebase.auth().createUserWithEmailAndPassword(authDate.username, authDate.password));
        }),
        switchMap(() => {
            return from(firebase.auth().currentUser.getIdToken());
        }),
        mergeMap((token:  string) => {
            return [
                {
                    type: AuthActions.SIGNUP
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ]
        })
        
    );

    @Effect()
    authSignIn = this.actions$
        .pipe(
            ofType(AuthActions.TRY_SIGNIN),
            map((action: AuthActions.TrySignup) => {
                return action.payload
            }),
            switchMap((authDate: {username:string, password: string}) => {
                return from(firebase.auth().signInWithEmailAndPassword(authDate.username, authDate.password));
            }),
            switchMap(() => {
                return from(firebase.auth().currentUser.getIdToken());
            }),
            mergeMap((token:  string) => {
                this.router.navigate(['/']);
                return [
                    {
                        type: AuthActions.SIGNIN
                    },
                    {
                        type: AuthActions.SET_TOKEN,
                        payload: token
                    }
                ]
            })
        )

    @Effect({dispatch: false}) // not dispatching any other action at end
    authLogout = this.actions$
        .pipe(
            ofType(AuthActions.LOGOUT),
            tap(() => {
                this.router.navigate(['/']);
            })
        );

    constructor(private actions$: Actions, private router: Router) {
    }
}