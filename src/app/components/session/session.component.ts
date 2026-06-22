import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-session',
  standalone: false,
  templateUrl: './session.component.html',
  styleUrl: './session.component.css'
})
export class SessionComponent implements OnInit{

  sesion: boolean = false;

  constructor(private service: UsuariosService){
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  iniciarSesion(){
    
  }

  
}
