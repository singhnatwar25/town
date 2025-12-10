// Common loader used by all pages: it injects the header and footer templates

async function loadTemplate(path) {
    try {
        const res = await fetch(path);
        if (!res.ok) throw new Error('Network response not ok');
        return res.text();
    } catch (e) {
        console.error('Loading template failed', path, e);
        return null;
    }
}

async function injectTemplates() {
    // inject header
    const headerHTML = await loadTemplate('templates/header.html');
    if (headerHTML) {
        const headerHolder = document.getElementById('site-header');
        if (headerHolder) headerHolder.innerHTML = headerHTML;
    }
    // inject footer
    const footerHTML = await loadTemplate('templates/footer.html');
    if (footerHTML) {
        const footerHolder = document.getElementById('site-footer');
        if (footerHolder) footerHolder.innerHTML = footerHTML;
    }
    // (fonting tool removed) no font panel injected

    // set active nav item
    setActiveNav();

    // (fonting tool removed) no Fonts link handler; Fonts link navigates to index anchor as default
    // dispatch event to let other scripts know templates are injected
    document.dispatchEvent(new Event('templates:injected'));
}

function setActiveNav() {
    // find nav links and set active based on current location
    const navLinks = document.querySelectorAll('.nav-link');
    const url = window.location.href;
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        // if the link is internal and equals the current pathname + hash, mark active
        let linkUrl = new URL(href, window.location.origin);
        // check pathname match
        const samePage = location.pathname.endsWith(linkUrl.pathname);
        // if there's a hash and the page matches, or if pathname matches, set active
        if (samePage || url.includes(href)) {
            // remove previously active
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// fonting handler removed

// Call injectTemplates early
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectTemplates);
} else {
    injectTemplates();
}

// Re-run setActiveNav on history change (for SPAs) - not necessary, but safe
window.addEventListener('popstate', setActiveNav);

