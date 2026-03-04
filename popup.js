let currentAnalysis = null;
let activeTabId = null;

// Theme Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
};

chrome.storage.local.get(['theme'], (result) => {
  const savedTheme = result.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(savedTheme);
});

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
  chrome.storage.local.set({ theme: newTheme });
});

document.addEventListener('DOMContentLoaded', async () => {
  runScan();

  // Rescan button
  document.getElementById('rescan-btn').addEventListener('click', () => {
    runScan();
  });

  // Copy button
  document.getElementById('copy-btn').addEventListener('click', () => {
    if (!currentAnalysis) return;
    copyResultToClipboard(currentAnalysis);
  });

  // Highlight button
  document.getElementById('highlight-btn').addEventListener('click', async () => {
    if (!currentAnalysis || !activeTabId) return;

    const cleanNeg = currentAnalysis.negativeMatches.map(m =>
      m.replace(/^implicitly negated: "/, '').replace(/"$/, '')
    );

    await chrome.scripting.executeScript({
      target: { tabId: activeTabId },
      func: highlightMatchesOnPage,
      args: [currentAnalysis.positiveMatches, cleanNeg, currentAnalysis.ambiguousMatches]
    });
  });
});

async function runScan() {
  // Show loading, hide results
  document.getElementById('loading').classList.remove('hidden');
  document.getElementById('results').classList.add('hidden');

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab || !tab.id || tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://') || tab.url.startsWith('about:')) {
    showResults({
      status: 'no-info',
      summary: 'Cannot scan this page. Please open a job posting.',
      country: 'N/A',
      positiveMatches: [],
      negativeMatches: [],
      ambiguousMatches: []
    });
    return;
  }

  try {
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        // First check if user has selected text
        const selection = window.getSelection().toString().trim();
        if (selection.length > 0) {
          return { text: selection, type: 'selection' };
        }

        // A more aggressive text extraction function that tries to get all visible text
        function extractText(element) {
          let text = '';
          if (element.nodeType === Node.TEXT_NODE) {
            text += element.textContent + ' ';
          } else if (element.nodeType === Node.ELEMENT_NODE) {
            if (element.tagName === 'SCRIPT' || element.tagName === 'STYLE' || element.tagName === 'NOSCRIPT') {
              return '';
            }
            if (element.shadowRoot) {
               text += extractText(element.shadowRoot);
            }
            for (let child of element.childNodes) {
              text += extractText(child);
            }
          }
          return text;
        }
        
        const aggressiveText = extractText(document.body);
        const standardText = document.body.innerText || "";
        
        return {
          text: aggressiveText.length > standardText.length ? aggressiveText : standardText,
          type: 'page'
        };
      }
    });

    currentAnalysis = detector.detect(result.text, tab.url);
    activeTabId = tab.id;
    // Add a small note if they scanned a selection
    if (result.type === 'selection') {
      currentAnalysis.summary = "(Scanned Selected Text) " + currentAnalysis.summary;
    }
    showResults(currentAnalysis);
  } catch (error) {
    console.error('Detection failed:', error);
    showResults({
      status: 'no-info',
      summary: 'Error scanning this page. It may be restricted.',
      country: 'N/A',
      positiveMatches: [],
      negativeMatches: [],
      ambiguousMatches: []
    });
  }
}

