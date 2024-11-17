import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-doc',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-doc.component.html',
})
export class AddDocComponent implements OnInit {
  selectedSpecialty: string = '';
  searchName: string = '';
  specialties: string[] = ['Todos', 'Cardiología', 'Pediatría', 'Dermatología', 'Psicología'];

  doctors = [
    { cmp: '45636', name: 'Katherine Noelia', apellido: 'Franco Escamilla' , phone: '987654321', email: 'kayh32@example.com', specialty: 'Psicología' },
    { cmp: '53287', name: 'Juliana Carbajal' , apellido: 'Meza Cruz', phone: '986321457', email: 'julicvasquez@example.com', specialty: 'Cardiología' },
    { cmp: '46322', name: 'Fredy Arostegui' , apellido: 'Soloorzano Baarazorda', phone: '963287451', email: 'fredyaa98@example.com', specialty: 'Oftalmología' },
    { cmp: '53688', name: 'Lourdes Medina' , apellido: 'Flores Nuñez', phone: '902146325', email: 'lourdesalas75@example.com', specialty: 'Pediatría' },
  ];

  filteredDoctors = [...this.doctors];
  showModal = false;
  isEditing = false;
  newDoctor = {
    cmp: '',
    name: '',
    apellido: '',
    phone: '',
    email: '',
    specialty: '',
  };

  fieldErrors = {
    cmp: '',
    nombre: '',
    apellido: '',
    phone: '',
    email: '',
    specialty: '',
  };

  ngOnInit(): void {
    this.filteredDoctors = this.doctors;
  }

  filterDoctors() {
    const specialtyFilter = this.selectedSpecialty === 'Todos' ? this.doctors : this.doctors.filter((doctor) =>
      doctor.specialty === this.selectedSpecialty
    );
    const nameFilter = specialtyFilter.filter((doctor) =>
      doctor.name.toLowerCase().includes(this.searchName.toLowerCase())
    );
    this.filteredDoctors = nameFilter;
  }

  validateFields(): boolean {
    let valid = true;
    this.fieldErrors = { cmp: '',nombre: '', apellido: '' ,phone: '', email: '', specialty: '' };

    if (!/^\d{1,5}$/.test(this.newDoctor.cmp)) {
      this.fieldErrors.cmp = 'El CMP debe ser numérico y no puede exceder 5 dígitos.';
      valid = false;
    }

    if (!/^9\d{8}$/.test(this.newDoctor.phone)) {
      this.fieldErrors.phone = 'El teléfono debe tener 9 dígitos y empezar con 9.';
      valid = false;
    }

    if (!/.+@.+\..+/.test(this.newDoctor.email)) {
      this.fieldErrors.email = 'El email debe contener @.';
      valid = false;
    }

    if (!this.newDoctor.specialty) {
      this.fieldErrors.specialty = 'La especialidad es obligatoria.';
      valid = false;
    }

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
      cmp: '',
      name: '',
      apellido: '',
      phone: '',
      email: '',
      specialty: '',
    };
    this.fieldErrors = { cmp: '', nombre:'', apellido:'' ,phone: '', email: '', specialty: '' };
  }

  addDoctor() {
    if (this.validateFields()) {
      this.doctors.push({ ...this.newDoctor });
      this.filterDoctors();
      this.closeModal();
      this.showSuccessMessage('Doctor agregado exitosamente.');
    }
  }

  updateDoctor() {
    if (this.validateFields()) {
      const index = this.doctors.findIndex(doctor => doctor.cmp === this.newDoctor.cmp);
      if (index > -1) {
        this.doctors[index] = { ...this.newDoctor };
        this.filterDoctors();
        this.closeModal();
        this.showSuccessMessage('Doctor actualizado exitosamente.');
      }
    }
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
