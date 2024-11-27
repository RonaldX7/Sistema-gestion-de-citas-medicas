import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { DoctorService } from '../../../../core/services/doctor.service';
import Swal from 'sweetalert2';
import { SpecialtyService } from '../../../../core/services/specialty.service';
import { Doctor } from '../../../../Models/doctor.model';
@Component({
  selector: 'app-add-doc',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-doc.component.html',
})
export class AddDocComponent implements OnInit {
  searchName: string = '';
  specialties: any[] = [];
  selectedSpecialty: string = '';

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
    roleId: 3
  };
  

  fieldErrors: { [key: string]: string } = {};

  constructor(private doctorService:DoctorService, private specialtyService:SpecialtyService, private router: Router){}

  ngOnInit(): void {
    this.loadDoctors();
    this.loadSpecialties();
    this.filteredDoctors = this.doctors;
    
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

  openModal(editMode = false, doctor: any = null) {
    this.isEditing = editMode;
    this.showModal = true;
    if (editMode && doctor) {
      this.newDoctor = { ...doctor };
    } else {
      this.resetDoctorForm();
    }
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
    // if (this.validateFields()) {
    //   const index = this.doctors.findIndex(doctor => doctor.cmp === this.newDoctor.cmp);
    //   if (index > -1) {
    //     this.doctors[index] = { ...this.newDoctor };
    //     this.filterDoctors();
    //     this.closeModal();
    //     this.showSuccessMessage('Doctor actualizado exitosamente.');
    //   }
    // }
  }

  showSuccessMessage(message: string) {
    this.confirmationMessage = message;
    this.showConfirmation = true;
    setTimeout(() => {
      this.showConfirmation = false;
    }, 3000);
  }

  //Mensaje de confirmación
  confirmationMessage: string = '';
  showConfirmation: boolean = false;

  closeConfirmation() {
    this.showConfirmation = false;
  }
}


/*export class AddDocComponent implements OnInit {
  specialties: { id: number; name: string }[] = [];
  selectedSpecialty: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchSpecialties();
  }

  fetchSpecialties() {
    this.http.get<{ id: number; name: string }[]>('URL_DEL_BACKEND/specialties')
      .subscribe(
        (data) => {
          this.specialties = data;
        },
        (error) => {
          console.error('Error fetching specialties:', error);
        }
      );
  }
}*/
