import { getEntries } from "./diary";

async function saveEntry(entryId) {
    console.log(`Tallennetaan merkintä ID: ${entryId}`);

    // 🔹 Haetaan päivämääräkenttä
    const dateElement = document.getElementById(`edit-date-${entryId}`);

    // 🔹 Tarkistetaan, löytyykö kenttä
    if (!dateElement) {
        console.error("Virhe: Päivämääräkenttää ei löydy! Tarkista ID.");
        alert("Virhe: Lomakkeesta puuttuu päivämääräkenttä!");
        return;
    }

    const dateInput = dateElement.value;

    // 🔹 Tarkistetaan, että päivämäärä on valittu
    if (!dateInput) {
        console.error("Virhe: Päivämääräkenttä on tyhjä!");
        alert("Virhe: Valitse päivämäärä ennen tallennusta.");
        return;
    }

    // 🔹 Varmistetaan, että päivämäärä on oikeassa muodossa (YYYY-MM-DD)
    const formattedDate = dateInput.split("T")[0];
    console.log("Muotoiltu päivämäärä:", formattedDate);

    // 🔹 Funktio: Muuttaa desimaalipilkun pisteeksi
    const parseNumber = (value) => parseFloat(value.replace(",", ".")) || 0;

    // 🔹 Luodaan päivitettävä JSON-objekti
    const updatedEntry = {
        entry_date: formattedDate, // ✅ Päivämäärä oikeassa muodossa
        blood_sugar: parseNumber(document.getElementById(`edit-blood_sugar-${entryId}`).value),
        insulin_dose: parseInt(document.getElementById(`edit-insulin_dose-${entryId}`).value) || 0,
        mood: document.getElementById(`edit-mood-${entryId}`).value.trim() || "",
        food: document.getElementById(`edit-food-${entryId}`).value.trim() || "",
        exercise: document.getElementById(`edit-exercise-${entryId}`).value.trim() || "",
        weight: parseNumber(document.getElementById(`edit-weight-${entryId}`).value),
        sleep_hours: parseInt(document.getElementById(`edit-sleep_hours-${entryId}`).value) || 0,
        notes: document.getElementById(`edit-notes-${entryId}`).value.trim() || ""
    };

    // 🔹 Tulostetaan JSON ennen lähetystä
    console.log("Lähetettävä JSON:", JSON.stringify(updatedEntry, null, 2));

    try {
        // 🔹 Lähetetään päivitys API:lle
        const response = await fetch(`http://localhost:3000/api/entries/${entryId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token") // Varmista, että token on oikein
            },
            body: JSON.stringify(updatedEntry)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Muokkaus epäonnistui");
        }

        alert("Muokkaus onnistui!");
        getEntries(); // Päivitetään näkymä

    } catch (error) {
        console.error("Virhe tallennuksessa:", error);
        alert("Virhe tallennuksessa: " + error.message);
    }
}

export { saveEntry };