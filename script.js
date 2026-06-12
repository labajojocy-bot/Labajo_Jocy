/* =====================
TYPING EFFECT
===================== */



const words = [
	"Information Technology Student",
	"Researcher",
	"Developer",
	"AI Enthusiast",
	"Problem Solver"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){
	const typingEl = document.getElementById("typing");
	if (!typingEl) return;

	const current = words[wordIndex];

	if(!deleting){
		typingEl.textContent = current.substring(0,charIndex++);
		if(charIndex > current.length){
			deleting = true;
			setTimeout(typeEffect,1500);
			return;
		}
	} else {
		typingEl.textContent = current.substring(0,charIndex--);
		if(charIndex === 0){
			deleting = false;
			wordIndex = (wordIndex + 1) % words.length;
		}
	}

	setTimeout(typeEffect, deleting ? 50 : 100);
}

if (document.getElementById("typing")) {
	typeEffect();
}

/* =====================
THEME MODE
===================== */

function initThemeMode() {
	const themeBtn = document.getElementById("themeBtn");
	if (!themeBtn) return;

	const sunIcon = themeBtn.querySelector('.sun-icon');
	const moonIcon = themeBtn.querySelector('.moon-icon');
	if (!sunIcon || !moonIcon) return;

	const savedTheme = localStorage.getItem("theme");
	if (savedTheme === "light") {
		document.body.classList.add("light");
		sunIcon.classList.add("hidden");
		moonIcon.classList.remove("hidden");
	} else {
		sunIcon.classList.remove("hidden");
		moonIcon.classList.add("hidden");
	}

	themeBtn.addEventListener("click", () => {
		// Add spinning animation
		themeBtn.classList.add("spinning");
		
		const isLight = document.body.classList.toggle("light");
		localStorage.setItem("theme", isLight ? "light" : "dark");
		
		// Toggle icon visibility with smooth transition
		if (isLight) {
			sunIcon.classList.add("hidden");
			moonIcon.classList.remove("hidden");
		} else {
			sunIcon.classList.remove("hidden");
			moonIcon.classList.add("hidden");
		}
		
		// Create ripple effect
		createRipple(themeBtn);
		
		// Remove spinning class after animation
		setTimeout(() => {
			themeBtn.classList.remove("spinning");
		}, 600);
		
		// Trigger a subtle page transition effect
		document.body.style.opacity = "0.98";
		setTimeout(() => {
			document.body.style.opacity = "1";
		}, 150);
	});
	
	// Add smooth transitions to all elements that have background colors
	const styleSheet = document.createElement('style');
	styleSheet.textContent = `
		* {
			transition: background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
						color 0.8s cubic-bezier(0.4, 0, 0.2, 1),
						border-color 0.8s cubic-bezier(0.4, 0, 0.2, 1),
						box-shadow 0.8s cubic-bezier(0.4, 0, 0.2, 1);
		}
	`;
	document.head.appendChild(styleSheet);
	
	// Magnetic cursor effect on hover
	themeBtn.addEventListener('mousemove', (e) => {
		const rect = themeBtn.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		
		const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
		
		if (distance < 100) {
			const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
			const pull = Math.max(0, (100 - distance) / 100) * 8;
			themeBtn.style.setProperty('--pull-x', Math.cos(angle) * pull + 'px');
			themeBtn.style.setProperty('--pull-y', Math.sin(angle) * pull + 'px');
		}
	});
	
	themeBtn.addEventListener('mouseleave', () => {
		themeBtn.style.setProperty('--pull-x', '0px');
		themeBtn.style.setProperty('--pull-y', '0px');
	});
}

function createRipple(element) {
	const rect = element.getBoundingClientRect();
	const size = Math.max(rect.width, rect.height);
	const x = rect.width / 2;
	const y = rect.height / 2;
	
	const ripple = document.createElement('span');
	ripple.style.position = 'absolute';
	ripple.style.width = size + 'px';
	ripple.style.height = size + 'px';
	ripple.style.left = (x - size / 2) + 'px';
	ripple.style.top = (y - size / 2) + 'px';
	ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.6), transparent)';
	ripple.style.borderRadius = '50%';
	ripple.style.transform = 'scale(0)';
	ripple.style.animation = 'themeRipple 0.6s ease-out';
	ripple.style.pointerEvents = 'none';
	ripple.style.zIndex = '1';
	
	element.appendChild(ripple);
	setTimeout(() => ripple.remove(), 600);
}

