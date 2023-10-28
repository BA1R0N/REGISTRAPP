import { Injectable } from '@angular/core';
import { createClient,SupabaseClient } from '@supabase/supabase-js'
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CreateService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }


  async completeProfile(first_name:string, last_name:string, user_type:string) {

  }


}

