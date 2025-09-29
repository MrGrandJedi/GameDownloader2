// Sample game data
const games = [
  {
    id: 1,
    title: "Cyber Legends",
    description:
      "An epic cyberpunk adventure set in a dystopian future with stunning visuals and immersive gameplay.",
    image: "https://picsum.photos/400/300?random=2",
    size: "2.5 GB",
    rating: "4.8",
    downloads: "1.2M",
    version: "1.0.0",
  },
  {
    id: 2,
    title: "Fantasy Realms",
    description:
      "Explore magical worlds filled with mythical creatures and ancient mysteries in this RPG masterpiece.",
    image: "https://picsum.photos/400/300?random=3",
    size: "3.2 GB",
    rating: "4.9",
    downloads: "890K",
    version: "2.1.0",
  },
  {
    id: 3,
    title: "Speed Racers",
    description:
      "High-octane racing action with customizable cars and challenging tracks around the world.",
    image: "https://picsum.photos/400/300?random=4",
    size: "1.8 GB",
    rating: "4.6",
    downloads: "2.1M",
    version: "1.5.2",
  },
  {
    id: 4,
    title: "Space Odyssey",
    description:
      "Command your spaceship through the galaxy in this strategic space exploration game.",
    image: "https://picsum.photos/400/300?random=5",
    size: "2.9 GB",
    rating: "4.7",
    downloads: "750K",
    version: "1.3.1",
  },
  {
    id: 5,
    title: "Medieval Conquest",
    description:
      "Build your kingdom and lead armies to victory in this medieval strategy game.",
    image: "https://picsum.photos/400/300?random=6",
    size: "2.1 GB",
    rating: "4.5",
    downloads: "1.5M",
    version: "3.0.0",
  },
  {
    id: 6,
    title: "Ninja Warriors",
    description:
      "Master the art of stealth and combat in this action-packed ninja adventure.",
    image: "https://picsum.photos/400/300?random=7",
    size: "1.9 GB",
    rating: "4.8",
    downloads: "980K",
    version: "1.2.3",
  },
];

// DOM elements
const gamesGrid = document.getElementById("gamesGrid");
const downloadModal = document.getElementById("downloadModal");
const closeModal = document.querySelector(".close");
const progressBar = document.getElementById("progressBar");
const downloadMessage = document.getElementById("downloadMessage");
const fileSize = document.getElementById("fileSize");
const gameVersion = document.getElementById("gameVersion");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// Initialize the website
document.addEventListener("DOMContentLoaded", function () {
  renderGames();
  initializeNavigation();
  initializeScrollEffects();
  animateStats();
  initializeCTAButton();
});

// Render games grid
function renderGames() {
  gamesGrid.innerHTML = "";

  games.forEach((game) => {
    const gameCard = createGameCard(game);
    gamesGrid.appendChild(gameCard);
  });
}

// Create individual game card
function createGameCard(game) {
  const card = document.createElement("div");
  card.className = "game-card";
  card.innerHTML = `
        <img src="${game.image}" alt="${game.title}" class="game-image">
        <div class="game-info">
            <h3 class="game-title">${game.title}</h3>
            <p class="game-description">${game.description}</p>
            <div class="game-meta">
                <span><i class="fas fa-star"></i> ${game.rating}</span>
                <span><i class="fas fa-download"></i> ${game.downloads}</span>
                <span><i class="fas fa-hdd"></i> ${game.size}</span>
            </div>
            <button class="download-btn" onclick="startDownload('${game.title}', '${game.size}', '${game.version}')">
                <i class="fas fa-download"></i> Download Now
            </button>
        </div>
    `;

  return card;
}

// Start download process
function startDownload(title, size, version) {
  downloadModal.style.display = "block";
  downloadMessage.textContent = `Preparing download for ${title}...`;
  fileSize.textContent = size;
  gameVersion.textContent = version;

  // Reset progress bar
  progressBar.style.width = "0%";

  // Simulate download progress
  simulateDownload(title);
}

// Simulate download progress
function simulateDownload(title) {
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      downloadMessage.textContent = `${title} downloaded successfully!`;
      setTimeout(() => {
        downloadModal.style.display = "none";
      }, 2000);
    } else {
      downloadMessage.textContent = `Downloading ${title}... ${Math.round(
        progress
      )}%`;
    }
    progressBar.style.width = progress + "%";
  }, 200);
}

// Initialize navigation
function initializeNavigation() {
  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      // Close mobile menu
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");

      // Update active link
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
}

// Initialize scroll effects
function initializeScrollEffects() {
  // Update active navigation based on scroll position
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe game cards for animation
  document.querySelectorAll(".game-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
}

// Animate statistics counters
function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number");

  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute("data-target"));
    const increment = target / 100;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      if (target >= 1000) {
        element.textContent = (current / 1000).toFixed(1) + "K";
      } else {
        element.textContent = Math.round(current);
      }
    }, 20);
  };

  // Intersection Observer for stats
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statNumber = entry.target.querySelector(".stat-number");
          if (statNumber && !statNumber.classList.contains("animated")) {
            statNumber.classList.add("animated");
            animateCounter(statNumber);
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".stat-item").forEach((item) => {
    statsObserver.observe(item);
  });
}

// Initialize CTA button
function initializeCTAButton() {
  const ctaButton = document.querySelector(".cta-button");
  ctaButton.addEventListener("click", () => {
    document.querySelector("#games").scrollIntoView({
      behavior: "smooth",
    });
  });
}

// Modal event listeners
closeModal.addEventListener("click", () => {
  downloadModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === downloadModal) {
    downloadModal.style.display = "none";
  }
});

// Search functionality (bonus feature)
function searchGames(query) {
  const filteredGames = games.filter(
    (game) =>
      game.title.toLowerCase().includes(query.toLowerCase()) ||
      game.description.toLowerCase().includes(query.toLowerCase())
  );

  gamesGrid.innerHTML = "";
  filteredGames.forEach((game) => {
    const gameCard = createGameCard(game);
    gamesGrid.appendChild(gameCard);
  });
}

// Add some interactive effects
document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".cursor");
  if (cursor) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  }
});

// Add loading animation for images
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("load", function () {
    this.style.opacity = "1";
  });

  img.style.opacity = "0";
  img.style.transition = "opacity 0.3s ease";
});

// Console welcome message
console.log(`
🎮 Welcome to GameVault! 🎮
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Thanks for visiting our gaming downloads website!
Enjoy exploring our collection of amazing games.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
