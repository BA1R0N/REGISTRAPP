import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // Si usas una base de datos personalizada, añade tu configuración en el método create()
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Guardar un valor
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  // Obtener un valor
  public async get(key: string): Promise<any> {
    return this._storage?.get(key);
  }
}
