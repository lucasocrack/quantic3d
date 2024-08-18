import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../environment/environment'
import { User } from '../shared/types/user.types'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient)
  private baseUrl = environment.api + '/user'

  getUserList() {
    return this.http.get<User[]>(this.baseUrl)
  }
}
