// ============================================
// GSAP ENTRANCE ANIMATIONS - COUNTDOWN SECTION
// ============================================

// একটা "timeline" বানাচ্ছি - এটা একগুচ্ছ এনিমেশনকে
// ক্রমানুসারে সাজিয়ে চালানোর জন্য ব্যবহার হয়

// ScrollTrigger প্লাগইন চালু করা
gsap.registerPlugin(ScrollTrigger);

// ইউজার যদি "Reduce Motion" চালু রাখে, তাহলে GSAP-এর গ্লোবাল এনিমেশন স্পিড
// অনেক বাড়িয়ে দিচ্ছি (কার্যত এনিমেশন প্রায় সাথে সাথেই শেষ হয়ে যাবে)
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {
  gsap.globalTimeline.timeScale(50); // এনিমেশন ৫০ গুণ দ্রুত = কার্যত instant
}
// ============================================
// LENIS SMOOTH SCROLL সেটআপ
// ============================================

// ১. Lenis চালু করা
const lenis = new Lenis({
  duration: 1.1,        // স্ক্রলের "স্মুথনেস" কতটা - বেশি হলে বেশি ধীর/মসৃণ
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // গতির ধরন
  smoothWheel: true      // মাউস হুইল স্ক্রলকে স্মুথ করবে
});

// ২. Lenis-কে বলা - প্রতিবার স্ক্রল হলে GSAP-এর ScrollTrigger-কেও জানাও
lenis.on("scroll", ScrollTrigger.update);

// ৩. একটা লুপ (loop) বানানো - এটাই Lenis-কে "জীবিত" রাখে, প্রতি ফ্রেমে চালায়
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

const countdownTimeline = gsap.timeline({
  defaults: {
    duration: 1,
    ease: "power3.out"
  },
  scrollTrigger: {
    trigger: ".countdown-section",  // কোন এলিমেন্টের দিকে নজর রাখবো
    start: "top 80%",                // কখন এনিমেশন শুরু হবে
    toggleActions: "play none none none" // স্ক্রল হলে কী কী ঘটবে
  }
});

// ১. টাইটেল Fade In + Slide Up
countdownTimeline.from(".countdown-title", {
  opacity: 0,   // শুরুতে সম্পূর্ণ অদৃশ্য (invisible)
  y: 40         // শুরুতে ৪০px নিচে থেকে উঠে আসবে
});

// ২. কাউন্টডাউন বক্সগুলো একটার পর একটা (stagger) করে আসবে
countdownTimeline.from(".countdown-box", {
  opacity: 0,
  y: 40,
  stagger: 0.15   // প্রতিটা বক্সের মধ্যে ০.১৫ সেকেন্ড দেরি
}, "-=0.6");        // আগের এনিমেশন শেষ হওয়ার ০.৬ সেকেন্ড আগেই শুরু হবে

// ৩. Quote Fade In + Slide Up
countdownTimeline.from(".countdown-quote", {
  opacity: 0,
  y: 30
}, "-=0.4");

// ৪. বাটন Fade In + Slide Up
countdownTimeline.from(".countdown-btn", {
  opacity: 0,
  y: 30
}, "-=0.5");



// ============================================
// FLOATING GLOW ANIMATION (অনন্ত লুপ)
// ============================================

gsap.to(".countdown-glow", {
  y: 30,              // ৩০px নিচে নামবে
  duration: 3,        // ৩ সেকেন্ড সময় নেবে
  repeat: -1,          // -1 মানে অনন্তকাল ধরে বার বার চলবে
  yoyo: true,          // শেষে গিয়ে আবার উল্টো দিকে ফিরে আসবে (যেমন yoyo খেলনা)
  ease: "sine.inOut"   // মসৃণ, ঢেউয়ের মতো গতি
});


// ============================================
// HOVER EFFECTS - বাটন এবং বক্স
// ============================================

// বাটনের উপর মাউস আনলে (mouseenter)
const registerBtn = document.querySelector(".countdown-btn");

registerBtn.addEventListener("mouseenter", () => {
  gsap.to(registerBtn, {
    scale: 1.08,        // ৮% বড় হবে
    boxShadow: "0 0 45px rgba(59, 130, 246, 0.8)",
    duration: 0.3,
    ease: "power2.out"
  });
});

// মাউস সরিয়ে নিলে (mouseleave) - আগের অবস্থায় ফিরে যাবে
registerBtn.addEventListener("mouseleave", () => {
  gsap.to(registerBtn, {
    scale: 1,
    boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
    duration: 0.3,
    ease: "power2.out"
  });
});

// প্রতিটা কাউন্টডাউন বক্সে হোভার ইফেক্ট
const boxes = document.querySelectorAll(".countdown-box");

boxes.forEach((box) => {
  box.addEventListener("mouseenter", () => {
    gsap.to(box, {
      y: -8,              // ৮px উপরে উঠবে (float করার মতো)
      borderColor: "rgba(59, 130, 246, 0.5)",
      duration: 0.3,
      ease: "power2.out"
    });
  });

  box.addEventListener("mouseleave", () => {
    gsap.to(box, {
      y: 0,
      borderColor: "rgba(255, 255, 255, 0.1)",
      duration: 0.3,
      ease: "power2.out"
    });
  });
});