/**
 * Price Calculator Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('price-calculator')) {
        initCalculator();
    }
});

function initCalculator() {
    const form = document.getElementById('price-calculator');
    const guestsInput = document.getElementById('guests');
    const guestsSlider = document.getElementById('guests-slider');
    const mealType = document.getElementById('meal-type');
    const serviceLevel = document.getElementById('service-level');
    const weekendCheckbox = document.getElementById('weekend');
    const equipmentCheckbox = document.getElementById('equipment');

    // Sync slider and input
    guestsInput.addEventListener('input', () => {
        guestsSlider.value = guestsInput.value;
        calculate();
    });

    guestsSlider.addEventListener('input', () => {
        guestsInput.value = guestsSlider.value;
        calculate();
    });

    // Recalculate on any change
    [mealType, serviceLevel, weekendCheckbox, equipmentCheckbox].forEach(el => {
        el.addEventListener('change', calculate);
    });

    function calculate() {
        const guests = parseInt(guestsInput.value);
        const basePricePerPerson = parseFloat(mealType.selectedOptions[0].dataset.price);
        const serviceMultiplier = parseFloat(serviceLevel.selectedOptions[0].dataset.multiplier);
        const serviceName = serviceLevel.selectedOptions[0].textContent;

        let pricePerPerson = basePricePerPerson * serviceMultiplier;
        let subtotal = pricePerPerson * guests;

        // Extras
        let extras = [];
        if (weekendCheckbox.checked) {
            subtotal += 150;
            extras.push({ name: 'Weekend toeslag', price: 150 });
        }

        if (equipmentCheckbox.checked) {
            const equipmentCost = guests * 3;
            subtotal += equipmentCost;
            extras.push({ name: 'Servies huur', price: equipmentCost });
        }

        const vat = subtotal * 0.21;
        const total = subtotal + vat;

        // Update UI
        document.getElementById('summary-guests').textContent = guests;
        document.getElementById('summary-pp').textContent = `€${pricePerPerson.toFixed(2).replace('.', ',')}`;
        document.getElementById('summary-service').textContent = serviceName.split('(')[0].trim();

        // Extra costs
        const extrasContainer = document.getElementById('extra-costs');
        if (extras.length > 0) {
            extrasContainer.innerHTML = extras.map(extra =>
                `<div class="flex justify-between"><span>${extra.name}</span><span>€${extra.price.toFixed(0)}</span></div>`
            ).join('');
        } else {
            extrasContainer.innerHTML = '';
        }

        document.getElementById('total-price').textContent = `€${Math.round(subtotal)}`;
        document.getElementById('total-vat').textContent = `€${Math.round(total)}`;
    }

    // Initial calculation
    calculate();
}
