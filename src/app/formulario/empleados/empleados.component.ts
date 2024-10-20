import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Empleado {
  matricula: string;
  nombre: string;
  correo: string;
  edad: number;
  horas: number;

}

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})

export default class EmpleadosComponent implements OnInit{
  formGroup!: FormGroup;
  empleados: Empleado[] = [];
  modificarTabla: number | null = null;
  mostrarTabla = false;


  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      matricula: [''],
      nombre: [''],
      correo: [''],
      edad: [''],
      horas: ['']
  });

  const empleadosGuardados = localStorage.getItem('empleados');
  if (empleadosGuardados) {
    this.empleados = JSON.parse(empleadosGuardados);
  }

  }

  horasExtra(horas: number): number {
    return horas > 40 ? horas - 40 : 0;
  }
  horasNormales(horas: number): number {
    const horasNormales = horas > 40 ? 40 : horas;
    return horasNormales * 70;
  }
  pagoExtra(horas: number): number {
    const horasExtra = this.horasExtra(horas);
    return horasExtra * 140;
  }
  calcularSubTotal(horas: number): number {
    const horasPago = this.horasNormales(horas);
    const pagoExtra = this.horasExtra(horas) * 140;
    const subtotal = horasPago + pagoExtra;
    return subtotal;
  }

  totalTotal(): number {
    let total = 0;
    this.empleados.forEach(empleado => {
      total += this.calcularSubTotal(empleado.horas);
    });
  
    return total;
  }

  registrarEmpleado(): void {
    const { matricula, nombre, correo, edad, horas } = this.formGroup.value;
    // const horasExtras = horas > 40 ? horas - 40 : 0;
    // const horasNormales = horas > 40 ? 40 : horas;
    // const pagoHora = 70;

    // const horasPago = horasNormales * pagoHora;
    // const pagoExtra = horasExtras * 140;
    // const subTotal = horasPago + pagoExtra;


    const nuevoEmpleado: Empleado = {
      matricula,
      nombre,
      correo,
      edad: Number(edad),
      horas: Number(horas),
      // horasExtras,
      // horasPago,
      // subTotal
    };

    if (this.modificarTabla !== null) {

      this.empleados[this.modificarTabla] = nuevoEmpleado;
      this.modificarTabla = null;
    } else {

      this.empleados.push(nuevoEmpleado);
    }
  localStorage.setItem('empleados', JSON.stringify(this.empleados));

  this.formGroup.reset();


  }


 modificarEmpleado(matricula: string): void {
    const tabla = this.empleados.findIndex(emp => emp.matricula === matricula);
    if (tabla !== -1) {
      const empleado = this.empleados[tabla];
      this.formGroup.setValue({
        matricula: empleado.matricula,
        nombre: empleado.nombre,
        correo: empleado.correo,
        edad: empleado.edad,
        horas: empleado.horas
      });
      this.modificarTabla = tabla;
    }
  }

  eliminarEmpleado(matricula: string): void {
    this.empleados = this.empleados.filter(emp => emp.matricula !== matricula);
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }

  imprimirTabla(): void {
    this.mostrarTabla = true;
  }
}