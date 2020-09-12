import { Injectable } from '@angular/core';
import { ClientModel } from './client.model';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientDetail: ClientModel[] = [
    {id: 1, name: 'nokia c201', type: 'electronics', subType: 'mobile', freeTag: ['free1', 'free2']},
    {id: 2, name: 'motorola', type: 'electronics', subType: 'mobile', freeTag: ['free1', 'free2', 'free3']},
    {id: 3, name: 'samsung', type: 'electronics', subType: 'television', freeTag: ['free1']},
    {id: 4, name: 'philips', type: 'electronics', subType: 'earphone', freeTag: ['free1', 'free2']}
  ];
  userDetail: UserModel[] = [
    {id: 1, userName: 'xyz', password: '123xyz'},
    {id: 2, userName: 'abc', password: '123abc'},
  ];
  editClientData: ClientModel[];

  validUser = false;
  constructor() { }

  getClient(): ClientModel[] {
    return this.clientDetail;
  }
  deleteClient(clientId: number) {
    this.clientDetail = this.clientDetail.filter(item => item.id != clientId);
  }
  getClientById(clientId: number) {
    return this.clientDetail.filter(data => data.id === clientId);
  }

  userAuthentication(userData: any) {
    let un: UserModel[];
    let ps: UserModel[];
    // this.userDetail.forEach(data => {
      un = this.userDetail.filter(data => {return data.userName === userData.userName});
      ps = this.userDetail.filter(data => {return data.password === userData.password});
    // });

    if (un[0].userName === userData.userName && ps[0].password === userData.password) {
      this.validUser = true;
    } else {
      this.validUser = false;
    }
  }
}
