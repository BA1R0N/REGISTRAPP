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

  // Retorna true si el perfil del usuario esta completo
  async isProfileCompleted(user_id: string):Promise<boolean> {
    const { data, error } = await this.supabase
      .from('user_profile')
      .select('completed')
      .eq('user_id', user_id);

    if (error) {
      console.error(error);
      return false;
    }
    return data[0].completed;
  }


  async completeProfile() {
    const { data: todos, error } = await this.supabase.from('hello').select('*');

    console.log(todos);
    return todos;
  }


}

