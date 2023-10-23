import { Injectable } from '@angular/core';
import { createClient,SupabaseClient } from '@supabase/supabase-js'
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  
  private supabase: SupabaseClient;

  constructor(
  ) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
   }

  async getHello() {
    const { data: todos, error } = await this.supabase.from('hello').select('*');

    console.log(todos);
    return todos;
  }

}
