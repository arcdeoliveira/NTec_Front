import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public chavePrincipal : string;
  private storage : Storage;

  constructor() { 
    this.chavePrincipal = "usuarioDoSistema";
    this.storage        = window.sessionStorage;
  }

  set(key: string, value: string) : boolean {
    if(this.storage) {
      this.storage.setItem(key, value);

      return true;
    }

    return false;
  }

  get(key: string): string | null {
    if (this.storage) {
      return this.storage.getItem(key);
    }

    return null;
  }

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);

      return true;
    }

    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();

      return true;
    }

    return false;
  }
}
