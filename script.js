/* =========================================================
   खार्कहोदा का मॉनिटर — script.js v2
   Fixes: DOMContentLoaded race, btnChangeLang span check,
          reader scroll, progress bar, ripple, stagger cards
   ========================================================= */

(() => {
  'use strict';

  /* ---------------- STATE ---------------- */
  let currentLanguage = null;
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
      back: 'अध्याय सूची पर वापस',
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
      back: 'ਅਧਿਆਏ ਸੂਚੀ \'ਤੇ ਵਾਪਸ',
      changeLang: 'ਭਾਸ਼ਾ ਬਦਲੋ',
      prev: '← ਪਿਛਲਾ',
      next: 'ਅਗਲਾ →'
    }
  };

  /* ---------------- CHAPTER DATA ---------------- */
  const CHAPTERS = {
  hinglish: [

    // ─── Chapter 1 ───────────────────────────────────────────────────────────
    {
      title: 'Shuruaat',
      excerpt: 'Kharkhoda ke gaon se shuru hoti hai yeh kahani...',
      text: [`
Mera janam 3 October 2006 ko Uttar Pradesh ke Rampur jile ke ek chhote se, gumnaam lekin behad khoobsurat gaon 'Punjab Nagar' me hua tha. Humara gaon bhale hi chhota tha, lekin wahan ke log behad hansmukh, seedhe aur ek-dusre ke sukh-dukh me khade hone wale the. Gaon ki hawa me kheton ki saundhi mehak thi aur subah ki shuruaat pakshiyon ki chahchahat aur tractoron ki awaaz se hoti thi.

Mere papa ek seedhe-saadhe, nek dil aur behad mehnati kisaan the. Unke liye unke khet hi unki duniya the. Subah suraj ugne se pehle hi wo apne kandhe par gamcha daale kheton ki taraf nikal jaate the. Meri mummy ek housewife thi, jo sirf ghar hi nahi sambhalti thi, balki jab bhi kheton me kaam zyada hota, to wo papa ki madad karne ke liye kheton me bhi chali jaati thi. Mujhe aaj bhi yaad hai, dopahar ki kadakti dhoop me mummy apne aanchal se paseena ponchhti hui, ek haath me paani ki bottle aur dusre haath me kapde me lipta dopahar ka garam-garam khana lekar kheton ki pagdandiyon par chalti thi. Hum teen bhai-behen the — meri ek badi behen, main, aur humara ek chhota bhai. Humara ye chhota sa parivaar apni is saadgi bhari zindagi me behad khush tha.

Lekin gaon ki is shaant aur khushhaal zindagi ke peeche, humare hi parivaar me irshya aur nafrat ka ek bahut bada toofaan aakaar le raha tha, jisse hum poori tarah anjaan the.

Mere papa kul 5 bhai aur 1 behen the. Yaani mera ek bada bhara-poora parivaar tha. Isi parivaar me mere dadaji ke ek bhai bhi the yaani mere bade dadaji. Bade dadaji ki apni koi aulaad nahi thi, unka koi ladka nahi tha. Unhone mere papa ke seedhepan, unki seva bhaavna aur unke achhe dil ko dekhkar unhe bachpan me hi adopt kar liya tha. Yahi baat mere papa ke baaki bhaiyon ko khatakne lagi. Unke mann me dheere-dheere ye jalan baithne lagi ki bade dadaji ki nazron me papa itne khaas kyun hain.

Ye jalan tab ek khaufnaak vivaad me badal gayi, jab bade dadaji ne faisla kiya ki wo apni poori sampatti aur khet ki zameen kaanooni taur par mere papa ke naam kar denge. Ye khabar jaise hi ghar me faili, mere sabse bade tauji ki patni yaani humari badi taiji ke pairon tale zameen khisak gayi. Unke mann me laalach aur irshya is kadar haavi ho gayi ki unhone ghar me kalesh shuru kar diya. Unhone saaf kaha, "Ye zameen humare naam karo, is par tumhara koi haq nahi hai."

Gaon ke kuch samajhdaar log jab is baat ko samajh rahe the, to wo is baat se bahut naraaz hue. Kaanoonan aur samaaj ke hisaab se, jab bade dadaji ne mere papa ko god liya tha, to us zameen ke asli aur ekmatra hakdaar mere papa hi the. Gaon ke log tauji ke parivaar ki is chaalaaki ke khilaaf the. Lekin mere papa ka dil bahut bada tha, wo apno ke beech koi khoon-kharaaba ya adalat ka chakkar nahi chahte the. Taiji ki zidd, unki khushi aur parivaar ki shaanti ke liye papa ne ek bada faisla liya. Unhone wo poori zameen chupchaap tauji ke parivaar ko saunp di.

Lekin gaon ke kuch log, jo papa ke saath ho rahi is na-insaafi ko bardaasht nahi kar pa rahe the, unki tauji aur taiji se behas ho gayi. Baat itni badh gayi ki gaon ke wo log tauji se ladaai karne par utaaru ho gaye. Ab yahan par mere papa ke mahaan charitra ka pata chalta hai — jis bhai aur bhabhi ne chaalaaki se unki zameen hadap li thi, papa unki suraksha ke liye un gussaye logon ke saamne khade ho gaye. Papa ne apni jaan ki parwaah kiye bina un aadmi se ladaai ladi aur apne bade tau-tai ko bachakar surakshit ghar bheja.

Papa ne apna farz nibhaya aur apne bhaiyon ko bachaya, lekin wo dabangg log is baat ko bhool nahi paaye. Unke dil me haar aur gusse ki aag sulag rahi thi.

Aur phir... ek kaali, manhoos raat aayi.
Un aadmi ne papa se badla lene aur tauji ko sabak sikhane ke liye ek khaufnaak saazish rachi. Andhere ka faayda uthakar, unhone chhipkar mere bade tauji ko goli maar di. Goli ki wo goonjti awaaz aur tauji ki cheekh ne poore Punjab Nagar ko hila kar rakh diya. Jab tak log ikattha hote, humlaawar bhaag chuke the aur tauji khoon se lathpath zameen par pade the. Is haadse ne humare poore parivaar ko andar tak dara diya. Chaaron taraf rona-peetna mach gaya.

Tauji ke antim sanskaar ke baad, gaon ka mahaul bahut tanaavpoorn ho gaya tha. Humare dadaji aur baaki tau-chachaon ne haath jodkar mere papa se kaha, "Dekho, jin logon ne ye kiya hai, unke nishaane par ab tum aur tumhari family bhi ho sakti hai. Tum yahan gaon me mat raho. Apni biwi aur in chhote-chhote bachchon ki jaan bachane ke liye yahan se door kisi dusre sheher chale jao. Yahan tumhari family ko bahut bada khatra hai."

Papa ne bhaari mann se apne kheton ki taraf dekha, mummy ne us ghar ko dekha jise unhone tinka-tinka jodkar banaya tha. Lekin bachchon ki suraksha sabse upar thi. Raaton-raat, apna wo hansta-khelta gaon, wo zameen, wo yaadein... sab kuch chhodkar humein ek anjaani manzil ki taraf bhaagna pada.
`]
    },

    // ─── Chapter 2 ───────────────────────────────────────────────────────────
    {
      title: 'Bachpan ke Din',
      excerpt: 'Maa-baap ke saaye mein guzra woh masoom waqt...',
      text: [`
*Saal 2010.* Humari manzil thi Haryana ka ek anjaan, ansuna sa sheher — *Kharkhauda (Sonipat)*. Humari ek mausi pehle se yahan rehti thi, aur jab gaon me khoon-kharaba hua aur humari jaan par ban aayi, to unhone hi papa ko yahan ka pata diya tha ki tum log yahan aa jao, yahan koi tumhe dhoond nahi paayega.

4 saal ki umar me mere liye Kharkhauda ek bilkul nayi, ajnabi aur daraavni duniya jaisa tha. Wahan ki boli-bhasha alag thi, wahan ke log alag the, aur wahan ka mahaul humare gaon Punjab Nagar jaisa hara-bhara nahi tha. Hum log yahan akele nahi aaye the. Do parivaar ek saath palayan karke aaye the — mere mummy-papa (hum teen bhai-behen) aur ek tau aur tauji ki patni aur unke chaar bachche (teen ladkiyan aur ek bada ladka). Kul milakar *11 logon ka ek bahut bada parivaar* tha.

Gaon se bhaagte waqt papa ke paas jo thode-bahut paise bache the, use sametkar hum Kharkhauda ki ek tang aur anjaan gali me pahunche. Sabse pehle rehne ke liye ek chhota sa kamra kiraye par liya gaya. Kamre ki deewaren seelan bhari thi aur chhat ke naam par sirf ek aasra tha. Papa ne un bache hue paison se kuch zaroori bartan, thode-bahut kapde aur zinda rehne ke liye zaroori cheezein jodi. Jo insaan kabhi Uttar Pradesh ki upjaau zameen par shaan se kheti karta tha, jiske apne khet the, wo ab is naye sheher me pet paalne ke liye ek thekedaar ke under dihadi mazdoori ka kaam karne laga.

Wo thekedaar papa ko *din ke ₹230* deta tha. Subah se lekar shaam tak haad-tod mehnat karne ke baad jo ₹230 haath me aate the, usi se un 5 insaanon ke jism me saansein chalti thi.

Din to jaise-taise kaam ki aapa-dhaapi me kat jaata tha, lekin asli imtihaan tab shuru hota tha jab suraj dhal jaata aur raat apni kaali chaadar failaati thi. Humare paas sone ke liye ek chataai ya gaddedaar bistar to door, farsh par bichhane ke liye ek maamuli dari tak nahi thi. Papa shaam ko aate waqt kheton aur raaston se fasal ki kati hui sookhi ghaas bator kar laate the. Us kadkadate ya tapte hue pakke farsh par pehle wo sookhi ghaas bichhai jaati, taaki zameen ki chubhan kam ho sake, aur phir uske upar ek patli si chaadar daalkar hum sab 11 log ek saath let jaate the. Garmiyon ke dino me jab umas se dum ghutata aur gala sookhta, to thanda paani peene ke liye humare ghar me fridge nahi tha. Main daudkar padosiyon ke darwaze khatkhatata tha aur unse barf ka ek chhota sa tukda maangkar laata tha, taaki paani peene layak thanda ho sake.

Museebatein yahin khatam nahi hui, paani ki killat ne humara aur imtihaan liya. Kharkhauda me us waqt nalon se jo paani aata tha, wo behad khaara aur namkeen hota tha. Use peene ka matlab tha beemariyon ko daawat dena. Isliye papa ne ek naya routine banaya. Kaam par jaane se pehle ya aane ke baad, wo apni cycle par bade-bade plastic ke dibbe baandhte aur *2 kilometer door* bani ek nahar ki taraf jaate the. Wahan se meetha paani bharkar lana aur phir use sambhal kar rakhna roz ka kaam tha. Ghar me khana banane ke liye gas ka koi connection nahi tha; 8 kilo ka ek chhota sa cylinder aur stove tha, jis par maa parivaar ke liye khana banati thi. Dhuaan aur garmi se us chhote se kamre ka dum ghutne lagta tha, lekin zinda rehne ki zidd sabse badi thi.

Jaise-jaise main thoda bada hua, shaam ko mera bhi mann karta tha ki baahar gali me jaakar baaki bachchon ke saath khelun. Lekin jaise hi main, meri behen ya bhai baahar kadam rakhte, gali ke bachche humein 'baahri' ya 'paraaya' samajhkar chidhane lagte the. Wo humein tarah-tarah ke taane maarte, humari bhasha ka mazaak udaate aur humein pareshan karte the. Nateeja ye hota ki roz humari gali ke bachchon se ladaaiyan hone lagi. Jab hum rote hue ya mitti me sane hue ghar lautte, to mazdoori se thake-haare papa aur pareshan maa ka dil toot jaata.

Aakhirkaar, is roz-roz ke tamashe aur ladaaiyon se tang aakar meri mummy ne ek sakht faisla liya. Unhone humse saaf keh diya, *"Aaj ke baad tumme se koi bhi bachcha ghar ki chaukhat paar karke baahar khelne nahi jaayega."*

Gali ke wo darwaze humare liye hamesha ke liye band ho gaye. Baahar ki hansti-khelti duniya se humara sampark poori tarah kat chuka tha. Us ek chhote se kiraye ke kamre me 11 log qaid hokar reh gaye the. Lekin kismat ka khel dekhiye... baahar khelne par lagi isi paabandi ne mere bheetar ki duniya ko hamesha ke liye badal diya. Jab khelne ke liye koi dost nahi bacha, to mera akelapan door karne ke liye mere haathon me kitabein aane wali thi, jo mujhe aage chalkar school ka 'betaaj baadshah' banane wali thi.
`]
    },

    // ─── Chapter 3 ───────────────────────────────────────────────────────────
    {
      title: 'Pehla Sangharsh',
      excerpt: 'Zindagi ne pehli baar mushkil rasta dikhaya...',
      text: [`
Waqt ka pahiya apni raftaar se ghoom raha tha. Saal 2010 se shuru hua Kharkhauda ka wo ajnabi safar ab saal 2013-2014 ki dehleez par aa khada hua tha. Gali ke bachchon ke taane, unka paraaya samajhna aur maa ki lagayi paabandiyon ke beech main aur meri badi behen ghar ki chaar-deewari me hi bade ho rahe the. Humare paas baahar jaakar duniya dekhne ka ya doston ke saath khelne ka koi mauka nahi tha, lekin humare mummy-papa humari padhai ko lekar behad fikrmand the. Wo jaante the ki agar is tanghaali aur muflisi ke jaal ko kaatna hai, to uska sirf ek hi raasta hai — shiksha.

Isiliye, school bhejhne se pehle papa ne apni jeb se thode paise bachakar humein gali ki hi ek tuition wali aunty ke paas bhejna shuru kiya tha. Wo tuition humare liye kisi vardaan se kam nahi tha. Jahan baaki bachche baahar galiyon me kanche ya gilli-danda khelte, hum us chhote se tuition me baithkar Hindi ki varnamala, ganit ke pahaade (Tables) aur English ke chhote-chhote shabd rata karte the. Ghar me khaali samay bahut tha, to main aur meri behen un aksharon ko apni slate par baar-baar likhte rehte. Humein nahi pata tha ki humari ye khaamosh taiyaari bahut jald ek bada dhamaka karne wali hai.

Aur phir wo subah aayi, jiska humein besabri se intezaar tha. Papa ne us din thekedaar se chhutti li — jiska matlab tha us din ke ₹230 ka nuksaan, lekin bachchon ke bhavishya ke aage wo ₹230 kuch bhi nahi the. Mummy ne humare sabse saaf kapde nikaale, humare baal sanwaare aur hum chaaron — mummy, papa, meri badi behen aur main — Kharkhauda ke sarkari primary school ki taraf chal diye.

Jab hum school ke bade se lohe ke gate ko paar karke seedhe Principal office me daakhil hue, to humare dilon ki dhadkanein tez thi. Office me ek kadak mizaaj, chashma lagaye teacher baithi thi, jinke saamne kai filein khuli thi. Papa ne bade hi sammaan se haath jodkar unhe pranaam kiya aur humara admission karne ki guzarish ki.

Us teacher ne apni teekhi nazron se humein dekha aur sabse pehle meri badi behen ko aage bulaya. Unhone table par haath maarta hua poocha, "Haan bhai ladki, kuch aata-jaata bhi hai ya seedhe daakhila lene aa gaye? Hindi padhni aati hai tumhe?"

Meri behen ne bina dare, poore aatmavishwaas ke saath haan me sar hilaaya. Teacher ne uski pareeksha lene ke liye apni table par rakha us din ka Hindi ka mukhya samaachaar patra (akhbaar) uthaya aur uski taraf badha diya. Unhone ek mushkil si khabar par ungli rakhi aur kaha, "Chalo, ise padhkar sunao."

Office me ajeeb si khaamoshi chha gayi. Papa aur mummy ne ek-dusre ka haath thaam liya, unhe dar tha ki kahin hum ghabra na jaayein. Lekin meri behen ne akhbaar haath me liya aur itni safaai, spashtata aur bina atke itni tez fluency se akhbaar ki surkhiyan aur wo poori khabar padhni shuru ki ki office ka mahaul hi badal gaya. Aaspaas ki kursiyon par baithe baaki teachers bhi apni fileon se nazrein hatakar us chhoti si bachchi ko achambhe se dekhne lage.

Teacher ke chehre par hairaani ke bhaav saaf dikhne lage the. Unhone chashma thoda neeche kiya, apni utsukta ko dabate hue kaha, "Are wah! Hindi to bahut saaf hai iski. Achha, ganit me kya aata hai? 12 ka pahaada (Table) sunao zara."

Meri behen ne ek gehri saans li aur bina ek second ka pause liye, ek hi lay me 12 ka poora pahaada itni tezi aur sureeli awaaz me suna diya ki Principal sahab jo ab tak apni file me vyast the, unhone pen rakh diya aur muskura uthe. Unhone teacher ki taraf dekha aur seedhe shabdon me kaha, "Is bachchi ka base bahut mazboot hai. Ise pehli ya dusri class me bithakar iska waqt zaaya mat karo. Iska admission direct teesri class (3rd Class) me karo!"

Office me maujood har shakhs dang tha. Papa ki aankhon me khushi ke aansu the aur unka seena garv se chauda ho chuka tha.

Ab baari meri thi. Behen ki is zabardast performance ke baad mujh par thoda pressure aa gaya tha. Meri umar chhoti thi, aur main thoda nervous bhi tha. Teacher ne meri taraf dekha aur wahi akhbaar mere saamne sarka diya. Maine apni ghabrahat ko andar dhakela, aksharon par ungli rakhi aur bina ruke fatafat poori shuddhata ke saath Hindi padh di.

Teacher ne muskurate hue kaha, "Bhai wah! Chhota ladka bhi tez hai. Chalo, ab tum pahaada sunao."

Maine apne dimaag ke saare ghode daudaaye. Mujhe us waqt 8 ka pahaada (8th Table) bahut achhe se yaad tha. Maine apni poori taakat sametkar, maano kisi jung ke maidaan me khada hoon, poore josh ke saath 8 ka pahaada sunana shuru kiya aur ant tak bilkul sahi suna diya. Meri umar aur 8 ke pahaade ki is kaabiliyat ko dekhte hue Principal sahab aur teacher ne aapas me kuch baat ki aur faisla sunaya, "Is chhote wale ka admission dusri class (2nd Class) me kiya jaata hai."

Woh din humare poore parivaar ke itihaas me darj ho gaya. Jis parivaar ke paas sone ke liye bistar nahi tha, jiske bachche baahar gali me khel nahi sakte the, aaj us parivaar ke bachchon ne apni shiksha ke dam par school ke sabse bade office me apni kaabiliyat ka loha manwa diya tha. Sarkari school ki wo chaukhat humare liye ek naye aur sunahre safar ki shuruaat thi.
`]
    },

    // ─── Chapter 4 ───────────────────────────────────────────────────────────
    {
      title: 'Naye Raaste',
      excerpt: 'Jis pad ne meri pehchaan badal di...',
      text: [`
Principal office ki wo pareeksha pass karne ke baad, aakhirkaar wo din bhi aa gaya jab mujhe sarkari primary school ki dusri class (2nd Class) me baithna tha. School ka pehla din tha. Kamre ka mahaul mere liye bilkul naya aur thoda daraavna tha. Taat-pattiyon par baithe bachchon ka shor, unki aapsi shararatein aur ajnabi chehre dekhkar main apni ek chhoti si jagah banakar baith gaya.

Tabhi kamre ke darwaze par ek saaya ubhra. Humari Class Incharge ne kamre me entry li. Unke haath me ek moti si attendance register aur kuch kitabein thi. Unke aate hi poore kamre me chhaye shor par achanak break lag gaya aur sannata pasar gaya. Teacher ne podium par apni cheezein rakhi, chashma theek kiya aur ek-ek karke bachchon ke naam pukaarne shuru kiye. Jab haaziri poori ho gayi, to unhone poore kamre me apni nazrein daudaai. Unki nazar achanak mujh par aakar thehar gayi. Shaayad admission ke waqt meri fluency ki charcha staff room tak pahunch chuki thi.

Unhone seedhe meri taraf ungli uthaayi aur kadak awaaz me kaha, "Haan, naye ladke, khade ho jao."

Main apni jagah par seedha khada ho gaya. Mere dil ki dhadkan thodi tez thi. Teacher ne Hindi ki ek moti si textbook uthaayi, ek panna khola aur meri taraf badhte hue wo kitaab mere haathon me thama di. Unhone ek paragraph par ungli rakhkar kaha, "Chalo, ye paath poori class ko zor se padhkar sunao."

Poori class ke bachchon ki nazrein ghoomkar mujh par tik gayin. Sab dekhna chahte the ki ye naya ladka kya karne wala hai. Maine apni ungliyon se kitaab ke pannon ko kasa, ek gehri saans li aur padhna shuru kiya. Gali ki us tuition wali aunty ki daant, shabdon ko baar-baar slate par ghisne ki mehnat aur ghar ki bandishon me ki gayi padhai ab apna rang dikhane wali thi.

Maine jab pehla vaakya padha, to meri awaaz me gazab ka thehraav aur spashtata thi. Maine ek bhi shabd galat nahi bola, na hi main kahin atka. Maatraon ka sahi gyaan aur shabdon ka utaar-chadhaav aisa tha, maano koi anubhavi shikshak padh raha ho. Jaise-jaise main paath me aage badh raha tha, poori class me ek ajeeb sa sannata chha gaya tha. Jo bachche thodi der pehle kaagaz ke rocket bana rahe the, wo bhi munh khole mujhe dekh rahe the.

Jaise hi maine aakhiri line padhkar kitaab band ki, Class Incharge ke chehre par ek gehri santushti aur hairaani ki muskaan thi. Unhone aage badhkar mujhse kitaab wapas li aur poori class ki taraf dekhkar zor se taali bajaayi.

"Bachchon, taali bajao iske liye!" Teacher ne kaha, "Dekho, ise kehte hain padhna. Itni saaf Hindi tumme se koi nahi padh paata." Phir unhone meri taraf dekha, mera kandha thapthapaya aur poori class ke saamne ek bada elaan kar diya, "Aaj se aur isi waqt se, tumhari class ka monitor yahi ladka rahega. Class me jo bhi anushaasanheenta hogi, ye mujhe report karega."

Bhai, wo pal! 7-8 saal ki umar me mere liye wo ehsaas kisi raja ki taajposhi se kam nahi tha. Jo ladka apni hi gali me bachchon ke taanon aur algaav ki wajah se ghar me qaid rehta tha, aaj wo poori class ka leader ban chuka tha. Collar oonchi karke aur seena taankar jab main apni seat par wapas baitha, to wo garv mere chehre par saaf chamak raha tha. 'Kharkhauda ke monitor' ka wo swag mere andar ek alag hi aatmavishwaas bhar chuka tha.

Is monitor ki padvi ne mere bheetar padhai ki ek aisi bhookh jagaayi jo kabhi shaant nahi hui. Choonki mummy ne gali me baahar jaakar khelne par poori tarah paabandi laga rakhi thi, to school se ghar lautne ke baad mere paas waqt hi waqt hota tha. Kamre me na to koi khilauna tha aur na hi koi dost. Aise me mera akelapan door karne ke liye mere paas sirf ek hi sahaara bacha tha — meri school ki kitabein.

Jab khelne ko kuch nahi mila, to mujhe un kitaabon ke pannon, kahaniyon aur kavitaon me ek nayi duniya dikhne lagi. Main khel-khel me hi apni class ka poora syllabus, saari ki saari books mahaz do-teen mahino ke andar padhkar khatam kar deta tha. Jab meri dusri class ki kitabein khatam ho jaati, to main ghar ke kone me rakhi apni badi behen ki teesri class ki kitabein utha laata. Main unhe bhi chaat jaata tha.

Iska sabse bada faayda ye hua ki school me jo syllabus ya paath agle saal shikshak board par padhane wale the, wo main ek saal pehle hi apne bistar par lete-lete yaad karke baitha hota tha. Nateeja ye hua ki jab bhi pareekshaon ke daur aate, mujhe koi tension nahi hoti thi. Har saal jab school ka final result announce hota, to poore school ke saamne ek hi naam goonjta tha. Main apni class me 'First Rank' laata tha aur meri badi behen apni class me top karti thi.

Humare ghar ka wo chhota sa kiraye ka kamra, jahan kabhi farsh ki chubhan chhupane ke liye fasal ki ghaas bichhani padti thi, wahan ab har saal milne wale kaamyaabi ke certificates aur medals sajne lage the. Papa jab mazdoori se thakkar aate aur humare un report cards ko dekhte, to unki saari thakaan ek pal me gayab ho jaati thi.

Waqt apni raftaar se pankh lagakar udta raha aur hum primary school ki dehleez paar kar gaye. Saal badla aur aayi chhathi class (6th Class). Yahan se humare safar me ek aur badlaav aaya. Ab mujhe ladkon ke Govt. Sr. Secondary School me daal diya gaya, aur meri behen ka daakhila Government Girls Senior Secondary School me kara diya gaya. Humare school aur raaste bhale hi alag ho gaye the, lekin padhai ki wo zidd, wo awwal aane ka jazba ab bhi humare khoon me waise hi daud raha tha.
`]
    },

    // ─── Chapter 5 ───────────────────────────────────────────────────────────
    {
      title: 'Monitor Banne Ka Safar',
      excerpt: 'Jis pad ne meri pehchaan badal di...',
      text: [`
Jaise-jaise hum bhai-behen school me awwal aa rahe the, waise-waise Kharkhauda me humare pair bhi jamne lage the. Lekin parivarik taane-baane aur taqdeer ke khel abhi khatam nahi hue the. Waqt badla aur Taiji ki badi beti, yaani meri chacheri behen ki shaadi Delhi ke ek ladke se pakki ho gayi. Shaadi to ne poore parivaar ne milkar dhoomdhaam se nipta di, lekin is shaadi ke baad Taiji ke parivaar ka mann Kharkhauda ke us kiraye ke makaan se poori tarah uchhat gaya. Itne bade parivaar ke saath ek chhote se kiraye ke kamre me ghutate hue ab wo aur zyada din nahi rehna chahte the.

Tau ji aur Tai ji ne milkar ek bada aur chaunkane wala faisla liya. Unhone humare paitrik gaon (Punjab Nagar, Rampur) ki apni bachi hui saari zameen aur hissa bech diya. Us paise ko sametkar wo seedhe West Bengal (Paschim Bengal) chale gaye. Wahan 'Panjipara' naam ke ek ilaake me, railway track ke bilkul kinare unhone ek zameen kharidi aur apna ghar banana shuru kar diya.

Mere mummy-papa Taiji ke parivaar ke bahut kareeb the. Gaon ki us khooni raat ke baad se dono parivaaron ne har ek museebat ka saamna saath milkar kiya tha. Jab Taiji ke parivaar aur humare mamaji ne papa ko salaah di, to papa ne bhi apno par aankh moondkar bharosa kar liya. Papa ne socha ki jab poora parivaar wahan ja raha hai, to humara yahan akele rehna theek nahi. Papa ne bhi Punjab Nagar me bachi hui apni aakhiri khet ki zameen aur gaon ka wo puraana makaan bech diya, jiski yaadein humare dil me basi thi. Us paise se papa ne bhi Panjipara (West Bengal) me Taiji ke naye ghar ke bilkul paas apne hisse ki ek zameen kharid li aur wahan ek makaan khada kar diya.

Zameenein bik gayin, naye ghar ban gaye, lekin kismat ka patta abhi palatna baaki tha. Taiji ka parivaar to Bengal me shift ho gaya, lekin mere mummy-papa ne ek bahut hi door-darshi faisla liya. Unhone mujhse aur meri badi behen se kaha, "Hum chahe daane-daane ko taras jaayein, lekin tum dono ki padhai ke saath koi samjhota nahi hoga." Papa-mummy jaante the ki Kharkhauda me humari padhai bahut achhi chal rahi thi, isliye unhone khud kasht sehne ka faisla kiya. Wo dono parivaaron ki banayi us nayi duniya (Bengal) me rehne nahi gaye, balki humari padhai poori karwane ke liye Kharkhauda ke usi kiraye ke makaan me hi ruk gaye.

Udhar, West Bengal ke Panjipara me Taiji ke parivaar ko ek bhayanak aur dil dehla dene wale sach ka saamna karna pad raha tha. Wo ilaaka had se zyada dehati aur pichhda tha. Monsoon aate hi wahan railway track ke aaspaas bhaari baarish aur baadh (Flood) ka kehar toot padta tha, jisse janjeevan narak ban jaata. Usse bhi badi museebat ye thi ki wo ek bahut kattar Muslim bahul ilaaka tha, aur us poore dehati ilaake me rehne wali akeli Hindu-Hindi bhashi family sirf humare tauji ki thi. Wahan ke kuch sthaniya asamajik tatva unhe baahri samajhkar roz pareshan karne lage, darane-dhamkane lage. Taiji ka parivaar wahan ghutne tekne laga. Aakhirkaar, us roz-roz ke dar aur pratadna se tang aakar unhone wo naya-navela ghar aur zameen chhod di. Wo wahan se bhaagkar Bihar aur West Bengal ke border par base 'Kishanganj' zile me pahunche aur wahan ek nayi zameen lekar jaise-taise apna aashiyana banaya aur rehne lage.

Lekin is poore uthal-puthal ke beech, humare parivaar ke saath ek bahut bada aur kabhi na bharne wala dhokha ho gaya.

Papa ne jo zameen apni poori zindagi ki khoon-paseene ki kamaai aur gaon ke aakhiri khet bechkar Panjipara me kharidi thi, wo ab wahan laawaris aur akeli pad chuki thi. Taiji ka parivaar wahan se jaan bachakar Kishanganj bhaag chuka tha aur hum yahan Kharkhauda me apni padhai me vyast the. Wahan Bengal me humari zameen ki dekhbhaal karne wala ya laathi uthane wala koi nahi bacha tha. Is baat ka faayda uthakar wahan ke dabangg sthaniya logon ne humari poori zameen par avaidh kabza kar liya. Papa ne jab apni zameen wapas paane ki koshish ki, to door hone ki wajah se aur kaanooni pechidagiyon ke kaaran kuch nahi ho paaya. Humare saare paise, humara ghar aur wo zameen hamesha ke liye barbaad ho gaye.

Woh ek aisa jhatka tha jisne papa ki reedh ki haddi tod di thi. Jo insaan apne bachchon ke sir par khud ki chhat ka sapna dekh raha tha, wo ek jhatke me phir se khaali haath ho gaya. Aaj saal 2026 hai, aur is dhokhe ka dard aaj bhi humare parivaar ke seene me chubhta hai. Papa aaj bhi subah se shaam tak haad-tod mazdoori ka kaam karte hain, lekin is kamartod mehngai ke daur me wo sirf ghar ka kharch aur humari padhai ka kharch hi utha paate hain. Itni bachat nahi ho paati ki wo dobara ek naya ghar banane ke liye zameen khareed sakein. Isi wajah se aaj bhi hum Kharkhauda me kiraye ke ghar me rehte hain.

Lekin is kahani ka ek aur khoobsurat pehlu bhi hai. Kehte hain na ki raat jitni kaali hoti hai, subah utni hi chamakdaar hoti hai. Papa ki us mazdoori, maa ke sabr aur hum bhai-behenon ki padhai ki zidd rang laayi. Ek wo daur tha jab humare paas sone ke liye bistar nahi tha, farsh par ghaas bichhani padti thi, paani ke liye 2 kilometer door cycle daudani padti thi aur fridge na hone par padosiyon ke aage barf ke liye haath failana padta tha.

Magar aaj... aaj waqt badal chuka hai. Papa ki din-raat ki mehnat aur humare badhte kadmon ki badolat aaj humare ghar me *do-do double bed* hain, paani ka intezaam hai, apni sukh-suvidha ki har cheez maujood hai. Aaj humari zindagi me har wo sukh-suvidha hai jo ek achhe parivaar ke paas honi chahiye... *haan, bas ek apna khud ka ghar chhod kar.* Lekin humara ye poora parivaar jaanta hai ki jis tarah humne farsh ki ghaas se uthkar aaj saari sukh-suvidhayein haasil ki hain, waise hi ek din hum apni mehnat ke dum par kiraye ki is chhat ko badalkar apne khud ke ghar ki nameplate bhi shaan se lagayenge.
`]
    },

    // ─── Chapter 6 ───────────────────────────────────────────────────────────
    {
      title: 'Mushkil Daur',
      excerpt: 'Jab raaste mein aaye kayi toofan...',
      text: [`
Saal 2016 se lekar 2019 tak ka mera safar Kharkhauda ke ladkon ke Govt. Sr. Secondary School me behad shandaar tareeke se aage badh raha tha. 6th, 7th aur 8th class tak maine apni usi purani zidd ko qaayam rakha tha. School badal chuka tha, ab taat-patti ki jagah bench aa chuki thi aur class ke bachchon ka daayra bhi bada ho gaya tha, lekin padhai ko lekar mera nazariya nahi badla. Main ab bhi apni class ka wahi monitor tha jo padhai ke maamle me kisi ko aage nahi nikalne deta tha. Har saal jab saalana imtihaan ka result aata, to mera naam list me sabse upar yaani 'First Rank' par hota tha. Dusri taraf, meri badi behen bhi apne Girls School me lagataar top kar rahi thi. Kiraye ke us kamre ki deewarein humari kaamyabiyon ke certificates se bharne lagi thi.

Sab kuch ek tay patri par bilkul sahi raftaar se daud raha tha. Papa roz subah kaam par jaate, maa ghar sambhalti, hum bhai-behen apni kitaabon me doobe rehte. Humein lag raha tha ki humari mehnat ka phal humein bahut jald milne wala hai. Lekin tabhi saal 2020 ne dastak di.

Ek aisa saal, jisne sirf mere ya mere parivaar ke nahi, balki poori duniya ke pahiyon par achanak ek bahut shaktishaali break laga diya. *Corona Virus (Covid-19)* ka kehar.

Raaton-raat poore desh me lockdown ka ailaan ho gaya. School ke bade lohe ke gate par taala latak gaya. Jo kitabein kabhi school ke bag me sajti thi aur jinki khushboo mujhe pasand thi, wo achanak ek kone me tham gayin. Sarkar ne padhai ko jaari rakhne ke liye ek naya tareeka nikaala — "Work From Home" aur "Online Classes". Padhai ka ye poora dharra badalna humare jaise middle class aur aarthik roop se kamzor parivaaron ke liye ek bahut bada maansik aur aarthik jhatka tha.

School ke blackboard ki jagah ab mobile ki chhoti si screen ne le li thi. Yahan se ek bahut bada bhedbhaav shuru hua, jisne meri padhai ki raftaar ko dheema kar diya. Jin bachchon ke parivaaron ki aarthik sthiti achhi thi, unhone apne bachchon ko turant mehange smartphones dila diye, personal laptop de diye aur gharon me high-speed Wi-Fi ke connection lagwa diye. Wo bachche is digital daur me bahut aage nikal gaye.

Lekin humare ghar ke haalaat alag the. Ek to papa ki mazdoori lockdown ke kaaran buri tarah prabhavit hui thi, upar se ek hi phone me hum bhai-behenon ko apni-apni classes attend karni padti thi. Us chhote se mobile screen par, jahan baar-baar network gayab ho jaata tha, kabhi teacher ki awaaz dhundhli aati thi to kabhi screen black ho jaati thi, padhai karna mere liye kisi bure sapne jaisa tha. Wo ekagrata jo kitaabon ke pannon ko chhookar aur classroom me teacher ke saamne baithkar banti thi, wo is online duniya ke shor me kahin kho gayi. Main chahkar bhi us tarah focus nahi kar pa raha tha jaisa main hamesha se karta aaya tha.

Nateeja ye hua ki jo ladka bachpan se apni class me hamesha First aata tha, jiska score hamesha top par rehta tha, Corona kaal ki is majboori ke kaaran uska study graph thoda neeche gir gaya. Jab 10th class ka board result aaya, to screen par mera score *84.2%* tha. Padosiyon aur rishtedaaron ke liye ye number bahut achhe the, sab badhaai de rahe the, lekin mera dil jaanta tha ki agar Corona ki ye bandishein aur saadhanon ki kami na hoti, to 'Kharkhauda ka ye Monitor' 95% ke paar khada hota. Mujhe apni kaabiliyat par poora bharosa tha, isliye is girawat ne mujhe toda nahi, balki mere andar dobara sambhalne ki aag laga di.

10th ke baad maine ek bahut hi saahasik faisla liya. Maine 11th class me sabse kathin maana jaane wala combination chuna. Mere paas *Physics, Chemistry, Biology, Maths, IT (Information Technology) aur English* jaise bhaari-bharkam subjects the. Science aur Maths ka ye mel aasaan nahi tha, lekin yahi wo daur tha jab mera interest computer, coding aur technology ki duniya ke kareeb aane laga tha. Jab main IT ke practicals karta ya coding ke basics samajhta, to mujhe lagta ki ye wo field hai jahan main kuch bada kar sakta hoon.

Din-raat ki kadi mehnat, sarkari school ke badalte mahaul aur Corona ke baad patri par lautti zindagi ke beech, aakhirkaar saal 2024 ke shuruaati mahinon me maine apni 12th ki board pareeksha di. Jab 2024 me result aaya, to mujhe *79.4%* marks mile. Numberon ka ye safar shaayad bachpan ki tarah hamesha "First Rank" wala nahi raha, utaar-chadhaav se bhara raha, lekin is schooli shiksha ne mujhe wo paripakvata (Maturity) aur samajh de di thi jisse main apni zindagi ke agle, sabse romanchak aur sabse khoobsurat chapter me kadam rakhne ke liye poori tarah taiyaar tha.

12th ki dehleez paar karte hi mera saamna ek aisi haqeeqat se hone wala tha, jahan mera intezaar ₹9000 ki ek naukri, social media ka ek group chat aur Cheeku naam ki ek nakhrebaaz ladki kar rahi thi, jo meri poori zindagi ka rukh badalne wali thi.
`]
    },

    // ─── Chapter 7 ───────────────────────────────────────────────────────────
        {
      title: 'Jeet Aur Sabak',
      excerpt: 'Har haar ke peeche chhupi thi ek jeet...',
      text: [`
Saal 2024 ka April mahina. 12th ki pareeksha khatam hote hi mere saamne bhavishya ki dhundhli si tasveer thi. Main jaanta tha ki papa ki mazdoori ke bharose ab aage ki badi padhai aur ghar ka kharch ek saath sambhalna mushkil hoga. Main chupchaap haath par haath rakhkar baithne walon me se nahi tha. Isliye, bina samay ganwaye maine Kharkhauda ki hi ek achaar ki dukaan (Pickle Shop) par kaam karna shuru kar diya.

Mera kaam koi aasaan nahi tha; mujhe wahan achaar ki retailing aur wholesale dono sambhalni padti thi. Subah se shaam tak achaar ke bhaari-bhaari dibbe uthana, dukaan-daaron se mol-tol karna, hisaab-kitaab dekhna aur graahakon ki sanakon ko jhelna — ye mera naya routine ban chuka tha. Is haad-tod mehnat ke badle mujhe *mahine ke ₹9000* milte the. Paise bhale hi bahut kam the, lekin farsh par ghaas bichhakar sone wale us ladke ke liye khud ke dum par kamaye gaye wo ₹9000 aatmasamman ki ek bahut badi jeet the.

Dinbhar dukaan ki is bhaagdaud aur thakaan ke baad, raat ko jab main ghar lautta, to social media hi thoda sukoon paane ka zariya tha. May ka aakhiri hafta chal raha tha, jab maine Instagram par ek Group Chat (Instagram GC) banaya. Socha tha kuch purane-naye dost judenge, thoda hansi-mazaak hoga aur dinbhar ki thakaan mit jaayegi. Lekin mujhe kya pata tha ki internet ki is aabhasi duniya me banaya gaya wo chhota sa group meri asli zindagi me ek bahut bada toofan lekar aane wala hai.

Usi group me ek din ek ladki ki entry hui... naam tha *Cheeku*.

Cheeku koi aisi-waisi ya shaant swabhaav ki ladki nahi thi. Wo behad gussail (Aggressive), bebaak aur kadak nakhre wali thi. Group me kadam rakhte hi usne wahan ka bikhra hua mahaul dekha aur seedhe ladkon ko daantna shuru kar diya. Usne bina dare type kiya, "Ye kaisa bakwaas aur ganda group hai? Kaun hai is ghatiya group ka admin? Tameez nahi hai kya baat karne ki?"

Main apne mobile screen par uske messages dekhkar hairaan bhi tha aur muskura bhi raha tha. Jahan baaki ladke usse behas kar rahe the, maine aage badhkar badi sanjeedagi se message kiya, "Are bhai, shaant ho jao. Kya problem ho gayi?"

Usne raub se jawaab diya, "Agar group chalana hi hai, to ise dhang se decorate karo, iske kuch rules banao."

Mujhe uska ye bina dare apni baat kehna aur wo nakhrebaaz, gussail andaaz pehli hi nazar me behad pasand aa gaya. Sach kahun to, wo mujhe pehle hi din dil me apni jagah bana chuki thi. Maine bhi thodi chaalaaki ki aur group ko shaant karne ke bahaane use us Instagram group ki "Female Admin" ghoshit kar diya taaki wo group ko apne hisaab se sambhal sake. Ab jaise hi wo admin ki gaddi par baithi, group ke baaki ladkon ke beech kaanaphoosi shuru ho gayi. Chaaron taraf afwaahein (Rumours) phail gayin ki mere aur Cheeku ke beech kuch chal raha hai aur hum dono couple hain. Halanki tab tak humare beech aisa kuch bhi nahi tha, lekin dil hi dil me main yahi dua kar raha tha ki ye afwaahein sach ho jaayein.

Dheere-dheere group ke shor se hatkar humari personal chat shuru hui. Baatein badhin, to mujhe ehsaas hua ki jo ladki baahar se itni kadak aur gussail dikhti hai, wo dil ki utni hi saaf aur fikrmand hai. Humari dosti gehri hoti gayi aur hum ek-dusre ke behad kareeb aa gaye. Unhi dinon Cheeku ne "MDU" (Maharshi Dayanand University) ka entrance exam diya tha. Jab uska result aaya aur counselling ki date tay hui, to wo thodi nervous thi. Usne ek din mujhse hichkichate hue poocha, "Kya tum meri counselling ke liye mere saath Rohtak chaloge?"

Maine bina ek pal ganwaye turant "haan" keh diya. Aur aakhirkaar wo din aa hi gaya — July 2024. Usne mujhe Kharkhoda bus stand par bulaya tha jahan se humne Rohtak ke liye saath me bus pakdi thi. Jaise hi maine bus ke andar entry ki, meri nazar seedha us par padi — hum dono ne bus me entry karte hi ek dusre ko pehli baar dekha tha. Dhoop aur umas ke beech, bus ki us bheed me jab hamari nazrein mili, to mera dil apni jagah chhod chuka tha.

Wo us Instagram ki gussebaaz admin se kahin zyada pyaari, masoom aur khoobsurat lag rahi thi. Rohtak pahunchkar university ki us bhaari bheed ke beech humne saath me bahut achha waqt bitaya, baatein ki aur counselling ki aupchaariktaein poori ki. Asal zindagi me hamari wo pehli mulaqat hamesha ke liye yaadgar ban gayi.

Us mulaqaat ke baad humare milne-julne ka silsila aur badh gaya. Hum aksar thode-thode dinon me milte, Kharkhauda me ghoomte aur apne dil ki baatein saanjha karte. Jab mujhe laga ki paani sir se upar ja chuka hai aur main uske bina apni life imagine nahi kar sakta, to maine ek din poori himmat semetkar use seedhe propose kar diya.

Lekin... jaisa ki har badi love story me ek twist hota hai, yahan bhi ek bada jhatka mera intezaar kar raha tha. Cheeku ne muskurakar mera proposal thukra diya. Usne mujhe seedhe "friendzone" karte hue ek aisi ajeeb si jagah par la khada kiya jise aaj ki duniya *'Situationship'* kehti hai — yaani na hum sirf dost the, aur na hi poori tarah se couple. Hum bilkul adhar me latke the, na idhar ke na udhar ke!

Lekin main bhi bachpan ka wahi ziddi "Class Monitor" tha, jisne kabhi haar maanna seekha hi nahi tha. Cheeku ki life me pehle kai male friends (ladke dost) the, jo mujhe phooti aankh nahi suhaate the. Maine apni care, apne haq aur apne pyaar ke dum par dheere-dheere karke un saare ladkon ko uski zindagi ke daayre se bilkul door kar diya. Aaj haalaat ye hain ki uski poori life me mere alawa aur koi dusra ladka door-door tak nahi hai.

Filhaal humari prem-kahani ki gaadi "Waiting List" me chal rahi hai, aur mujhe poora yakeen hai ki is list ka ticket ek din pakke confirmation me badlega. Wo mujhse umar me ek saal badi hai, isliye wo zindagi ko lekar bahut zyada vyavhaarik (Practical) hai. Usne mere saamne apni shartein bilkul saaf rakh di hain, jisne mujhe aashiq se ek fighter bana diya.
`]
    },

    // ─── Chapter 8 ───────────────────────────────────────────────────────────
    {
      title: 'Aaj Aur Kal',
      excerpt: 'Ek nazar peeche, ek ummeed aage ki...',
      text: [`
Cheeku mujhse umar me ek saal badi hai, isliye wo zindagi aur bhavishya ko lekar bahut zyada vyavhaarik (Practical) hai. Usne mere proposal ke baad apni shartein mere saamne sheeshe ki tarah saaf rakh di thi. Usne mujhse kaha tha, "Dekho, pehle career, phir ye sab. Jis din tumhare paas ek pakki sarkari naukri (Government Job) hogi aur tumhare parivaar ka khud ka ghar hoga, usi din main shaadi ke liye haan kahungi."

Uski in sharton ne mere andar kisi gusse ko nahi, balki ek zabardast zidd ko janam diya. Mujhe apni us mohabbat ko bhi mukammal karna tha jise maine pehli nazar me apna maana tha, aur saath hi papa ke us adhoore sapne ko bhi poora karna tha jo Bengal me zameen chhinne ke baad toot gaya tha — apne khud ke ghar ka sapna.

Yahin se humari zindagi me ek bahut hi dilchasp aur khoobsurat mod aaya. Saal 2024 ke August mahine me college admissions ka daur shuru hua. Meri 12th ki mehnat aur achhe score (79.4%) ki badolat Rohtak ke mashoor Pandit Nekiram Sharma Government College ki merit list me naam aa gaya, aur maine wahan BCA (Bachelor of Computer Applications) me admission le liya. Wo computer, coding aur technology ki aadhunik duniya jisse main hamesha se rubaroo hona chahta tha, ab mere samne thi.

Magar kismat ka khel dekhiye — Cheeku to pehle se hi ek bilkul alag, seva aur insaaniyat ki duniya me kadam rakh chuki thi. Usne 2023 me hi GNM (General Nursing and Midwifery) yaani Nursing join kar li thi. Jo ladki kabhi Instagram par gusse me baat karti thi, wo hospital ke shaant wards, white uniform, mareezon ki seva, dawaiyon ke parchon aur pulse rate ko samajhne ki duniya me pehle se hi raub se chal rahi thi. Shuruaat me hum dono ke raste ek-dusre se bilkul alag the — ek taraf meri coding ki nayi shuruaat thi, aur dusri taraf uski medical files aur practicals ki behtareen pakad.

Aur is tarah waqt ka pahiya ghoomte-ghoomte aaj ke is behad khaas din par aakar thehar gaya hai. Aaj ki tareekh hai 19 June 2026.

Waqt kitni tezi se pankh lagakar ud gaya, pata hi nahi chala. Aaj saal 2026 me Cheeku apna Nursing (GNM) ka 3rd year poora karne wali hai. Wahin dusri taraf, computer screens aur assignments se joojhte hue BCA ke 4th semester ke baad, ab agle mahine yaani 3 July 2026 se main apne 3rd Year (Final Year) me entry karne ja raha hoon.

Humara parivaar aaj bhi Kharkhauda ke usi kiraye ke makaan me rehta hai. Papa aaj bhi subah suraj ugne ke saath mazdoori ke liye nikal jaate hain, maa aaj bhi us chhote se ghar ko apni mamta se sambhalti hai. Haalaat aaj bhi poori tarah se nahi badle hain, humein aaj bhi apni chhat ka intezaar hai, lekin humare hausle ab aasmaan chhoo rahe hain. Aspataal ki kadak duties ka zikr, sarkari naukri ki din-raat ki taiyaari, coding ki duniya me aage badhta main aur uski wo shart... ye sab cheezein milkar mujhe har roz subah ek nayi urja ke saath uthne aur haalaaton se ladne ki taakat deti hain.

Uttar Pradesh ke Punjab Nagar ke un hanste-khelte kheton se shuru hua ye safar, raat ko farsh par sookhi ghaas bichhakar sone ki chubhan se guzarta hua, aaj college ki dehleez tak pahunch chuka hai. Aaj humare paas ek apna ghar chhod kar saari sukh-suvidhayein maujood hain, jo is baat ka saboot hain ki hum kabhi thame nahi.

Lekin ye kahani abhi khatam nahi hui hai. Ye to bas ek shuruaat hai. Kyunki "Kharkhauda ke us ziddi monitor" ne apni zindagi ki dictionary me kabhi haar maanna seekha hi nahi hai. Jab tak kalai par sarkari naukri ki wo pakki muhar nahi lag jaati, jab tak Cheeku ka wo "Waiting List" wala pyaar confirm ticket me nahi badal jaata, aur jab tak kiraye ki is chhat ko hatakar hum apne papa ke seene ko khud ke ghar ki nameplate se chauda nahi kar dete... ye ladka rukne wala nahi hai. Ye kahani chalti rahegi, aur jeet humari hi hogi!

🏁 Upasanhar (The Conclusion)
Ye kahani kisi kaalpanik naayak ki nahi, balki Punjab Nagar se bhaagkar Kharkhauda ki tang galiyon me apni pehchaan banane wale ek real-life fighter ki hai. Ye kitaab har us insaan ko himmat deti hai jo haalaaton ke aage ghutne tekne ke bajaay apni kismat khud likhna jaanta hai. Ye humein sikhaati hai ki "Duniya tumhe chahe kitni bhi baar farsh par sula de, agar tumhare iraadon me Monitor banne ki zidd hai, to tum farsh ki us sookhi ghaas ko bhi ek din apni kaamyabi ke makhmali gadde me badal sakte ho."
`]
    }

  ] // end hinglish
 
    
         ,
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

  /* ---------------- DOM REFS — safe, called after DOMContentLoaded ---------------- */
  let screens, btnReadBook, langCards, btnChangeLang, chapterListEl,
      chaptersTitleEl, chaptersSubtitleEl, btnBackChapters, langDropdown,
      readerLabel, readerTitle, readerText, btnPrevChapter, btnNextChapter,
      readerScrollWrap, readingProgress, cursorGlow;

  function cacheDom() {
    screens = {
      landing:  document.getElementById('screen-landing'),
      language: document.getElementById('screen-language'),
      chapters: document.getElementById('screen-chapters'),
      reader:   document.getElementById('screen-reader')
    };
    btnReadBook       = document.getElementById('btn-read-book');
    langCards         = document.querySelectorAll('.lang-card');
    btnChangeLang     = document.getElementById('btn-change-lang');
    chapterListEl     = document.getElementById('chapter-list');
    chaptersTitleEl   = document.getElementById('chapters-title');
    chaptersSubtitleEl = document.getElementById('chapters-subtitle');
    btnBackChapters   = document.getElementById('btn-back-chapters');
    langDropdown      = document.getElementById('lang-dropdown');
    readerLabel       = document.getElementById('reader-chapter-label');
    readerTitle       = document.getElementById('reader-title');
    readerText        = document.getElementById('reader-text');
    btnPrevChapter    = document.getElementById('btn-prev-chapter');
    btnNextChapter    = document.getElementById('btn-next-chapter');
    readerScrollWrap  = document.getElementById('reader-scroll-wrap');
    readingProgress   = document.getElementById('reading-progress');
    cursorGlow        = document.getElementById('cursor-glow');
  }

  /* ---------------- SCREEN NAVIGATION ---------------- */
  function goToScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
    currentScreen = name;

    // Progress bar — only visible in reader
    if (name === 'reader') {
      readingProgress.classList.add('visible');
    } else {
      readingProgress.classList.remove('visible');
      readingProgress.style.width = '0%';
    }

    // Scroll the non-reader screens back to top
    if (name !== 'reader') {
      screens[name].scrollTop = 0;
    }
  }

  /* ---------------- LANGUAGE HANDLING ---------------- */
  function setLanguage(lang) {
    currentLanguage = lang;
    try { localStorage.setItem('lang', lang); } catch(e) {}
    langDropdown.value = lang;

    // Highlight selected lang card
    langCards.forEach(c => {
      c.classList.toggle('selected', c.getAttribute('data-lang') === lang);
    });
  }

  function applyChaptersUI() {
    const t = UI[currentLanguage];
    chaptersTitleEl.textContent = t.chaptersTitle;
    chaptersSubtitleEl.textContent = t.chaptersSubtitle;
    // FIX: safely update the span inside btnChangeLang
    const spanEl = btnChangeLang.querySelector('span');
    if (spanEl) spanEl.textContent = t.changeLang;
    else btnChangeLang.textContent = t.changeLang;
  }

  function applyReaderUI() {
    const t = UI[currentLanguage];
    const backSpan = btnBackChapters.querySelector('span');
    if (backSpan) backSpan.textContent = t.back;
    btnPrevChapter.textContent = t.prev;
    btnNextChapter.textContent = t.next;
  }

  /* ---------------- RENDER CHAPTER LIST (staggered) ---------------- */
  function renderChapterList() {
    applyChaptersUI();
    const list = CHAPTERS[currentLanguage];
    chapterListEl.innerHTML = '';

    list.forEach((ch, index) => {
      const card = document.createElement('button');
      card.className = 'chapter-card card-reveal';
      card.style.animationDelay = `${index * 0.07}s`;
      card.innerHTML = `
        <span class="chapter-num">Chapter ${String(index + 1).padStart(2, '0')}</span>
        <span class="chapter-name">${ch.title}</span>
        <span class="chapter-excerpt">${ch.excerpt}</span>
        <span class="chapter-arrow">Read →</span>
      `;
      card.addEventListener('click', () => openChapter(index));
      addRipple(card);
      chapterListEl.appendChild(card);
    });
  }

  /* ---------------- OPEN / RENDER CHAPTER CONTENT ---------------- */
  function openChapter(index) {
    currentChapterIndex = index;
    renderReader();
    goToScreen('reader');
    readerScrollWrap.scrollTop = 0;
  }

  function renderReader() {
    applyReaderUI();
    const ch = CHAPTERS[currentLanguage][currentChapterIndex];
    const total = CHAPTERS[currentLanguage].length;

    readerLabel.textContent = `Chapter ${currentChapterIndex + 1} / ${total}`;
    readerTitle.textContent = ch.title;

    // Force re-trigger paragraph animations by replacing content
    readerText.innerHTML = ch.text.map(p => `<p>${p}</p>`).join('');

    // Trigger divider re-animation
    const divider = document.querySelector('.reader-divider');
    if (divider) {
      divider.style.animation = 'none';
      divider.offsetHeight; // reflow
      divider.style.animation = '';
    }

    const isFirst = currentChapterIndex === 0;
    const isLast  = currentChapterIndex === total - 1;

    btnPrevChapter.disabled = isFirst;
    btnNextChapter.disabled = isLast;
    btnPrevChapter.style.opacity = isFirst ? '0.35' : '1';
    btnNextChapter.style.opacity = isLast  ? '0.35' : '1';
    btnPrevChapter.style.pointerEvents = isFirst ? 'none' : 'auto';
    btnNextChapter.style.pointerEvents = isLast  ? 'none' : 'auto';
  }

  /* ---------------- READING PROGRESS BAR ---------------- */
  function updateProgress() {
    if (currentScreen !== 'reader') return;
    const el = readerScrollWrap;
    const scrollable = el.scrollHeight - el.clientHeight;
    if (scrollable <= 0) { readingProgress.style.width = '100%'; return; }
    const pct = Math.min((el.scrollTop / scrollable) * 100, 100);
    readingProgress.style.width = pct + '%';
  }

  /* ---------------- RIPPLE EFFECT ---------------- */
  function addRipple(btn) {
    btn.addEventListener('click', function(e) {
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.5;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top  - size / 2;
      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  }

  /* ---------------- CURSOR GLOW (desktop only) ---------------- */
  function initCursorGlow() {
    if (window.matchMedia('(pointer: coarse)').matches) {
      cursorGlow.style.display = 'none';
      return;
    }
    document.addEventListener('mousemove', e => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top  = e.clientY + 'px';
    });
  }

  /* ---------------- EVENT LISTENERS ---------------- */
  function bindEvents() {
    // Ripple on primary buttons
    addRipple(btnReadBook);
    addRipple(btnChangeLang);
    addRipple(btnBackChapters);
    addRipple(btnPrevChapter);
    addRipple(btnNextChapter);

    // Landing → Language or Chapters
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

    // Change language (from chapters)
    btnChangeLang.addEventListener('click', () => goToScreen('language'));

    // Back to chapters (from reader)
    btnBackChapters.addEventListener('click', () => {
      renderChapterList();
      goToScreen('chapters');
    });

    // Floating language dropdown inside reader
    langDropdown.addEventListener('change', e => {
      setLanguage(e.target.value);
      renderReader();
      readerScrollWrap.scrollTop = 0;
    });

    // Prev / Next chapter
    btnPrevChapter.addEventListener('click', () => {
      if (currentChapterIndex > 0) {
        currentChapterIndex--;
        renderReader();
        readerScrollWrap.scrollTop = 0;
      }
    });

    btnNextChapter.addEventListener('click', () => {
      if (currentChapterIndex < CHAPTERS[currentLanguage].length - 1) {
        currentChapterIndex++;
        renderReader();
        readerScrollWrap.scrollTop = 0;
      }
    });

    // Reading progress on reader scroll
    readerScrollWrap.addEventListener('scroll', updateProgress, { passive: true });
  }

  /* ---------------- GUARANTEED VISIBILITY for landing fade-ins ---------------- */
  function ensureLandingVisible() {
    const fadeEls = document.querySelectorAll('#screen-landing .fade-in');

    // Mark done on animationend
    fadeEls.forEach(el => {
      el.addEventListener('animationend', () => {
        el.classList.add('anim-done');
      }, { once: true });
    });

    // Hard fallback: force visible after 2.5s regardless (handles mobile skip)
    setTimeout(() => {
      fadeEls.forEach(el => el.classList.add('anim-done'));

      // Activate shimmer on title AFTER it is visible
      const titleEl = document.querySelector('.book-title');
      if (titleEl) titleEl.classList.add('shimmer-active');

      // Activate pulse on button AFTER it is visible
      const btnEl = document.getElementById('btn-read-book');
      if (btnEl) btnEl.classList.add('pulse-active');
    }, 2500);
  }

  /* ---------------- INIT — runs after DOM is ready ---------------- */
  function init() {
    cacheDom();

    // Restore saved language
    let saved = null;
    try { saved = localStorage.getItem('lang'); } catch(e) {}
    currentLanguage = saved || 'hinglish';

    if (saved) {
      langDropdown.value = currentLanguage;
      langCards.forEach(c => {
        c.classList.toggle('selected', c.getAttribute('data-lang') === currentLanguage);
      });
    }

    bindEvents();
    initCursorGlow();
    ensureLandingVisible();
    goToScreen('landing');
  }

  // Run init directly — DOM already parsed when script is at bottom of body
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
