import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async updateCompletedProfile(user_id:string) {
    const { data, error } = await this.supabase
      .from('user_profile')
      .update({ completed: true })
      .eq('user_id', user_id);

    if (error) {
      console.error(error);
      return false;
    }

    return true;
  }


}
