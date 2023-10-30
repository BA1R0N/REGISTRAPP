import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CreateService {
  private supabase: SupabaseClient;

  constructor(
  ) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }


  // Funcion que permite completar el perfil del usuario con los datos: nombre, apellido, tipo de usuario (estudiante o profesor) 
  async completeProfile(first_name:string, last_name:string, type:string, user_id:string) {
    const { data, error } = await this.supabase.from('user_profile')
      .insert([{ first_name, last_name, type, completed: true,'user_id': user_id }])
      .eq('user_id', user_id);

    if (error) {
      console.error(error);
      return false;
    }
    // Retorna true si el registro fue correcto
    console.log('Server response:', data)
    return true;
  }

  // Funcion que permite el registro de una asignatura
  async registerClass(class_name:string, class_code:string, teacher_email:string, user_id:string) {
    const { data, error } = await this.supabase.from('classes')
      .insert([{ class_name, class_code, teacher_email, 'user_id': user_id }])
      .eq('user_id', user_id);

    if (error) {
      console.error(error);
      return false;
    }
    // Retorna true si el registro fue correcto
    console.log('Server response:', data)
    return true;
  }


}

