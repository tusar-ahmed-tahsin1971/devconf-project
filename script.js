// ============================================
// EVENT COUNTDOWN - JAVASCRIPT LOGIC
// ============================================

// ১. টার্গেট তারিখ ঠিক করা (তোমার কনফারেন্স যেদিন হবে সেদিন)
// Format: "Year-Month-DayTHour:Minute:Second"
const targetDate = new Date("2026-12-01T09:00:00").getTime();

// ২. HTML থেকে এলিমেন্টগুলো ধরে রাখা (id দিয়ে খুঁজে বের করা)
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

// সেকেন্ডের সংখ্যা বদলানোর সময় ছোট্ট "পপ" এনিমেশন
  gsap.fromTo(secondsEl,
    { scale: 1.3 },
    { scale: 1, duration: 0.4, ease: "back.out(3)" }
  );

// ৩. একটা ফাংশন বানানো যেটা প্রতিবার সময় হিসাব করবে
function updateCountdown() {

  // এখনকার সময়
  const now = new Date().getTime();

  // টার্গেট আর এখনকার সময়ের মধ্যে পার্থক্য (মিলিসেকেন্ডে)
  const distance = targetDate - now;

  // যদি সময় শেষ হয়ে যায় (ইভেন্ট শুরু হয়ে গেছে)
  if (distance < 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    clearInterval(countdownInterval); // ঘড়ি বন্ধ করে দাও
    return; // এখানেই ফাংশন থামিয়ে দাও
  }

  // মিলিসেকেন্ড থেকে দিন/ঘণ্টা/মিনিট/সেকেন্ড বের করা
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // HTML-এ সংখ্যাগুলো বসিয়ে দেওয়া (২ ডিজিট ফরম্যাটে, যেমন 05 না ৫)
  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

// ৪. ফাংশনটা একবার সাথে সাথে চালাও (নাহলে ১ সেকেন্ড পর্যন্ত 00 00 00 00 দেখাবে)
updateCountdown();

// ৫. প্রতি ১ সেকেন্ড (1000 মিলিসেকেন্ড) পরপর ফাংশনটা বার বার চালাও
const countdownInterval = setInterval(updateCountdown, 1000);