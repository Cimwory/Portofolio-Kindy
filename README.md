# Portfolio — Ulinnuha Alkindi (Embedded Systems & IoT Engineer)

Website portofolio interaktif modern dengan tema **Dark Tech / Industrial IoT Dashboard** dan dukungan **Bilingual (EN / ID)**.

---

## 🛠️ Fitur Utama

- **Interactive IoT Telemetry Lab**: Simulasi pembacaan sensor lapangan *real-time* (pH, EC, TDS, Suhu) dengan fluktuasi alami dan kontrol aktuator (katup/pompa dosing).
- **Protocol & Packet Inspector**: Visualisasi transmisi data Modbus RTU/TCP hex frame, MQTT QoS 1 payload, dan log analisis paket Wireshark.
- **Showcase Proyek Industri**:
  - *PT Petrokimia Gresik*: Sistem telemetri monitoring kualitas air limbah industri.
  - *Buncop AgroTech*: Smart indoor farming & otomasi dosing nutrisi closed-loop.
  - *Smart Warehouse*: Jaringan sensor lingkungan & deteksi gas/asap.
  - *Smart House*: Pengendali otomasi lokal ESP32 & monitoring konsumsi daya.
- **Bilingual Support**: Toggle instan Bahasa Inggris (EN) dan Bahasa Indonesia (ID).
- **Direct CV Download**: Akses unduh langsung [Profile.pdf](./public/Profile.pdf).
- **Desain Responsif & Futuristik**: Dibangun menggunakan React 19, Tailwind CSS v4, Lucide Icons, dan Vite.

---

## 🚀 Cara Menjalankan Secara Lokal

1. **Jalankan Server Development**:
   ```bash
   npm run dev
   ```
   Akses di browser pada: `http://localhost:3000`

2. **Build untuk Produksi**:
   ```bash
   npm run build
   ```
   Hasil build siap deploy tersimpan di folder `dist/`.

3. **Preview Hasil Build**:
   ```bash
   npm run preview
   ```

---

## 📂 Struktur Proyek

```
Portofolio-Kindy/
├── public/
│   ├── Profile.pdf           # File CV asli dari LinkedIn
│   └── images/               # Asset gambar & ikon
├── src/
│   ├── components/
│   │   ├── Navbar.tsx        # Navigasi & switch bahasa EN/ID
│   │   ├── Hero.tsx          # Hero section dengan terminal hardware
│   │   ├── About.tsx         # Filosofi & alur Sensor-to-Cloud
│   │   ├── IoTSimulator.tsx  # Telemetri live & Wireshark inspector
│   │   ├── Experience.tsx    # Timeline karir (Petrokimia, HMCE, Samsung)
│   │   ├── Projects.tsx      # Detail spesifikasi proyek & filter kategori
│   │   ├── Skills.tsx        # Matriks keahlian mikrokontroler & protokol
│   │   ├── Education.tsx     # Riwayat pendidikan PENS & SMA
│   │   ├── Contact.tsx       # Kanal komunikasi & form pengiriman pesan
│   │   └── Footer.tsx
│   ├── data/
│   │   └── content.ts        # Data bilingual & konfigurasi node IoT
│   ├── types.ts              # TypeScript definitions
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
└── vite.config.ts
```
