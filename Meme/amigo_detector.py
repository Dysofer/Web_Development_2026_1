import tkinter as tk
from tkinter import filedialog, ttk
import cv2
from PIL import Image, ImageTk
import numpy as np

# ── Tonos del meme ──────────────────────────────────────────────────────────
SWATCHES = [
    {"color": "#F5DCCA", "accepted": True},
    {"color": "#E8C4A0", "accepted": True},
    {"color": "#D4A574", "accepted": True},
    {"color": "#A0714F", "accepted": False},
    {"color": "#7B4F35", "accepted": False},
    {"color": "#4A2C1A", "accepted": False},
]

class AmigoDetector:
    def __init__(self, root):
        self.root = root
        self.root.title("¿Puedes ser mi amigo?")
        self.root.geometry("520x700")
        self.root.configure(bg="#ffffff")
        self.root.resizable(False, False)

        self.cap = None
        self.camera_running = False

        self.build_ui()

    def build_ui(self):
        # Título
        tk.Label(self.root, text="¿Puedes ser mi amigo?",
                 font=("Segoe UI", 20, "bold"), bg="#ffffff", fg="#1a1a1a"
                 ).pack(pady=(24, 4))

        tk.Label(self.root, text="Sube una foto o usa la cámara para descubrirlo",
                 font=("Segoe UI", 11), bg="#ffffff", fg="#777777"
                 ).pack(pady=(0, 16))

        # Swatches del meme
        swatch_frame = tk.Frame(self.root, bg="#ffffff")
        swatch_frame.pack(pady=(0, 20))
        for s in SWATCHES:
            col = tk.Frame(swatch_frame, bg="#ffffff")
            col.pack(side="left", padx=4)
            box = tk.Frame(col, width=54, height=70, bg=s["color"],
                           highlightthickness=1, highlightbackground="#dddddd")
            box.pack()
            box.pack_propagate(False)
            icon = "✔" if s["accepted"] else "✖"
            color = "#2d7a2d" if s["accepted"] else "#c0392b"
            tk.Label(box, text=icon, font=("Segoe UI", 16, "bold"),
                     bg=s["color"], fg=color).place(relx=0.5, rely=0.5, anchor="center")

        # Botones
        btn_frame = tk.Frame(self.root, bg="#ffffff")
        btn_frame.pack(pady=(0, 16))

        self.btn_upload = tk.Button(
            btn_frame, text="📁  Subir foto",
            font=("Segoe UI", 11), bg="#1a1a1a", fg="white",
            activebackground="#333333", activeforeground="white",
            relief="flat", padx=18, pady=8, cursor="hand2",
            command=self.upload_photo
        )
        self.btn_upload.pack(side="left", padx=6)

        self.btn_camera = tk.Button(
            btn_frame, text="📷  Activar cámara",
            font=("Segoe UI", 11), bg="#ffffff", fg="#1a1a1a",
            activebackground="#f0f0f0", relief="flat", padx=18, pady=8,
            cursor="hand2", highlightthickness=1, highlightbackground="#cccccc",
            command=self.toggle_camera
        )
        self.btn_camera.pack(side="left", padx=6)

        # Canvas para imagen / cámara
        self.canvas = tk.Canvas(self.root, width=460, height=300,
                                bg="#f5f5f5", highlightthickness=1,
                                highlightbackground="#e0e0e0")
        self.canvas.pack(pady=(0, 16))
        self.canvas.create_text(230, 150, text="Aquí aparecerá tu foto o cámara",
                                fill="#aaaaaa", font=("Segoe UI", 12))

        # Botón capturar (oculto hasta que la cámara esté activa)
        self.btn_capture = tk.Button(
            self.root, text="📸  Capturar foto",
            font=("Segoe UI", 11), bg="#2d7a2d", fg="white",
            activebackground="#1f5c1f", relief="flat", padx=18, pady=8,
            cursor="hand2", command=self.capture_frame
        )

        # Resultado
        self.result_frame = tk.Frame(self.root, bg="#f9f9f9",
                                     highlightthickness=1,
                                     highlightbackground="#e0e0e0")

        self.result_icon = tk.Label(self.result_frame, text="",
                                    font=("Segoe UI", 32), bg="#f9f9f9")
        self.result_icon.pack(pady=(16, 4))

        self.result_title = tk.Label(self.result_frame, text="",
                                     font=("Segoe UI", 15, "bold"),
                                     bg="#f9f9f9", fg="#1a1a1a", wraplength=400)
        self.result_title.pack()

        self.result_sub = tk.Label(self.result_frame, text="",
                                   font=("Segoe UI", 10), bg="#f9f9f9",
                                   fg="#777777", wraplength=400)
        self.result_sub.pack(pady=(4, 8))

        self.color_dot_frame = tk.Frame(self.result_frame, bg="#f9f9f9")
        self.color_dot_frame.pack(pady=(0, 4))

        self.dot_canvas = tk.Canvas(self.color_dot_frame, width=24, height=24,
                                    bg="#f9f9f9", highlightthickness=0)
        self.dot_canvas.pack(side="left", padx=(0, 8))

        self.color_label = tk.Label(self.color_dot_frame, text="",
                                    font=("Segoe UI", 10), bg="#f9f9f9", fg="#555555")
        self.color_label.pack(side="left")

        tk.Button(self.result_frame, text="Intentar con otra foto",
                  font=("Segoe UI", 10), bg="#ffffff", fg="#555555",
                  relief="flat", padx=12, pady=6, cursor="hand2",
                  highlightthickness=1, highlightbackground="#cccccc",
                  command=self.reset
                  ).pack(pady=(8, 16))

    # ── Subir foto ────────────────────────────────────────────────────────────
    def upload_photo(self):
        self.stop_camera()
        path = filedialog.askopenfilename(
            filetypes=[("Imágenes", "*.jpg *.jpeg *.png *.bmp *.webp")]
        )
        if not path:
            return
        img_cv = cv2.imread(path)
        if img_cv is None:
            return
        self.show_image_on_canvas(img_cv)
        self.analyze(img_cv)

    # ── Cámara ────────────────────────────────────────────────────────────────
    def toggle_camera(self):
        if self.camera_running:
            self.stop_camera()
        else:
            self.start_camera()

    def start_camera(self):
        self.cap = cv2.VideoCapture(0)
        if not self.cap.isOpened():
            tk.messagebox.showerror("Error", "No se pudo abrir la cámara.")
            return
        self.camera_running = True
        self.btn_camera.config(text="⏹  Detener cámara")
        self.btn_capture.pack(pady=(0, 12))
        self.result_frame.pack_forget()
        self.update_camera()

    def update_camera(self):
        if not self.camera_running:
            return
        ret, frame = self.cap.read()
        if ret:
            frame = cv2.flip(frame, 1)
            self.last_frame = frame
            self.show_image_on_canvas(frame)
        self.root.after(30, self.update_camera)

    def capture_frame(self):
        if hasattr(self, "last_frame"):
            self.stop_camera()
            self.show_image_on_canvas(self.last_frame)
            self.analyze(self.last_frame)

    def stop_camera(self):
        self.camera_running = False
        if self.cap:
            self.cap.release()
            self.cap = None
        self.btn_camera.config(text="📷  Activar cámara")
        self.btn_capture.pack_forget()

    # ── Mostrar imagen en canvas ──────────────────────────────────────────────
    def show_image_on_canvas(self, frame_bgr):
        frame_rgb = cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2RGB)
        img = Image.fromarray(frame_rgb)
        img.thumbnail((460, 300))
        self.tk_img = ImageTk.PhotoImage(img)
        self.canvas.delete("all")
        self.canvas.create_image(230, 150, anchor="center", image=self.tk_img)

    # ── Análisis de color ─────────────────────────────────────────────────────
    def analyze(self, frame_bgr):
        h, w = frame_bgr.shape[:2]
        cx, cy = w // 2, int(h * 0.35)
        radius = int(min(w, h) * 0.12)

        mask = np.zeros((h, w), dtype=np.uint8)
        cv2.circle(mask, (cx, cy), radius, 255, -1)

        mean_bgr = cv2.mean(frame_bgr, mask=mask)
        b, g, r = int(mean_bgr[0]), int(mean_bgr[1]), int(mean_bgr[2])

        hex_color = "#{:02x}{:02x}{:02x}".format(r, g, b)
        lightness = 0.299 * r + 0.587 * g + 0.114 * b
        skin_like = r > 60 and g > 40 and b > 20 and r > b and r > g * 0.85

        if not skin_like:
            icon, title, sub = "🤷", "No detecté una cara clara", \
                "Intenta con mejor iluminación o centra tu rostro."
        elif lightness >= 110:
            icon, title, sub = "✅", "¡Sí puedes ser mi amigo!", \
                "Tu tono entra en el rango del meme\n(aunque el meme en sí sea una sátira 😄)"
        else:
            icon, title, sub = "❌", "No pasaste los 'requisitos'", \
                "Pero tranquilo/a — el meme es racista y una sátira.\n¡Tu amistad vale igual! 🤝"

        self.show_result(icon, title, sub, hex_color, lightness)

    # ── Mostrar resultado ─────────────────────────────────────────────────────
    def show_result(self, icon, title, sub, hex_color, lightness):
        self.result_icon.config(text=icon)
        self.result_title.config(text=title)
        self.result_sub.config(text=sub)
        self.color_label.config(text=f"Color detectado: {hex_color}  (L={int(lightness)})")

        self.dot_canvas.delete("all")
        self.dot_canvas.create_oval(2, 2, 22, 22, fill=hex_color, outline="#cccccc")

        self.result_frame.pack(fill="x", padx=30, pady=(0, 16))

    # ── Reset ─────────────────────────────────────────────────────────────────
    def reset(self):
        self.result_frame.pack_forget()
        self.canvas.delete("all")
        self.canvas.create_text(230, 150, text="Aquí aparecerá tu foto o cámara",
                                fill="#aaaaaa", font=("Segoe UI", 12))


if __name__ == "__main__":
    root = tk.Tk()
    app = AmigoDetector(root)
    root.mainloop()