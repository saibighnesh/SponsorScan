let scanButton = null;
let resultModal = null;

// Hide elements when clicking elsewhere or starting a new selection
document.addEventListener('mousedown', (e) => {
  if (scanButton && !scanButton.contains(e.target)) {
    scanButton.style.display = 'none';
  }
  if (resultModal && !resultModal.contains(e.target) && (!scanButton || !scanButton.contains(e.target))) {
    resultModal.style.opacity = '0';
    setTimeout(() => {
      if (resultModal) {
        resultModal.remove();
        resultModal = null;
      }
    }, 200);
  }
});

document.addEventListener('mouseup', (e) => {
  // Prevent showing the button if we are interacting with the button or modal itself
  if ((scanButton && scanButton.contains(e.target)) || (resultModal && resultModal.contains(e.target))) {
    return;
  }

  // Small delay to allow the browser to complete the selection update
  setTimeout(() => {
    const selection = window.getSelection();
    const text = selection.toString().trim();

    if (text.length > 0) {
      // Don't pop up if it's just a single word or short click-drag
      if (text.length < 5) return;

      try {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        // Show scan button near the bottom right of the selection
        showScanButton(rect.right + window.scrollX, rect.bottom + window.scrollY, text);
      } catch (err) {
        // Selection range not available
      }
    } else if (scanButton) {
      scanButton.style.display = 'none';
    }
  }, 10);
});

function showScanButton(x, y, text) {
  if (!scanButton) {
    scanButton = document.createElement('div');
    scanButton.id = 'sponsorscan-quick-btn';
    scanButton.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><path d="M11 8v6M8 11h6"></path></svg> Scan Section';
    document.body.appendChild(scanButton);

    scanButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      scanButton.style.display = 'none';
      const currentSelectionText = window.getSelection().toString().trim();
      if (currentSelectionText) {
        // Get the coordinates again to place the modal correctly
        try {
          const range = window.getSelection().getRangeAt(0);
          const rect = range.getBoundingClientRect();
          runAnalysisAndShowModal(currentSelectionText, rect.right + window.scrollX, rect.bottom + window.scrollY);
        } catch (err) {
          runAnalysisAndShowModal(currentSelectionText, x, y);
        }
      } else {
        runAnalysisAndShowModal(text, x, y);
      }
    });
  }

  scanButton.style.display = 'flex';
  scanButton.style.top = (y + 8) + 'px';

  // Ensure it doesn't go off-screen horizontally
  const maxLeft = window.innerWidth + window.scrollX - 140;
  scanButton.style.left = Math.min(x - 60, maxLeft) + 'px';
}

