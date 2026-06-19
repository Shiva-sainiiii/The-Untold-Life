/* =========================================================
   खार्कहोदा का मॉनिटर — script.js
   Screen navigation + language state + chapter rendering
   ========================================================= */

(() => {
  'use strict';

  /* ---------------- STATE ---------------- */
  let currentLanguage = localStorage.getItem('lang') || null;
  let currentScreen   = 'landing';
  let currentChapterIndex = 0;

  /* ---------------- UI STRINGS (per language) ---------------- */
  const UI = {
    hinglish: {
      chaptersTitle: 'Chapters',
      chaptersSubtitle: 'Padhne ke liye ek chapter chuniye',
      back: 'Back to Chapters',
      changeLang: 'Change Language',
      prev: '← Pichla',
      next: 'Agla →'
    },
    hindi: {
      chaptersTitle: 'अध्याय',
      chaptersSubtitle: 'पढ़ने के लिए एक अध्याय चुनें',
      back: 'अध्याय सूची पर वापस जाएँ',
      changeLang: 'भाषा बदलें',
      prev: '← पिछला',
      next: 'अगला →'
    },
    english: {
      chaptersTitle: 'Chapters',
      chaptersSubtitle: 'Select a chapter to begin reading',
      back: 'Back to Chapters',
      changeLang: 'Change Language',
      prev: '← Previous',
      next: 'Next →'
    },
    punjabi: {
      chaptersTitle: 'ਅਧਿਆਏ',
      chaptersSubtitle: 'ਪੜ੍ਹਨ ਲਈ ਇੱਕ ਅਧਿਆਏ ਚੁਣੋ',
      back: 'ਅਧਿਆਏ ਸੂਚੀ \'ਤੇ ਵਾਪਸ ਜਾਓ',
      changeLang: 'ਭਾਸ਼ਾ ਬਦਲੋ',
      prev: '← ਪਿਛਲਾ',
      next: 'ਅਗਲਾ →'
    }
  };

  /* ---------------- CHAPTER DATA ----------------
     Replace the placeholder "text" arrays with your real
     autobiography content. Each chapter has a title +
     short excerpt (for the card) + full text (array of
     paragraphs) per language.
  ---------------------------------------------------- */
  const CHAPTERS = {
    hinglish: [
      { title: 'Shuruaat', excerpt: 'Kharkhoda ke gaon se shuru hoti hai yeh kahani...', text: ['Yeh kahani shuru hoti hai Kharkhoda ke ek chhote se gaon se, jahan dhool bhari galiyon mein bachpan beeta...', 'Har subah suraj ki pehli kiran ke saath gaon jag jaata tha, aur usi mein chhupi thi meri zindagi ki pehli yaadein.'] },
      { title: 'Bachpan ke Din', excerpt: 'Maa-baap ke saaye mein guzra woh masoom waqt...', text: ['Bachpan ke din simple the, lekin un mein ek khaas tarah ka sukoon tha jo aaj dhoondhne par bhi nahi milta.', 'School jaane ka raasta, dost, aur woh chhoti chhoti khushiyaan — sab kuch yaad hai mujhe.'] },
      { title: 'Pehla Sangharsh', excerpt: 'Zindagi ne pehli baar mushkil rasta dikhaya...', text: ['Kabhi kabhi zindagi humein achanak hi kisi mod par la kar khada kar deti hai, jahan se peeche jaana mumkin nahi hota.', 'Yeh wahi waqt tha jab maine pehli baar sangharsh ka asli matlab samjha.'] },
      { title: 'Naye Raaste', excerpt: 'Gaon se shehar tak ka safar...', text: ['Gaon ki mitti chhodna aasan nahi tha, lekin naye raaste hamesha nayi sambhavnaayein lekar aate hain.', 'Shehar ki bheed mein khud ko dhoondhna ek alag hi anubhav tha.'] },
      { title: 'Monitor Banne Ka Safar', excerpt: 'Jis pad ne meri pehchaan badal di...', text: ['Monitor banna sirf ek naukri nahi thi, yeh ek zimmedari thi jo poore gaon ke vishwas se judi thi.', 'Har din naye chunauti, naye log, aur naye sabak.'] },
      { title: 'Mushkil Daur', excerpt: 'Jab raaste mein aaye kayi toofan...', text: ['Har safar mein kuch aise pal aate hain jab sab kuch bikharta hua mehsoos hota hai.', 'Lekin unhi pal ne mujhe sabse zyada majboot banaya.'] },
      { title: 'Jeet Aur Sabak', excerpt: 'Har haar ke peeche chhupi thi ek jeet...', text: ['Jeet sirf safalta ka naam nahi hai, balki uss safar ka naam hai jisme hum khud ko behtar banate hain.', 'Mujhe har haar ne kuch naya sikhaya.'] },
      { title: 'Aaj Aur Kal', excerpt: 'Ek nazar peeche, ek ummeed aage ki...', text: ['Aaj jab main peeche mudkar dekhta hoon, toh har mod par ek kahani milti hai.', 'Yeh kitaab usi safar ki ek jhalak hai — Kharkhoda ke Monitor ki kahani.'] }
    ],
    hindi: [
      { title: 'आरंभ', excerpt: 'खार्कहोदा के गाँव से शुरू होती है यह कहानी...', text: ['यह कहानी आरंभ होती है खार्कहोदा के एक छोटे से गाँव से, जहाँ धूल भरी गलियों में बचपन बीता।', 'हर सुबह सूरज की पहली किरण के साथ गाँव जाग उठता था, और उसी में छिपी थीं मेरी ज़िंदगी की पहली यादें।'] },
      { title: 'बचपन के दिन', excerpt: 'माता-पिता के साये में बीता वह मासूम समय...', text: ['बचपन के दिन सरल थे, परंतु उनमें एक विशेष प्रकार का सुकून था जो आज खोजने पर भी नहीं मिलता।', 'विद्यालय जाने का मार्ग, मित्र, और वे छोटी-छोटी खुशियाँ — सब कुछ याद है मुझे।'] },
      { title: 'पहला संघर्ष', excerpt: 'जीवन ने पहली बार कठिन मार्ग दिखाया...', text: ['कभी-कभी जीवन हमें अचानक ही किसी मोड़ पर ला खड़ा करता है, जहाँ से पीछे जाना संभव नहीं होता।', 'यही वह समय था जब मैंने पहली बार संघर्ष का वास्तविक अर्थ समझा।'] },
      { title: 'नए मार्ग', excerpt: 'गाँव से शहर तक की यात्रा...', text: ['गाँव की मिट्टी छोड़ना आसान नहीं था, परंतु नए मार्ग सदैव नई संभावनाएँ लेकर आते हैं।', 'शहर की भीड़ में स्वयं को खोजना एक अलग ही अनुभव था।'] },
      { title: 'मॉनिटर बनने की यात्रा', excerpt: 'जिस पद ने मेरी पहचान बदल दी...', text: ['मॉनिटर बनना मात्र एक नौकरी नहीं थी, यह एक उत्तरदायित्व था जो पूरे गाँव के विश्वास से जुड़ा था।', 'प्रत्येक दिन नई चुनौतियाँ, नए लोग, और नए पाठ।'] },
      { title: 'कठिन दौर', excerpt: 'जब मार्ग में आए अनेक तूफान...', text: ['हर यात्रा में कुछ ऐसे क्षण आते हैं जब सब कुछ बिखरता हुआ प्रतीत होता है।', 'परंतु उन्हीं क्षणों ने मुझे सबसे अधिक सुदृढ़ बनाया।'] },
      { title: 'जीत और सबक', excerpt: 'हर हार के पीछे छिपी थी एक जीत...', text: ['जीत केवल सफलता का नाम नहीं है, बल्कि उस यात्रा का नाम है जिसमें हम स्वयं को बेहतर बनाते हैं।', 'मुझे हर हार ने कुछ नया सिखाया।'] },
      { title: 'आज और कल', excerpt: 'एक दृष्टि पीछे, एक आशा आगे की...', text: ['आज जब मैं पीछे मुड़कर देखता हूँ, तो हर मोड़ पर एक कहानी मिलती है।', 'यह पुस्तक उसी यात्रा की एक झलक है — खार्कहोदा के मॉनिटर की कहानी।'] }
    ],
    english: [
      { title: 'The Beginning', excerpt: 'This story begins in the village of Kharkhoda...', text: ['This story begins in the small village of Kharkhoda, where childhood passed through dusty lanes.', 'Every morning the village woke with the first ray of the sun, and within it were hidden the first memories of my life.'] },
      { title: 'Childhood Days', excerpt: 'Innocent days spent under the shade of parents...', text: ['Childhood days were simple, yet they carried a peace that is hard to find even today.', 'The road to school, friends, and those small joys — I remember it all.'] },
      { title: 'The First Struggle', excerpt: 'Life showed its difficult side for the first time...', text: ['Sometimes life suddenly brings us to a turning point from which there is no going back.', 'That was the time I first understood the true meaning of struggle.'] },
      { title: 'New Paths', excerpt: 'A journey from the village to the city...', text: ['Leaving the soil of the village was not easy, but new paths always bring new possibilities.', 'Finding myself in the crowd of the city was a different kind of experience altogether.'] },
      { title: 'Becoming the Monitor', excerpt: 'The role that changed my identity forever...', text: ['Becoming the Monitor was not just a job — it was a responsibility tied to the trust of the entire village.', 'Every day brought new challenges, new people, and new lessons.'] },
      { title: 'The Hard Times', excerpt: 'When many storms came along the way...', text: ['Every journey has moments when everything feels like it is falling apart.', 'But it was those very moments that made me the strongest.'] },
      { title: 'Victory and Lessons', excerpt: 'Behind every defeat was a hidden victory...', text: ['Victory is not just the name of success — it is the name of the journey in which we make ourselves better.', 'Every defeat taught me something new.'] },
      { title: 'Today and Tomorrow', excerpt: 'One glance back, one hope ahead...', text: ['Today, when I look back, I find a story at every turn.', 'This book is a glimpse of that very journey — the story of the Monitor of Kharkhoda.'] }
    ],
    punjabi: [
      { title: 'ਆਰੰਭ', excerpt: 'ਖਾਰਕਹੋਦਾ ਦੇ ਪਿੰਡ ਤੋਂ ਸ਼ੁਰੂ ਹੁੰਦੀ ਹੈ ਇਹ ਕਹਾਣੀ...', text: ['ਇਹ ਕਹਾਣੀ ਖਾਰਕਹੋਦਾ ਦੇ ਇੱਕ ਛੋਟੇ ਜਿਹੇ ਪਿੰਡ ਤੋਂ ਸ਼ੁਰੂ ਹੁੰਦੀ ਹੈ, ਜਿੱਥੇ ਧੂੜ ਭਰੀਆਂ ਗਲੀਆਂ ਵਿੱਚ ਬਚਪਨ ਬੀਤਿਆ।', 'ਹਰ ਸਵੇਰ ਸੂਰਜ ਦੀ ਪਹਿਲੀ ਕਿਰਨ ਨਾਲ ਪਿੰਡ ਜਾਗ ਪੈਂਦਾ ਸੀ, ਅਤੇ ਉਸੇ ਵਿੱਚ ਛੁਪੀਆਂ ਸਨ ਮੇਰੀ ਜ਼ਿੰਦਗੀ ਦੀਆਂ ਪਹਿਲੀਆਂ ਯਾਦਾਂ।'] },
      { title: 'ਬਚਪਨ ਦੇ ਦਿਨ', excerpt: 'ਮਾਪਿਆਂ ਦੇ ਸਾਏ ਹੇਠ ਬੀਤਿਆ ਉਹ ਮਾਸੂਮ ਸਮਾਂ...', text: ['ਬਚਪਨ ਦੇ ਦਿਨ ਸਾਦੇ ਸਨ, ਪਰ ਉਹਨਾਂ ਵਿੱਚ ਇੱਕ ਖਾਸ ਕਿਸਮ ਦਾ ਸਕੂਨ ਸੀ ਜੋ ਅੱਜ ਲੱਭਣ ਤੇ ਵੀ ਨਹੀਂ ਮਿਲਦਾ।', 'ਸਕੂਲ ਜਾਣ ਦਾ ਰਾਹ, ਦੋਸਤ, ਅਤੇ ਉਹ ਛੋਟੀਆਂ ਛੋਟੀਆਂ ਖੁਸ਼ੀਆਂ — ਸਭ ਕੁਝ ਯਾਦ ਹੈ ਮੈਨੂੰ।'] },
      { title: 'ਪਹਿਲਾ ਸੰਘਰਸ਼', excerpt: 'ਜ਼ਿੰਦਗੀ ਨੇ ਪਹਿਲੀ ਵਾਰ ਔਖਾ ਰਾਹ ਦਿਖਾਇਆ...', text: ['ਕਈ ਵਾਰ ਜ਼ਿੰਦਗੀ ਸਾਨੂੰ ਅਚਾਨਕ ਹੀ ਕਿਸੇ ਮੋੜ \'ਤੇ ਲਿਆ ਖੜ੍ਹਾ ਕਰਦੀ ਹੈ, ਜਿੱਥੋਂ ਪਿੱਛੇ ਜਾਣਾ ਸੰਭਵ ਨਹੀਂ ਹੁੰਦਾ।', 'ਇਹੀ ਉਹ ਸਮਾਂ ਸੀ ਜਦੋਂ ਮੈਂ ਪਹਿਲੀ ਵਾਰ ਸੰਘਰਸ਼ ਦਾ ਅਸਲ ਅਰਥ ਸਮਝਿਆ।'] },
      { title: 'ਨਵੇਂ ਰਾਹ', excerpt: 'ਪਿੰਡ ਤੋਂ ਸ਼ਹਿਰ ਤੱਕ ਦਾ ਸਫ਼ਰ...', text: ['ਪਿੰਡ ਦੀ ਮਿੱਟੀ ਛੱਡਣੀ ਸੌਖੀ ਨਹੀਂ ਸੀ, ਪਰ ਨਵੇਂ ਰਾਹ ਹਮੇਸ਼ਾ ਨਵੀਆਂ ਸੰਭਾਵਨਾਵਾਂ ਲੈ ਕੇ ਆਉਂਦੇ ਹਨ।', 'ਸ਼ਹਿਰ ਦੀ ਭੀੜ ਵਿੱਚ ਆਪਣੇ ਆਪ ਨੂੰ ਲੱਭਣਾ ਇੱਕ ਵੱਖਰਾ ਹੀ ਅਨੁਭਵ ਸੀ।'] },
      { title: 'ਮਾਨੀਟਰ ਬਣਨ ਦਾ ਸਫ਼ਰ', excerpt: 'ਜਿਸ ਅਹੁਦੇ ਨੇ ਮੇਰੀ ਪਛਾਣ ਬਦਲ ਦਿੱਤੀ...', text: ['ਮਾਨੀਟਰ ਬਣਨਾ ਸਿਰਫ਼ ਇੱਕ ਨੌਕਰੀ ਨਹੀਂ ਸੀ, ਇਹ ਇੱਕ ਜ਼ਿੰਮੇਵਾਰੀ ਸੀ ਜੋ ਪੂਰੇ ਪਿੰਡ ਦੇ ਭਰੋਸੇ ਨਾਲ ਜੁੜੀ ਸੀ।', 'ਹਰ ਦਿਨ ਨਵੀਆਂ ਚੁਣੌਤੀਆਂ, ਨਵੇਂ ਲੋਕ, ਅਤੇ ਨਵੇਂ ਸਬਕ।'] },
      { title: 'ਔਖਾ ਦੌਰ', excerpt: 'ਜਦੋਂ ਰਾਹ ਵਿੱਚ ਆਏ ਕਈ ਤੂਫ਼ਾਨ...', text: ['ਹਰ ਸਫ਼ਰ ਵਿੱਚ ਕੁਝ ਅਜਿਹੇ ਪਲ ਆਉਂਦੇ ਹਨ ਜਦੋਂ ਸਭ ਕੁਝ ਖਿੰਡਦਾ ਮਹਿਸੂਸ ਹੁੰਦਾ ਹੈ।', 'ਪਰ ਉਹਨਾਂ ਪਲਾਂ ਨੇ ਹੀ ਮੈਨੂੰ ਸਭ ਤੋਂ ਮਜ਼ਬੂਤ ਬਣਾਇਆ।'] },
      { title: 'ਜਿੱਤ ਅਤੇ ਸਬਕ', excerpt: 'ਹਰ ਹਾਰ ਦੇ ਪਿੱਛੇ ਛੁਪੀ ਸੀ ਇੱਕ ਜਿੱਤ...', text: ['ਜਿੱਤ ਸਿਰਫ਼ ਸਫਲਤਾ ਦਾ ਨਾਮ ਨਹੀਂ ਹੈ, ਸਗੋਂ ਉਸ ਸਫ਼ਰ ਦਾ ਨਾਮ ਹੈ ਜਿਸ ਵਿੱਚ ਅਸੀਂ ਆਪਣੇ ਆਪ ਨੂੰ ਬਿਹਤਰ ਬਣਾਉਂਦੇ ਹਾਂ।', 'ਮੈਨੂੰ ਹਰ ਹਾਰ ਨੇ ਕੁਝ ਨਵਾਂ ਸਿਖਾਇਆ।'] },
      { title: 'ਅੱਜ ਅਤੇ ਕੱਲ੍ਹ', excerpt: 'ਇੱਕ ਨਜ਼ਰ ਪਿੱਛੇ, ਇੱਕ ਉਮੀਦ ਅੱਗੇ ਦੀ...', text: ['ਅੱਜ ਜਦੋਂ ਮੈਂ ਪਿੱਛੇ ਮੁੜ ਕੇ ਵੇਖਦਾ ਹਾਂ, ਤਾਂ ਹਰ ਮੋੜ \'ਤੇ ਇੱਕ ਕਹਾਣੀ ਮਿਲਦੀ ਹੈ।', 'ਇਹ ਕਿਤਾਬ ਉਸੇ ਸਫ਼ਰ ਦੀ ਇੱਕ ਝਲਕ ਹੈ — ਖਾਰਕਹੋਦਾ ਦੇ ਮਾਨੀਟਰ ਦੀ ਕਹਾਣੀ।'] }
    ]
  };

  /* ---------------- DOM REFS ---------------- */
  const screens = {
    landing: document.getElementById('screen-landing'),
    language: document.getElementById('screen-language'),
    chapters: document.getElementById('screen-chapters'),
    reader: document.getElementById('screen-reader')
  };

  const btnReadBook    = document.getElementById('btn-read-book');
  const langCards       = document.querySelectorAll('.lang-card');
  const btnChangeLang  = document.getElementById('btn-change-lang');
  const chapterListEl  = document.getElementById('chapter-list');
  const chaptersTitleEl = document.getElementById('chapters-title');
  const chaptersSubtitleEl = document.getElementById('chapters-subtitle');

  const btnBackChapters = document.getElementById('btn-back-chapters');
  const langDropdown    = document.getElementById('lang-dropdown');
  const readerLabel     = document.getElementById('reader-chapter-label');
  const readerTitle     = document.getElementById('reader-title');
  const readerText      = document.getElementById('reader-text');
  const btnPrevChapter  = document.getElementById('btn-prev-chapter');
  const btnNextChapter  = document.getElementById('btn-next-chapter');

  /* ---------------- SCREEN NAVIGATION ---------------- */
  function goToScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
    currentScreen = name;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---------------- LANGUAGE HANDLING ---------------- */
  function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('lang', lang);
    langDropdown.value = lang;
  }

  function applyChaptersUI() {
    const t = UI[currentLanguage];
    chaptersTitleEl.textContent = t.chaptersTitle;
    chaptersSubtitleEl.textContent = t.chaptersSubtitle;
    btnChangeLang.querySelector('span') ? null : (btnChangeLang.textContent = t.changeLang);
  }

  function applyReaderUI() {
    const t = UI[currentLanguage];
    btnBackChapters.querySelector('span').textContent = t.back;
    btnPrevChapter.textContent = t.prev;
    btnNextChapter.textContent = t.next;
  }

  /* ---------------- RENDER CHAPTER LIST ---------------- */
  function renderChapterList() {
    applyChaptersUI();
    const list = CHAPTERS[currentLanguage];
    chapterListEl.innerHTML = '';

    list.forEach((ch, index) => {
      const card = document.createElement('button');
      card.className = 'chapter-card';
      card.innerHTML = `
        <span class="chapter-num">Chapter ${index + 1}</span>
        <span class="chapter-name">${ch.title}</span>
        <span class="chapter-excerpt">${ch.excerpt}</span>
        <span class="chapter-arrow">Read →</span>
      `;
      card.addEventListener('click', () => openChapter(index));
      chapterListEl.appendChild(card);
    });
  }

  /* ---------------- OPEN / RENDER CHAPTER CONTENT ---------------- */
  function openChapter(index) {
    currentChapterIndex = index;
    renderReader();
    goToScreen('reader');
  }

  function renderReader() {
    applyReaderUI();
    const ch = CHAPTERS[currentLanguage][currentChapterIndex];

    readerLabel.textContent = `Chapter ${currentChapterIndex + 1} / ${CHAPTERS[currentLanguage].length}`;
    readerTitle.textContent = ch.title;
    readerText.innerHTML = ch.text.map(p => `<p>${p}</p>`).join('');

    btnPrevChapter.disabled = currentChapterIndex === 0;
    btnNextChapter.disabled = currentChapterIndex === CHAPTERS[currentLanguage].length - 1;
    btnPrevChapter.style.opacity = btnPrevChapter.disabled ? 0.35 : 1;
    btnNextChapter.style.opacity = btnNextChapter.disabled ? 0.35 : 1;
    btnPrevChapter.style.pointerEvents = btnPrevChapter.disabled ? 'none' : 'auto';
    btnNextChapter.style.pointerEvents = btnNextChapter.disabled ? 'none' : 'auto';
  }

  /* ---------------- EVENT LISTENERS ---------------- */

  // Landing → Language (or straight to Chapters if lang already saved)
  btnReadBook.addEventListener('click', () => {
    if (currentLanguage) {
      renderChapterList();
      goToScreen('chapters');
    } else {
      goToScreen('language');
    }
  });

  // Language card selection
  langCards.forEach(card => {
    card.addEventListener('click', () => {
      const lang = card.getAttribute('data-lang');
      setLanguage(lang);
      renderChapterList();
      goToScreen('chapters');
    });
  });

  // Change language button (from chapters screen)
  btnChangeLang.addEventListener('click', () => {
    goToScreen('language');
  });

  // Back to chapters (from reader)
  btnBackChapters.addEventListener('click', () => {
    renderChapterList();
    goToScreen('chapters');
  });

  // Floating language dropdown inside reader
  langDropdown.addEventListener('change', (e) => {
    setLanguage(e.target.value);
    renderReader(); // re-render same chapter index in new language
  });

  // Prev / Next chapter navigation
  btnPrevChapter.addEventListener('click', () => {
    if (currentChapterIndex > 0) {
      currentChapterIndex--;
      renderReader();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  btnNextChapter.addEventListener('click', () => {
    if (currentChapterIndex < CHAPTERS[currentLanguage].length - 1) {
      currentChapterIndex++;
      renderReader();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  /* ---------------- INIT ---------------- */
  function init() {
    if (currentLanguage) {
      langDropdown.value = currentLanguage;
    } else {
      currentLanguage = 'hinglish'; // sensible default, not yet saved
    }
    goToScreen('landing');
  }

  document.addEventListener('DOMContentLoaded', init);
})();
