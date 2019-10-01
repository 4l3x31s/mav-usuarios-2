import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MdlCarrera } from 'src/app/modelo/mdlCarrera';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  rootRef: firebase.database.Reference;
  estado: number;

  filters = {}

  public carreras: MdlCarrera[] = [];
  public carrerasAceptadas: MdlCarrera[] = [];


  constructor(public afDB: AngularFireDatabase) {
    this.rootRef = this.afDB.database.ref();
   }

   crearCarrera(mdlCarrera: MdlCarrera): Promise<any> {
    if(!mdlCarrera.id){
      mdlCarrera.id = Date.now();
    }
   return this.afDB.database.ref('carrera/' + mdlCarrera.id).set(mdlCarrera);
   }
   eliminarCarrera(idCarrera: number) {
    this.afDB.database.ref('carrera/' + idCarrera).remove();
  }

 getCarreraSesion(): MdlCarrera {
  return new MdlCarrera(
    null, null, null, null, null,
    null, null, null, null, null,
    null, null, null, null, null,
    null, null, null, null, null,
    null, null, null,null,null,null);
  }

  getCarrerasPorCliente(idUsuario: number): Observable<MdlCarrera[]> {
    return this.afDB.list<MdlCarrera>('carrera',
      ref => ref.orderByChild('idUsuario').equalTo(idUsuario)).valueChanges();
  }

  getCarrerasPorId(idCarrera: number): Observable<MdlCarrera[]> {
    return this.afDB.list<MdlCarrera>('carrera',
      ref => ref.orderByChild('id').equalTo(idCarrera)).valueChanges();
  }
  saveCalif(carrera: MdlCarrera): Promise<any> {
    carrera.fechaFin = moment().format();
    carrera.estado = 3;
    return this.afDB.database.ref('carrera/' + carrera.id).set(carrera);
  }
}