function runAnalysisAndShowModal(text, x, y) {
  // Clear any existing selection to prevent accidental re-triggers
  window.getSelection().removeAllRanges();

  // Run the detection (assuming detector is available globally from detector.js content script)
  let analysis = { status: 'no-info', summary: 'Could not analyze', country: 'N/A', positiveMatches: [], negativeMatches: [], ambiguousMatches: [] };

  if (typeof detector !== 'undefined') {
    analysis = detector.detect(text, window.location.href);
  } else {
    console.error("SponsorScan: detector.js not loaded.");
    return;
  }

  if (resultModal) {
    resultModal.remove();
  }

  resultModal = document.createElement('div');
  resultModal.id = 'sponsorscan-result-modal';

  // Set position
  let modalX = x - 170;
  let modalY = y + 10;

  // Ensure it fits horizontally
  if (modalX + 340 > window.innerWidth + window.scrollX) {
    modalX = window.innerWidth + window.scrollX - 350;
  }
  if (modalX < 10) modalX = 10;

  resultModal.style.left = modalX + 'px';
  resultModal.style.top = modalY + 'px';

  let statusColor = '#6b7280';
  let statusIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
  let title = 'No Info Found';
  let badgeBg = '#f3f4f6';

  if (analysis.status === 'positive') {
    statusColor = '#10b981';
    badgeBg = '#ecfdf5';
    statusIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
    title = 'Visa Sponsorship Found';
  } else if (analysis.status === 'negative') {
    statusColor = '#ef4444';
    badgeBg = '#fef2f2';
    statusIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
    title = 'No Visa Sponsorship';
  } else if (analysis.status === 'unclear') {
    statusColor = '#f59e0b';
    badgeBg = '#fffbeb';
    statusIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>';
    title = 'Mixed Signals';
  }

  const totalSignals = analysis.positiveMatches.length + analysis.negativeMatches.length + analysis.ambiguousMatches.length;

  // Build HTML using string concatenation to avoid template literal nesting issues
  let contentHTML = '<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; font-family: system-ui, sans-serif;">';
  contentHTML += '<div style="display: flex; align-items: center; gap: 8px;">';
  contentHTML += '<div style="color: ' + statusColor + '; display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; background-color: ' + badgeBg + '; border-radius: 6px;">';
  contentHTML += statusIcon;
  contentHTML += '</div>';
  contentHTML += '<h3 style="margin: 0; font-size: 15px; font-weight: 600; color: #111827; letter-spacing: normal;">' + title + '</h3>';
  contentHTML += '</div>';
  contentHTML += '<button id="sponsorscan-modal-close" style="background: none; border: none; font-size: 20px; cursor: pointer; color: #9ca3af; padding: 0 4px; line-height: 1; transition: color 0.15s; display: flex; align-items: center; justify-content: center; margin-top: 2px;">&times;</button>';
  contentHTML += '</div>';
  contentHTML += '<p style="margin: 0 0 12px 0; font-size: 13px; color: #4b5563; line-height: 1.5; font-family: system-ui, sans-serif;">' + analysis.summary + '</p>';

  if (totalSignals > 0) {
    contentHTML += '<div style="max-height: 220px; overflow-y: auto; padding-right: 6px; margin-bottom: 8px; font-family: system-ui, sans-serif;">';

    if (analysis.positiveMatches.length > 0) {
      contentHTML += '<div style="margin-bottom: 10px;">';
      contentHTML += '<strong style="color: #059669; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; display: block; margin-bottom: 4px;">Positive Signals</strong>';
      contentHTML += '<ul style="margin: 0; padding-left: 20px; color: #374151; font-size: 13px; list-style-type: disc;">';
      analysis.positiveMatches.forEach(function (m) {
        contentHTML += '<li style="margin-bottom: 3px;">"' + m + '"</li>';
      });
      contentHTML += '</ul></div>';
    }

    if (analysis.negativeMatches.length > 0) {
      contentHTML += '<div style="margin-bottom: 10px;">';
      contentHTML += '<strong style="color: #dc2626; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; display: block; margin-bottom: 4px;">Negative Signals</strong>';
      contentHTML += '<ul style="margin: 0; padding-left: 20px; color: #374151; font-size: 13px; list-style-type: disc;">';
      analysis.negativeMatches.forEach(function (m) {
        contentHTML += '<li style="margin-bottom: 3px;">"' + m + '"</li>';
      });
      contentHTML += '</ul></div>';
    }

    if (analysis.ambiguousMatches.length > 0) {
      contentHTML += '<div style="margin-bottom: 10px;">';
      contentHTML += '<strong style="color: #d97706; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; display: block; margin-bottom: 4px;">Ambiguous Signals</strong>';
      contentHTML += '<ul style="margin: 0; padding-left: 20px; color: #374151; font-size: 13px; list-style-type: disc;">';
      analysis.ambiguousMatches.forEach(function (m) {
        contentHTML += '<li style="margin-bottom: 3px;">"' + m + '"</li>';
      });
      contentHTML += '</ul></div>';
    }

    contentHTML += '</div>';
  }

  contentHTML += '<div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px; padding-top: 10px; border-top: 1px solid #f3f4f6; font-family: system-ui, sans-serif;">';
  contentHTML += '<div style="font-size: 11px; color: #6b7280; font-weight: 500; display: flex; align-items: center; gap: 4px;">';
  contentHTML += '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #10b981;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><path d="M11 8v6M8 11h6"></path></svg>';
  contentHTML += 'SponsorScan (Selection)';
  contentHTML += '</div>';
  if (analysis.country !== 'Country not detected') {
    contentHTML += '<div style="font-size: 11px; color: #9ca3af;">\u{1F4CD} ' + analysis.country + '</div>';
  }
  contentHTML += '</div>';

  resultModal.innerHTML = contentHTML;
  document.body.appendChild(resultModal);

  // Fade in
  requestAnimationFrame(() => {
    resultModal.style.opacity = '1';
  });

  const closeBtn = document.getElementById('sponsorscan-modal-close');
  closeBtn.addEventListener('click', () => {
    resultModal.style.opacity = '0';
    setTimeout(() => {
      if (resultModal) {
        resultModal.remove();
        resultModal = null;
      }
    }, 200);
  });
}