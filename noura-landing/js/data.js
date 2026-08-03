/* =====================================================================
   NOURA SHEHTA — LANDING PAGE
   data.js — THE ONLY FILE YOU SHOULD NEED TO TOUCH DAY-TO-DAY.

   Everything below is plain data. Adding a testimonial or a short video
   means adding one object to the matching array — the sliders on the
   page rebuild themselves automatically. Nothing else in the project
   needs to change.
===================================================================== */

/* ---------------------------------------------------------------------
   SITE CONFIG
   Update the WhatsApp number, the default/package messages, and the
   countdown deadline here.
--------------------------------------------------------------------- */
const SITE_CONFIG = {
  // TODO: replace with the real WhatsApp number, digits only,
  // in international format WITHOUT "+" or spaces (country code first).
  // Example for an Egyptian number 010 012 34567 -> "201001234567"
  whatsappNumber: "+201123164447",

  // Pre-filled WhatsApp messages. "default" is used by the header,
  // hero, floating button, footer and final CTA. Package messages are
  // used by their matching package card.
  messages: {
    default:  "السلام عليكم، أريد الاستفسار عن دورات دكتور نورا لتعلم الإنجليزي",
    test: "السلام عليكم أرغب في القيام باختبار تحديد المستوى",
    package1: "السلام عليكم، أريد معرفة تفاصيل باقة الشهر الواحد.",
    package2: "السلام عليكم، أريد معرفة تفاصيل باقة الثلاثة أشهر.",
    package3: "السلام عليكم، أريد معرفة تفاصيل باقة الستة أشهر."
  },

  // ISO date/time the current offer ends. Countdown reads this directly.
  // Interpreted in each visitor's local time.
  countdownTarget: "2026-08-05T23:59:59"
};

/* ---------------------------------------------------------------------
   HERO VIDEO
   One variable controls the hero's "YouTube style" intro video.

   ⬇️ EDIT ONLY THE ONE LINE BELOW THIS COMMENT (the real "const
   heroVideo = ..." line). Nothing above it needs to change — do not
   add a second "const heroVideo" line anywhere, that will break the
   whole page (JavaScript doesn't allow declaring the same const twice).

   Paste ONE of these two as the value between the quotes:
   - A YouTube link (recommended — upload the video to YouTube, then
     copy its link exactly as YouTube gives it to you). Any of these
     formats works automatically:
       youtu.be/ID · youtube.com/watch?v=ID · youtube.com/shorts/ID
   - A local file path, e.g. assets/videos/intro.mp4
--------------------------------------------------------------------- */
const heroVideo = "https://youtu.be/7bYmRSCyHpk?si=sdQeCN4FCvFXo4DF";

/* ---------------------------------------------------------------------
   TESTIMONIALS
   Renders into the auto-playing text-review slider.
   Add a new object anywhere in the array to add a new card.

   Fields:
     name    - student's display name (required)
     text    - the review text (required)
     rating  - whole number 1-5 (required)
     avatar  - path to a photo (optional). Leave "" to show a neat
               gold initial badge instead — always looks finished,
               never a broken image.

   ⚠ SAMPLE DATA: the six reviews below are placeholders written to
   show the layout working. Replace them with real student reviews
   before the site goes live.
--------------------------------------------------------------------- */
const testimonials = [
  {
    name: "أحمد فتحي",
    text: "الكلاس مختلف تماماً، حسيت إني بتكلم مش بس بحفظ. المتابعة بعد كل جلسة فرقت معايا كتير.",
    rating: 5,
    avatar: ""
  },
  {
    name: "سارة عبد الله",
    text: "كنت خايفة أتكلم قدام حد، ودلوقتي بقيت واثقة في نفسي جداً. دكتور نورا صبورة ومتابعتها حقيقية مش شكلية.",
    rating: 5,
    avatar: ""
  },
  {
    name: "محمود عزت",
    text: "جربت أماكن كتير قبل كده، هنا حسيت إن فيه خطة واضحة، وفعلاً بلاحظ تطور كل أسبوع.",
    rating: 5,
    avatar: ""
  },
  {
    name: "منة طارق",
    text: "أسلوب الشرح سهل وبسيط جداً، والكلاس بيخليك تتكلم إنت أكتر بكتير من إنك تقعد تسمع بس.",
    rating: 4,
    avatar: ""
  },
  {
    name: "يوسف كامل",
    text: "استفدت جداً من الأونلاين، مرونة في المواعيد بس بنفس مستوى الجدية والمتابعة.",
    rating: 5,
    avatar: ""
  },
  {
    name: "نورهان سامي",
    text: "الفرق الحقيقي كان في المتابعة، حسيت إن فيه حد فعلاً بيتابع تطوري خطوة خطوة.",
    rating: 5,
    avatar: ""
  }
];

/* ---------------------------------------------------------------------
   SHORT VIDEOS
   Renders into the vertical "shorts style" slider.
   Add a new object anywhere in the array to add a new video card.

   Fields:
     title     - short caption shown over the video (required)
     thumbnail - poster image path (optional). Leave "" to show a
                 branded placeholder — or, if `video` below is a
                 YouTube link, a real YouTube thumbnail is used automatically.
     video     - EITHER a YouTube link (upload the clip as a YouTube
                 Short, then paste its link here — youtube.com/shorts/…,
                 youtu.be/…, and youtube.com/watch?v=… all work)
                 OR a path to a local vertical (9:16) video file.

   ⚠ SAMPLE DATA: replace with real clips/links before launch. Until
   real files or links exist, cards show their placeholder and
   politely explain the video isn't available yet if tapped.
--------------------------------------------------------------------- */
const shortVideos = [
  { title: "تجربة طلاب دكتور نورا",         thumbnail: "", video: "https://fb.watch/ILGhTsI7f_/" },
  { title: "نموذج يدعو للفخر",   thumbnail: "", video: "https://youtube.com/shorts/peSIfzU9n-M" },
  { title: "امنح طفلك فرصة التميز",          thumbnail: "", video: "https://youtube.com/shorts/BRyHGTFC2sw" },
  { title: "طلاقة طلاب دكتور نورا",        thumbnail: "", video: "https://youtube.com/shorts/2rA1oBveFOI" },
  { title: "ريم بتحكي تجربتها مع دكتور نورا",  thumbnail: "", video: "https://youtube.com/shorts/ZRBD-EESXto?si=jJ5-kQVQuOKtRg2_" }
];
