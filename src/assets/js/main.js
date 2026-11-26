(() => {
            const slides = Array.from(document.querySelectorAll(".hero-slide"));
            const dots = Array.from(document.querySelectorAll(".carousel-dot"));
            const count = document.getElementById("current-slide");
            const menuButton = document.querySelector(".menu-toggle");
            const nav = document.querySelector(".nav-links");
            let activeIndex = 0;
            let timer;

            function showSlide(index) {
                activeIndex = (index + slides.length) % slides.length;
                slides.forEach((slide, i) => slide.classList.toggle("active", i === activeIndex));
                dots.forEach((dot, i) => {
                    dot.classList.toggle("active", i === activeIndex);
                    if (i === activeIndex) dot.setAttribute("aria-current", "true");
                    else dot.removeAttribute("aria-current");
                });
                count.textContent = String(activeIndex + 1).padStart(2, "0");
            }

            function restartTimer() {
                window.clearInterval(timer);
                timer = window.setInterval(() => showSlide(activeIndex + 1), 6000);
            }

            dots.forEach((dot, i) => dot.addEventListener("click", () => {
                showSlide(i);
                restartTimer();
            }));
            document.querySelectorAll(".carousel-arrows button").forEach(button => {
                button.addEventListener("click", () => {
                    showSlide(activeIndex + Number(button.dataset.direction));
                    restartTimer();
                });
            });
            menuButton.addEventListener("click", () => {
                const isOpen = menuButton.getAttribute("aria-expanded") === "true";
                menuButton.setAttribute("aria-expanded", String(!isOpen));
                menuButton.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
                nav.classList.toggle("open", !isOpen);
            });
            nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
                nav.classList.remove("open");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Abrir menú");
            }));
            restartTimer();
        })();
