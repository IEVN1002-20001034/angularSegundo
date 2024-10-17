import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface Usuaarios{
  nombre:string;
  edad:number;
  email:string;
}

@Component({
  selector: 'app-ejemplo1',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ejemplo1.component.html',
  // template: `
  //   <p>
  //     ejemplo1 works!
  //   </p>
  // `,
  styles: ``
})
export default class Ejemplo1Component implements OnInit{
  formGroup!:FormGroup;

  materia='pwa'
  tem=''

  alumnos:Usuaarios={
    nombre:'',
    edad:0,
    email:''
  }

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.formGroup=this.initForm();
  }
  initForm():FormGroup{
    return this.fb.group({
      nombre:[''],
      edad:[''],
      email:[''],
    })
  }
  onSubmit():void{
    const{nombre, edad, email}=this.formGroup.value; /*desestructuracion de valores */
    this.alumnos.nombre=nombre;
    this.alumnos.edad=edad;
    this.alumnos.email=email;

    let alumnosJSON=JSON.stringify(this.alumnos)

    console.log(this.formGroup.value);

    localStorage.setItem('materia',this.materia);
    localStorage.setItem('alumno',alumnosJSON);
  }

  subImprimir():void{
    this.tem=localStorage.getItem('materia')!

    const alumnoGuardado = localStorage.getItem('alumno')
    if(alumnoGuardado){
      const alumno:Usuaarios=JSON.parse(alumnoGuardado)
    }
    /*console.log(this.alumnos);*/
  }

}