function showResults(data) {
  // Hide loading, show results
  document.getElementById('loading').classList.add('hidden');
  document.getElementById('results').classList.remove('hidden');

  const statusTitle = document.getElementById('status-title');
  const countryName = document.getElementById('country-name');
  const summaryText = document.getElementById('summary-text');
  const posList = document.getElementById('positive-matches');
  const negList = document.getElementById('negative-matches');
  const ambList = document.getElementById('ambiguous-matches');
  const statusIcon = document.getElementById('status-icon');
  const statusCard = document.getElementById('status-card');
  const highlightBtn = document.getElementById('highlight-btn');
  const emptyHint = document.getElementById('empty-hint');

  // Status config
  const totalSignals = data.positiveMatches.length + data.negativeMatches.length + data.ambiguousMatches.length;

  const statusMap = {
    'positive': {
      title: `Visa Sponsorship Mentioned`,
      subtitle: `${data.positiveMatches.length} positive signal${data.positiveMatches.length !== 1 ? 's' : ''} found`,
      iconClass: 'pos',
      cardClass: 'status-positive'
    },
    'negative': {
      title: `No Visa Sponsorship`,
      subtitle: `${data.negativeMatches.length} negative signal${data.negativeMatches.length !== 1 ? 's' : ''} found`,
      iconClass: 'neg',
      cardClass: 'status-negative'
    },
    'unclear': {
      title: `Unclear — Review Signals`,
      subtitle: `${totalSignals} mixed signal${totalSignals !== 1 ? 's' : ''} found`,
      iconClass: 'warn',
      cardClass: 'status-unclear'
    },
    'no-info': {
      title: `No Sponsorship Info Found`,
      subtitle: '',
      iconClass: 'info',
      cardClass: 'status-no-info'
    }
  };

  const config = statusMap[data.status] || statusMap['no-info'];

  // Update status card
  statusCard.className = 'status-card ' + config.cardClass;
  statusIcon.className = config.iconClass;
  statusTitle.textContent = config.title;
  countryName.textContent = data.country;
  summaryText.textContent = config.subtitle ? config.subtitle + ' — ' + data.summary : data.summary;

  // Clear match lists
  posList.innerHTML = '';
  negList.innerHTML = '';
  ambList.innerHTML = '';

  // Populate positive matches
  const posSection = document.getElementById('positive-section');
  if (data.positiveMatches.length > 0) {
    posSection.classList.remove('hidden');
    data.positiveMatches.forEach(m => {
      const li = document.createElement('li');
      li.textContent = `"${m}"`;
      posList.appendChild(li);
    });
  } else {
    posSection.classList.add('hidden');
  }

  // Populate negative matches
  const negSection = document.getElementById('negative-section');
  if (data.negativeMatches.length > 0) {
    negSection.classList.remove('hidden');
    data.negativeMatches.forEach(m => {
      const li = document.createElement('li');
      li.textContent = `"${m}"`;
      negList.appendChild(li);
    });
  } else {
    negSection.classList.add('hidden');
  }

  // Populate ambiguous matches
  const ambSection = document.getElementById('ambiguous-section');
  if (data.ambiguousMatches.length > 0) {
    ambSection.classList.remove('hidden');
    data.ambiguousMatches.forEach(m => {
      const li = document.createElement('li');
      li.textContent = `"${m}"`;
      ambList.appendChild(li);
    });
  } else {
    ambSection.classList.add('hidden');
  }

  // Enable/disable highlight button
  const signalsHeader = document.getElementById('signals-header');
  if (totalSignals > 0) {
    signalsHeader.classList.remove('hidden');
    highlightBtn.disabled = false;
  } else {
    signalsHeader.classList.add('hidden');
    highlightBtn.disabled = true;
  }

  // Show/hide empty hint
  if (data.status === 'no-info') {
    emptyHint.classList.remove('hidden');
  } else {
    emptyHint.classList.add('hidden');
  }
}

function copyResultToClipboard(data) {
  const totalSignals = data.positiveMatches.length + data.negativeMatches.length + data.ambiguousMatches.length;

  let text = `SponsorScan Result\n`;
  text += `━━━━━━━━━━━━━━━━━━\n`;

  const statusLabels = {
    'positive': '✅ Visa Sponsorship Mentioned',
    'negative': '❌ No Visa Sponsorship',
    'unclear': '⚠️ Unclear — Mixed Signals',
    'no-info': 'ℹ️ No Sponsorship Info Found'
  };
  text += `Status: ${statusLabels[data.status] || 'Unknown'}\n`;
  text += `Location: ${data.country}\n`;
  text += `Signals: ${totalSignals}\n`;

  if (data.positiveMatches.length > 0) {
    text += `\n✅ Positive:\n`;
    data.positiveMatches.forEach(m => text += `  • "${m}"\n`);
  }
  if (data.negativeMatches.length > 0) {
    text += `\n❌ Negative:\n`;
    data.negativeMatches.forEach(m => text += `  • "${m}"\n`);
  }
  if (data.ambiguousMatches.length > 0) {
    text += `\n⚠️ Ambiguous:\n`;
    data.ambiguousMatches.forEach(m => text += `  • "${m}"\n`);
  }

  text += `\n— Scanned by SponsorScan`;

  navigator.clipboard.writeText(text).then(() => {
    showToast();
  });
}

function showToast() {
  const toast = document.getElementById('copy-toast');
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 2000);
}

function highlightMatchesOnPage(pos, neg, amb) {
  // Remove previous highlights
  document.querySelectorAll('.sponsorscan-highlight').forEach(el => {
    el.outerHTML = el.textContent;
  });

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  const highlightText = (matches, bgColor, textColor) => {
    if (!matches || matches.length === 0) return;

    const regex = new RegExp(`\\b(${matches.map(escapeRegExp).join('|')})\\b`, 'gi');
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

    let n;
    const nodesToReplace = [];
    while (n = walker.nextNode()) {
      if (n.parentNode &&
        n.parentNode.nodeName !== 'SCRIPT' &&
        n.parentNode.nodeName !== 'STYLE' &&
        n.parentNode.nodeName !== 'MARK' &&
        !n.parentNode.classList?.contains('sponsorscan-highlight') &&
        regex.test(n.nodeValue)) {
        nodesToReplace.push(n);
      }
    }

    nodesToReplace.forEach(n => {
      const span = document.createElement('span');
      const localRegex = new RegExp(`\\b(${matches.map(escapeRegExp).join('|')})\\b`, 'gi');
      span.innerHTML = n.nodeValue.replace(localRegex,
        `<mark class="sponsorscan-highlight" style="background-color: ${bgColor}; color: ${textColor}; padding: 2px 6px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.15); font-weight: 600; text-decoration: none;">$1</mark>`
      );
      n.parentNode.replaceChild(span, n);
    });
  };

  highlightText(pos, '#10b981', 'white');
  highlightText(neg, '#ef4444', 'white');
  highlightText(amb, '#f59e0b', '#1a1a1a');

  // Scroll to the first highlight
  const firstHighlight = document.querySelector('.sponsorscan-highlight');
  if (firstHighlight) {
    firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
