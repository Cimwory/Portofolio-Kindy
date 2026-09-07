import { ProjectItem, ExperienceItem, SkillCategory, TelemetryNode } from '../types';

export const PERSONAL_INFO = {
  name: 'Ulinnuha Alkindi',
  nickname: 'Kindy',
  title: {
    en: 'Embedded Systems & IoT Engineer',
    id: 'Insinyur Sistem Tertanam & IoT',
  },
  headline: {
    en: 'Undergraduate Computer Engineering at EEPIS (PENS) | Specialized in Industrial IoT & Embedded Development',
    id: 'Mahasiswa Teknik Komputer PENS | Spesialisasi Industrial IoT & Embedded Development',
  },
  location: 'Surabaya, Jawa Timur, Indonesia',
  email: 'alkindirosyadi@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ulinnuha-alkindi-67ba11299/',
  github: 'https://github.com/ulinnuha-alkindi',
  status: {
    en: 'Available for Industrial IoT & Embedded Engineering Roles',
    id: 'Terbuka untuk Kolaborasi & Proyek IoT Industri',
  },
  about: {
    en: `I am a Computer Engineering student at Politeknik Elektronika Negeri Surabaya (EEPIS/PENS) specializing in IoT systems and embedded engineering. I have hands-on production experience developing end-to-end telemetry solutions — from field sensor conditioning (pH, EC, TDS) and bare-metal/RTOS microcontroller firmware on ESP32 & STM32 to robust industrial communication protocols like Modbus RTU/TCP and MQTT. With packet inspection skills using Wireshark and backend/data validation in Python, I bridge physical hardware with mission-critical monitoring platforms.`,
    id: `Saya adalah mahasiswa Teknik Komputer di Politeknik Elektronika Negeri Surabaya (PENS) yang berspesialisasi dalam sistem IoT dan embedded development. Berpengalaman langsung dalam implementasi sistem telemetri industri — mulai dari kalibrasi & integrasi sensor lapangan (pH, EC, TDS), pemrograman mikrokontroler (ESP32, STM32, Arduino) dengan C/C++, hingga protokol komunikasi industri yang andal seperti Modbus RTU/TCP dan MQTT. Dilengkapi analisis paket jaringan menggunakan Wireshark serta validasi data Python, saya menghubungkan perangkat keras fisik dengan dashboard pemantauan real-time yang stabil dan efisien.`,
  },
  stats: [
    { value: '9+ Mos', label: { en: 'Industrial Field Exp', id: 'Pengalaman Industri' } },
    { value: '4+', label: { en: 'Hardware Architectures', id: 'Arsitektur Hardware' } },
    { value: '100%', label: { en: 'Real-Time Telemetry', id: 'Telemetri Real-Time' } },
    { value: '3+', label: { en: 'Enterprise Systems', id: 'Sistem Skala Industri' } },
  ],
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'petrokimia-wastewater-iot',
    title: {
      en: 'Industrial Wastewater Quality Telemetry System',
      id: 'Sistem Telemetri Kualitas Air Limbah Industri',
    },
    subtitle: {
      en: 'PT Petrokimia Gresik — Industrial IoT Implementation',
      id: 'PT Petrokimia Gresik — Implementasi IoT Skala Pabrik',
    },
    period: 'Jan 2026 — Present',
    category: 'industrial',
    description: {
      en: 'Engineered an automated industrial wastewater monitoring node for PT Petrokimia Gresik. Gathers continuous real-time parameters (pH, Electrical Conductivity, Total Dissolved Solids, Temperature) to comply with environmental wastewater regulations, streaming over Modbus & MQTT to centralized monitoring dashboards.',
      id: 'Merancang dan mengimplementasikan sistem monitoring kualitas air limbah industri di PT Petrokimia Gresik. Mengakuisisi parameter pH, EC, TDS, dan suhu secara kontinyu untuk kepatuhan baku mutu lingkungan industri, ditransmisikan melalui Modbus & MQTT ke dashboard pemantauan terpusat.',
    },
    keyFeatures: {
      en: [
        'Multi-sensor signal conditioning & calibration algorithms for harsh chemical environments',
        'Hybrid Modbus RTU (RS485) and MQTT over Wi-Fi/Ethernet data pipeline',
        'Deep network packet debugging with Wireshark to guarantee zero transmission loss',
        'Edge fail-safe logging & automatic sensor drift compensation',
      ],
      id: [
        'Pengkondisian sinyal & algoritma kalibrasi multi-sensor di lingkungan kimia industri',
        'Arsitektur hibrida Modbus RTU (RS485) dan MQTT via koneksi jaringan industri',
        'Analisis paket jaringan tingkat lanjut via Wireshark guna menjamin transmisi minim latensi',
        'Pencatatan data cadangan lokal saat offline dan kompensasi deviasi pembacaan sensor',
      ],
    },
    hardware: ['ESP32 Dual-Core', 'Industrial pH Probe', 'Industrial EC Probe', 'TDS Transmitter', 'RS-485 Modbus Module'],
    protocols: ['Modbus RTU / TCP', 'MQTT', 'JSON / Hex Payload', 'TCP/IP'],
    techStack: ['C/C++ (FreeRTOS)', 'Wireshark', 'Python (Data Validation)', 'Grafana / Web Dashboard'],
    metrics: [
      { label: { en: 'Sampling Interval', id: 'Interval Sampling' }, value: '500ms' },
      { label: { en: 'Packet Loss', id: 'Tingkat Packet Loss' }, value: '< 0.05%' },
      { label: { en: 'Sensor Uptime', id: 'Keandalan Sensor' }, value: '99.8%' },
    ],
  },
  {
    id: 'buncop-indoor-farming',
    title: {
      en: 'IoT Indoor Strawberry Farming & Nutrient Automation',
      id: 'Sistem IoT Pabrik Tanaman Stroberi & Otomasi Nutrisi',
    },
    subtitle: {
      en: 'Data-Driven Precision Plant Factory with EMQX, InfluxDB & Flutter',
      id: 'Pabrik Tanaman Presisi Berbasis Data dengan EMQX, InfluxDB & Flutter',
    },
    period: '2025 — 2026',
    category: 'agriculture',
    description: {
      en: 'Engineered a closed-loop strawberry plant factory IoT architecture based on academic thesis research. Features real-time multi-sensor telemetry (pH, EC, DO, canopy temperature, humidity), closed-loop peristaltic nutrient dosing algorithms (pH buffer & AB Mix), EMQX MQTT Rule Engine pipeline, InfluxDB time-series storage, and a cross-platform Flutter companion app.',
      id: 'Merancang arsitektur IoT pabrik tanaman stroberi indoor closed-loop berbasis riset skripsi. Dilengkapi telemetri multi-sensor real-time (pH, EC, DO, suhu kanopi, kelembaban), algoritma dosing nutrisi otomatis pompa peristaltik (buffer pH & AB Mix), pipeline EMQX MQTT Rule Engine, basis data deret waktu InfluxDB, dan aplikasi mobile Flutter cross-platform.',
    },
    keyFeatures: {
      en: [
        'PID-driven closed-loop peristaltic nutrient dosing (pH Up/Down & EC Nutrition AB Mix)',
        'Enterprise telemetry pipeline: ESP32 to EMQX MQTT Broker Rule Engine & InfluxDB Time-Series',
        'Microclimate monitoring: photoperiod DLI light sequencing, SHT30 canopy temperature & humidity',
        'Production Flutter cross-platform mobile application for telemetry analytics and manual overrides',
      ],
      id: [
        'Dosing nutrisi presisi closed-loop berbasis PID untuk pengaturan pH dan nutrisi AB Mix',
        'Pipeline data enterprise: mikrokontroler ESP32 ke EMQX Broker Rule Engine & InfluxDB Time-Series',
        'Pemantauan iklim mikro: pengaturan jadwal fotoperiode LED grow light, suhu dan kelembaban kanopi SHT30',
        'Aplikasi mobile Flutter multiplatform untuk visualisasi analitik sensor dan kontrol aktuator manual',
      ],
    },
    hardware: ['ESP32 Dual-Core', 'Peristaltic Dosing Pumps', 'Industrial pH Probe', 'EC Conductivity Sensor', 'SHT30 / DS18B20'],
    protocols: ['MQTT (EMQX Broker)', 'I2C', 'UART', 'SPI', 'HTTP REST'],
    techStack: ['C/C++ (FreeRTOS)', 'Flutter (Dart)', 'EMQX Rule Engine', 'InfluxDB', 'Laravel API'],
    metrics: [
      { label: { en: 'Nutrient Precision', id: 'Akurasi Nutrisi' }, value: '±0.05 pH' },
      { label: { en: 'Telemetry Interval', id: 'Interval Telemetri' }, value: '1.0s' },
      { label: { en: 'Water Efficiency', id: 'Efisiensi Air' }, value: '38%' },
    ],
  },
  {
    id: 'smart-attendance-biometric',
    title: {
      en: 'Dual-Biometric & RFID Cloud Attendance Terminal',
      id: 'Terminal Presensi Cloud Dual-Biometrik & RFID',
    },
    subtitle: {
      en: 'ESP32 Biometric Edge Terminal with Google Sheets Cloud Integration',
      id: 'Terminal Biometrik Mandiri ESP32 Terintegrasi Cloud Google Sheets',
    },
    period: '2024 — 2025',
    category: 'automation',
    description: {
      en: 'Engineered a standalone biometric attendance terminal with edge verification and zero-latency cloud synchronization. Integrates an optical fingerprint sensor (R307/FPM10A) and MFRC522 RFID reader with an ESP32. Features a dynamic captive portal for Wi-Fi provisioning via NVS Preferences, dual-mode state machines (Registration vs. Attendance), and direct HTTPS webhook push to Google Apps Script generating automated daily roster sheets.',
      id: 'Merancang terminal presensi biometrik mandiri dengan verifikasi edge dan sinkronisasi cloud real-time. Mengintegrasikan sensor sidik jari optik (R307/FPM10A) dan pembaca RFID MFRC522 berbasis ESP32. Dilengkapi captive portal untuk konfigurasi Wi-Fi via NVS Preferences, mode state machine (Pendaftaran vs Presensi), serta transmisi webhook HTTPS langsung ke Google Apps Script yang mengotomatisasi log harian Google Sheets.',
    },
    keyFeatures: {
      en: [
        'Dual authentication modes: 1:N optical fingerprint matching (UART) and 13.56 MHz RFID UID scanning (SPI)',
        'Zero-code user provisioning via ESP32 captive web portal storing network credentials in Non-Volatile Storage (Preferences.h)',
        'Serverless cloud backend using Google Apps Script REST endpoints with automated daily sheet partitioning (Log_dd-MM-yyyy)',
        'Interactive audiovisual feedback via LiquidCrystal I2C, piezo buzzer alert cues, and LED state indicators',
      ],
      id: [
        'Autentikasi ganda: pencocokan sidik jari optik 1:N (UART) dan pemindaian UID kartu RFID 13.56 MHz (SPI)',
        'Konfigurasi jaringan instan via captive web portal ESP32 yang tersimpan di memori Non-Volatile (Preferences.h)',
        'Backend serverless menggunakan Google Apps Script REST webhook dengan partisi sheet harian otomatis (Log_dd-MM-yyyy)',
        'Umpan balik audio-visual interaktif melalui LCD I2C, alert piezo buzzer, dan indikator status LED',
      ],
    },
    hardware: ['ESP32 NodeMCU', 'R307/FPM10A Fingerprint', 'MFRC522 RFID (SPI)', 'LCD I2C 16x2/20x4', 'Piezo Buzzer'],
    protocols: ['HTTPS REST Webhook', 'UART (Serial2)', 'SPI', 'I2C', '802.11 b/g/n Wi-Fi'],
    techStack: ['C/C++ (Arduino/PlatformIO)', 'Google Apps Script (JS)', 'Google Sheets API', 'Preferences.h (NVS)', 'ESP32 WebServer'],
    metrics: [
      { label: { en: 'Match Latency', id: 'Latensi Verifikasi' }, value: '< 450ms' },
      { label: { en: 'Cloud Sync', id: 'Sinkronisasi Cloud' }, value: '99.9%' },
      { label: { en: 'Fingerprint DB', id: 'Kapasitas Sidik Jari' }, value: '1,000 ID' },
    ],
  },
  {
    id: 'smart-warehouse-monitoring',
    title: {
      en: 'Smart Warehouse Environmental Safety System',
      id: 'Sistem Keamanan & Lingkungan Gudang Cerdas',
    },
    subtitle: {
      en: 'Industrial Storage Safety & Asset Protection',
      id: 'Pemantauan Penyimpanan Industri & Perlindungan Aset',
    },
    period: '2025',
    category: 'automation',
    description: {
      en: 'Multi-point telemetry sensor network designed for warehouse facility safety. Continuously measures ambient humidity, volatile gas buildup, temperature differentials, and triggers early-warning alerts before threshold breaches damage stored goods.',
      id: 'Jaringan sensor telemetri multi-titik untuk proteksi fasilitas pergudangan. Memantau kelembaban udara, akumulasi gas, perbedaan suhu ekstrem, dan memicu peringatan dini sebelum batas toleransi merusak barang logistik.',
    },
    keyFeatures: {
      en: [
        'Distributed wireless sensor nodes broadcasting to local edge gateway',
        'Automatic exhaust ventilation actuator activation upon gas/smoke detection',
        'Real-time alert dispatching via Webhooks & MQTT push notifications',
      ],
      id: [
        'Node sensor nirkabel terdistribusi yang terhubung ke edge gateway lokal',
        'Aktivasi otomatis exhaust fan saat terdeteksi ambang batas gas atau asap',
        'Pengiriman notifikasi darurat cepat via Webhooks & integrasi pesan instan',
      ],
    },
    hardware: ['STM32 / ESP32', 'MQ Gas Sensors', 'Industrial Relays', 'LoRa / Wi-Fi Modems'],
    protocols: ['MQTT', 'Modbus TCP', 'HTTP REST'],
    techStack: ['C/C++', 'Node-RED', 'Python Dashboard'],
    metrics: [
      { label: { en: 'Alert Latency', id: 'Latensi Alarm' }, value: '< 200ms' },
      { label: { en: 'Battery Life', id: 'Daya Tahan Node' }, value: '6+ Months' },
      { label: { en: 'Coverage Area', id: 'Cakupan Area' }, value: '5,000 m²' },
    ],
  },
  {
    id: 'smart-house-fixed',
    title: {
      en: 'Embedded Home Automation & Power Controller',
      id: 'Sistem Otomasi Rumah & Manajemen Daya',
    },
    subtitle: {
      en: 'Secure Local-First IoT Automation Controller',
      id: 'Pengendali Otomasi Rumah Aman & Berbasis Jaringan Lokal',
    },
    period: '2024 — 2025',
    category: 'embedded',
    description: {
      en: 'Designed and deployed an integrated smart home controller with isolated local network communication for privacy and zero cloud dependence, including current sensing for appliance energy profiling.',
      id: 'Merancang dan memasang sistem pengendali pintar rumah dengan arsitektur jaringan lokal independen tanpa ketergantungan cloud, dilengkapi sensor arus untuk pemetaan konsumsi listrik.',
    },
    keyFeatures: {
      en: [
        'Multi-channel solid-state relay switching with zero-cross detection',
        'Current sensing (ACS712) for real-time power draw calculation',
        'Local Web UI hosted directly from ESP32 with WebSocket updates',
      ],
      id: [
        'Pengendalian relay multi-kanal dengan proteksi beban lebih',
        'Pengukuran konsumsi daya listrik real-time menggunakan sensor arus ACS712',
        'Web UI lokal langsung dari memori flash ESP32 dengan sinkronisasi WebSocket',
      ],
    },
    hardware: ['ESP32', 'ACS712 Current Sensor', 'Relay Modules', 'OLED Display'],
    protocols: ['WebSocket', 'MQTT', 'HTTP'],
    techStack: ['C/C++', 'HTML/CSS/JS', 'PlatformIO'],
    metrics: [
      { label: { en: 'Local Latency', id: 'Latensi Lokal' }, value: '< 15ms' },
      { label: { en: 'Power Efficiency', id: 'Efisiensi Daya' }, value: '98%' },
      { label: { en: 'Uptime', id: 'Waktu Aktif' }, value: '99.9%' },
    ],
  },
  {
    id: 'computer-vision-gesture',
    title: {
      en: 'Real-Time 3D Landmark & Gesture Vision Pipeline',
      id: 'Pipeline Visi Komputer 3D Landmark & Deteksi Gestur',
    },
    subtitle: {
      en: 'Edge AI & Interactive Human-Machine Interface (HMI) with OpenCV & MediaPipe',
      id: 'Edge AI & Antarmuka Manusia-Mesin Interaktif dengan OpenCV & MediaPipe',
    },
    period: '2025',
    category: 'automation',
    description: {
      en: 'Built a high-performance computer vision pipeline for real-time 21-point 3D hand landmark estimation and 6-point facial bounding box localization. Designed as an intelligent contactless Human-Machine Interface (HMI) for embedded devices, converting spatial finger trajectories, pinch gestures, and directional tracking into discrete control commands with sub-30ms inference latency.',
      id: 'Membangun pipeline computer vision performa tinggi untuk estimasi 21-titik landmark tangan 3D dan lokalisasi wajah real-time. Dirancang sebagai Antarmuka Manusia-Mesin (HMI) nirkontak cerdas untuk perangkat embedded, menerjemahkan trajektori spasial jari, gestur cubitan (pinch), dan pelacakan arah menjadi perintah kontrol dengan latensi inferensi di bawah 30ms.',
    },
    keyFeatures: {
      en: [
        'Real-time 21-point 3D hand coordinate mapping (x, y, z) with sub-pixel landmark smoothing',
        'Low-latency gesture classification: pinch recognition, finger counting, and directional vector calculation',
        'Multi-face tracking and facial confidence localization using Google MediaPipe Solutions',
        'High-throughput video stream ingestion with OpenCV running at 30-60 FPS on edge host architectures',
      ],
      id: [
        'Pemetaan koordinat 3D tangan 21 titik (x, y, z) secara real-time dengan smoothing landmark sub-piksel',
        'Klasifikasi gestur latensi rendah: deteksi pinch, penghitungan jari, dan kalkulasi vektor arah',
        'Pelacakan multi-wajah dan lokalisasi keypoints berbasis Google MediaPipe Solutions',
        'Pemrosesan video pipeline cepat dengan OpenCV berjalan stabil pada 30-60 FPS di sistem edge',
      ],
    },
    hardware: ['Edge Computer / Single Board PC', 'HD USB Video Camera', 'ESP32 / MCU (Serial Bridge)'],
    protocols: ['USB Video Class (UVC)', 'UART / Serial JSON', 'WebSocket', 'TCP/IP'],
    techStack: ['Python 3', 'OpenCV (cv2)', 'Google MediaPipe', 'NumPy', 'Math / Vector Geometry'],
    metrics: [
      { label: { en: 'Inference Speed', id: 'Kecepatan Inferensi' }, value: '30-60 FPS' },
      { label: { en: '3D Landmarks', id: 'Landmark 3D' }, value: '21 Points' },
      { label: { en: 'Gesture Latency', id: 'Latensi Respon' }, value: '< 25ms' },
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'petrokimia-gresik',
    company: 'PT Petrokimia Gresik (Official)',
    role: {
      en: 'IoT Engineer Intern',
      id: 'IoT Engineer Intern',
    },
    period: {
      en: 'Jan 2026 — Present (9 months)',
      id: 'Jan 2026 — Sekarang (9 bulan)',
    },
    location: 'Jl. Jenderal Ahmad Yani, Gresik 61119, Indonesia',
    type: 'internship',
    categoryLabel: {
      en: 'Industrial Internship',
      id: 'Magang Industri',
    },
    description: {
      en: 'Actively involved in architecting and deploying industrial Internet of Things (IoT) solutions for plant process optimization and environmental compliance, especially wastewater treatment parameter telemetry.',
      id: 'Terlibat aktif dalam merancang dan mengimplementasikan solusi IoT industri untuk optimasi proses pabrik serta kepatuhan baku mutu lingkungan, khususnya telemetri parameter pengolahan air limbah industri.',
    },
    achievements: {
      en: [
        'Developed end-to-end telemetry nodes leveraging ESP32 microcontrollers and industrial-grade sensor probes (pH, EC, TDS)',
        'Engineered field communication networks utilizing Modbus (RTU/TCP) over RS485 and MQTT over industrial Wi-Fi/Ethernet',
        'Performed in-depth network packet inspection using Wireshark to isolate protocol bottlenecks and guarantee telemetry reliability',
        'Created interactive real-time data visualization dashboards for operations and compliance engineers',
      ],
      id: [
        'Mengembangkan node telemetri komprehensif menggunakan mikrokontroler ESP32 dan probe sensor standar industri (pH, EC, TDS)',
        'Menerapkan protokol komunikasi lapangan Modbus (RTU/TCP) via RS485 dan broker MQTT pada infrastruktur pabrik',
        'Melakukan analisis paket jaringan mendalam dengan Wireshark untuk meniadakan bottleneck dan menjamin integritas data',
        'Membangun dashboard visualisasi data real-time untuk pemantauan operasional teknisi lingkungan',
      ],
    },
    skills: ['ESP32', 'Modbus RTU/TCP', 'MQTT', 'Industrial Sensors', 'Wireshark', 'Python', 'C/C++'],
  },
  {
    id: 'hmce-eepis',
    company: 'Himpunan Mahasiswa Teknik Komputer (HMCE) EEPIS / PENS',
    role: {
      en: 'Staff Muda Departemen Media dan Informasi',
      id: 'Staff Muda Departemen Media dan Informasi',
    },
    period: {
      en: 'Mar 2025 — Present (1 yr 7 mos)',
      id: 'Mar 2025 — Sekarang (1 thn 7 bln)',
    },
    location: 'Surabaya, Jawa Timur, Indonesia',
    type: 'organization',
    categoryLabel: {
      en: 'Student Organization & Leadership',
      id: 'Pengalaman Organisasi & Kepemimpinan',
    },
    description: {
      en: 'Managing digital information dissemination, tech publication branding, and public communication for the Computer Engineering Student Association at PENS.',
      id: 'Mengelola publikasi informasi digital, publikasi teknologi, serta komunikasi publik untuk Himpunan Mahasiswa Teknik Komputer PENS.',
    },
    achievements: {
      en: [
        'Coordinated digital media campaigns for technical workshops, tech talks, and departmental competitions',
        'Produced technical and visual content highlighting student hardware and software engineering innovations',
      ],
      id: [
        'Mengkoordinasikan publikasi media digital untuk pelatihan teknologi, seminar teknis, dan kompetisi mahasiswa',
        'Memproduksi konten teknis dan visual yang mengedukasi seputar perkembangan teknologi komputer dan sistem tertanam',
      ],
    },
    skills: ['Visual Design', 'Public Relations', 'Team Collaboration', 'Event Management'],
  },
  {
    id: 'samsung-innovation-campus',
    company: 'Samsung Innovation Campus',
    role: {
      en: 'Participant & Trainee',
      id: 'Peserta Pelatihan',
    },
    period: {
      en: 'Aug 2025 — Sep 2025 (2 months)',
      id: 'Agu 2025 — Sep 2025 (2 bulan)',
    },
    location: 'Indonesia',
    type: 'training',
    categoryLabel: {
      en: 'Tech Bootcamp & Industry Training',
      id: 'Bootcamp & Pelatihan Teknologi Industri',
    },
    description: {
      en: 'Intensive technology enrichment training focusing on programming fundamentals, algorithmic problem solving, and modern smart technology paradigms.',
      id: 'Pelatihan intensif teknologi berstandar industri dengan pendalaman algoritma, pemrograman terstruktur, dan teknologi masa depan.',
    },
    achievements: {
      en: [
        'Completed rigorous software & algorithm engineering curriculum',
        'Collaborated on project prototyping applying core computational thinking principles',
      ],
      id: [
        'Menyelesaikan kurikulum rekayasa perangkat lunak dan pemrograman berbasis industri',
        'Berkolaborasi dalam perancangan purwarupa berbasis pemecahan masalah komputasi terapan',
      ],
    },
    skills: ['Algorithms', 'Python', 'Problem Solving', 'IoT Foundations'],
  },
];

