import { AuthService } from '../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User
  confirmarSenha: string
  tipoUsuario: string
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  cadastrar(){
     if(this.user.nome.length<3){
       alert('Preencha o campo nome com pelo menos 3 caracteres')
     }

     if(this.user.usuario.length<3){
       alert('Preencha o campo usuario com pelo menos 3 caracteres')
     }
    
     if(this.user.usuario.indexOf('@') == -1 || this.user.usuario.indexOf('.') == -1){
      alert('E-mail Inválido!')
    }
    this.user.tipo = this.tipoUsuario

    if(this.user.senha != this.confirmarSenha){
       alert('A senhas estão incorretas.')
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/entrar'])
        alert('Usuário cadastrado com sucesso!')
      })
    }

  }

}
