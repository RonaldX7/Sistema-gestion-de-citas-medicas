import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DoctorService } from '../../../../core/services/doctor.service';
import { ScheduleService } from '../../../../core/services/schedule.service';
import { SpecialtyService } from '../../../../core/services/specialty.service';
import { Doctor } from '../../../../Models/doctor.model';
import Swal from 'sweetalert2';

interface UDoctor {
  id: string;
  cmp: string;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-add-doc',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-doc.component.html',
})

export class AddDocComponent implements OnInit {
  searchName: string = '';
  schedules: any[] = [];
  specialties: any[] = [];
  selectedSpecialty: string = '';
  doctorId: string | null = null;
  doctorUpdateData: any; 

  doctors: Doctor[]=[];
  
  filteredDoctors = [...this.doctors];
  showModal = false;
  isEditing = false;
  newDoctor = {
    name:'',
    lastName:'',
    phone: '',
    email: '',
    username:'',
    password:'',
    cmp:'',
    specialty: '',
    schedulesIds: [] as number[],
    roleId: 3
  };

  doctorUpdate: UDoctor = {
    id: '',
    cmp:'',
    name:'',
    lastName:'',
    phone: '',
    email: '',
    newPassword:'',
    confirmPassword:''
  };
  

  fieldErrors: { [key: string]: string } = {};

  constructor(
    private doctorService:DoctorService, 
    private specialtyService:SpecialtyService, 
    private scheduleService:ScheduleService,
    private router: Router){}

  ngOnInit(): void {
    this.loadSchedules();
    this.loadDoctors();
    this.loadSpecialties();
    this.filteredDoctors = this.doctors;
    
  }

  loadSchedules(): void {
    this.scheduleService.getSchedules().subscribe(
      (data) => {
        console.log('Horarios cargados:', data);
        this.schedules = data;
      },
      (error) => {
        console.error('Error al cargar horarios', error);
      }
    );
  }

  toggleScheduleSelection(scheduleId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const index = this.newDoctor.schedulesIds.indexOf(scheduleId);
    if (isChecked && index === -1) {
      // Agregar el ID si no está presente y el checkbox está marcado
      this.newDoctor.schedulesIds.push(scheduleId);
    } else if (!isChecked && index > -1) {
      // Eliminar el ID si ya está presente y el checkbox está desmarcado
      this.newDoctor.schedulesIds.splice(index, 1);
    }
  }

  loadSpecialties(): void {
    this.specialtyService.getSpecialties().subscribe(
      (data) => {
        console.log('Especialidades cargadas:', data);
        this.specialties = data;
        this.loadDoctors(); // Llama a los doctores después de cargar las especialidades
      },
      (error) => {
        console.error('Error al cargar especialidades', error);
      }
    );
  }

  loadDoctors(): void {
    this.doctorService.getDoctors().subscribe(
      (data: Doctor[]) => {
        this.doctors = data.map((doctor:Doctor) => ({
          ...doctor
        }));
        this.filteredDoctors = this.doctors;
        console.log(this.filteredDoctors);
      },
      (error) => {
        console.error('Error al cargar doctores', error);
      }
    );
  }
  

  filterDoctors() {
    // const specialtyFilter = this.selectedSpecialty === 'Todos' ? this.doctors : this.doctors.filter((doctor) =>
    //   doctor.specialty === this.selectedSpecialty
    // );
    // const nameFilter = specialtyFilter.filter((doctor) =>
    //   doctor.name.toLowerCase().includes(this.searchName.toLowerCase())
    // );
    // this.filteredDoctors = nameFilter;
  }

