document.addEventListener("DOMContentLoaded", function () {
  const whatsappNumber = "08563574966"; // Nomor WhatsApp BroDev

  // --- DATA FOR PACKAGES ---
  const packages = [
    {
      id: "Website_sekolah",
      name: "Website Sekolah",
      description:
        "Website sekolah modern dengan halaman profil, berita, galeri, dan admin panel.",
      price: "Rp 100.000 - Rp 500.000",
      time: "1 Minggu - 1 Bulan",
      features: [
        "Halaman profil sekolah",
        "Manajemen berita",
        "Galeri foto",
        "Login admin",
        "Responsive & ringan",
      ],
    },
    {
      id: "portfolio_pribadi",
      name: "Portfolio Pribadi",
      description:
        "Website portfolio modern untuk menampilkan keahlian, project, dan kontak profesional.",
      price: "Rp 100.000 - Rp 300.000",
      time: "1 Minggu - 1 Bulan",
      features: [
        "Halaman profil",
        "Showcase project",
        "Form kontak",
        "Desain modern",
        "Responsive di semua device",
      ],
    },
    {
      id: "website_wisata",
      name: "Website Wisata",
      description:
        "Website destinasi wisata dengan informasi lokasi, galeri, dan harga tiket.",
      price: "Rp 100.000 - Rp 300.000",
      time: "1 Minggu - 1 Bulan",
      features: [
        "Halaman informasi wisata",
        "Galeri foto",
        "Informasi harga tiket",
        "Lokasi maps",
        "Responsive & cepat",
      ],
    },
    {
      id: "website_custom",
      name: "Website Custom",
      description:
        "Website custom sesuai kebutuhanmu: landing page, company profile, atau fitur khusus.",
      price: "Rp 100.000 - Rp 500.000",
      time: "1 Minggu - 1 Bulan",
      features: [
        "Desain sesuai request",
        "Fitur fleksibel",
        "Performa cepat",
        "Responsive",
      ],
    },
  ];

  // --- DOM ELEMENTS ---
  const themeToggle = document.querySelector(".theme-toggle");
  const body = document.body;
  const header = document.querySelector("header"); // Tambahkan header
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navLinkItems = document.querySelectorAll(".nav-links a"); // Tambahkan link items
  const reveals = document.querySelectorAll(".reveal");
  const packageList = document.querySelector(".package-list");
  const packageDetails = document.querySelector(".package-details");
  const contactForm = document.getElementById("contact-form");
  const ctaHireMe = document.getElementById("cta-hire-me");
  const contactWaBtn = document.getElementById("contact-wa-btn");
  const sections = document.querySelectorAll("section[id]"); // Tambahkan sections

  // --- INITIALIZATION ---
  function init() {
    setupTheme();
    setupEventListeners();
    renderPackages();
    selectPackage(packages[0].id);
    revealOnScroll();
    updateActiveNavLink(); // Panggil sekali di awal
  }

  // --- THEME TOGGLE ---
  function setupTheme() {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) {
      body.classList.add(currentTheme);
    } else {
      body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark-mode");
    }
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("light-mode");
      localStorage.setItem(
        "theme",
        body.classList.contains("light-mode") ? "light-mode" : "dark-mode"
      );
    });

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });

    // GUNAKAN SATU EVENT LISTENER UNTUK SCROLL
    window.addEventListener("scroll", () => {
      handleScrollEffect();
      revealOnScroll();
    });

    contactForm.addEventListener("submit", handleFormSubmit);
    ctaHireMe.addEventListener("click", () =>
      openWhatsApp(
        "Halo BroDev, saya tertarik untuk memulai proyek pembuatan website."
      )
    );
    contactWaBtn.addEventListener("click", () =>
      openWhatsApp(
        "Halo BroDev, saya ingin berkonsultasi mengenai pembuatan website."
      )
    );

    document.querySelectorAll(".faq-question").forEach((question) => {
      question.addEventListener("click", () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains("active");

        document
          .querySelectorAll(".faq-item")
          .forEach((item) => item.classList.remove("active"));
        if (!isActive) {
          faqItem.classList.add("active");
        }
      });
    });
  }

  // --- FITUR SCROLL BARU ---
  function handleScrollEffect() {
    // 1. Efek perubahan style navbar
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // 2. Indikator section aktif
    updateActiveNavLink();
  }

  function updateActiveNavLink() {
    let currentSectionId = "";
    const scrollPosition = window.scrollY + 100; // Offset untuk akurasi

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinkItems.forEach((link) => {
      link.classList.remove("active-link");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active-link");
      }
    });
  }

  // --- WHATSAPP INTEGRATION ---
  function openWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const name = event.target[0].value;
    const email = event.target[1].value;
    const message = event.target[2].value;

    const whatsappMessage = `Halo BroDev, saya ingin mengajukan proyek.%0A%0ANama: ${name}%0AEmail: ${email}%0A%0APesan: ${message}`;
    openWhatsApp(whatsappMessage);
  }

  // --- DYNAMIC PRICING PAGE ---
  function renderPackages() {
    packageList.innerHTML = packages
      .map(
        (pkg) => `
            <div class="package-item" data-package-id="${pkg.id}">
                <div>
                    <h4>${pkg.name}</h4>
                    <p>${pkg.description.substring(0, 50)}...</p>
                </div>
                <span class="price-tag">${pkg.price}</span>
            </div>
        `
      )
      .join("");

    packageList.querySelectorAll(".package-item").forEach((item) => {
      item.addEventListener("click", () => {
        selectPackage(item.dataset.packageId);
      });
    });
  }

  function selectPackage(packageId) {
    const selectedPackage = packages.find((p) => p.id === packageId);
    if (!selectedPackage) return;

    packageList.querySelectorAll(".package-item").forEach((item) => {
      item.classList.toggle("active", item.dataset.packageId === packageId);
    });

    packageDetails.innerHTML = `
            <h3>${selectedPackage.name}</h3>
            <p class="package-description">${selectedPackage.description}</p>
            <ul>
                ${selectedPackage.features
                  .map(
                    (f) => `<li><i class="fas fa-check-circle"></i> ${f}</li>`
                  )
                  .join("")}
            </ul>
            <div class="package-meta">
                <div>
                    <p style="color: var(--text-secondary); font-size: 0.9rem;">Estimasi Pengerjaan</p>
                    <p style="font-weight: 600;">${selectedPackage.time}</p>
                </div>
                <div style="text-align: right;">
                    <button class="btn btn-primary" onclick="orderPackage('${
                      selectedPackage.name
                    }')">Pilih Paket Ini</button>
                </div>
            </div>
        `;
  }

  window.orderPackage = function (packageName) {
    const message = `Halo BroDev, saya tertarik dengan paket "${packageName}". Mohon informasikan langkah selanjutnya.`;
    openWhatsApp(message);
  };

  // --- SCROLL REVEAL ANIMATION ---
  function revealOnScroll() {
    reveals.forEach((element) => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        element.classList.add("active");
      }
    });
  }

  // --- Start the application ---
  init();
});
