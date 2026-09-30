const appointmentForm = document.querySelector("#appointment-form");

if (appointmentForm) {
	const serviceSelect = appointmentForm.querySelector("#appointment-service");
	const dateInput = appointmentForm.querySelector("#appointment-date");
	const feedback = appointmentForm.querySelector("#appointment-feedback");
	const directWhatsAppLink = document.querySelector(".direct-whatsapp");
	const phoneNumber = new URL(directWhatsAppLink.href).pathname.replace(/\D/g, "");
	const today = new Date();
	const localDate = [
		today.getFullYear(),
		String(today.getMonth() + 1).padStart(2, "0"),
		String(today.getDate()).padStart(2, "0"),
	].join("-");

	dateInput.min = localDate;
	appointmentForm.hidden = false;

	document.querySelectorAll(".service-item a[data-service]").forEach((link) => {
		link.addEventListener("click", () => {
			serviceSelect.value = link.dataset.service;
		});
	});

	appointmentForm.addEventListener("submit", (event) => {
		event.preventDefault();

		if (!appointmentForm.reportValidity()) {
			return;
		}

		const messageLines = [
			"Hola, quiero consultar por una cita en Pau'BS.",
			`Servicio: ${serviceSelect.value}`,
		];
		const preferredDate = dateInput.value;
		const preferredTime = appointmentForm.querySelector("#appointment-time").value;

		if (preferredDate) {
			messageLines.push(`Fecha preferida: ${preferredDate}`);
		}

		if (preferredTime) {
			messageLines.push(`Hora aproximada: ${preferredTime}`);
		}

		messageLines.push("¿Me compartes disponibilidad y precio?");

		const whatsappUrl = new URL(`https://wa.me/${phoneNumber}`);
		whatsappUrl.searchParams.set("text", messageLines.join("\n"));
		window.open(whatsappUrl.href, "_blank", "noopener,noreferrer");
		feedback.textContent = "Se abrió WhatsApp. Revisa y envía el mensaje para solicitar la cita.";
	});
}