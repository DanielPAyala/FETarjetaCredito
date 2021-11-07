import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from '../../services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  listadoTarjeta: any[] = [];
  accion: string = 'Agregar';

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _tajetaService: TarjetaService) { 
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
      id: 0
    })
  }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas() {
    this._tajetaService.getListarTerjetas().subscribe((data) => {
      console.log(data);
      this.listadoTarjeta = data;
    }, (error) => {
      console.log(error);
    })
  }

  guardarTarjeta() {
    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
      id: this.form.get('id')?.value
    }
    console.log(tarjeta);
    if (tarjeta.id == 0) {
      this._tajetaService.saveTarjeta(tarjeta).subscribe(data => {
        console.log(data);
        this.toastr.success('La tarjeta fue registrada con exito!', 'Tarjeta Registrada')
        this.form.reset();
        this.obtenerTarjetas();
      }, error => {
        console.log(error);
      });
    } else {
      this._tajetaService.updateTarjeta(tarjeta.id, tarjeta).subscribe(data => {
        this.form.reset();
        this.accion = 'Agregar',
        this.form.patchValue({ id: 0});
        this.toastr.info('La tarjeta fur editada con exito', 'Tarjeta actualizadoa');
        this.obtenerTarjetas();
        console.log(this.form);
      }, error => {
        console.log(error);
      })
    }
  }

  eliminarTarjeta(id: number) {
    this._tajetaService.deleteTarjeta(id).subscribe(data => {
      this.toastr.error('La tarjeta fue eliminada', 'Tarjeta Eliminada');
      this.obtenerTarjetas();
    }, error => {
      console.log(error);
    })
  }

  editarTarjeta(tarjeta: any) {
    this.accion = 'Editar';
    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv,
      id: tarjeta.id
    })
  }
}
