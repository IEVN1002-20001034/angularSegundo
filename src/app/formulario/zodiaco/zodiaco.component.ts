import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './zodiaco.component.html',
  styleUrl: './zodiaco.component.css'
})

export default class ZodiacoComponent implements OnInit {
  formGroup!: FormGroup;
  imprimirInfo = false;
  nombreCompleto = '';
  edad = 0;
  signoZ = '';
  img = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      nombre: [''],
      aPaterno: [''],
      aMaterno: [''],
      dia: [''],
      mes: [''],
      year: [''],
      sexo: ['']
    });
  }

  onSubmit(): void {
    const { nombre, aPaterno, aMaterno, dia, mes, year } = this.formGroup.value;
    this.nombreCompleto = `${nombre} ${aPaterno} ${aMaterno}`;

    const fechaNac = new Date(year, mes - 1, dia);
    const hoy = new Date();
    this.edad = hoy.getFullYear() - fechaNac.getFullYear();

    if (hoy.getMonth() < fechaNac.getMonth() || (hoy.getMonth() === fechaNac.getMonth() && hoy.getDate() < fechaNac.getDate())) {
      this.edad--;
    }


    this.signoZ = this.obtenerZigno(year);
    this.img = this.imgZigno(this.signoZ);

    this.imprimirInfo = true;
  }

  obtenerZigno(year: number): string {
    const signosChinos = [
      'Rata', 'Buey', 'Tigre', 'Conejo', 'Dragón', 'Serpiente', 'Caballo', 'Cabra', 'Mono', 'Gallo', 'Perro', 'Cerdo'
    ];
    const indice = (year - 4) % 12;
    return signosChinos[indice];
  }

  imgZigno(signo: string): string {
  
    const imagenes: { [key: string]: string } = {
      'Rata': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG_0t2zqvx3d-enjQezQJASaCjIG4CqcMtYg&s',
      'Buey': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSSySO2gQ-4qYKpSoOW-E_29JnF9Sige16HQ&s',
      'Tigre': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbc_JtN7v6T6mSmHdtNQ1nf7KoCCO3Js2rLg&s',
      'Conejo': 'https://peopleenespanol.com/thmb/-ekXDGhFH6Baw6C29OGuDxf8iDQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Horoscopo-chino-165927323-2000-c6361314aab74b7485a5ea677666ba83.jpg',
      'Dragón': 'https://img.freepik.com/vector-premium/dragon-chino-rojo-dibujos-animados-volando_29190-5519.jpg',
      'Serpiente': 'https://peopleenespanol.com/thmb/Who-b06dJwjtqnuJ406zgMaq4kg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Horoscopo-chino-165965553-2000-e4700b87c9fd404681a502f7095c2ac5.jpg',
      'Caballo': 'https://peopleenespanol.com/thmb/NmX4UUt1APhp__iVTPZtQJim9t8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Horoscopo-chino-165967001-2000-57bb5c0eac9247e4a6b9afe14505f364.jpg',
      'Cabra': 'https://img.freepik.com/fotos-premium/foto-cabra-al-estilo-dibujos-animados-disney-generada-ia_926306-6886.jpg',
      'Mono': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR36Cr-dEF7FIwGIw75wLfOweuMcIJSKMahSA&s',
      'Gallo': 'https://pbs.twimg.com/media/CznSw8QWgAcGOG7.jpg',
      'Perro': 'https://wl-genial.cf.tsp.li/resize/728x/jpg/da6/797/52cfed53e880611039850a5c77.jpg',
      'Cerdo': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQatqsf0PdWvVYlnlm1AJGIUBVegR1J5DztYQ&s',
    };
    return imagenes [signo] || 'https://static.wikia.nocookie.net/disney/images/7/70/Remy.png/revision/latest?cb=20130307114718&path-prefix=es';
  }
}