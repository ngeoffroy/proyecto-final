export const BASIC_URL = "http://127.0.0.1:8000"

export const saveComposition = async ({ notes, precisionCalibracion }) => {
	const response = await fetch(`${BASIC_URL}/api/proyecto/compositions`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			notas: notes,
			precision_calibracion: precisionCalibracion,
		}),
	});

	if (!response.ok) {
		throw new Error("No se pudo guardar la melodía");
	}

	return response.json();
};

export const getLastComposition = async () => {
	const response = await fetch(`${BASIC_URL}/api/proyecto/last_composition`, {
		method: "GET",
	});

	if (!response.ok) {
		throw new Error("No se pudo cargar la última melodía");
	}

	return response.json();
};