// Add ripple animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
	@keyframes themeRipple {
		to {
			transform: scale(2);
			opacity: 0;
		}
	}
`;
document.head.appendChild(styleSheet);

function initParticles() {
	if (window.particlesJS) {
		particlesJS("particles-js", {
			particles:{
				number:{ value:80 },
				size:{ value:3 },
				move:{ speed:2 },
				line_linked:{ enable:true }
			}
		});
		return;
	}

	const container = document.getElementById("particles-js");
	if (container) {
		container.classList.add("star-fallback");
	}
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", () => {
		initThemeMode();
		initParticles();
	});
} else {
	initThemeMode();
	initParticles();
}

/* =====================
CONTACT FORM
===================== */

const contactForm = document.getElementById('contactForm');
if (contactForm) {
	contactForm.addEventListener('submit', (e) => {
		e.preventDefault();

		const name = document.getElementById('contact-name').value.trim();
		const email = document.getElementById('contact-email').value.trim();
		const subject = document.getElementById('contact-subject') ? document.getElementById('contact-subject').value.trim() : '';
		const message = document.getElementById('contact-message').value.trim();
		const status = document.getElementById('contactStatus');

		if (!name || !email || !message) {
			status.textContent = 'Please fill in all required fields.';
			status.style.color = '#f43f5e';
			return;
		}

		const sendBtn = document.querySelector('.send-btn');
		if(sendBtn){ sendBtn.classList.add('sending'); sendBtn.disabled = true; }

		setTimeout(() => {
			// Save message locally as a simple mailbox (use backend for real usage)
			const stored = JSON.parse(localStorage.getItem('messages') || '[]');
			stored.push({ name, email, subject, message, date: new Date().toISOString() });
			localStorage.setItem('messages', JSON.stringify(stored));

			status.textContent = 'Message sent. Thank you!';
			status.style.color = '#10b981';

			contactForm.reset();
			if(sendBtn){ sendBtn.classList.remove('sending'); sendBtn.disabled = false; }

			showToast('Message sent — I will get back to you soon!');
		}, 900);
	});
}

/* =====================
TOAST HELPER
===================== */
function showToast(text){
	const toast = document.getElementById('toast');
	if(!toast) return;
	toast.textContent = text;
	toast.classList.add('show');
	setTimeout(()=> toast.classList.remove('show'), 3500);
}

/* =====================
COPY EMAIL
===================== */
const copyEmailBtn = document.getElementById('copyEmailBtn');
if(copyEmailBtn){
	copyEmailBtn.addEventListener('click', ()=>{
		const email = document.getElementById('contactEmailLink').textContent.trim();
		navigator.clipboard.writeText(email).then(()=>{
			showToast('Email copied to clipboard');
		}).catch(()=>{ showToast('Unable to copy'); });
	});
}

/* =====================
ANIMATE ON SCROLL
===================== */
const io = new IntersectionObserver((entries)=>{
	entries.forEach(e=>{
		if(e.isIntersecting) e.target.classList.add('in-view');
	});
},{threshold:0.15});
document.querySelectorAll('.animate-on-scroll').forEach(el=>io.observe(el));

const certificateCards = document.querySelectorAll('.certificate-card');
const certificateModal = document.getElementById('certificateModal');
const certificateModalTitle = document.getElementById('modalTitle');
const certificateModalDescription = document.getElementById('modalDescription');
const certificateModalImage = document.getElementById('modalImage');
const certificateModalClose = document.querySelector('.certificate-modal-close');

function openCertificateModal(card) {
	if (!card || !certificateModal) return;
	certificateModalTitle.textContent = card.dataset.title || 'Certificate';
	certificateModalDescription.textContent = card.dataset.description || '';
	certificateModalImage.src = card.dataset.image || '';
	certificateModalImage.alt = `${card.dataset.title || 'Certificate'} preview`;
	certificateModal.classList.add('open');
	document.body.style.overflow = 'hidden';
	certificateModal.setAttribute('aria-hidden','false');
}

function closeCertificateModal() {
	if (!certificateModal) return;
	certificateModal.classList.remove('open');
	document.body.style.overflow = '';
	certificateModal.setAttribute('aria-hidden','true');
}

certificateCards.forEach(card => {
	card.addEventListener('click', () => openCertificateModal(card));
	card.addEventListener('keydown', e => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			openCertificateModal(card);
		}
	});
});

if (certificateModalClose) {
	certificateModalClose.addEventListener('click', closeCertificateModal);
}

if (certificateModal) {
	certificateModal.addEventListener('click', e => {
		if (e.target === certificateModal) closeCertificateModal();
	});
}

const projectCards = document.querySelectorAll('.project-card[data-images]');
const projectModal = document.getElementById('projectModal');
const projectModalTitle = document.getElementById('projectModalTitle');
const projectModalDescription = document.getElementById('projectModalDescription');
const projectModalImage = document.getElementById('projectModalImage');
const projectModalCounter = document.getElementById('projectModalCounter');
const projectModalPrev = document.querySelector('.project-modal-prev');
const projectModalNext = document.querySelector('.project-modal-next');
const projectModalClose = document.getElementById('projectModalClose');
let currentProjectImages = [];
let currentProjectIndex = 0;

function updateProjectModalImage() {
	if (!projectModalImage || !projectModalCounter || !projectModalPrev || !projectModalNext) return;
	if (!currentProjectImages.length) return;
	projectModalImage.src = currentProjectImages[currentProjectIndex];
	projectModalImage.alt = `${projectModalTitle.textContent || 'Design'} preview ${currentProjectIndex + 1}`;
	projectModalCounter.textContent = `${currentProjectIndex + 1} / ${currentProjectImages.length}`;
	projectModalPrev.disabled = currentProjectIndex === 0;
	projectModalNext.disabled = currentProjectIndex === currentProjectImages.length - 1;
}

function openProjectModal(card) {
	if (!card || !projectModal || !projectModalImage || !projectModalCounter) return;
	currentProjectImages = (card.dataset.images || '').split('|').map(src => src.trim()).filter(Boolean);
	currentProjectIndex = 0;
	projectModalTitle.textContent = card.dataset.title || 'Design Preview';
	projectModalDescription.textContent = card.dataset.description || '';
	updateProjectModalImage();
	projectModal.classList.add('open');
	document.body.style.overflow = 'hidden';
	projectModal.setAttribute('aria-hidden','false');
}

function closeProjectModal() {
	if (!projectModal) return;
	projectModal.classList.remove('open');
	document.body.style.overflow = '';
	projectModal.setAttribute('aria-hidden','true');
}

if (projectModalPrev) {
	projectModalPrev.addEventListener('click', () => {
		if (currentProjectIndex > 0) {
			currentProjectIndex -= 1;
			updateProjectModalImage();
		}
	});
}

if (projectModalNext) {
	projectModalNext.addEventListener('click', () => {
		if (currentProjectIndex < currentProjectImages.length - 1) {
			currentProjectIndex += 1;
			updateProjectModalImage();
		}
	});
}

projectCards.forEach(card => {
	card.addEventListener('click', () => openProjectModal(card));
	card.addEventListener('keydown', e => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			openProjectModal(card);
		}
	});
});

if (projectModalClose) {
	projectModalClose.addEventListener('click', (e) => {
		e.stopPropagation();
		closeProjectModal();
	});
}

if (projectModal) {
	projectModal.addEventListener('click', e => {
		if (e.target === projectModal) closeProjectModal();
	});
}

document.addEventListener('keydown', e => {
	if (e.key === 'Escape') {
		if (certificateModal && certificateModal.classList.contains('open')) {
			closeCertificateModal();
		}
		if (projectModal && projectModal.classList.contains('open')) {
			closeProjectModal();
		}
	}
	if (projectModal && projectModal.classList.contains('open')) {
		if (e.key === 'ArrowRight') {
			if (currentProjectIndex < currentProjectImages.length - 1) {
				currentProjectIndex += 1;
				updateProjectModalImage();
			}
		}
		if (e.key === 'ArrowLeft') {
			if (currentProjectIndex > 0) {
				currentProjectIndex -= 1;
				updateProjectModalImage();
			}
		}
	}
});

const projectCountElement = document.getElementById('projectCount');
const certificateCountElement = document.getElementById('certificateCount');

function updateHeaderCounts() {
	const projectTotal = document.querySelectorAll('.project-card').length;
	const certificateTotal = document.querySelectorAll('.certificate-card').length;
	if (projectCountElement) projectCountElement.textContent = projectTotal;
	if (certificateCountElement) certificateCountElement.textContent = certificateTotal;
}

updateHeaderCounts();