export const EDUCATION = [
  {
    institution: 'Politeknik Elektronika Negeri Surabaya (EEPIS / PENS)',
    degree: {
      en: 'Applied Bachelor in Computer Engineering (D4 Teknik Komputer)',
      id: 'Sarjana Terapan Teknik Komputer (D4 Teknik Komputer)',
    },
    period: 'Aug 2023 — Jul 2027 (Expected)',
    location: 'Surabaya, Jawa Timur, Indonesia',
    description: {
      en: 'Focusing on Embedded Systems Architecture, Real-Time Operating Systems (RTOS), Industrial Automation & Networks, Sensor Interfacing, and Distributed IoT Infrastructure.',
      id: 'Fokus pada Arsitektur Sistem Tertanam, Sistem Operasi Real-Time (RTOS), Otomasi & Jaringan Industri, Antarmuka Sensor, serta Infrastruktur IoT Terdistribusi.',
    },
    badge: 'Premier Engineering Institute',
  },
  {
    institution: 'SMA Progresif Bumi Shalawat',
    degree: {
      en: 'Senior High School — Science Track',
      id: 'Sekolah Menengah Atas — Jurusan MIPA',
    },
    period: 'Aug 2020 — Jun 2023',
    location: 'Sidoarjo, Jawa Timur, Indonesia',
    description: {
      en: 'Built strong foundational mathematics, physics, scientific inquiry, and introductory programming logic.',
      id: 'Fondasi kuat dalam matematika, sains fisika terapan, riset ilmiah, serta pengenalan logika pemrograman.',
    },
    badge: 'Alumni',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: {
      en: 'Embedded & Microcontrollers',
      id: 'Sistem Tertanam & Mikrokontroler',
    },
    iconName: 'Cpu',
    skills: [
      { name: 'ESP32 (Dual-Core / FreeRTOS)', level: 'Advanced', tags: ['C/C++', 'WiFi/BLE', 'Deep Sleep', 'SPIFFS'] },
      { name: 'Biometric & RFID Security', level: 'Advanced', tags: ['MFRC522 SPI', 'Optical Fingerprint UART', 'NVS Preferences'] },
      { name: 'Arduino Ecosystem', level: 'Advanced', tags: ['C/C++', 'Hardware Control', 'Interrupts'] },
      { name: 'STM32 / ARM Cortex', level: 'Intermediate', tags: ['HAL', 'CubeMX', 'Bare-metal'] },
      { name: 'Raspberry Pi / Single Board Computers', level: 'Intermediate', tags: ['Linux CLI', 'Python GPIO', 'Edge Nodes'] },
    ],
  },
  {
    title: {
      en: 'Industrial Protocols & Networking',
      id: 'Protokol Industri & Jaringan',
    },
    iconName: 'Network',
    skills: [
      { name: 'Modbus RTU & Modbus TCP', level: 'Advanced', tags: ['RS485 Transceivers', 'Registers', 'Master/Slave'] },
      { name: 'MQTT & Enterprise Brokers', level: 'Advanced', tags: ['EMQX Rule Engine', 'Mosquitto', 'Topic Hierarchy', 'QoS 0/1/2'] },
      { name: 'Cloud Webhooks & REST', level: 'Advanced', tags: ['Google Apps Script', 'Sheets API', 'HTTP Webhooks', 'JSON'] },
      { name: 'Wireshark & Packet Analysis', level: 'Proficient', tags: ['Protocol Decoding', 'Latency Optimization', 'PCAP'] },
      { name: 'Hardware Busses (I2C, SPI, UART)', level: 'Advanced', tags: ['Bit-banging', 'Logic Analyzers', 'Oscilloscopes'] },
    ],
  },
  {
    title: {
      en: 'Sensor Conditioning & Calibration',
      id: 'Kalibrasi & Pengkondisian Sensor',
    },
    iconName: 'Activity',
    skills: [
      { name: 'Electrochemical Probes (pH & EC)', level: 'Expert', tags: ['Analog Signal Filtering', 'Temp Compensation', 'Linear Regression'] },
      { name: 'Water Quality (TDS, Turbidity, DO)', level: 'Advanced', tags: ['Industrial 4-20mA', 'ADC Sampling', 'Noise Rejection'] },
      { name: 'Environmental Sensors (SHT, DHT, DS18B20)', level: 'Advanced', tags: ['1-Wire', 'I2C Precision', 'Microclimates'] },
      { name: 'Actuator Control & Auto-Dosing', level: 'Advanced', tags: ['PID Control', 'Peristaltic Pumps', 'SSR/Relays', 'Inductive Snubbers'] },
    ],
  },
  {
    title: {
      en: 'Software, Dashboard & Mobile',
      id: 'Software, Dashboard & Mobile',
    },
    iconName: 'Code',
    skills: [
      { name: 'C / C++ (Embedded)', level: 'Advanced', tags: ['Memory Optimization', 'Pointers', 'State Machines'] },
      { name: 'Computer Vision & Edge AI', level: 'Proficient', tags: ['OpenCV', 'Google MediaPipe', '21-pt Hand Landmarks', 'Face Detection'] },
      { name: 'Python & Time-Series Analytics', level: 'Proficient', tags: ['InfluxDB', 'NumPy', 'Data Validation', 'Serial/MQTT Bridges'] },
      { name: 'Flutter & Mobile Applications', level: 'Intermediate', tags: ['Cross-Platform', 'Provider/Bloc', 'Real-Time MQTT Sync'] },
      { name: 'Modern Web / Dashboards', level: 'Intermediate', tags: ['React', 'Tailwind CSS', 'WebSockets', 'Chart.js'] },
    ],
  },
];

