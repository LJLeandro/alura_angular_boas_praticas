import { Component, Input, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/autenticacao/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() usuario = '';
  @Input() senha = '';

  constructor(private authService: AutenticacaoService) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.autenticar(this.usuario, this.senha).subscribe(
      () => {
        console.log('Autenticado com Sucesso.');
      },
      (error) => {
        alert('Usuário ou senha inválido');
        console.log(error);
      }
    );
  }
}
