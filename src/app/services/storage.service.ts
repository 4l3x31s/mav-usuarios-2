import { MdlConductora } from './../modelo/mldConductora';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


const ITEMS_KEY = 'mav-usuarios';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: Storage) { }
  // CREATE
  addItem(item: MdlConductora): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: MdlConductora[]) => {
      if (items) {
        items.push(item);
        return this.storage.set(ITEMS_KEY, items);
      } else {
        return this.storage.set(ITEMS_KEY, [item]);
      }
    });
  }
 
  // READ
  getItems(): Promise<MdlConductora[]> {
    return this.storage.get(ITEMS_KEY);
  }
  // UPDATE
  updateItem(item: MdlConductora): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: MdlConductora[]) => {
      if (!items || items.length === 0) {
        return null;
      }
 
      let newItems: MdlConductora[] = [];
 
      for (let i of items) {
        if (i.id === item.id) {
          newItems.push(item);
        } else {
          newItems.push(i);
        }
      }
 
      return this.storage.set(ITEMS_KEY, newItems);
    });
  }
 
  // DELETE
  deleteItem(id: number): Promise<MdlConductora> {
    return this.storage.get(ITEMS_KEY).then((items: MdlConductora[]) => {
      if (!items || items.length === 0) {
        return null;
      }
 
      let toKeep: MdlConductora[] = [];
 
      for (let i of items) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });
  }
}
