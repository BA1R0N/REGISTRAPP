import {Injectable} from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js'
import {environment} from 'src/environments/environment';
import {AuthService} from "../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ReadService {
  private supabase: SupabaseClient;

  constructor(
    private authService: AuthService,
  ) {
    this.supabase = createClient(
        environment.supabaseUrl,
        environment.supabaseKey
    );
  }


  // Retorna true si el perfil del usuario esta completo
  async isProfileCompleted(user_id:string):Promise<boolean> {

    const { data, error } = await this.supabase.from('user_profile').select('completed').eq('user_id', user_id);

    if (error) {
      console.error('There was an error:', error)
      return false;
    }

    try {
      return data[0].completed;
    } catch (e) {
      return false;
    }

  }

  // Retorna la informacion del usuario
  async getUserData(user_id:string) {
    //console.log('user_id: ', this.user_id)
    const { data, error } = await this.supabase
        .from('user_profile')
        .select('first_name, last_name, type')
        .eq('user_id', user_id);

    if (error) {
      console.error(error);
      return false;
    }

    return data;
  }


  async getClasses(user_id:string) {
    const { data, error } = await this.supabase
        .from('classes')
        .select('class_name, class_code, teacher_email')
        .eq('user_id', user_id);

    if (error) {
      console.error(error);
      return false;
    }

    return data;
  }

}
