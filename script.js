// تفعيل الموقع عند التحميل
document.addEventListener('DOMContentLoaded', function () {

    /* ===============================
       السنة الحالية في التذييل
    =============================== */
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* ===============================
       قائمة الجوال
    =============================== */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            mainNav.classList.toggle('active');
        });
    }

    /* ===============================
       التنقل السلس
    =============================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const targetElement = document.querySelector(href);
            if (!targetElement) return;

            e.preventDefault();
            mainNav.classList.remove('active');

            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    /* ===============================
       توليد قسم الحقائب النسائية
    =============================== */
    const womenContainer = document.getElementById("womenProducts");

    if (womenContainer) {

        const imagePath = "Image/imageWomen/";
        const imagePrefix = "IMG-20260115-WA";

        const startNumber = 5;   // أول صورة
        const endNumber = 93;    // آخر صورة

        // أسعار جميع المنتجات
        const prices = [
            11000, 14000, 6000, 11500,
            12000, 7500, 8000, 6000,
            12000, 11000, 10000, 11000,
             6000, 14000, 10000, 13000
             ,8000, 6000, 6500, 11000
           ,4200, 11000, 6000, 8500
            ,13500, 13000, 8500, 8800
       ,13000, 10000, 5000, 7000
       ,12000, 11000, 9000, 11000
     ,10500, 5500, 11000, 6000
     ,10600, 9500, 11500, 4600
     , 8500, 5000 , 6500, 14000
     , 8000, 14000 , 10000, 10500
     , 6700, 10500 , 10500, 8500
      , 8500, 5700 , 13000, 8500
      , 13000, 7200 , 7000, 13000
      , 7000, 10500 , 8500, 5000
      , 10500, 7600 , 12000, 7000  // Row #70
     , 11000, 11000 , 10000, 10500
     , 6300, 12000 , 11000, 10000   
        ,6000,14000,5500,12000
        ,11000,6000,5000,6000,5000
        ];

        const defaultPrice = 8000;

        for (let i = startNumber; i <= endNumber; i++) {

            const index = i - startNumber; // 0,1,2...
            const number = i.toString().padStart(4, "0");

            const price = prices[index] ?? defaultPrice;

            womenContainer.innerHTML += `
                <div class="product-card">
                    <div class="product-img-container">
                        <img src="${imagePath}${imagePrefix}${number}.jpg"
                             alt="حقيبة نسائية"
                             loading="lazy">
                    </div>

                    <h3 class="product-name">حقيبة نسائية</h3>
                    <div class="price">${price} ريال</div>
                    <button class="btn">عرض</button>
                </div>
            `;
        }
    }
});

/* ===============================
   زر عرض (يعمل مع العناصر الديناميكية)
=============================== */
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn')) {
        const card = e.target.closest('.product-card');
        if (!card) return;

        const name = card.querySelector('.product-name').textContent;
        const price = card.querySelector('.price').textContent;
        const imgSrc = card.querySelector('img').src;
        const imgAlt = card.querySelector('img').alt;

        // إنشاء نافذة عرض الصورة
        showProductModal(name, price, imgSrc, imgAlt);
    }
});

/* ===============================
   دالة لعرض صورة المنتج في نافذة
=============================== */
function showProductModal(name, price, imgSrc, imgAlt) {
    // إزالة أي نافذة معروضة سابقاً
    const existingModal = document.querySelector('.product-modal');
    if (existingModal) {
        existingModal.remove();
        document.body.style.overflow = 'auto';
    }

    // إنشاء عناصر النافذة
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-image">
                <img src="${imgSrc}" alt="${imgAlt}">
            </div>
            <div class="modal-details">
                <h3>${name}</h3>
                <div class="modal-price">${price}</div>
                <div class="modal-buttons">
                    <button class="modal-whatsapp-btn btn">
                        <i class="fab fa-whatsapp"></i> طلب عبر واتساب
                    </button>
                    <button class="modal-telegram-btn btn">
                        <i class="fab fa-telegram"></i> طلب عبر تليجرام
                    </button>
                </div>
            </div>
        </div>
    `;

    // إضافة النافذة إلى body
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden'; // منع التمرير خلف النافذة

    // إضافة أحداث لإغلاق النافذة
    const overlay = modal.querySelector('.modal-overlay');
    const closeBtn = modal.querySelector('.modal-close');
    const whatsappBtn = modal.querySelector('.modal-whatsapp-btn');
    const telegramBtn = modal.querySelector('.modal-telegram-btn');

    function closeModal() {
        modal.remove();
        document.body.style.overflow = 'auto';
        
        // إزالة مستمع حدث Escape
        document.removeEventListener('keydown', escapeHandler);
    }

    // دالة معالجة زر Escape
    function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    }

    // إضافة مستمعات الأحداث
    overlay.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    
    // إضافة مستمع حدث Escape
    document.addEventListener('keydown', escapeHandler);

    // حدث زر واتساب
    whatsappBtn.addEventListener('click', function() {
        const message = `مرحباً، أريد طلب المنتج التالي:\n\n${name}\nالسعر: ${price}\n\nمن متجر الثريا`;
        const whatsappUrl = `https://wa.me/967779617470?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });

    // حدث زر تليجرام - رابط برقم الهاتف
    telegramBtn.addEventListener('click', function() {
        const message = `مرحباً، أريد طلب المنتج التالي:\n\n${name}\nالسعر: ${price}\n\nمن متجر الثريا`;
        // رابط التليجرام بالرقم الدولي
        const telegramUrl = `https://t.me/+967730651230?text=${encodeURIComponent(message)}`;
        window.open(telegramUrl, '_blank');
    });

    // منع إغلاق النافذة عند النقر داخل المحتوى
    modal.querySelector('.modal-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });
}