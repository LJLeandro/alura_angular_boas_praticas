import { Injectable } from '@angular/core';
import { TokenService } from '../token.service';
import { Usuario } from './usuario';
import jwt_decode from 'jwt-decode'
import { BehaviorSubject } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioSubject = new BehaviorSubject<Usuario>({});

  constructor(private tokenService: TokenService) { }

  decodificaJWT() {
    const token = this.tokenService.retornaToken();
    const usuario = jwt_decode(token) as Usuario;

    this.usuarioSubject.next(usuario);
  }

  retornaUsuario() {
    console.log('Usuario.')
    console.log(this.usuarioSubject);

    return this.usuarioSubject.asObservable();
  }

  salvaToken(token: string) {
    this.tokenService.salvarToken(token);
    this.decodificaJWT()
  }

  logout() {
    this.tokenService.excluiToken();
    this.usuarioSubject.next({});
  }

  estaLogado() {
    return this.tokenService.possuiToken();
  }
}
