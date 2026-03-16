 document.addEventListener('DOMContentLoaded', () => {
            // --- CONFIGURACIÓN DEL CANVAS Y LA SECUENCIA DE IMÁGENES ---
            const canvas = document.getElementById('product-canvas');
            const context = canvas.getContext('2d');
            
            // Resolución original de los fotogramas (ejemplo: AirPods tutorial sequence)
            canvas.width = 1920;
            canvas.height = 1080;

            const frameCount = 145; // Cantidad total de imágenes en la secuencia
            
            // Función para generar la URL de cada imagen (0001.jpg, 0002.jpg, etc.)
            /*const currentFrame = index => (
                `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(index + 1).toString().padStart(4, '0')}.jpg`
            );*/

            const currentFrame = index => (
                `http://127.0.0.1:5500/Semana7/Secuencia/Secuencia%201${(index + 1).toString().padStart(3, '0')}.png`
            );

            //http://127.0.0.1:5500/src/views/Semana6/secuencia/Comp%201_00120.png

            // Precargar todas las imágenes en memoria para evitar parpadeos
            const images = [];
            for (let i = 0; i < frameCount; i++) {
                const img = new Image();
                img.src = currentFrame(i);
                images.push(img);
            }

            // Dibujar la primera imagen tan pronto como cargue
            images[0].onload = () => {
                context.drawImage(images[0], 0, 0);
            };

            // Lógica para actualizar el frame basado en el scroll
            window.addEventListener('scroll', () => {
                // Posición actual de scroll
                const scrollTop = window.scrollY;
                // Cantidad máxima de scroll posible
                const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                // Progreso del scroll entre 0 y 1
                const scrollFraction = scrollTop / maxScroll;
                
                // Calcular qué número de fotograma corresponde a este momento
                // Math.min asegura que no nos pasemos del último frame
                const frameIndex = Math.min(
                    frameCount - 1,
                    Math.floor(scrollFraction * frameCount)
                );

                // Usamos requestAnimationFrame para un dibujado suave
                window.requestAnimationFrame(() => {
                    context.drawImage(images[frameIndex], 0, 0);
                });
            });

            // --- CONFIGURACIÓN DE LAS TRANSICIONES DE TEXTO (OPACIDAD) ---
            // Usamos IntersectionObserver, la forma más optimizada de detectar si un elemento está en pantalla
            const observerOptions = {
                root: null,
                rootMargin: "0px",
                threshold: 0.5 // Se activa cuando al menos el 50% de la tarjeta es visible
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Si entra en pantalla, añade la clase (Opacity: 1)
                        entry.target.classList.add('visible');
                    } else {
                        // Si sale de pantalla, quita la clase (Opacity: 0)
                        entry.target.classList.remove('visible');
                    }
                });
            }, observerOptions);

            // Aplicar el observador a todas las tarjetas
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => observer.observe(card));
        });