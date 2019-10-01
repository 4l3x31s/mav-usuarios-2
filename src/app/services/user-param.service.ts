import { MdlConductora } from './../modelo/mldConductora';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserParamService {
  private usuario: MdlConductora;
  constructor() { }

  get(): MdlConductora {
    return this.usuario;
  }
  set(usuario: MdlConductora) {
    this.usuario = usuario;
  }
}
