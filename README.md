
# AI Chatbot - MiniMax Stili

Bu proje, Google Gemini API'sini kullanan, şık ve modern bir arayüze sahip gelişmiş bir AI sohbet robotudur. Arayüz, MiniMax platformunun estetiğinden esinlenmiştir ve tamamen duyarlı bir tasarıma, sohbet geçmişi yönetimine ve açık/koyu tema desteğine sahiptir.

![Uygulama Ekran Görüntüsü](https://storage.googleapis.com/genai-assets/chatbot-minimax.png)

## ✨ Özellikler

- **Gelişmiş Sohbet Arayüzü:** Akıcı ve sezgisel bir kullanıcı deneyimi.
- **Sohbet Geçmişi:** Tüm konuşmalarınız tarayıcınızın yerel belleğinde saklanır ve yönetilir.
- **Dinamik Başlık Oluşturma:** Gemini, her yeni sohbet için otomatik olarak kısa ve anlamlı bir başlık oluşturur.
- **Açık ve Koyu Tema:** Göz zevkinize uygun tema arasında geçiş yapın.
- **Duyarlı Tasarım:** Masaüstü ve mobil cihazlarda harika görünür.
- **Streaming Yanıtları:** AI'nın yanıtlarını yazarken gerçek zamanlı olarak görün.
- **Markdown Desteği:** Kod blokları, listeler ve diğer formatlar için temel markdown desteği.
- **Kolay Kurulum:** `importmap` sayesinde karmaşık derleme adımları olmadan çalışır.

## 🚀 Teknolojiler

- **Frontend:** React, TypeScript
- **Stil:** Tailwind CSS
- **AI:** Google Gemini API (`gemini-2.5-flash`)
- **Bağımlılık Yönetimi:** ES Modules via `importmap` (Derleme adımı yok!)

## 🔧 Kurulum ve Çalıştırma

Bu projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.

### Ön Koşullar

- [Google Gemini API Anahtarı](https://aistudio.google.com/app/apikey).
- Projeyi sunmak için basit bir yerel sunucu. `live-server` gibi bir eklenti veya `python`'ın dahili sunucusunu kullanabilirsiniz.

### Kurulum Adımları

1.  **Depoyu Klonlayın:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **API Anahtarını Yapılandırın:**
    Bu uygulama, API anahtarını doğrudan `process.env.API_KEY` ortam değişkeninden alır. Ancak, bu bir istemci tarafı uygulaması olduğu için, projeyi barındırdığınız platformun (Vercel, Netlify vb.) ortam değişkeni yönetimine anahtarınızı eklemeniz gerekir.

    **Yerel geliştirme için,** `index.html` dosyasına geçici olarak bir script ekleyerek anahtarınızı ayarlayabilirsiniz. **Ancak bu yöntemi üretimde KULLANMAYIN ve anahtarınızı GitHub'a GÖNDERMEYİN!**

    `index.html` dosyasının `<head>` bölümüne şunu ekleyin:
    ```html
    <script>
      // SADECE YEREL GELİŞTİRME İÇİN!
      // BU BLOKU GITHUB'A GÖNDERMEYİN!
      window.process = {
        env: {
          API_KEY: 'BURAYA_KENDİ_GEMINI_API_ANAHTARINIZI_YAPIŞTIRIN'
        }
      };
    </script>
    ```

3.  **Uygulamayı Çalıştırın:**
    Proje bir derleme adımı gerektirmediğinden, sadece dosyaları bir yerel sunucu ile sunmanız yeterlidir. Eğer VS Code kullanıyorsanız, [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) eklentisini kullanabilirsiniz.

    Alternatif olarak, Python yüklüyse:
    ```bash
    # Python 3
    python -m http.server
    ```
    Sunucu başlatıldıktan sonra tarayıcınızda `http://localhost:8000` adresine gidin.

## 📄 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.
