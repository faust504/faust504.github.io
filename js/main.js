// ============================================================================
// CHAPTER 1: THE FOUNDATION - Setting Up Our Data Storage
// ============================================================================
// Think of this entire file as a self-contained "bubble" that doesn't pollute
// the global namespace. It's like having a private room where all our code lives.
(function () {
    // These are our "memory boxes" - empty at first, but they'll hold all the
    // content that makes the website dynamic. Think of them as filing cabinets
    // waiting to be filled with documents.
    let blogPosts = [];      // Will store all blog post data (titles, content, dates)
    let projects = [];       // Will store portfolio project information
    let translations = {};   // Will store text in both English and Indonesian

    // ========================================================================
    // CHAPTER 2: THE DICTIONARY - Loading Language Translations
    // ========================================================================
    // This function is like a bilingual dictionary. It returns an object with
    // all the text on the website in both English and Indonesian. When users
    // click the language toggle, we look up the right translation here.
    function loadStaticTranslations() {
        return {
            en: {
                loading: 'Loading...',
                'tab-main': 'Main',
                'tab-portfolio': 'Portfolio',
                'tab-blog': 'Blog',
                help: 'Help',
                logout: 'Log Out',
                'socials-title': 'Socials',
                'interests-title': 'Interests',
                'interests-text': 'video editing, motion graphics, python, cybersecurity, linux, photography, visual design',
                aka: 'a.k.a',
                bio: 'script kiddie | fluent english and indonesian · trying to learn programming · i use arch btw',
                quote: '"Cogito, ergo sum." -René Descartes',
                next: 'Next:',
                'site-update-title': 'Site Update',
                'site-update-date': 'November 12, 2025',
                'site-update-desc': 'massively updated the website, looks visually more pleasing, feels smoother, added lots of features, improved performance.',
                'music-title': 'Music',
                'music-text': 'reality club, the smiths, mac demarco, radiohead, tyler the creator, tv girl',
                'media-title': 'Visual Media',
                'media-text': 'neon genesis evangelion, breaking bad, 500 days of summer, bladerunner 2049, fight club',
                'games-title': 'Games',
                'games-text': 'minecraft, roblox, pubgm, free fire, chess, singleplayer story games.',
                thanks: 'thanks for visiting!!!',
                fyi: "claude helped me make this",
                'skills-title': 'Skills & Expertise',
                'skills-subtitle': "what i'm good at",
                'portfolio-heading': 'My Projects',
                'portfolio-subheading': 'a collection of all of my (public) projects',
                'blog-heading': 'Blog Posts',
                'blog-subheading': 'all of my previous blog posts'
            },
            id: {
                loading: 'Loading...',
                'tab-main': 'Utama',
                'tab-portfolio': 'Portofolio',
                'tab-blog': 'Blog',
                help: '    Info',
                logout: 'Keluar',
                'socials-title': 'Media Sosial',
                'interests-title': 'Minat',
                'interests-text': 'video editing, motion graphics, python, cybersecurity, linux, fotografi, desain visual',
                aka: 'alias',
                bio: 'script kiddie | fasih bahasa inggris dan indonesia · belajar programming · arch btw',
                quote: '"Cogito, ergo sum." -René Descartes',
                next: 'Selanjutnya:',
                'site-update-title': 'Update Website',
                'site-update-date': '12 November 2025',
                'site-update-desc': 'update besar ke website, lebih enak dilihat, terasa lebih smooth, penambahan fitur banyak, update performa.',
                'music-title': 'Musik',
                'music-text': 'reality club, the smiths, mac demarco, radiohead, tyler the creator, tv girl',
                'media-title': 'Media Visual',
                'media-text': 'neon genesis evangelion, breaking bad, 500 days of summer, bladerunner 2049, fight club',
                'games-title': 'Game',
                'games-text': 'minecraft, roblox, pubgm, free fire, catur, game cerita singleplayer.',
                thanks: 'terima kasih sudah berkunjung!!!',
                fyi: "ini bikinnya dibantu claude",
                'skills-title': 'Keahlian & Kemampuan',
                'skills-subtitle': 'apa aja yang aku pro di bidangnya',
                'portfolio-heading': 'Proyekku',
                'portfolio-subheading': 'koleksi semua proyekku (yang publik)',
                'blog-heading': 'Postingan Blog',
                'blog-subheading': 'postinganku sebelumnya'
            }
        };
    }

    // ========================================================================
    // CHAPTER 3: THE LOADER - Fetching Content from Data Files
    // ========================================================================
    // Think of this as the "librarian" function. It goes to fetch books (data)
    // from the library (data files). We try two methods:
    // 1. Check if data was already loaded via <script> tags (faster, works offline)
    // 2. If not, try fetching the JSON files (backup method)
    async function loadData() {
        try {
            // Check if data scripts are loaded
            if (window.blogPostsData) {
                blogPosts = window.blogPostsData;
            } else {
                console.warn('Blog data script not loaded, checking fetch...');
                // Fallback attempt (unlikely to work if script failed, but good for structure)
                try {
                    const res = await fetch('data/blog_posts.json');
                    blogPosts = await res.json();
                } catch (e) { console.error("Failed to load blog posts", e); }
            }

            if (window.projectsData) {
                projects = window.projectsData;
            } else {
                console.warn('Project data script not loaded, checking fetch...');
                try {
                    const res = await fetch('data/projects.json');
                    projects = await res.json();
                } catch (e) { console.error("Failed to load projects", e); }
            }

            translations = loadStaticTranslations();

            renderContent();
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    // ========================================================================
    // CHAPTER 4: THE HTML FACTORIES - Building Dynamic Content
    // ========================================================================
    // These helper functions are like assembly lines in a factory. They take
    // raw data and transform it into ready-to-display HTML. This keeps our
    // code DRY (Don't Repeat Yourself) - we define the template once and
    // reuse it everywhere.

    // FACTORY #1: Portfolio Item Builder
    // Takes project data and stamps out HTML cards for each project.
    // The 'langKey' parameter tells us which language to use (English or Indonesian).
    function renderPortfolioHTML(langKey) {
        return projects.map(project => {
            const p = project[langKey];
            return `
                <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="portfolio-item">
                    <div loading="lazy" class="portfolio-image img-loading" style="background-image:url('${project.image}')"></div>
                    <div class="portfolio-desc">
                        <h4>${p.title}</h4>
                        <p>${p.desc}</p>
                    </div>
                </a>
            `;
        }).join('');
    }

    // FACTORY #2: Blog Item Builder
    // Similar to the portfolio factory, but for blog posts. Each post gets
    // a thumbnail image, title, date, and preview text.
    function renderBlogHTML(langKey) {
        return blogPosts.map(post => {
            const p = post[langKey];
            return `
                <div class="blog-item" data-blog="${post.id}">
                    <div loading="lazy" class="blog-image img-loading" style="background-image:url('${p.image}')"></div>
                    <div class="blog-text">
                        <div class="blog-date">${p.date}</div>
                        <h3>${p.title}</h3>
                        <p>${p.preview}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    // FACTORY #3: The Click Handler Installer
    // After we create blog items, they need to be interactive. This function
    // is like installing doorbells on houses - it makes each blog card clickable
    // so when you click it, the full blog post modal pops up.
    function attachBlogItemListeners() {
        document.querySelectorAll('.blog-item').forEach(item => {
            item.addEventListener('click', () => {
                const blogId = item.getAttribute('data-blog');
                openBlogModal(blogId);
            });
        });
    }

    // FACTORY #4: Featured Blog Updater
    // The main page has a special "featured" blog post (currently blog4, the
    // SPEGA Experience video). This function updates that panel with the correct
    // language and makes it clickable. It's like updating a billboard.
    function updateFeaturedBlog(langKey) {
        const featuredBlogId = 'blog4';  // Hardcoded to always show blog4
        const featuredPost = blogPosts.find(p => p.id === featuredBlogId);
        if (!featuredPost) return;

        const p = featuredPost[langKey];
        const panelLeft = document.querySelector('.panel-left');
        if (!panelLeft) return;

        panelLeft.setAttribute('data-blog', featuredBlogId);
        const textContainer = panelLeft.querySelector('div[style="padding:10px"]');
        if (textContainer) {
            textContainer.innerHTML = `
                <p style="margin:0;font-weight:700;color:var(--accent)">
                    <span>${p.title}</span> 
                    <span style="font-weight:500;color:var(--muted)">• <span>${p.date}</span></span>
                </p>
                <p style="margin-top:6px;color:var(--muted)">${p.preview}</p>
            `;
        }

        // TRICK: Remove old event listeners by cloning the element
        // When we clone a DOM element, it's like making a photocopy - the copy
        // doesn't have any of the event listeners. This prevents duplicate clicks.
        const newPanelLeft = panelLeft.cloneNode(true);
        panelLeft.parentNode.replaceChild(newPanelLeft, panelLeft);

        newPanelLeft.addEventListener('click', (e) => {
            if (e.target.tagName !== 'IFRAME') {
                openBlogModal(featuredBlogId);
            }
        });

        const newTextContainer = newPanelLeft.querySelector('div[style="padding:10px"]');
        if (newTextContainer) {
            newTextContainer.style.cursor = 'pointer';
            newTextContainer.addEventListener('click', (e) => {
                e.stopPropagation();
                openBlogModal(featuredBlogId);
            });
        }
    }

    // ========================================================================
    // CHAPTER 5: THE RENDERER - Painting Content on the Page
    // ========================================================================
    // This is the "master painter" function. It's called when the page first
    // loads and fills in all the dynamic content (projects, blogs, featured post).
    // Think of it as the initial setup that makes the website come alive.
    function renderContent() {
        const lang = document.body.getAttribute('data-lang') || 'id';  // Check current language
        const langKey = lang === 'en' ? 'en' : 'id_ID';  // Convert to data format

        // Render Projects
        const portfolioGrid = document.querySelector('.portfolio-grid');
        if (portfolioGrid) {
            portfolioGrid.innerHTML = renderPortfolioHTML(langKey);
        }

        // Render Blog List
        const blogGrid = document.querySelector('.blog-grid');
        if (blogGrid) {
            blogGrid.innerHTML = renderBlogHTML(langKey);
            attachBlogItemListeners();
        }

        // Render Featured Blog
        updateFeaturedBlog(langKey);

        updateLanguage(lang);
        setupImageLoading();
    }

    // Kick off the data loading process as soon as this script runs
    loadData();

    // ========================================================================
    // CHAPTER 6: THE TRANSLATOR - Managing Language Switching
    // ========================================================================
    // These variables grab the language toggle button and related elements.
    // Think of this section as the "translation control panel" for the website.
    const langToggle = document.getElementById('langToggle');
    const langSlider = document.getElementById('langSlider');
    const body = document.body;

    // Check if the user has a saved language preference (like a bookmark)
    // If not, default to Indonesian ('id')
    const savedLang = localStorage.getItem('language') || 'id';
    body.setAttribute('data-lang', savedLang);
    updateLanguage(savedLang);

    // THE TRANSLATOR FUNCTION
    // This is the "universal translator" - it updates ALL text on the page
    // to match the selected language. It's like flipping a switch that changes
    // every sign in a building from English to Indonesian (or vice versa).
    function updateLanguage(lang) {
        langSlider.textContent = lang.toUpperCase();  // Update the toggle button text

        // STEP 1: Update static text elements
        // Loop through every element with a 'data-translate' attribute and
        // replace its text with the translation from our dictionary.
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // STEP 2: Re-render dynamic content (projects, blogs)
        // Static translations handle things like button labels, but we also need
        // to re-render the project and blog cards because their titles and
        // descriptions come from the data files, not the translation dictionary.
        if (blogPosts.length > 0 && projects.length > 0) {
            const langKey = lang === 'en' ? 'en' : 'id_ID';

            const portfolioGrid = document.querySelector('.portfolio-grid');
            if (portfolioGrid) {
                portfolioGrid.innerHTML = renderPortfolioHTML(langKey);
            }

            const blogGrid = document.querySelector('.blog-grid');
            if (blogGrid) {
                blogGrid.innerHTML = renderBlogHTML(langKey);
                attachBlogItemListeners();
            }

            updateFeaturedBlog(langKey);
        }

        // STEP 3: Update the blog modal if it's currently open
        // If someone is reading a blog post when they switch languages,
        // we need to reload the modal content in the new language.
        const blogModal = document.getElementById('blogModal');
        if (blogModal.classList.contains('show')) {
            const currentBlogId = blogModal.getAttribute('data-current-blog');
            if (currentBlogId) {
                updateBlogModalContent(currentBlogId, lang);
            }
        }

        // Refresh image loading states for newly rendered content
        setupImageLoading();
    }

    // Update the modal's content when language changes (helper function)
    function updateBlogModalContent(blogId, lang) {
        // Find blog post in array
        const postData = blogPosts.find(p => p.id === blogId);
        if (!postData) return;

        const langKey = lang === 'en' ? 'en' : 'id_ID';
        const post = postData[langKey];

        if (post) {
            document.getElementById('blogModalTitle').textContent = post.title;
            document.getElementById('blogModalDate').textContent = post.date;
            document.getElementById('blogModalContent').innerHTML = marked.parse(post.content);
        }
    }

    // LANGUAGE TOGGLE CLICK HANDLER
    // When the user clicks the language toggle, flip between 'en' and 'id',
    // save the preference, and update everything on the page.
    langToggle.addEventListener('click', () => {
        const currentLang = body.getAttribute('data-lang');
        const newLang = currentLang === 'en' ? 'id' : 'en';
        body.setAttribute('data-lang', newLang);
        localStorage.setItem('language', newLang);
        updateLanguage(newLang);
    });

    // ========================================================================
    // CHAPTER 7: THE THEME SWITCHER - Light Mode vs Dark Mode
    // ========================================================================
    // Similar to language switching, but for visual themes. Think of this as
    // the "light switch" for the entire website's color scheme.
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // THE ICON UPDATER
    // Changes the sun/moon icon in the theme toggle button to match the current theme.
    // It's like changing the picture on a light switch to show whether it's on or off.
    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.innerHTML = '<circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2"/><line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2"/><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2"/><line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2"/><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2"/>';
        } else {
            themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>';
        }
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        updateProgressFill();
    });

    // ========================================================================
    // CHAPTER 8: THE IMAGE LOADER - Making Images Appear Smoothly
    // ========================================================================
    // This function handles the "loading spinner" effect for images. Instead of
    // images popping in instantly (which looks jarring), we show a spinner while
    // they load, then fade them in smoothly. It's like a curtain reveal.
    function setupImageLoading() {
        const images = document.querySelectorAll('.img-loading img');
        images.forEach(img => {
            if (img.complete) {
                img.parentElement.classList.add('loaded');
            } else {
                img.addEventListener('load', () => {
                    img.parentElement.classList.add('loaded');
                });
            }
        });

        // Handle background images (used in portfolio and blog thumbnails)
        // These are trickier because CSS background-image doesn't have a 'load' event,
        // so we create a temporary Image object to detect when loading finishes.
        const bgImages = document.querySelectorAll('.portfolio-image.img-loading, .blog-image.img-loading');
        bgImages.forEach(el => {
            const bgUrl = el.style.backgroundImage.match(/url\(['"]?(.*?)['"]?\)/);
            if (bgUrl) {
                const img = new Image();
                img.onload = () => {
                    el.classList.add('loaded');
                };
                img.onerror = () => {
                    // Even on error, remove the spinner
                    el.classList.add('loaded');
                    console.warn('Failed to load image:', bgUrl[1]);
                };
                img.src = bgUrl[1];
            } else {
                // No background image found, just mark as loaded
                el.classList.add('loaded');
            }
        });
    }

    // LOADING SCREEN FADE-OUT
    // When the page finishes loading, hide the loading screen after a short delay.
    // The 500ms delay ensures smooth animations don't get cut off abruptly.
    window.addEventListener('load', () => {
        setupImageLoading();
        setTimeout(() => {
            // Check if loadingScreen exists
            const ls = document.getElementById('loadingScreen');
            if (ls) ls.classList.add('hidden');
        }, 500);
    });

    // ========================================================================
    // CHAPTER 9: THE MUSIC PLAYER - Your Personal DJ
    // ========================================================================
    // This section creates a fully functional music player with a playlist.
    // Think of it as a mini-Spotify built into the website.

    // THE PLAYLIST - Our music library
    // Each song is an object with title, artist, audio URL, and cover art.
    const playlist = [
        {
            title: "hated in the nation",
            artist: "Hindia",
            url: "https://files.catbox.moe/nsawi9.mp3",
            cover: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Doves%2C_%2725_on_Blank_Canvas.jpg"
        },
        {
            title: "Cherry Waves",
            artist: "Deftones",
            url: "https://files.catbox.moe/9ozx2x.mp3",
            cover: "https://upload.wikimedia.org/wikipedia/en/9/99/Saturday_night_wrist.jpg"
        },
        {
            title: "SLOW DANCING IN THE DARK",
            artist: "Joji",
            url: "https://files.catbox.moe/tmvah0.mp3",
            cover: "https://i.scdn.co/image/ab67616d0000b2736015d4763f2053b3a3d85459"
        },
        {
            title: "Answer",
            artist: "Tyler, The Creator",
            url: "https://files.catbox.moe/4h4ico.mp3",
            cover: "https://upload.wikimedia.org/wikipedia/en/f/fd/Wolf_Cover2.jpg"
        },
        {
            title: "rose",
            artist: "jaydes",
            url: "https://files.catbox.moe/7df2ub.mp3",
            cover: "https://images.genius.com/1799af58aee9438b05d3f7a0519968a9.1000x1000x1.png"
        }
    ];

    // Start at a random song (like shuffle on first play)
    let currentTrackIndex = Math.floor(Math.random() * playlist.length);

    // Grab all the player controls and display elements from the DOM
    // These are like the buttons and screens on a physical music player.
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('currentTime');
    const totalTimeEl = document.getElementById('totalTime');
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const discordBtn = document.getElementById('discordBtn');
    const minimizeBtn = document.getElementById('minimizeBtn');
    const maximizeBtn = document.getElementById('maximizeBtn');
    const closeBtn = document.getElementById('closeBtn');
    const mainWindow = document.getElementById('mainWindow');
    const easterEgg = document.getElementById('easterEgg');
    const helpBtn = document.getElementById('helpBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const recordArt = document.getElementById('recordArt');
    const recordImg = document.getElementById('recordImg');
    const trackTitle = document.getElementById('trackTitle');
    const trackArtist = document.getElementById('trackArtist');
    const nextTrack = document.getElementById('nextTrack');
    const blogModal = document.getElementById('blogModal');
    const blogModalClose = document.getElementById('blogModalClose');
    const blogModalTitle = document.getElementById('blogModalTitle');
    const blogModalDate = document.getElementById('blogModalDate');
    const blogModalContent = document.getElementById('blogModalContent');
    const blogModalImage = document.getElementById('blogModalImage');
    const blogModalVideo = document.getElementById('blogModalVideo');
    const blogModalYoutube = document.getElementById('blogModalYoutube');

    // Create the actual audio player (invisible, controlled by our custom UI)
    let audio = new Audio();
    let animationId = null;  // For smooth progress bar updates
    let dragging = false;    // Prevents jumpy progress bar when user is dragging it
    let audioLoaded = false; // Tracks whether we've loaded the audio file yet

    // THE TRACK LOADER
    // This function "loads" a song into the player. It's like putting a CD in a player.
    // The 'autoLoad' parameter determines if we actually load the audio file or just
    // show the track info (saves bandwidth if user hasn't clicked play yet).
    function loadTrack(index, autoLoad = false) {
        const track = playlist[index];

        // only set src if we want to preload
        if (autoLoad) {
            audio.src = track.url;
            audio.load();
            audioLoaded = true;
        } else {
            // store the song URL but don't load yet
            audio.src = '';
            audioLoaded = false;
        }

        recordImg.src = track.cover;
        trackTitle.textContent = track.title;
        trackArtist.textContent = track.artist;

        const nextIndex = (index + 1) % playlist.length;
        nextTrack.textContent = `${playlist[nextIndex].title} - ${playlist[nextIndex].artist}`;
    }

    // TIME FORMATTER
    // Converts seconds (e.g., 125) into MM:SS format (e.g., "02:05")
    // Like the digital clock on a car stereo.
    function formatTime(s) {
        if (!isFinite(s)) return '00:00';
        s = Math.max(0, Math.floor(s));
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return (m < 10 ? '0' + m : m) + ':' + (sec < 10 ? '0' + sec : sec);
    }

    // PROGRESS BAR STYLER
    // Updates the visual fill of the progress bar to match the current position.
    // It's like the colored portion of a loading bar growing from left to right.
    function updateProgressFill() {
        const percent = progress.value || 0;
        const fillColor = 'var(--accent)';
        const trackColor = 'var(--border)';

        progress.style.background = `linear-gradient(to right, ${fillColor} ${percent}%, ${trackColor} ${percent}%)`;
    }

    function updateUI() {
        const t = audio.currentTime || 0;
        const d = audio.duration || 0;
        if (!dragging && isFinite(d) && d > 0) {
            const percent = Math.round((t / d) * 100);
            progress.value = Math.min(100, Math.max(0, percent));
        }
        currentTimeEl.textContent = formatTime(t);
        totalTimeEl.textContent = formatTime(d);
        updateProgressFill();
    }

    function animate() {
        updateUI();
        if (!audio.paused) {
            animationId = requestAnimationFrame(animate);
        }
    }

    function updatePlayBtn(playing) {
        playBtn.textContent = playing ? '⏸' : '▶';
        recordArt.classList.toggle('spinning', playing);
    }

    function togglePlay() {
        // if audio hasn't been loaded yet, load it now
        if (!audioLoaded) {
            const track = playlist[currentTrackIndex];
            audio.src = track.url;
            audio.load();
            audioLoaded = true;
        }

        if (audio.paused) {
            audio.play().catch(err => console.log('Playback prevented:', err));
        } else {
            audio.pause();
        }
    }

    playBtn.addEventListener('click', togglePlay);

    function playPrevious() {
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        const wasPlaying = !audio.paused;
        loadTrack(currentTrackIndex, wasPlaying);
        if (wasPlaying) {
            audio.play().catch(err => console.log('Playback prevented:', err));
        }
    }

    prevBtn.addEventListener('click', playPrevious);

    function playNext() {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        const wasPlaying = !audio.paused;
        loadTrack(currentTrackIndex, wasPlaying);
        if (wasPlaying) {
            audio.play().catch(err => console.log('Playback prevented:', err));
        }
    }

    nextBtn.addEventListener('click', playNext);

    // ========================================================================
    // CHAPTER 10: KEYBOARD SHORTCUTS - Power User Features
    // ========================================================================
    // This listener enables keyboard controls for the music player and blog modal.
    // It's like hotkeys in a video game - faster than clicking!
    document.addEventListener('keydown', (e) => {
        // Ignore keypresses if user is typing in an input field
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        // If blog modal is open, only handle Escape key to close it
        if (blogModal.classList.contains('show')) {
            if (e.key === 'Escape') {
                closeBlogModal();
            }
            return;
        }

        // Music player keyboard shortcuts:
        // Space = Play/Pause, Left Arrow = Previous, Right Arrow = Next
        switch (e.code) {
            case 'Space':
                e.preventDefault();
                togglePlay();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                playPrevious();
                break;
            case 'ArrowRight':
                e.preventDefault();
                playNext();
                break;
        }
    });

    progress.max = 100;
    progress.addEventListener('input', () => {
        dragging = true;
        const pct = progress.value / 100;
        const d = audio.duration || 0;
        if (isFinite(d)) {
            const newT = pct * d;
            currentTimeEl.textContent = formatTime(newT);
        }
        updateProgressFill();
    });

    progress.addEventListener('change', () => {
        const pct = progress.value / 100;
        const d = audio.duration || 0;
        if (isFinite(d)) {
            audio.currentTime = pct * d;
        }
        dragging = false;
        updateUI();
    });

    audio.addEventListener('loadedmetadata', updateUI);
    audio.addEventListener('timeupdate', () => {
        if (!dragging) updateUI();
    });

    audio.addEventListener('play', () => {
        updatePlayBtn(true);
        if (animationId) cancelAnimationFrame(animationId);
        animationId = requestAnimationFrame(animate);
    });

    audio.addEventListener('pause', () => {
        updatePlayBtn(false);
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    });

    audio.addEventListener('ended', () => {
        updatePlayBtn(false);
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
        audio.play().catch(err => console.log('Playback prevented:', err));
    });

    discordBtn.addEventListener('click', () => {
        const currentLang = body.getAttribute('data-lang');
        if (currentLang === 'id') {
            alert('discord tidak mendukung tautan profil, kirim pesan saya di @squidard (id discord saya)');
        } else {
            alert('discord doesn\'t support profile links, message me instead @squidard (my discord user)');
        }
    });

    // ========================================================================
    // EASTER EGGS & WINDOW CONTROLS - Fun Interactions
    // ========================================================================
    // These handlers make the window controls (minimize, maximize, close) interactive.
    // They're mostly for fun - this is a website, not a real desktop app!

    // MINIMIZE BUTTON - Shows a surprise image for 3 seconds
    minimizeBtn.addEventListener('click', () => {
        mainWindow.classList.add('minimized');
        setTimeout(() => {
            easterEgg.classList.add('show');
            setTimeout(() => {
                easterEgg.classList.remove('show');
                setTimeout(() => {
                    mainWindow.classList.remove('minimized');
                }, 300);
            }, 1000);
        }, 300);
    });

    maximizeBtn.addEventListener('click', () => {
        mainWindow.classList.toggle('maximized');
    });

    closeBtn.addEventListener('click', () => {
        window.location.href = 'assets/images/rick.gif';
    });

    helpBtn.addEventListener('click', () => {
        window.location.href = 'https://github.com/faust504/faust504.github.io';
    });

    logoutBtn.addEventListener('click', () => {
        const currentLang = body.getAttribute('data-lang');
        if (currentLang === 'id') {
            alert('keluar...???');
        } else {
            alert('log out...???');
        }
    });

    tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            tabContents.forEach(content => content.style.display = 'none');
            document.getElementById(`${tabId}-tab`).style.display = 'flex';

            setTimeout(setupImageLoading, 100);
        });
    });

    // ========================================================================
    // CHAPTER 11: THE BLOG MODAL - Full-Screen Blog Post Viewer
    // ========================================================================
    // This function opens the blog modal (like a popup window) and fills it
    // with the selected blog post's content. It's like clicking a thumbnail
    // to see the full-size image, but for blog posts.
    function openBlogModal(blogId) {
        const postData = blogPosts.find(p => p.id === blogId);

        if (postData) {
            const currentLang = document.body.getAttribute('data-lang') || 'id';
            const langKey = currentLang === 'en' ? 'en' : 'id_ID';
            const post = postData[langKey];

            if (post) {
                blogModalTitle.textContent = post.title;
                blogModalDate.textContent = post.date;
                blogModalContent.innerHTML = marked.parse(post.content);

                // Reset all media elements (hide them and clear their sources)
                // This prevents multiple videos/images from showing at once.
                blogModalImage.style.display = 'none';
                blogModalImage.src = '';
                blogModalVideo.style.display = 'none';
                blogModalVideo.pause();
                blogModalVideo.src = '';
                blogModalYoutube.style.display = 'none';
                blogModalYoutube.src = '';

                // SMART MEDIA DETECTION
                // Figure out what type of media to show: YouTube embed, video file, or image.
                // Priority: video_url field > YouTube URL in image field > .mp4 file > regular image
                let isVideo = postData.is_video_url;
                let videoUrl = post.video_url || (post.image && (post.image.includes('youtube.com') || post.image.includes('youtu.be')) ? post.image : null);

                if (videoUrl && (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be'))) {
                    blogModalYoutube.src = videoUrl;
                    blogModalYoutube.style.display = 'block';
                } else if (post.image && (post.image.endsWith('.mp4') || isVideo)) {
                    blogModalVideo.src = post.image;
                    blogModalVideo.style.display = 'block';
                } else if (post.image) {
                    blogModalImage.src = post.image;
                    blogModalImage.style.display = 'block';
                }

                blogModal.classList.add('show');
                blogModal.setAttribute('data-current-blog', blogId);
                document.body.style.overflow = 'hidden';
            }
        }
    }

    // THE MODAL CLOSER
    // Centralized function to close the blog modal and clean up.
    // It's like turning off all the lights and locking the door when leaving a room.
    function closeBlogModal() {
        blogModal.classList.remove('show');
        blogModal.removeAttribute('data-current-blog');
        document.body.style.overflow = '';  // Re-enable page scrolling
        blogModalVideo.pause();  // Stop any playing video
        blogModalYoutube.src = '';  // Unload YouTube iframe to stop playback
    }

    /* 
    Event listeners for blog items are now handled in renderContent() 
    since they are dynamic elements.
    */

    /*
    Specific featured blog card listener is also handled in renderContent()
    */

    // MODAL CLOSE HANDLERS
    // Three ways to close the modal:
    // 1. Click the X button
    // 2. Click outside the modal (on the dark background)
    // 3. Press Escape key (handled in keyboard shortcuts section above)
    blogModalClose.addEventListener('click', closeBlogModal);

    blogModal.addEventListener('click', (e) => {
        if (e.target === blogModal) {
            closeBlogModal();
        }
    });

    // ========================================================================
    // CHAPTER 12: INITIALIZATION - Starting Everything Up
    // ========================================================================
    // These final lines kick off the music player and set initial states.
    // Think of this as the "ignition" that starts the engine.
    loadTrack(currentTrackIndex, false);  // Load first song (but don't play yet)
    updateProgressFill();  // Set progress bar to 0%
})();  // End of the self-contained function - everything above stays private!
