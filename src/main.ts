/**
 * SOUKOU ENYONAM PASCALINE - Portfolio JavaScript Application
 * Conçu avec élégance, performance et pureté en Vanilla TS/JS.
 */

import { translations } from "./translations";

// Déclaration de types globaux pour les bibliothèques CDN afin d'éviter les erreurs TypeScript
declare const lucide: any;
declare const emailjs: any;

// =========================================================================
// 1. CONFIGURATION EMAILJS (Remplacer par vos propres clés)
// =========================================================================
// Ces identifiants sont nécessaires pour faire fonctionner l'envoi de mail.
// Ils peuvent être configurés dans votre fichier .env en local.
// Créez un compte gratuit sur https://dashboard.emailjs.com/

const cleanEnvVar = (val: any): string => {
  if (!val) return "";
  return String(val).replace(/^["']|["']$/g, "").trim();
};

const EMAILJS_CONFIG = {
  PUBLIC_KEY: cleanEnvVar((import.meta as any).env?.VITE_EMAILJS_PUBLIC_KEY || "VOTRE_PUBLIC_KEY"),
  SERVICE_ID: cleanEnvVar((import.meta as any).env?.VITE_EMAILJS_SERVICE_ID || "VOTRE_SERVICE_ID"),
  TEMPLATE_ID: cleanEnvVar((import.meta as any).env?.VITE_EMAILJS_TEMPLATE_ID || "VOTRE_TEMPLATE_ID")
};

// Initialisation de l'API EmailJS si la clé a été mise à jour par l'utilisateur
if (typeof emailjs !== 'undefined') {
  // Par défaut, nous tentons d'initialiser avec la clé spécifiée
  // Si l'utilisateur n'a pas encore configuré sa propre clé, nous utilisons une clé générique pour éviter les crashs.
  const activeKey = (EMAILJS_CONFIG.PUBLIC_KEY === "VOTRE_PUBLIC_KEY" || !EMAILJS_CONFIG.PUBLIC_KEY) ? "demo_key" : EMAILJS_CONFIG.PUBLIC_KEY;
  emailjs.init(activeKey);
}

document.addEventListener("DOMContentLoaded", () => {
  // Initialisation des icônes Lucide SVG
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Initialisation de toutes les fonctionnalités du site
  initScrollProgress();
  initStickyNavbar();
  initMobileMenu();
  initProjectFilters();
  initScrollReveal();
  initCounters();
  initContactForm();
  initBackToTop();
  initLanguageSwitcher();
});

// =========================================================================
// 2. INDICATEUR DE PROGRESSION DE DEFILEMENT (SCROLL)
// =========================================================================
function initScrollProgress() {
  const progressBar = document.getElementById("scroll-progress");
  if (!progressBar) return;

  window.addEventListener("scroll", () => {
    const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const currentScrollPosition = window.scrollY;
    
    if (totalScrollHeight > 0) {
      const scrollPercentage = (currentScrollPosition / totalScrollHeight) * 100;
      progressBar.style.width = `${scrollPercentage}%`;
    } else {
      progressBar.style.width = "0%";
    }
  });
}

// =========================================================================
// 3. BARRE DE NAVIGATION STICKY & BACKDROP BLUR
// =========================================================================
function initStickyNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const handleNavbarStyle = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("bg-[#0F0F0F]/80", "backdrop-blur-md", "border-[#1B1B1B]", "shadow-lg");
      navbar.classList.remove("border-transparent");
    } else {
      navbar.classList.remove("bg-[#0F0F0F]/80", "backdrop-blur-md", "border-[#1B1B1B]", "shadow-lg");
      navbar.classList.add("border-transparent");
    }
  };

  window.addEventListener("scroll", handleNavbarStyle);
  // Appel immédiat au chargement pour gérer l'actualisation en milieu de page
  handleNavbarStyle();
}

// =========================================================================
// 4. MENU MOBILE HAMBURGER
// =========================================================================
function initMobileMenu() {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  
  if (!menuBtn || !mobileMenu) return;

  let isOpen = false;

  const toggleMenu = () => {
    isOpen = !isOpen;
    if (isOpen) {
      // Ouvrir le menu
      mobileMenu.classList.remove("hidden");
      setTimeout(() => {
        mobileMenu.classList.remove("opacity-0");
        mobileMenu.classList.add("opacity-100");
      }, 10);
      menuBtn.innerHTML = `<i data-lucide="x" class="w-6 h-6"></i>`;
    } else {
      // Fermer le menu
      mobileMenu.classList.remove("opacity-100");
      mobileMenu.classList.add("opacity-0");
      setTimeout(() => {
        mobileMenu.classList.add("hidden");
      }, 300);
      menuBtn.innerHTML = `<i data-lucide="menu" class="w-6 h-6"></i>`;
    }
    // Recréer les icônes Lucide à la volée après l'injection HTML
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  };

  menuBtn.addEventListener("click", toggleMenu);

  // Fermer le menu mobile lors du clic sur un lien de navigation
  const mobileLinks = document.querySelectorAll(".mobile-link");
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (isOpen) {
        toggleMenu();
      }
    });
  });
}

