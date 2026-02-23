import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonInput, IonButton, IonText, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { Router, ActivatedRoute } from '@angular/router'; // Import Router dan ActivatedRoute
import { DataMahasiswaService } from '../services/data-mahasiswa.service'; // Import Service

@Component({
  selector: 'app-tambah-mhs',
  templateUrl: './tambah-mhs.page.html',
  styleUrls: ['./tambah-mhs.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonItem, IonInput, IonButton, IonText, IonSelect, IonSelectOption,
    CommonModule, FormsModule, ReactiveFormsModule
  ]
})
export class TambahMhsPage implements OnInit {

  // Variabel untuk menampung form
  formMahasiswa!: FormGroup;
  isEditMode = false; // Flag untuk mode edit
  mahasiswaId: number | null = null; // ID mahasiswa yang sedang diedit

  // PERBAIKAN DI SINI: Inject Service, Router, dan ActivatedRoute ke Constructor
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataMahasiswaService, // <--- Service Data
    private router: Router,                     // <--- Service Router (Pindah Halaman)
    private route: ActivatedRoute              // <--- Service untuk ambil parameter URL
  ) { }

  async ngOnInit() {
    // Inisialisasi Form
    this.formMahasiswa = this.formBuilder.group({
      nama: ['', [Validators.required, Validators.minLength(3)]],
      nim: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // Hanya angka
      jurusan: ['', [Validators.required]]
    });

    // Cek apakah ada parameter ID di URL (mode edit)
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      this.isEditMode = true;
      this.mahasiswaId = parseInt(idString, 10);
      
      // Load data mahasiswa yang akan diedit
      const mahasiswa = await this.dataService.getDataById(this.mahasiswaId);
      if (mahasiswa) {
        this.formMahasiswa.patchValue({
          nama: mahasiswa.nama,
          nim: mahasiswa.nim,
          jurusan: mahasiswa.jurusan
        });
      }
    }
  }

  // Fungsi yang dipanggil saat tombol Simpan diklik
  // PERBAIKAN: Tambahkan 'async' karena penyimpanan butuh waktu
  async simpanData() {
    if (this.formMahasiswa.valid) {

      if (this.isEditMode && this.mahasiswaId) {
        // Mode Edit: Update data yang sudah ada
        await this.dataService.updateData(this.mahasiswaId, this.formMahasiswa.value);
        console.log('Data Diupdate:', this.formMahasiswa.value);
        alert('Data Berhasil Diupdate!');
      } else {
        // Mode Tambah: Tambah data baru
        await this.dataService.tambahData(this.formMahasiswa.value);
        console.log('Data Disimpan:', this.formMahasiswa.value);
        alert('Data Berhasil Disimpan!');
      }

      // Reset Form & Kembali ke Halaman Home
      this.formMahasiswa.reset();
      this.router.navigateByUrl('/home');

    } else {
      console.log('Form tidak valid');
      this.markFormGroupTouched(this.formMahasiswa); // Agar error merah muncul
    }
  }

  // Helper agar error muncul semua jika user memaksa klik submit
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
