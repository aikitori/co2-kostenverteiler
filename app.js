document.addEventListener("DOMContentLoaded", function () {
    // Get the input fields and result div
    const livingAreaInput = document.getElementById("living_area");
    const energyConsumptionInput = document.getElementById("energy_consumption");
    const conversionFactorInput = document.getElementById("conversion_factor");
    const co2CostInput = document.getElementById("co2_cost");
    const vatRateInput = document.getElementById("vat_rate");
    const resultDiv = document.getElementById("result");

    // Default values
    const DEFAULT_CONVERSION_FACTOR = 0.20088; // kg CO₂ per kWh
    const DEFAULT_CO2_COST = 30; // € per tonne CO₂
    const DEFAULT_VAT_RATE = 19; // VAT in %
    const TONNE_TO_KG = 1000; // Conversion factor from tonnes to kilograms

    // Add event listeners for input changes
    [livingAreaInput, energyConsumptionInput, conversionFactorInput, co2CostInput, vatRateInput].forEach(input => {
        input.addEventListener("input", calculateCO2Cost);
    });

    function calculateCO2Cost() {
        // Get input values
        const livingArea = parseFloat(livingAreaInput.value);
        const energyConsumption = parseFloat(energyConsumptionInput.value);
        const conversionFactor = parseFloat(conversionFactorInput.value) || DEFAULT_CONVERSION_FACTOR;
        const co2CostPerTonne = parseFloat(co2CostInput.value) || DEFAULT_CO2_COST;
        const vatRate = parseFloat(vatRateInput.value) || DEFAULT_VAT_RATE;

        // Validate inputs
        if (isNaN(livingArea) || isNaN(energyConsumption) || livingArea <= 0 || energyConsumption <= 0 || conversionFactor <= 0 || co2CostPerTonne <= 0 || vatRate < 0) {
            resultDiv.style.display = "none"; // Hide result if inputs are invalid
            return;
        }

        // Convert CO2 cost from €/tonne to €/kg
        const co2CostPerKg = co2CostPerTonne / TONNE_TO_KG;

        // Calculate total CO₂ emissions and per square meter value
        const totalCO2 = energyConsumption * conversionFactor; // in kg
        const co2PerSquareMeter = totalCO2 / livingArea;

        // Calculate total cost
        const totalCost = totalCO2 * co2CostPerKg;

        // Calculate VAT (Mehrwertsteuer) and final prices
        const vatAmount = totalCost * (vatRate / 100);
        const netCost = totalCost; // Netto: without VAT
        const grossCost = netCost + vatAmount; // Brutto: with VAT

        // Calculate value based on co2PerSquareMeter
        let valueMultiplier = 1.0;
        if (co2PerSquareMeter >= 12 && co2PerSquareMeter < 17) {
            valueMultiplier = 0.9;
        } else if (co2PerSquareMeter >= 17 && co2PerSquareMeter < 22) {
            valueMultiplier = 0.8;
        } else if (co2PerSquareMeter >= 22 && co2PerSquareMeter < 27) {
            valueMultiplier = 0.7;
        } else if (co2PerSquareMeter >= 27 && co2PerSquareMeter < 32) {
            valueMultiplier = 0.6;
        } else if (co2PerSquareMeter >= 32 && co2PerSquareMeter < 37) {
            valueMultiplier = 0.5;
        } else if (co2PerSquareMeter >= 37 && co2PerSquareMeter < 42) {
            valueMultiplier = 0.4;
        } else if (co2PerSquareMeter >= 42 && co2PerSquareMeter < 47) {
            valueMultiplier = 0.3;
        } else if (co2PerSquareMeter >= 47 && co2PerSquareMeter < 52) {
            valueMultiplier = 0.2;
        } else if (co2PerSquareMeter >= 52) {
            valueMultiplier = 0.05;
        }

        // Calculate landlord and tenant shares
        const totalCostvermieter = grossCost * valueMultiplier; // VAT applied to gross cost
        const totalCostMieter = grossCost - totalCostvermieter; // Tenant share is gross cost minus landlord's share

        // Display the result
        resultDiv.style.display = "block";
        resultDiv.innerHTML = `
            Gesamte CO₂-Emissionen: ${totalCO2.toFixed(2)} kg<br>
            CO₂ pro m²: ${co2PerSquareMeter.toFixed(2)} kg/m²<br>
            Anteil Vermietende: ${(valueMultiplier * 100).toFixed(2)} %<br>
            Gesamtkosten (Netto): ${netCost.toFixed(2)} €<br>
            MwSt (${vatRate}%): ${vatAmount.toFixed(2)} €<br>
            Gesamtkosten (Brutto): ${grossCost.toFixed(2)} €<br>
            Kostenanteil Mietende (Brutto): ${totalCostMieter.toFixed(2)} €<br>
            Kostenanteil Vermietende (Brutto): ${totalCostvermieter.toFixed(2)} €
        `;
    }
});