// =========================================================================
// 5. FILTRAGE DES PROJETS DU PORTFOLIO
// =========================================================================
function initProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  
  if (filterButtons.length === 0 || projectCards.length === 0) return;

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Supprimer l'état actif de tous les boutons
      filterButtons.forEach(b => {
        b.classList.remove("active", "bg-[#1B1B1B]", "text-white");
        b.classList.add("text-gray-400", "hover:text-white");
      });

      // Activer le bouton cliqué
      btn.classList.add("active", "bg-[#1B1B1B]", "text-white");
      btn.classList.remove("text-gray-400", "hover:text-white");

      const filterValue = btn.getAttribute("data-filter");
      if (!filterValue) return;

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        
        // Structure de transition soignée lors du filtrage
        const element = card as HTMLElement;
        if (filterValue === "all" || cardCategory === filterValue) {
          element.classList.remove("hidden");
          setTimeout(() => {
            element.style.opacity = "1";
            element.style.transform = "scale(1)";
          }, 50);
        } else {
          element.style.opacity = "0";
          element.style.transform = "scale(0.95)";
          setTimeout(() => {
            element.classList.add("hidden");
          }, 300);
        }
      });
    });
  });
}

// =========================================================================
// 6. ANIMATIONS DE DECOUVREMENT AU DEFILEMENT (SCROLL REVEAL)
// =========================================================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal-fade-up, .reveal-scale");
  if (revealElements.length === 0) return;

  const observerOptions = {
    root: null,
    threshold: 0.1, // Déclencher quand 10% de l'élément est visible
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Animer une seule fois
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

// =========================================================================
// 7. COMPTEURS ANIMÉS DES STATISTIQUES (PROJETS & COMPÉTENCES)
// =========================================================================
function initCounters() {
  const counterProjects = document.getElementById("count-projects");
  const counterSkills = document.getElementById("count-skills");

  if (!counterProjects || !counterSkills) return;

  // Cible : 5 projets réels et 11 compétences listées
  const targets = {
    projects: 5,
    skills: 11
  };

  const animateCounter = (element: HTMLElement, target: number) => {
    let current = 0;
    const duration = 1500; // 1.5 secondes
    const stepTime = Math.max(Math.floor(duration / target), 30);
    
    const timer = setInterval(() => {
      current += 1;
      element.textContent = current.toString() + "+";
      if (current >= target) {
        element.textContent = target.toString();
        clearInterval(timer);
      }
    }, stepTime);
  };

  // Déclencher l'animation uniquement lorsque le bloc d'informations est visible
  const statsSection = document.querySelector("#about");
  if (statsSection) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(counterProjects, targets.projects);
          animateCounter(counterSkills, targets.skills);
          animateProgressBars(); // Lancer l'animation des barres de compétences en même temps
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(statsSection);
  }
}

// Animation des barres de progression de compétences
function animateProgressBars() {
  const bars = document.querySelectorAll(".skill-bar");
  bars.forEach(bar => {
    const targetPercent = bar.getAttribute("data-percent");
    if (targetPercent) {
      const element = bar as HTMLElement;
      element.style.width = targetPercent;
    }
  });
}

