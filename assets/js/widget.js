/** UptempoClubwear Messenger Widget
 * - Vanilla JS, no frameworks, DSGVO-friendly.
 * - Toggles a popup with direct links to WhatsApp, Telegram and Tellonym.
 * - Append this script after the messenger container in HTML.
 */

(function (window, document) {
  'use strict';

  /**
   * Toggle the display state of the messenger popup.
   * - Clicking the button toggles the popup's visibility.
   * - Clicking outside the popup (document level) closes it.
   */
  function toggleMessengerPopup() {
    const popup = document.getElementById('messenger-popup');
    if (popup) {
      const currentDisplay = popup.style.display;
      popup.style.display = currentDisplay === 'none' ? 'block' : 'none';
    }
  }

  /**
   * Close the messenger popup initially.
   */
  function closeMessengerPopup() {
    const popup = document.getElementById('messenger-popup');
    if (popup) {
      popup.style.display = 'none';
    }
  }

  /**
   * Initialize the widget (called after DOM loads).
   */
  function initMessengerWidget() {
    const button = document.getElementById('messenger-toggle-btn');
    if (!button) {
      console.warn('[Widget] The messenger toggle button wasn’t found.');
      return;
    }

    button.addEventListener('click', toggleMessengerPopup);

    document.addEventListener('click', function (event) {
      const popup = document.getElementById('messenger-popup');
      const isClickInsidePopup = popup && popup.contains(event.target);
      const isClickOnButton = event.target === button;

      if (popup && !isClickInsidePopup && !isClickOnButton) {
        popup.style.display = 'none';
      }
    });

    // Initial state: popup closed.
    closeMessengerPopup();
  }

  // Boot the widget when the DOM is ready.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMessengerWidget);
  } else {
    initMessengerWidget();
  }

})(window, document);