  validateFields(): boolean {
    const { cmp, name, lastName, phone, email, username, password, specialty } = this.newDoctor;
    this.fieldErrors = { cmp: '',name: '', lastName: '' ,phone: '', email: '', username: '', password:' ',specialty: ''};
    const validations = [
      { field: 'cmp', condition: /^\d{1,5}$/.test(cmp) && cmp!=='0000', error: 'El CMP debe ser numérico y no puede exceder 5 dígitos.' },
      { field: 'name', condition: !!name.trim(), error: 'El nombre es obligatorio.' },
      { field: 'lastName', condition: !!lastName.trim(), error: 'El apellido es obligatorio.' },
      { field: 'phone', condition: /^9\d{8}$/.test(phone), error: 'El teléfono debe tener 9 dígitos y empezar con 9.' },
      { field: 'email', condition: /.+@.+\..+/.test(email), error: 'El email debe contener @.' },
      { field: 'username', condition: !!username.trim(), error: 'El nombre de usuario es obligatorio.' },
      { field: 'password', condition: !!password.trim(), error: 'La contraseña es obligatoria.' },
      { field: 'specialty', condition: specialty.length > 0, error: 'La especialidad es obligatoria.' },
      { field: 'username', condition: !!username.trim(), error: 'El username es obligatorio.'},
    ];

 // Aplica las validaciones y almacena los errores
    let valid = true;
    validations.forEach(({ field, condition, error }) => {
      if (!condition) {
        this.fieldErrors[field] = error;
        valid = false;
      }
    });

    return valid;
  }

  openModal(editMode: boolean, doctor: any): void{
    this.isEditing = editMode;
    this.showModal = true;
    if (editMode && doctor) {
      this.doctorId = doctor.id;
      this.doctorUpdate = { ...doctor};
    } else {
      this.doctorId = null;
      this.doctorUpdate = {
        id: '',
        cmp: '',
        name: '',
        lastName: '',
        phone: '',
        email: '',
        newPassword: '',
        confirmPassword: ''
      };
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.resetDoctorForm();
  }

  resetDoctorForm() {
    this.newDoctor = {
      name:'',
      lastName:'',
      phone: '',
      email: '',
      username:'',
      password:'',
      cmp:'',
      specialty: '',
      schedulesIds: [],
      roleId: 3
    };
    //this.fieldErrors = { cmp: '', nombre:'', apellido:'' ,phone: '', email: '', specialty: '' };
  }

  addDoctor() {
    if (!this.validateFields()) {
      return; // Detener si las validaciones fallan
    }
    this.doctorService.registerDoctor(this.newDoctor).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Doctor registrado correctamente.',
          showConfirmButton: true,
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#3085d6'
        }).then(() => {
          this.router.navigate(['/admin-home/add-doc']);
          this.loadDoctors();
          this.closeModal();
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: err.error?.message || 'Hubo un problema al registrar al Doctor.',
          confirmButtonText: 'Cerrar'
        });
      }
    });
  }

  updateDoctor() {

    if (this.doctorUpdate.newPassword !== this.doctorUpdate.confirmPassword) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }

     this.doctorUpdateData = {
      id: this.doctorUpdate.id,
      cmp: this.doctorUpdate.cmp,
      name: this.doctorUpdate.name,
      lastName: this.doctorUpdate.lastName,
      phone: this.doctorUpdate.phone,
      email: this.doctorUpdate.email,
      password: this.doctorUpdate.newPassword // Assuming you want to update the password
    };

      this.doctorService.updateDoctor(this.doctorUpdate.id, this.doctorUpdateData).subscribe(
        response => {
          Swal.fire('Éxito', 'Doctor actualizado correctamente', 'success');
          this.closeModal();
          this.loadDoctors(); // Recargar la lista de doctores
        },
        error => {
          // Manejar errores y mostrar mensajes claros al usuario
          if (error.status === 400) {
            Swal.fire('Error', 'Verifica los datos ingresados', 'error');
          } else if (error.status === 409) {
            Swal.fire('Error', 'El correo electrónico ya está en uso', 'error');
          } else {
            Swal.fire('Error', 'Hubo un problema al actualizar los datos', 'error');
          }
          console.error('Error al actualizar los datos del médico:', error);
        }
      );
  }

  //Mensaje de confirmación
  confirmationMessage: string = '';
  showConfirmation: boolean = false;

  closeConfirmation() {
    this.showConfirmation = false;
  }

  deleteDoctor(doctor: Doctor) {
  }

}