// =========================================================================
// 9. FORMULAIRE DE CONTACT AVEC EMAILJS ET RETROACTIONS VISUELLES
// =========================================================================
function initContactForm() {
  const form = document.getElementById("contact-form") as HTMLFormElement;
  const submitBtn = document.getElementById("submit-btn") as HTMLButtonElement;
  const successBox = document.getElementById("contact-success") as HTMLElement;
  const errorBox = document.getElementById("contact-error") as HTMLElement;

  if (!form || !submitBtn) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Vérification de sécurité de base
    const name = (document.getElementById("user_name") as HTMLInputElement).value.trim();
    const email = (document.getElementById("user_email") as HTMLInputElement).value.trim();
    const subject = (document.getElementById("subject") as HTMLInputElement).value.trim();
    const message = (document.getElementById("message") as HTMLTextAreaElement).value.trim();

    if (!name || !email || !subject || !message) {
      showBox(errorBox, "Tous les champs requis ne sont pas renseignés.");
      return;
    }

    // Activer l'état de chargement visuel
    setButtonLoadingState(true);
    hideBox(successBox);
    hideBox(errorBox);

    // Vérifier si l'utilisateur a configuré son EmailJS
    if (EMAILJS_CONFIG.PUBLIC_KEY === "VOTRE_PUBLIC_KEY" || !EMAILJS_CONFIG.PUBLIC_KEY) {
      // Mode simulation élégante en environnement local sans clés de messagerie configurées
      console.warn("EmailJS non configuré. Envoi du message (Mode Démo) :", { name, email, subject, message });
      
      setTimeout(() => {
        setButtonLoadingState(false);
        const currentLang = localStorage.getItem("portfolio_lang") || "fr";
        const demoMsg = currentLang === "fr"
          ? "Mode Démo : Le formulaire fonctionne ! Veuillez configurer vos clés EmailJS (VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID) dans votre fichier .env pour recevoir les messages par e-mail."
          : "Demo Mode: The form works! Please configure your EmailJS keys (VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID) in your .env file to receive messages by email.";
        showBox(successBox, demoMsg);
        form.reset();
      }, 1500);
      return;
    }

    // Envoi réel via l'API d'EmailJS en utilisant la fonction 'send' explicite pour un maximum de fiabilité
    const templateParams = {
      user_name: name,
      user_email: email,
      subject: subject,
      message: message
    };

    emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams, EMAILJS_CONFIG.PUBLIC_KEY)
      .then(() => {
        // Succès d'envoi
        setButtonLoadingState(false);
        showBox(successBox);
        form.reset();
        
        // Masquer le message de succès automatiquement après 6 secondes
        setTimeout(() => {
          hideBox(successBox);
        }, 6000);
      })
      .catch((error: any) => {
        // Échec d'envoi
        console.error("Erreur d'envoi EmailJS :", error);
        setButtonLoadingState(false);
        showBox(errorBox);
      });
  });

  // Gestionnaires d'état d'envoi pour le bouton de soumission
  function setButtonLoadingState(isLoading: boolean) {
    const spinner = document.getElementById("btn-spinner") as HTMLElement;
    const btnIcon = document.getElementById("btn-icon") as HTMLElement;
    const btnText = document.getElementById("btn-text") as HTMLElement;
    const currentLang = localStorage.getItem("portfolio_lang") || "fr";

    if (isLoading) {
      submitBtn.disabled = true;
      if (spinner) spinner.classList.remove("hidden");
      if (btnIcon) btnIcon.classList.add("hidden");
      if (btnText) {
        btnText.textContent = translations[currentLang]?.contact_form_submit_sending || "Envoi du message...";
      }
    } else {
      submitBtn.disabled = false;
      if (spinner) spinner.classList.add("hidden");
      if (btnIcon) btnIcon.classList.remove("hidden");
      if (btnText) {
        btnText.textContent = translations[currentLang]?.contact_form_submit || "Envoyer le Message";
      }
    }
  }

  function showBox(box: HTMLElement, customText?: string) {
    box.classList.remove("hidden");
    if (customText) {
      const desc = box.querySelector("p:last-child") as HTMLElement;
      if (desc) desc.textContent = customText;
    }
  }

  function hideBox(box: HTMLElement) {
    box.classList.add("hidden");
  }
}

// =========================================================================
// 10. BOUTON RETOUR EN HAUT (BACK TO TOP)
// =========================================================================
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      // Afficher le bouton
      backToTopBtn.classList.remove("translate-y-24", "opacity-0");
      backToTopBtn.classList.add("translate-y-0", "opacity-100");
    } else {
      // Cacher le bouton
      backToTopBtn.classList.remove("translate-y-0", "opacity-100");
      backToTopBtn.classList.add("translate-y-24", "opacity-0");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// =========================================================================
// 11. GESTION DU MULTILINGUE (FRANÇAIS / ANGLAIS)
// =========================================================================
function initLanguageSwitcher() {
  const switchBtn = document.getElementById("lang-switch-btn");
  const flagEl = document.getElementById("lang-flag");
  const labelEl = document.getElementById("lang-label");
  
  if (!switchBtn || !flagEl || !labelEl) return;

  // Langue par défaut : français
  let currentLang = localStorage.getItem("portfolio_lang") || "fr";

  // Appliquer les traductions de la langue choisie
  const applyTranslations = (lang: string) => {
    // Éléments de texte standard ou riche
    const translatableElements = document.querySelectorAll("[data-i18n]");
    translatableElements.forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (key && translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    // Placeholders de formulaire
    const placeholderElements = document.querySelectorAll("[data-i18n-placeholder]");
    placeholderElements.forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (key && translations[lang] && translations[lang][key]) {
        el.setAttribute("placeholder", translations[lang][key]);
      }
    });

    // Mettre à jour le bouton de changement de langue
    if (lang === "fr") {
      flagEl.textContent = "🇬🇧";
      labelEl.textContent = "EN";
    } else {
      flagEl.textContent = "🇫🇷";
      labelEl.textContent = "FR";
    }

    // Sauvegarder dans localStorage
    localStorage.setItem("portfolio_lang", lang);

    // Mettre à jour les icônes Lucide au cas où des éléments dynamiques ont été régénérés
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  };

  // Initialisation au démarrage
  applyTranslations(currentLang);

  // Événement clic pour basculer
  switchBtn.addEventListener("click", () => {
    currentLang = currentLang === "fr" ? "en" : "fr";
    applyTranslations(currentLang);
  });
}
