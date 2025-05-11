
const versionKey = 'html_version';

fetch('version.txt?t=' + new Date().getTime())
  .then(res => res.text())
  .then(serverVersion => {
    const newVersion = serverVersion.trim();
    const savedVersion = localStorage.getItem(versionKey);

    if (savedVersion !== newVersion) {
      localStorage.setItem(versionKey, newVersion);
      location.reload(true); // 🔄 Reload with cache bypass
    } else {
      // 🟢 Hide loader if version is same
      const loader = document.getElementById('loader-overlay');
      if (loader) loader.style.display = 'none';
    }
  })
  .catch(err => {
    console.error("Version check failed:", err);
    // Still hide loader even on error
    const loader = document.getElementById('loader-overlay');
    if (loader) loader.style.display = 'none';
  });