export const TELEMETRY_SIMULATOR_NODES: TelemetryNode[] = [
  {
    id: 'node-petrokimia',
    name: 'Petrokimia Gresik WWTP-01',
    badge: 'Industrial Wastewater Outfall',
    protocol: 'MODBUS RTU / MQTT-TLS',
    ipAddress: '10.128.44.18:1883',
    status: 'TRANSMITTING',
    sensors: [
      {
        key: 'ph',
        label: 'pH Level',
        value: 7.24,
        unit: 'pH',
        min: 0,
        max: 14,
        nominalRange: [6.5, 8.5],
        status: 'OPTIMAL',
        description: 'Baku mutu limbah cair standar industri',
      },
      {
        key: 'ec',
        label: 'Electrical Conductivity',
        value: 1240,
        unit: 'µS/cm',
        min: 0,
        max: 3000,
        nominalRange: [800, 2000],
        status: 'NORMAL',
        description: 'Konduktivitas ionik terlarut',
      },
      {
        key: 'tds',
        label: 'Total Dissolved Solids',
        value: 620,
        unit: 'ppm',
        min: 0,
        max: 1500,
        nominalRange: [300, 1000],
        status: 'NORMAL',
        description: 'Total padatan terlarut air olahan',
      },
      {
        key: 'temp',
        label: 'Effluent Temp',
        value: 29.4,
        unit: '°C',
        min: 15,
        max: 50,
        nominalRange: [25, 35],
        status: 'OPTIMAL',
        description: 'Sensor suhu RTD industri',
      },
    ],
    actuators: [
      { id: 'act-valve-1', name: 'Alkali Dosing Valve', state: false, type: 'valve' },
      { id: 'act-aerator', name: 'Aeration Blower Unit', state: true, type: 'pump' },
      { id: 'act-pump-out', name: 'Discharge Pump A', state: true, type: 'pump' },
    ],
  },
  {
    id: 'node-buncop',
    name: 'Buncop Hydroponic Plant Factory',
    badge: 'Closed-Loop Precision Agrotech',
    protocol: 'MQTT / QoS 1 / WiFi',
    ipAddress: '192.168.10.82:1883',
    status: 'ONLINE',
    sensors: [
      {
        key: 'ph',
        label: 'Nutrient pH',
        value: 6.12,
        unit: 'pH',
        min: 0,
        max: 14,
        nominalRange: [5.8, 6.5],
        status: 'OPTIMAL',
        description: 'Target penyerapan akar selada hidroponik',
      },
      {
        key: 'ec',
        label: 'EC Nutrition (AB Mix)',
        value: 1480,
        unit: 'µS/cm',
        min: 0,
        max: 2500,
        nominalRange: [1200, 1600],
        status: 'OPTIMAL',
        description: 'Konsentrasi hara larutan hidroponik',
      },
      {
        key: 'temp',
        label: 'Canopy Temp',
        value: 24.8,
        unit: '°C',
        min: 10,
        max: 40,
        nominalRange: [22, 28],
        status: 'NORMAL',
        description: 'Sensor SHT30 presisi tinggi',
      },
      {
        key: 'humidity',
        label: 'Relative Humidity',
        value: 68.5,
        unit: '%RH',
        min: 20,
        max: 100,
        nominalRange: [60, 75],
        status: 'NORMAL',
        description: 'Kelembaban iklim mikro kanopi',
      },
    ],
    actuators: [
      { id: 'act-dosing-a', name: 'Pump A (Stock Nutrient)', state: false, type: 'dosing' },
      { id: 'act-dosing-b', name: 'Pump B (Stock Nutrient)', state: false, type: 'dosing' },
      { id: 'act-grow-light', name: 'LED Quantum Board', state: true, type: 'relay' },
    ],
  },
];
