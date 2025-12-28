/**
 * Booking Page Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('calendar')) {
        initBookingCalendar();
        initBookingForm();
    }
});

function initBookingCalendar() {
    const calendarEl = document.getElementById('calendar');
    const dateDisplay = document.getElementById('date-display');
    let selectedDate = null;

    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    const monthNames = [
        'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
        'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'
    ];

    const dayNames = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];

    function renderCalendar() {
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const prevLastDay = new Date(currentYear, currentMonth, 0);

        const firstDayIndex = firstDay.getDay();
        const lastDateNum = lastDay.getDate();
        const prevLastDateNum = prevLastDay.getDate();

        let calendarHTML = `
            <div class="mb-4 flex items-center justify-between">
                <button type="button" id="prev-month" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                    <span class="material-symbols-outlined text-gray-600 dark:text-gray-400">chevron_left</span>
                </button>
                <h3 class="text-xl font-bold text-[#1F2937] dark:text-white">${monthNames[currentMonth]} ${currentYear}</h3>
                <button type="button" id="next-month" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                    <span class="material-symbols-outlined text-gray-600 dark:text-gray-400">chevron_right</span>
                </button>
            </div>
            <div class="grid grid-cols-7 gap-2 mb-2">
        `;

        // Day headers
        dayNames.forEach(day => {
            calendarHTML += `<div class="text-center text-xs font-bold text-gray-500 dark:text-gray-400 py-2">${day}</div>`;
        });

        calendarHTML += `</div><div class="grid grid-cols-7 gap-2">`;

        // Previous month days
        for (let i = firstDayIndex - 1; i >= 0; i--) {
            calendarHTML += `<div class="aspect-square flex items-center justify-center text-gray-300 dark:text-gray-700 text-sm">${prevLastDateNum - i}</div>`;
        }

        // Current month days
        for (let day = 1; day <= lastDateNum; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const isToday = date.toDateString() === today.toDateString();
            const isPast = date < today && !isToday;
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            
            let dayClass = 'aspect-square flex items-center justify-center rounded-xl text-sm font-semibold cursor-pointer transition-all ';
            
            if (isPast) {
                dayClass += 'text-gray-300 dark:text-gray-700 cursor-not-allowed';
            } else if (isWeekend) {
                dayClass += 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500';
            } else if (isToday) {
                dayClass += 'bg-primary/20 text-primary border-2 border-primary hover:bg-primary hover:text-white';
            } else {
                dayClass += 'hover:bg-primary hover:text-white text-[#1F2937] dark:text-white';
            }

            const dataDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            
            calendarHTML += `<div class="${dayClass}" data-date="${dataDate}" data-past="${isPast}" data-weekend="${isWeekend}">${day}</div>`;
        }

        calendarHTML += `</div>`;
        calendarEl.innerHTML = calendarHTML;

        // Add event listeners
        document.getElementById('prev-month').addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar();
        });

        document.getElementById('next-month').addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar();
        });

        // Date selection
        calendarEl.querySelectorAll('[data-date]').forEach(dayEl => {
            dayEl.addEventListener('click', () => {
                const isPast = dayEl.dataset.past === 'true';
                const isWeekend = dayEl.dataset.weekend === 'true';
                
                if (isPast || isWeekend) {
                    showToast('Helaas, wij zijn gesloten in het weekend en kunnen geen verzoeken uit het verleden accepteren.');
                    return;
                }

                // Remove previous selection
                calendarEl.querySelectorAll('[data-date]').forEach(el => {
                    el.classList.remove('bg-primary', 'text-white', 'ring-2', 'ring-primary', 'ring-offset-2');
                });

                // Add selection
                dayEl.classList.add('bg-primary', 'text-white', 'ring-2', 'ring-primary', 'ring-offset-2');
                selectedDate = dayEl.dataset.date;
                
                const dateObj = new Date(selectedDate);
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                dateDisplay.textContent = dateObj.toLocaleDateString('nl-NL', options);
            });
        });
    }

    renderCalendar();
}

function initBookingForm() {
    const form = document.getElementById('booking-form');
    const dateDisplay = document.getElementById('date-display');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Check if date is selected
        if (dateDisplay.textContent === 'Geen datum geselecteerd') {
            showToast('Selecteer eerst een datum in de kalender.');
            return;
        }

        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const eventType = formData.get('event-type');
        const guests = formData.get('guests');
        const time = formData.get('time');
        const notes = formData.get('notes');
        const selectedDate = dateDisplay.textContent;

        // Construct email
        const recipient = "aygulscatering@gmail.com";
        const subject = encodeURIComponent(`Nieuwe Reservering: ${eventType} - ${name}`);
        const body = encodeURIComponent(
            `NIEUWE RESERVERING AANVRAAG\n\n` +
            `Datum: ${selectedDate}\n` +
            `Tijd: ${time}\n\n` +
            `CONTACTGEGEVENS:\n` +
            `Naam: ${name}\n` +
            `Email: ${email}\n` +
            `Telefoon: ${phone}\n\n` +
            `EVENEMENT DETAILS:\n` +
            `Type: ${eventType}\n` +
            `Aantal gasten: ${guests}\n\n` +
            `EXTRA OPMERKINGEN:\n` +
            `${notes || 'Geen opmerkingen'}\n\n` +
            `---\n` +
            `Verzonden via Aygül's Catering Online Boekingssysteem\n` +
            `Datum aanvraag: ${new Date().toLocaleString('nl-NL')}`
        );

        // Open email client
        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

        // Show success message
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Email Client Geopend...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showToast('Reservering verzonden! Controleer uw email client.');
            form.reset();
            document.getElementById('date-display').textContent = 'Geen datum geselecteerd';
            
            // Remove calendar selection
            document.querySelectorAll('[data-date]').forEach(el => {
                el.classList.remove('bg-primary', 'text-white', 'ring-2', 'ring-primary', 'ring-offset-2');
            });

            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Reuse showToast from main script.js
function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'bg-gray-800 dark:bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 transform translate-x-full transition-transform duration-300';
    toast.innerHTML = `
        <span class="material-symbols-outlined text-primary">info</span>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.remove('translate-x-full');
    });

    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
}
