import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js'
import { environment } from '../../../environments/environment';
import {Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {isPlatform} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  // @ts-ignore
  private currentUser: BehaviorSubject<User | boolean> = new BehaviorSubject(null);

  constructor(private router: Router) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.supabase.auth.onAuthStateChange((event, sess) => {
        //console.log('SUPABAS AUTH CHANGED: ', event);
        //console.log('SUPABAS AUTH CHANGED sess: ', sess);
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          //console.log('SET USER');

          // @ts-ignore
          this.currentUser.next(sess.user);
        } else {
          this.currentUser.next(false);
        }
    }
    )
    this.loadUser();
  }

  async loadUser() {
    if (this.currentUser.value) {
      //console.log('ALREADY GOT USER:', this.currentUser.value);
      return;
    }
    const user = await this.supabase.auth.getUser();
    //console.log('USER:', user);

    if (user.data.user) {
      this.currentUser.next(user.data.user);
    } else {
      this.currentUser.next(false);
    }
  }


  signUp(credentials: { email: string, password: string }) {
    return this.supabase.auth.signUp(credentials)
  }

  signIn(credentials: { email: string, password: string }) {
    return this.supabase.auth.signInWithPassword(credentials)
  }

  signInWithEmail(email: string) {
    const redirectTo = isPlatform('capacitor') ? 'login' : `${window.location.origin}/tabs/profile`;
    console.log('set redirect: ', redirectTo);

    return this.supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo } });
  }

  async signOut() {
    await this.supabase.auth.signOut();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  sendPasswordResetEmail(email: string) {
    return this.supabase.auth.resetPasswordForEmail(email)
  }

  getCurrentUser(): Observable<User | boolean> {
    return this.currentUser.asObservable()
  }

  getCurrentUserId(): string {
    if (this.currentUser.value) {
      return (this.currentUser.value as User).id;
    } else {
      return '?';
    }
  }

  async setSession(access_token: any, refresh_token: any) {
    return this.supabase.auth.setSession({ access_token, refresh_token });
  }

/*
  async getUserEmail() {
    if (this.currentUser.value) {
      return (this.currentUser.value as User).email;
    } else {
      return '?';
    }
  }
*/

  // Retorna true si el usuario está autenticado
  isAuthenticated(): boolean {
      const user_id:string = this.getCurrentUserId();
      return user_id !== '?';
  }



}

