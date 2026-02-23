import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences'; // 1. Import Preferences

@Injectable({
  providedIn: 'root'
})
export class DataMahasiswaService {

  // Kunci penyimpanan (ibarat nama laci)
  private KEY_MAHASISWA = 'data_mahasiswa_app';

  constructor() { }

  // FUNGSI 1: Membaca Data
  async getData() {
    // Ambil data mentah dari penyimpanan
    const { value } = await Preferences.get({ key: this.KEY_MAHASISWA });

    // Jika ada datanya, kembalikan dalam bentuk Objek (JSON Parse)
    // Jika kosong, kembalikan array kosong []
    return value ? JSON.parse(value) : [];
  }

  // FUNGSI 2: Menambah Data Baru
  async tambahData(mahasiswaBaru: any) {
    // 1. Ambil data lama dulu
    const dataLama = await this.getData();

    // 2. Tambahkan data baru ke array data lama
    // (Beri ID otomatis berdasarkan timestamp agar unik)
    mahasiswaBaru.id = Date.now();
    dataLama.push(mahasiswaBaru);

    // 3. Simpan kembali ke Preferences dalam bentuk String (JSON Stringify)
    return await Preferences.set({
      key: this.KEY_MAHASISWA,
      value: JSON.stringify(dataLama)
    });
  }

  // FUNGSI 3: Mengambil Data Berdasarkan ID
  async getDataById(id: number) {
    const data = await this.getData();
    return data.find((mhs: any) => mhs.id === id);
  }

  // FUNGSI 4: Update Data
  async updateData(id: number, dataUpdate: any) {
    // 1. Ambil semua data
    const data = await this.getData();

    // 2. Cari index data yang akan diupdate
    const index = data.findIndex((mhs: any) => mhs.id === id);

    // 3. Jika data ditemukan, update datanya
    if (index !== -1) {
      data[index] = { ...data[index], ...dataUpdate, id }; // Pastikan ID tetap sama

      // 4. Simpan kembali ke Preferences
      return await Preferences.set({
        key: this.KEY_MAHASISWA,
        value: JSON.stringify(data)
      });
    }
    return null;
  }

  // FUNGSI 5: Hapus Data
  async deleteData(id: number) {
    // 1. Ambil semua data
    const data = await this.getData();

    // 2. Filter data, buang yang ID-nya sama dengan parameter
    const dataFiltered = data.filter((mhs: any) => mhs.id !== id);

    // 3. Simpan kembali ke Preferences
    return await Preferences.set({
      key: this.KEY_MAHASISWA,
      value: JSON.stringify(dataFiltered)
    });
  }
}
