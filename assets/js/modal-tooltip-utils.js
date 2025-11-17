/**
 * Modal and Tooltip Utilities
 * Shared utilities for modal/tooltip behavior across the site
 */

export class ModalManager {
  constructor() {
    this.activeModal = null;
    this.focusTrap = null;
    this.setupGlobalListeners();
  }

  setupGlobalListeners() {
    // Close modals on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeModal) {
        this.closeModal(this.activeModal);
      }
    });

    // Close modals on overlay click
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay') && this.activeModal) {
        this.closeModal(this.activeModal);
      }
    });
  }

  openModal(modal, triggerElement = null) {
    if (this.activeModal) {
      this.closeModal(this.activeModal);
    }

    this.activeModal = modal;
    
    // Store the element that had focus before opening
    this.focusTrap = triggerElement || document.activeElement;
    
    // Show modal
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    
    // Focus first focusable element
    const firstFocusable = this.getFirstFocusableElement(modal);
    if (firstFocusable) {
      firstFocusable.focus();
    }
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Add focus trap
    modal.addEventListener('keydown', (e) => this.handleFocusTrap(e));
  }

  closeModal(modal) {
    if (!modal || modal !== this.activeModal) {
      return;
    }

    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Restore focus
    if (this.focusTrap) {
      this.focusTrap.focus();
      this.focusTrap = null;
    }
    
    // Remove focus trap listener
    modal.removeEventListener('keydown', this.handleFocusTrap);
    
    this.activeModal = null;
  }

  getFirstFocusableElement(container) {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');

    return container.querySelector(focusableSelectors);
  }

  handleFocusTrap(e) {
    if (e.key !== 'Tab') return;

    const focusableElements = this.activeModal.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }
}

export class TooltipManager {
  constructor() {
    this.activeTooltip = null;
    this.hideTimeout = null;
    this.setupGlobalListeners();
  }

  setupGlobalListeners() {
    // Hide tooltips on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeTooltip) {
        this.hideTooltip();
      }
    });

    // Hide tooltips when clicking elsewhere
    document.addEventListener('click', (e) => {
      if (this.activeTooltip && !e.target.closest('[data-tooltip]') && !e.target.closest('.tooltip')) {
        this.hideTooltip();
      }
    });
  }

  showTooltip(content, targetElement, options = {}) {
    const {
      position = 'top',
      offset = 10,
      pinned = false,
      className = ''
    } = options;

    // Clear any existing hide timeout
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }

    // Hide existing tooltip
    this.hideTooltip();

    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = `tooltip ${className}`;
    tooltip.setAttribute('role', 'tooltip');
    tooltip.setAttribute('aria-live', 'polite');
    
    // Add content
    if (typeof content === 'string') {
      tooltip.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      tooltip.appendChild(content);
    }

    // Add close button for pinned tooltips
    if (pinned) {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'tooltip-close';
      closeBtn.innerHTML = '✕';
      closeBtn.setAttribute('aria-label', 'Close tooltip');
      closeBtn.addEventListener('click', () => this.hideTooltip());
      tooltip.appendChild(closeBtn);
    }

    // Position tooltip
    const rect = targetElement.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let top, left;

    switch (position) {
      case 'top':
        top = rect.top - tooltipRect.height - offset;
        left = rect.left + (rect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = rect.bottom + offset;
        left = rect.left + (rect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = rect.top + (rect.height - tooltipRect.height) / 2;
        left = rect.left - tooltipRect.width - offset;
        break;
      case 'right':
        top = rect.top + (rect.height - tooltipRect.height) / 2;
        left = rect.right + offset;
        break;
      default:
        top = rect.bottom + offset;
        left = rect.left + (rect.width - tooltipRect.width) / 2;
    }

    // Adjust if tooltip goes off screen
    if (left < 0) {
      left = 10;
    }
    if (left + tooltipRect.width > window.innerWidth) {
      left = window.innerWidth - tooltipRect.width - 10;
    }
    if (top < 0) {
      top = rect.bottom + offset;
    }
    if (top + tooltipRect.height > window.innerHeight) {
      top = rect.top - tooltipRect.height - offset;
    }

    tooltip.style.position = 'fixed';
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
    tooltip.style.zIndex = '1000';

    // Add to DOM
    document.body.appendChild(tooltip);

    this.activeTooltip = tooltip;

    // Auto-hide if not pinned
    if (!pinned) {
      this.hideTimeout = setTimeout(() => {
        this.hideTooltip();
      }, 5000);
    }

    return tooltip;
  }

  hideTooltip() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    if (this.activeTooltip) {
      this.activeTooltip.remove();
      this.activeTooltip = null;
    }
  }

  // Helper method to create tooltip triggers
  createTooltipTrigger(element, content, options = {}) {
    element.setAttribute('data-tooltip', 'true');
    element.setAttribute('aria-describedby', 'tooltip');

    const showHandler = (e) => {
      e.preventDefault();
      this.showTooltip(content, element, options);
    };

    const hideHandler = () => {
      if (!options.pinned) {
        this.hideTooltip();
      }
    };

    // Mouse events
    element.addEventListener('mouseenter', showHandler);
    element.addEventListener('mouseleave', hideHandler);

    // Touch events
    element.addEventListener('touchstart', showHandler);
    element.addEventListener('touchend', hideHandler);

    // Keyboard events
    element.addEventListener('focus', showHandler);
    element.addEventListener('blur', hideHandler);

    // Click to pin/unpin
    if (options.pinnable) {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.activeTooltip && this.activeTooltip.classList.contains('pinned')) {
          this.hideTooltip();
        } else {
          this.showTooltip(content, element, { ...options, pinned: true });
          this.activeTooltip.classList.add('pinned');
        }
      });
    }

    return {
      destroy: () => {
        element.removeEventListener('mouseenter', showHandler);
        element.removeEventListener('mouseleave', hideHandler);
        element.removeEventListener('touchstart', showHandler);
        element.removeEventListener('touchend', hideHandler);
        element.removeEventListener('focus', showHandler);
        element.removeEventListener('blur', hideHandler);
        element.removeAttribute('data-tooltip');
        element.removeAttribute('aria-describedby');
      }
    };
  }
}

// Create singleton instances
export const modalManager = new ModalManager();
export const tooltipManager = new TooltipManager();

// Accessibility utilities
export function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

export function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
  );

  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', function trapTabKey(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }

    if (e.key === 'Escape') {
      element.removeEventListener('keydown', trapTabKey);
    }
  });

  firstElement.focus();
}