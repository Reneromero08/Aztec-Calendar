/**
 * Calendar Page JavaScript Module
 * Handles all interactive functionality for the Aztec calendar page
 */

import {
  calculateAztecDate,
  calculateTonalpohualli,
  calculateXiuhpohualli,
  getCurrentTrecena,
  validateDate,
  formatDate,
  daySigns,
  tonalpohualliNumbers,
  xiuhpohualliMonths,
  TONALPOHUALLI_DAYS,
  XIUHPOHUALLI_DAYS
} from './aztec-calendar-core.js';

import { tooltipManager, announceToScreenReader } from './modal-tooltip-utils.js';

class CalendarPage {
  constructor() {
    this.selectedDate = new Date();
    this.highContrast = false;
    this.selectedSegment = null;
    this.hoveredSegment = null;
    
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.setupDateLookup();
    this.setupCycleNavigation();
    this.setupTrecenaExplorer();
    this.setupCalendarWheel();
    this.setupAccessibility();
    
    // Initialize with today's date
    this.updateSelectedDate(this.selectedDate);
  }

  setupDateLookup() {
    const form = document.getElementById('date-lookup-form');
    const dateInput = document.getElementById('date-input');
    const todayButton = document.getElementById('today-button');
    const validationMessage = document.getElementById('validation-message');
    const dateResult = document.getElementById('date-result');

    // Set today's date as default
    dateInput.value = this.selectedDate.toISOString().split('T')[0];

    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputDate = new Date(dateInput.value);
      this.handleDateLookup(inputDate);
    });

    // Today button
    todayButton.addEventListener('click', () => {
      const today = new Date();
      dateInput.value = today.toISOString().split('T')[0];
      this.handleDateLookup(today);
    });

    // Date input change (real-time validation)
    dateInput.addEventListener('input', () => {
      if (dateInput.value) {
        const inputDate = new Date(dateInput.value);
        this.validateDateInput(inputDate);
      }
    });
  }

  handleDateLookup(date) {
    const validation = this.validateDateInput(date);
    
    if (!validation.isValid) {
      this.showValidationMessage(validation.error, 'error');
      return;
    }

    this.hideValidationMessage();
    this.updateSelectedDate(date);
    this.displayDateResult(date);
  }

  validateDateInput(date) {
    const validation = validateDate(date);
    
    if (!validation.isValid) {
      return validation;
    }

    // Additional validation for reasonable date range
    const year = date.getFullYear();
    if (year < 1500 || year > 2500) {
      return {
        isValid: false,
        error: 'Date year should be between 1500 and 2500 for accurate calculations'
      };
    }

    return { isValid: true, error: null };
  }

  showValidationMessage(message, type = 'error') {
    const validationMessage = document.getElementById('validation-message');
    validationMessage.textContent = message;
    validationMessage.className = `p-4 rounded-lg ${type === 'error' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-green-100 text-green-700 border border-green-200'}`;
    validationMessage.classList.remove('hidden');
  }

  hideValidationMessage() {
    const validationMessage = document.getElementById('validation-message');
    validationMessage.classList.add('hidden');
  }

  displayDateResult(date) {
    const dateResult = document.getElementById('date-result');
    const aztec = calculateAztecDate(date);
    const trecena = getCurrentTrecena(date);

    dateResult.innerHTML = `
      <div class="bg-surface-muted bg-opacity-50 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-ink mb-4">Aztec Calendar Results</h3>
        
        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <h4 class="font-medium text-ink-soft mb-2">Sacred Calendar (Tonalpohualli)</h4>
            <div class="bg-white rounded-lg p-4 border border-primary-100">
              <div class="text-2xl font-bold text-primary-700 mb-2">${aztec.summary.sacred}</div>
              <div class="text-sm text-ink-soft">
                <p><strong>Number:</strong> ${aztec.tonalpohualli.numberName} (${aztec.tonalpohualli.number})</p>
                <p><strong>Day Sign:</strong> ${aztec.tonalpohualli.daySignEnglish}</p>
                <p><strong>Meaning:</strong> ${aztec.tonalpohualli.daySignMeaning}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 class="font-medium text-ink-soft mb-2">Solar Calendar (Xiuhpohualli)</h4>
            <div class="bg-white rounded-lg p-4 border border-primary-100">
              <div class="text-2xl font-bold text-accent-700 mb-2">${aztec.summary.solar}</div>
              <div class="text-sm text-ink-soft">
                <p><strong>Month:</strong> ${aztec.xiuhpohualli.monthEnglish}</p>
                <p><strong>Day:</strong> ${aztec.xiuhpohualli.dayInMonth}/20</p>
                <p><strong>Season:</strong> ${aztec.xiuhpohualli.season}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-4 grid gap-4 md:grid-cols-3">
          <div class="bg-white rounded-lg p-4 border border-primary-100">
            <h5 class="font-medium text-ink-soft mb-1">Calendar Round Year</h5>
            <div class="text-xl font-semibold text-primary-700">${aztec.calendarRoundYear}/52</div>
          </div>
          
          <div class="bg-white rounded-lg p-4 border border-primary-100">
            <h5 class="font-medium text-ink-soft mb-1">Current Trecena</h5>
            <div class="text-lg font-semibold text-accent-700">${trecena.summary}</div>
          </div>
          
          <div class="bg-white rounded-lg p-4 border border-primary-100">
            <h5 class="font-medium text-ink-soft mb-1">Day in Trecena</h5>
            <div class="text-lg font-semibold text-primary-700">${trecena.dayInTrecena}/13</div>
          </div>
        </div>
      </div>
    `;
    
    dateResult.classList.remove('hidden');
  }

  setupCycleNavigation() {
    const prevDayBtn = document.getElementById('prev-day');
    const nextDayBtn = document.getElementById('next-day');
    const quickJumpBtns = document.querySelectorAll('.quick-jump');

    prevDayBtn.addEventListener('click', () => {
      const newDate = new Date(this.selectedDate);
      newDate.setDate(newDate.getDate() - 1);
      this.updateSelectedDate(newDate);
    });

    nextDayBtn.addEventListener('click', () => {
      const newDate = new Date(this.selectedDate);
      newDate.setDate(newDate.getDate() + 1);
      this.updateSelectedDate(newDate);
    });

    quickJumpBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const offset = parseInt(btn.dataset.offset);
        const newDate = new Date(this.selectedDate);
        newDate.setDate(newDate.getDate() + offset);
        this.updateSelectedDate(newDate);
      });
    });
  }

  setupTrecenaExplorer() {
    const trecenaSelect = document.getElementById('trecena-select');
    
    // Populate trecena options
    this.populateTrecenaOptions(trecenaSelect);
    
    trecenaSelect.addEventListener('change', () => {
      const trecenaNumber = parseInt(trecenaSelect.value);
      this.displayTrecena(trecenaNumber);
    });

    // Display current trecena by default
    const currentTrecena = getCurrentTrecena(this.selectedDate);
    trecenaSelect.value = currentTrecena.trecenaNumber;
    this.displayTrecena(currentTrecena.trecenaNumber);
  }

  populateTrecenaOptions(select) {
    // Generate all 20 possible trecenas (since there are 20 day signs)
    for (let i = 0; i < 20; i++) {
      const option = document.createElement('option');
      option.value = i;
      
      const startDaySign = daySigns[i];
      option.textContent = `Trecena of Ce ${startDaySign.name} (${startDaySign.englishName})`;
      
      select.appendChild(option);
    }
  }

  displayTrecena(trecenaNumber) {
    const trecenaInfo = document.getElementById('trecena-info');
    const trecenaDaysGrid = document.getElementById('trecena-days-grid');
    
    // Calculate trecena start date for the selected trecena number
    const currentDate = new Date(this.selectedDate);
    const currentTrecena = getCurrentTrecena(currentDate);
    
    // Find the start of the requested trecena
    let trecenaStart = new Date(currentDate);
    const daysToSubtract = (currentTrecena.dayInTrecena - 1) + ((currentTrecena.trecenaNumber - trecenaNumber + 20) % 20) * 13;
    trecenaStart.setDate(trecenaStart.getDate() - daysToSubtract);
    
    const trecena = getCurrentTrecena(trecenaStart);
    
    // Display trecena info
    trecenaInfo.innerHTML = `
      <div class="bg-surface-muted bg-opacity-50 rounded-lg p-4">
        <div class="grid gap-4 md:grid-cols-3">
          <div>
            <h4 class="font-medium text-ink-soft mb-1">Trecena</h4>
            <div class="text-lg font-semibold text-primary-700">${trecena.summary}</div>
          </div>
          <div>
            <h4 class="font-medium text-ink-soft mb-1">Ruling Deity</h4>
            <div class="text-lg font-semibold text-accent-700">${trecena.rulingDeity}</div>
          </div>
          <div>
            <h4 class="font-medium text-ink-soft mb-1">Period</h4>
            <div class="text-lg font-semibold text-ink">13 Days</div>
          </div>
        </div>
      </div>
    `;
    
    // Display trecena days grid
    trecenaDaysGrid.innerHTML = '';
    trecena.days.forEach((day, index) => {
      const dayCard = document.createElement('div');
      dayCard.className = `bg-white rounded-lg p-3 border-2 text-center transition-colors ${
        day.isToday ? 'border-primary-500 bg-primary-50' : 'border-primary-100 hover:border-primary-300'
      }`;
      
      dayCard.innerHTML = `
        <div class="text-2xl mb-1">${day.daySign.glyph || '🌞'}</div>
        <div class="font-semibold text-sm">${day.number.number}</div>
        <div class="text-xs text-ink-soft">${day.daySign.englishName}</div>
        ${day.isToday ? '<div class="text-xs font-medium text-primary-700 mt-1">Today</div>' : ''}
      `;
      
      dayCard.addEventListener('click', () => {
        const dayDate = new Date(trecenaStart);
        dayDate.setDate(dayDate.getDate() + index);
        this.updateSelectedDate(dayDate);
      });
      
      trecenaDaysGrid.appendChild(dayCard);
    });
  }

  setupCalendarWheel() {
    this.renderCalendarWheel();
    this.setupHighContrastToggle();
    
    // Re-render on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.renderCalendarWheel(), 250);
    });
  }

  renderCalendarWheel() {
    const container = document.getElementById('calendar-wheel-container');
    const width = Math.min(container.clientWidth, 800);
    const height = width;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Create SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Interactive Aztec Calendar Wheel with concentric rings for numbers, day signs, and months');
    
    // Define gradients
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
    if (!this.highContrast) {
      // Create gradient definitions for day signs
      daySigns.forEach((daySign, index) => {
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
        gradient.setAttribute('id', `day-gradient-${index}`);
        
        const hue = (index * 360 / 20) % 360;
        gradient.innerHTML = `
          <stop offset="0%" stop-color="hsl(${hue}, 70%, 60%)" />
          <stop offset="100%" stop-color="hsl(${hue}, 70%, 45%)" />
        `;
        
        defs.appendChild(gradient);
      });
    }
    
    svg.appendChild(defs);
    
    // Calculate ring dimensions
    const innerRadius = width * 0.15;
    const numberRingWidth = width * 0.15;
    const daySignRingWidth = width * 0.25;
    const monthRingWidth = width * 0.25;
    
    const numberRingRadius = innerRadius + numberRingWidth / 2;
    const daySignRingRadius = innerRadius + numberRingWidth + daySignRingWidth / 2;
    const monthRingRadius = innerRadius + numberRingWidth + daySignRingWidth + monthRingWidth / 2;
    
    // Get current date for highlighting
    const currentAztec = calculateAztecDate(this.selectedDate);
    
    // Draw month ring (outermost)
    this.drawRing(svg, xiuhpohualliMonths, monthRingRadius, monthRingWidth, 'month', currentAztec.xiuhpohualli.monthName);
    
    // Draw day sign ring (middle)
    this.drawRing(svg, daySigns, daySignRingRadius, daySignRingWidth, 'daySign', currentAztec.tonalpohualli.daySign);
    
    // Draw number ring (inner)
    this.drawRing(svg, tonalpohualliNumbers, numberRingRadius, numberRingWidth, 'number', currentAztec.tonalpohualli.number);
    
    // Draw center sun
    const sunGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
    const sunCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    sunCircle.setAttribute('cx', centerX);
    sunCircle.setAttribute('cy', centerY);
    sunCircle.setAttribute('r', innerRadius * 0.8);
    sunCircle.setAttribute('fill', '#FDB813');
    sunCircle.setAttribute('stroke', '#F37735');
    sunCircle.setAttribute('stroke-width', '2');
    
    const sunText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    sunText.setAttribute('x', centerX);
    sunText.setAttribute('y', centerY);
    sunText.setAttribute('text-anchor', 'middle');
    sunText.setAttribute('dominant-baseline', 'middle');
    sunText.setAttribute('font-size', innerRadius * 0.8);
    sunText.setAttribute('fill', '#8B4513');
    sunText.textContent = '☀️';
    
    sunGroup.appendChild(sunCircle);
    sunGroup.appendChild(sunText);
    svg.appendChild(sunGroup);
    
    // Clear and add new SVG
    container.innerHTML = '';
    container.appendChild(svg);
  }

  drawRing(svg, data, radius, width, type, currentValue) {
    const segments = data.length;
    const anglePerSegment = 360 / segments;
    const centerX = parseFloat(svg.getAttribute('width')) / 2;
    const centerY = parseFloat(svg.getAttribute('height')) / 2;
    
    data.forEach((item, index) => {
      const startAngle = index * anglePerSegment - 90; // Start from top
      const endAngle = startAngle + anglePerSegment;
      
      const path = this.createArcPath(centerX, centerY, radius - width/2, width, startAngle, endAngle);
      
      const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathElement.setAttribute('d', path);
      pathElement.setAttribute('fill', this.getSegmentColor(item, index, type));
      pathElement.setAttribute('stroke', '#fff');
      pathElement.setAttribute('stroke-width', '2');
      pathElement.setAttribute('role', 'button');
      pathElement.setAttribute('tabindex', '0');
      pathElement.setAttribute('aria-label', this.getAriaLabel(item, type));
      pathElement.setAttribute('data-type', type);
      pathElement.setAttribute('data-index', index);
      pathElement.setAttribute('data-name', item.name || item.englishName);
      
      // Highlight current value
      if ((type === 'number' && item.number === currentValue) ||
          (type === 'daySign' && item.name === currentValue) ||
          (type === 'month' && item.name === currentValue)) {
        pathElement.setAttribute('stroke', '#FFD700');
        pathElement.setAttribute('stroke-width', '4');
        pathElement.classList.add('current-segment');
      }
      
      // Add hover and click events
      pathElement.addEventListener('mouseenter', () => this.handleSegmentHover(item, type, pathElement));
      pathElement.addEventListener('mouseleave', () => this.handleSegmentLeave(pathElement));
      pathElement.addEventListener('click', () => this.handleSegmentClick(item, type));
      pathElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleSegmentClick(item, type);
        }
      });
      
      svg.appendChild(pathElement);
      
      // Add text label
      const textAngle = (startAngle + endAngle) / 2;
      const textRadius = radius;
      const textX = centerX + textRadius * Math.cos(textAngle * Math.PI / 180);
      const textY = centerY + textRadius * Math.sin(textAngle * Math.PI / 180);
      
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', textX);
      text.setAttribute('y', textY);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('font-size', Math.max(10, width * 0.3));
      text.setAttribute('font-weight', 'bold');
      text.setAttribute('fill', '#fff');
      text.setAttribute('pointer-events', 'none');
      text.setAttribute('transform', `rotate(${textAngle + 90}, ${textX}, ${textY})`);
      
      if (type === 'number') {
        text.textContent = item.number;
      } else if (type === 'daySign') {
        text.textContent = item.glyph || '🌞';
      } else if (type === 'month') {
        text.textContent = item.name.substring(0, 3);
      }
      
      svg.appendChild(text);
    });
  }

  createArcPath(centerX, centerY, radius, width, startAngle, endAngle) {
    const innerRadius = radius - width / 2;
    const outerRadius = radius + width / 2;
    
    const startAngleRad = startAngle * Math.PI / 180;
    const endAngleRad = endAngle * Math.PI / 180;
    
    const x1 = centerX + innerRadius * Math.cos(startAngleRad);
    const y1 = centerY + innerRadius * Math.sin(startAngleRad);
    const x2 = centerX + outerRadius * Math.cos(startAngleRad);
    const y2 = centerY + outerRadius * Math.sin(startAngleRad);
    const x3 = centerX + outerRadius * Math.cos(endAngleRad);
    const y3 = centerY + outerRadius * Math.sin(endAngleRad);
    const x4 = centerX + innerRadius * Math.cos(endAngleRad);
    const y4 = centerY + innerRadius * Math.sin(endAngleRad);
    
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    
    return `
      M ${x1} ${y1}
      L ${x2} ${y2}
      A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x3} ${y3}
      L ${x4} ${y4}
      A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1} ${y1}
      Z
    `;
  }

  getSegmentColor(item, index, type) {
    if (this.highContrast) {
      const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'];
      return colors[index % colors.length];
    }
    
    if (type === 'number') {
      return '#A855F7'; // Purple
    } else if (type === 'daySign') {
      return `url(#day-gradient-${index})`;
    } else if (type === 'month') {
      return '#D97706'; // Orange/earth tone
    }
    
    return '#666';
  }

  getAriaLabel(item, type) {
    if (type === 'number') {
      return `Number ${item.number} (${item.name}), ${item.meaning}`;
    } else if (type === 'daySign') {
      return `Day sign ${item.name} (${item.englishName}), ${item.meaning}`;
    } else if (type === 'month') {
      return `Month ${item.name} (${item.englishName}), ${item.season} season`;
    }
    return '';
  }

  handleSegmentHover(item, type, element) {
    this.hoveredSegment = { item, type, element };
    element.style.opacity = '0.8';
    element.style.cursor = 'pointer';
    
    // Show tooltip with detail
    const content = this.createDetailContent(item, type);
    tooltipManager.showTooltip(content, element, {
      position: 'top',
      className: 'calendar-tooltip'
    });
  }

  handleSegmentLeave(element) {
    element.style.opacity = '1';
    element.style.cursor = 'default';
    
    // Hide tooltip if not pinned
    if (!this.selectedSegment) {
      tooltipManager.hideTooltip();
    }
  }

  handleSegmentClick(item, type) {
    if (this.selectedSegment && this.selectedSegment.item === item && this.selectedSegment.type === type) {
      // Deselect if clicking the same segment
      this.selectedSegment = null;
      tooltipManager.hideTooltip();
      announceToScreenReader('Deselected ' + type + ': ' + item.name);
    } else {
      // Select new segment
      this.selectedSegment = { item, type };
      const content = this.createDetailContent(item, type);
      
      // Position tooltip near the clicked element
      tooltipManager.showTooltip(content, event.target.closest('[data-type]'), {
        position: 'top',
        pinned: true,
        className: 'calendar-tooltip pinned'
      });
      
      announceToScreenReader('Selected ' + type + ': ' + item.name);
    }
  }

  createDetailContent(item, type) {
    let content = '';
    
    if (type === 'number') {
      content = `
        <h3 class="text-lg font-semibold text-ink mb-2">Number ${item.number}</h3>
        <div class="space-y-2 text-sm">
          <p><strong>Nahuatl:</strong> ${item.name}</p>
          <p><strong>Meaning:</strong> ${item.meaning}</p>
          <p><strong>Direction:</strong> ${item.direction}</p>
          <p><strong>Element:</strong> ${item.element}</p>
          <p><strong>Qualities:</strong> ${item.qualities ? item.qualities.join(', ') : ''}</p>
        </div>
      `;
    } else if (type === 'daySign') {
      content = `
        <h3 class="text-lg font-semibold text-ink mb-2">${item.name}</h3>
        <div class="text-2xl mb-2">${item.glyph || '🌞'}</div>
        <div class="space-y-2 text-sm">
          <p><strong>English:</strong> ${item.englishName}</p>
          <p><strong>Meaning:</strong> ${item.meaning}</p>
          <p><strong>Element:</strong> ${item.element}</p>
          <p><strong>Direction:</strong> ${item.direction}</p>
          <p><strong>Ruler:</strong> ${item.ruler}</p>
          <p><strong>Associations:</strong> ${item.associations ? item.associations.join(', ') : ''}</p>
        </div>
      `;
    } else if (type === 'month') {
      content = `
        <h3 class="text-lg font-semibold text-ink mb-2">${item.name}</h3>
        <div class="space-y-2 text-sm">
          <p><strong>English:</strong> ${item.englishName}</p>
          <p><strong>Meaning:</strong> ${item.meaning}</p>
          <p><strong>Season:</strong> ${item.season}</p>
          <p><strong>Associated Deity:</strong> ${item.associatedDeity}</p>
          <p><strong>Days:</strong> ${item.days}</p>
          <p><strong>Ceremonies:</strong> ${item.ceremonies ? item.ceremonies.join(', ') : ''}</p>
        </div>
      `;
    }
    
    return content;
  }

  setupHighContrastToggle() {
    const toggle = document.getElementById('high-contrast-toggle');
    
    toggle.addEventListener('click', () => {
      this.highContrast = !this.highContrast;
      toggle.setAttribute('aria-pressed', this.highContrast);
      toggle.textContent = this.highContrast ? 'Normal Contrast' : 'High Contrast';
      
      // Re-render wheel with new contrast mode
      this.renderCalendarWheel();
      
      announceToScreenReader(this.highContrast ? 'High contrast mode enabled' : 'Normal contrast mode enabled');
    });
  }

  setupAccessibility() {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    }
    
    prefersReducedMotion.addEventListener('change', (e) => {
      if (e.matches) {
        document.documentElement.style.setProperty('--transition-duration', '0.01ms');
      } else {
        document.documentElement.style.removeProperty('--transition-duration');
      }
    });
  }

  updateSelectedDate(date) {
    this.selectedDate = date;
    
    // Update date input
    const dateInput = document.getElementById('date-input');
    dateInput.value = date.toISOString().split('T')[0];
    
    // Update displays
    this.updateCurrentDayDisplay();
    this.displayDateResult(date);
    this.renderCalendarWheel();
    
    // Update trecena if on current trecena
    const trecenaSelect = document.getElementById('trecena-select');
    const currentTrecena = getCurrentTrecena(date);
    if (trecenaSelect.value == currentTrecena.trecenaNumber) {
      this.displayTrecena(currentTrecena.trecenaNumber);
    }
  }

  updateCurrentDayDisplay() {
    const display = document.getElementById('current-day-display');
    const aztec = calculateAztecDate(this.selectedDate);
    
    display.innerHTML = `
      <div class="text-sm text-ink-soft">${formatDate(this.selectedDate).long}</div>
      <div class="text-lg font-semibold text-primary-700">${aztec.summary.sacred}</div>
      <div class="text-sm text-accent-700">${aztec.summary.solar}</div>
    `;
  }
}

// Initialize the calendar page
new CalendarPage();