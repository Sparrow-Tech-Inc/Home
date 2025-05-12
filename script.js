
    document.addEventListener('DOMContentLoaded', function() {
        const versionKey = 'html_version';
        const loader = document.getElementById('loader-overlay');
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const html = document.documentElement;

        // Theme toggle functionality
        themeToggle.addEventListener('click', function() {
            if (html.getAttribute('data-bs-theme') === 'dark') {
                html.setAttribute('data-bs-theme', 'light');
                themeIcon.className = 'bi bi-moon-fill';
                localStorage.setItem('theme', 'light');
            } else {
                html.setAttribute('data-bs-theme', 'dark');
                themeIcon.className = 'bi bi-sun-fill';
                localStorage.setItem('theme', 'dark');
            }
        });

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        html.setAttribute('data-bs-theme', savedTheme);
        themeIcon.className = savedTheme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';

        // Version check
        fetch('version.txt?t=' + new Date().getTime())
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.text();
            })
            .then(serverVersion => {
                const newVersion = serverVersion.trim();
                const savedVersion = localStorage.getItem(versionKey);

                if (savedVersion !== newVersion) {
                    localStorage.setItem(versionKey, newVersion);
                    location.reload(true);
                } else if (loader) {
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 500);
                }
            })
            .catch(err => {
                console.error("Version check failed:", err);
                if (loader) {
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 500);
                }
            });
    });
    
