import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonContent, IonHeader, IonItem, IonLabel, IonList, IonTitle, IonToolbar,
  IonButtons, IonButton, IonFab, IonFabButton, IonIcon, AlertController,
  IonItemSliding, IonItemOptions, IonItemOption
} from '@ionic/angular/standalone';

// Import Icon
import { addIcons } from 'ionicons';
import { add, trash, create } from 'ionicons/icons';

// Import Service Data
import { DataMahasiswaService } from '../services/data-mahasiswa.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,
    IonButtons, IonButton, IonFab, IonFabButton, IonIcon,
    IonItemSliding, IonItemOptions, IonItemOption
  ],
})
export class HomePage {

  // Array awal kosong
  dataMahasiswa: any[] = [];

  constructor(
    private dataService: DataMahasiswaService,
    private cdr: ChangeDetectorRef,
    private alertController: AlertController
  ) {
    addIcons({ add, trash, create });
  }

  // Jalan setiap kali masuk halaman
  async ionViewWillEnter() {
    await this.loadData();
  }

  // Fungsi muat data
  async loadData() {
    this.dataMahasiswa = await this.dataService.getData();
    this.cdr.detectChanges();
  }

  // =============================================
  // FUNGSI HAPUS dengan Konfirmasi Alert (sudah ada)
  // =============================================
  async hapusData(id: number, nama: string) {
    const alert = await this.alertController.create({
      header: 'Konfirmasi Hapus',
      message: `Apakah Anda yakin ingin menghapus data ${nama}?`,
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          role: 'confirm',
          handler: async () => {
            await this.dataService.deleteData(id);
            await this.loadData(); // Refresh tampilan
            console.log('Data berhasil dihapus');
          }
        }
      ]
    });

    await alert.present();
  }

  // =============================================
  // FUNGSI EDIT dengan Alert Input (BARU)
  // =============================================
  async editData(mhs: any) {
    const alert = await this.alertController.create({
      header: 'Edit Data Mahasiswa',
      inputs: [
        {
          name: 'nama',
          type: 'text',
          placeholder: 'Nama Lengkap',
          value: mhs.nama,      // Isi dengan data lama agar bisa diedit
        },
        {
          name: 'jurusan',
          type: 'text',
          placeholder: 'Jurusan',
          value: mhs.jurusan,   // Isi dengan data lama
        }
      ],
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Simpan',
          handler: async (formData) => {
            // Validasi: jangan simpan jika ada field yang kosong
            if (!formData.nama || !formData.jurusan) {
              return false; // Cegah alert tertutup
            }

            // Panggil updateData dari service dengan ID dan field yang diubah
            await this.dataService.updateData(mhs.id, {
              nama: formData.nama,
              jurusan: formData.jurusan
            });

            // Refresh tampilan agar perubahan langsung terlihat
            await this.loadData();
            console.log('Data berhasil diupdate');
            return true;
          }
        }
      ]
    });

    await alert.present();
  }
}