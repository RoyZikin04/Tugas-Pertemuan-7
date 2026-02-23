import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonButton, IonIcon, AlertController } from '@ionic/angular/standalone';
import { DataMahasiswaService } from '../services/data-mahasiswa.service';
import { addIcons } from 'ionicons';
import { create, trash } from 'ionicons/icons';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonButton, IonIcon]
})
export class DetailPage implements OnInit {
  mahasiswa: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataMahasiswaService,
    private alertController: AlertController
  ) {
    addIcons({ create, trash });
  }

  async ngOnInit() {
    // Menangkap parameter 'id' dari URL
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const id = parseInt(idString, 10);
      this.mahasiswa = await this.dataService.getDataById(id);
    }
  }

  // Fungsi untuk edit data (arahkan ke halaman tambah-mhs dengan mode edit)
  editData() {
    this.router.navigate(['/tambah-mhs', this.mahasiswa.id]);
  }

  // Fungsi hapus data dengan konfirmasi
  async hapusData() {
    const alert = await this.alertController.create({
      header: 'Konfirmasi Hapus',
      message: `Apakah Anda yakin ingin menghapus data ${this.mahasiswa.nama}?`,
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          role: 'confirm',
          handler: async () => {
            await this.dataService.deleteData(this.mahasiswa.id);
            console.log('Data berhasil dihapus');
            this.router.navigateByUrl('/home');
          }
        }
      ]
    });

    await alert.present();
  }

}
